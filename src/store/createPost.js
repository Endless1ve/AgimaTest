import { ref } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useErrorStore } from "./error";
import { sendPost } from "@/API/posts";

export const useCreatePostStore = defineStore("createPost", () => {
  const title = ref("");
  const description = ref("");
  const success = ref(false);
  const currentDate = new Date().toISOString();

  const userStore = useUserStore();
  const errorStore = useErrorStore();

  function createPost() {
    return {
      id: "id" + Math.floor(Math.random() * 10000),
      title: title.value,
      description: description.value,
      claps: 0,
      createdAt: currentDate,
      updateAt: currentDate,
      userId: userStore.userId,
      clappedUsers: [],
    };
  }

  function clearForm() {
    title.value = "";
    description.value = "";
  }

  async function sendNewPost() {
    try {
      success.value = false;
      errorStore.isServerError = false;
      const newPost = createPost();
      const response = await sendPost(newPost);
      clearForm();
      success.value = true;
    } catch (error) {
      errorStore.isServerError = true;
    }
  }

  return {
    title,
    description,
    success,
    sendNewPost,
    createPost,
  };
});
