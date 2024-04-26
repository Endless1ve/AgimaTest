import { ref } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useCreatePostStore = defineStore("createPost", () => {
  const title = ref("");
  const description = ref("");
  const currentDate = new Date().toISOString();

  const userStore = useUserStore();

  function createPost() {
    return (newPost = {
      id: "id" + Math.floor(Math.random() * 10000),
      title: title.value,
      description: description.value,
      claps: 0,
      createdAt: currentDate,
      updateAt: currentDate,
      userId: userStore.userId,
      clappedUsers: [],
    });
  }

  function sendPost() {}
});
