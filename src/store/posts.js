import { defineStore } from "pinia";
import { ref } from "vue";
import { getPosts } from "@/API/posts";

export const usePostsStore = defineStore("posts", () => {
  const posts = ref([]);
  const page = ref(1);
  const allPages = ref(1);
  const limit = 10;
  const postsPath = "posts";

  async function fetchPosts() {
    //проверка на то что текущая страница меньше или равна общему количеству страниц
    if (page.value <= allPages.value) {
      try {
        //получение постов
        const response = await getPosts({
          _page: page.value,
          _per_page: limit,
        });

        //установка значения общего количества страниц
        allPages.value = response.data.pages;
        posts.value.push(...response.data.data);

        //увеличение страницы на 1 после запроса
        page.value += 1;
      } catch (error) {
        console.log(error);
      }
    }
  }

  return { posts, fetchPosts };
});
