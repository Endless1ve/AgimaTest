import { ref } from "vue";

import { defineStore } from "pinia";

import { getCurrentDate } from "@/shared/utils/date";
import { useFormsStore } from "@/store/forms";
import { usePostsStore } from "@/store/posts";
import { useUserStore } from "@/store/user";
import { useErrorStore } from "@/store/error";

import {
  clapPostAPI,
  deletePostAPI,
  getSinglePostAPI,
  sendPostAPI,
  updatePostAPI,
} from "@/shared/services/posts/posts";

export const usePostStore = defineStore("post", () => {
  const newPostTitle = ref("");
  const newPostDescription = ref("");
  const updatePostTitle = ref("");
  const updatePostDescription = ref("");
  const postId = ref(null);

  const formsStore = useFormsStore();
  const userStore = useUserStore();
  const postsStore = usePostsStore();
  const errorStore = useErrorStore();

  function createPost() {
    return {
      id: "id" + Math.floor(Math.random() * 10000),
      title: newPostTitle.value,
      description: newPostDescription.value,
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

      postsStore.addPost(newPost);

      formsStore.clearForm([newPostTitle, newPostDescription]);

      formsStore.setSucces(true);
    } catch (error) {
      formsStore.setError(true);
    }
  }

  async function getPostByID(id) {
    try {
      const response = await getSinglePostAPI(id);

      updatePostTitle.value = response.data.title;
      updatePostDescription.value = response.data.description;
      postId.value = id;
    } catch (error) {
      console.log(error);
    }
  }

  function setUpdatedPost() {
    return {
      title: updatePostTitle.value,
      description: updatePostDescription.value,
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
      formsStore.clearForm([updatePostTitle, updatePostDescription]);
      postId.value = null;
    } catch (error) {
      formsStore.setError(true);
    }
  }

  async function deletePost(postId) {
    try {
      await deletePostAPI(postId);

      postsStore.filterPostsByID(postId);
    } catch (error) {
      errorStore.renderActionsError();
    }
  }

  async function clapPost(postId, clappedUsers, claps) {
    try {
      const newClappedUsers = clappedUsers ? [...clappedUsers] : [];

      if (!newClappedUsers.includes(userStore.userId)) {
        newClappedUsers.push(userStore.userId);
      }
      return await clapPostAPI(postId, {
        claps: claps + 1,
        clappedUsers: newClappedUsers,
      });
    } catch (error) {
      errorStore.renderActionsError();
    }
  }

  return {
    newPostTitle,
    newPostDescription,
    updatePostTitle,
    updatePostDescription,
    sendPost,
    getPostByID,
    updatePost,
    deletePost,
    clapPost,
  };
});
