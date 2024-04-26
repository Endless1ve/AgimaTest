import { ref } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useErrorStore } from "./error";
import { usePostsStore } from "./posts";
import { sendPost, getPost, updatePost, deletePost } from "@/API/posts";

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

  function changePost() {
    return {
      title: changedTitle.value,
      description: changedDescription.value,
      updateAt: currentDate,
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

      await sendPost(newPost);

      postsStore.posts.push(newPost);

      clearForm();

      success.value = true;
    } catch (error) {
      errorStore.isServerError = true;
    }
  }

  async function getPostByID(id) {
    try {
      const response = await getPost(id);

      changedTitle.value = response.data.title;
      changedDescription.value = response.data.description;
      postId.value = id;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateNewPost() {
    try {
      success.value = false;
      errorStore.isServerError = false;

      const newPost = changePost();

      const response = await updatePost(postId.value, newPost);

      const oldPost = postsStore.posts.findIndex(
        (post) => post.id === postId.value
      );
      postsStore.posts[oldPost] = response.data;

      success.value = true;
    } catch (error) {
      errorStore.isServerError = true;
    }
  }

  async function deletePostEvt(id) {
    try {
      await deletePost(id);

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
    sendNewPost,
    createPost,
    updateNewPost,
    getPostByID,
    deletePostEvt,
  };
});
