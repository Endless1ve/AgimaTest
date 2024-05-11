import { ref } from "vue";

import { defineStore } from "pinia";

import { getCurrentDate } from "@/utils/date";

import { useFormsStore } from "@/store/forms";
import { usePostsStore } from "@/store/posts";
import { getSinglePostAPI, updatePostAPI } from "@/services/posts/posts";

export const useUpdatePostStore = defineStore("updatePost", () => {
  const title = ref("");
  const description = ref("");
  const postId = ref(null);

  const formsStore = useFormsStore();
  const postsStore = usePostsStore();

  async function getPostByID(id) {
    try {
      const response = await getSinglePostAPI(id);

      title.value = response.data.title;
      description.value = response.data.description;
      postId.value = id;
    } catch (error) {
      console.log(error);
    }
  }

  function setUpdatedPost() {
    return {
      title: title.value,
      description: description.value,
      updateAt: getCurrentDate(),
    };
  }

  async function updatePost() {
    try {
      formsStore.setSucces(false);
      formsStore.setError(false);

      const updatedPost = setUpdatedPost();

      const response = await updatePostAPI(postId.value, updatedPost);

      postsStore.addUpdatedPost(response.data);

      formsStore.setSucces(true);
    } catch (error) {
      formsStore.setError(true);
    }
  }

  return { title, description, getPostByID, updatePost };
});
