import { ref } from "vue";

import { defineStore } from "pinia";

import { getPostsAPI } from "@/API/posts";

import { useErrorStore } from "@/store/error";

export const usePostsStore = defineStore("posts", () => {
  const posts = ref([]);
  const page = ref(1);
  const allPages = ref(1);
  const limit = 10;

  const errorStore = useErrorStore();

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

        if (!posts.value.length) {
          throw new Error("No posts");
        }
      } catch (error) {
        errorStore.renderPostsError();
        console.log(error);
      }
    }
  }

  function setPosts(data) {
    posts.value.push(...data);
  }

  function addPost(post) {
    posts.value = [post, ...posts.value.slice(0)];
  }

  function addUpdatedPost(updatedPost) {
    const filteredPosts = posts.value.filter(
      (post) => post.id !== updatedPost.id
    );

    posts.value = [updatedPost, ...filteredPosts.slice(0)];
  }
  return { posts, fetchPosts, setPosts, addPost, addUpdatedPost };
});
