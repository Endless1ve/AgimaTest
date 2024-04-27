import { ref } from "vue";

import { defineStore } from "pinia";

import { getPostsAPI } from "@/API/posts";

export const usePostsStore = defineStore("posts", () => {
  const posts = ref([]);
  const page = ref(1);
  const allPages = ref(1);
  const limit = 10;

  async function fetchPosts() {
    if (page.value <= allPages.value) {
      try {
        const response = await getPostsAPI({
          _page: page.value,
          _per_page: limit,
          _sort: "-updateAt",
        });

        allPages.value = response.data.pages;

        setPosts(response.data.data);

        page.value += 1;
      } catch (error) {
        console.log(error);
      }
    }
  }

  function setPosts(data) {
    if (Array.isArray(data)) {
      posts.value.push(...data);
    } else posts.value.push(data);
  }

  return { posts, fetchPosts, setPosts };
});
