import { ref } from "vue";
import { defineStore } from "pinia";
import { useFormsStore } from "./forms";
import { getCurrentDate } from "@/API/date";
import { useUserStore } from "./user";
import { usePostsStore } from "./posts";
import { sendPostAPI } from "@/API/posts";

export const useCreatePostStore = defineStore("createPost", () => {
  const title = ref("");
  const description = ref("");

  const formsStore = useFormsStore();
  const userStore = useUserStore();
  const postsStore = usePostsStore();

  function createPost() {
    return {
      id: "id" + Math.floor(Math.random() * 10000),
      title: title.value,
      description: description.value,
      claps: 0,
      createdAt: getCurrentDate(),
      updateAt: getCurrentDate(),
      userId: userStore.userId,
      clappedUsers: [],
    };
  }

  async function sendPost() {
    try {
      formsStore.setSucces(false);
      formsStore.setError(false);

      const newPost = createPost();

      await sendPostAPI(newPost);

      postsStore.setPosts(newPost);

      formsStore.clearForm([title, description]);

      formsStore.setSucces(true);
    } catch (error) {
      formsStore.setError(true);
    }
  }

  return {
    title,
    description,
    sendPost,
  };
});
