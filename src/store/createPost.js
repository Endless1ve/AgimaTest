import { ref } from "vue";
import { defineStore } from "pinia";
import { useFormsStore } from "./forms";
import { getCurrentDate } from "@/API/date";
import { useUserStore } from "./user";
import { usePostsStore } from "./posts";

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
      //обнуление ошибки и успеха
      formsStore.setSucces(false);
      formsStore.setError(false);

      //создание поста
      const newPost = createPost();

      //отправка поста
      await sendPost(newPost);

      //добавление поста в стор
      postsStore.setPosts(newPost);

      //очистка формы
      formsStore.clearForm([title, description]);
      //установка состояния успеха
      formsStore.setSucces(true);
    } catch (error) {
      console.log(error);
      formsStore.setError(true);
    }
  }

  return {
    title,
    description,
    sendPost,
  };
});
