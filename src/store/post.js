import { ref } from "vue";

import { defineStore } from "pinia";

import { useUserStore } from "@/store/user";
import { useErrorStore } from "@/store/error";
import { usePostsStore } from "@/store/posts";
import { useFormsStore } from "./forms";

import { sendPost, getPost, updatePost, deletePostAPI } from "@/API/posts";

export const usePostStore = defineStore("post", () => {
  const title = ref("");
  const description = ref("");
  const changedTitle = ref("");
  const changedDescription = ref("");
  const postId = ref(null);
  const success = ref(false);
  const currentDate = new Date().toISOString();

  const userStore = useUserStore();
  const errorStore = useErrorStore();
  const postsStore = usePostsStore();
  const formsStore = useFormsStore();

  async function deletePostEvt(id) {
    try {
      await deletePostAPI(id);

      postsStore.posts = postsStore.posts.filter((post) => post.id !== id);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    title,
    description,
    changedTitle,
    changedDescription,
    success,
    updateNewPost,
    getPostByID,
    deletePostEvt,
  };
});
