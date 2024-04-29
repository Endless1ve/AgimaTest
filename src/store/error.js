import { ref } from "vue";

import { defineStore } from "pinia";

export const useErrorStore = defineStore("error", () => {
  const isPostsError = ref(false);
  const isPostActionsError = ref(false);

  function renderPostsError() {
    isPostsError.value = true;
  }

  function renderActionsError() {
    isPostActionsError.value = true;
    setTimeout(() => {
      deleteActionsError();
    }, 5000);
  }

  function deleteActionsError() {
    isPostActionsError.value = false;
  }

  return {
    isPostsError,
    isPostActionsError,
    renderActionsError,
    renderPostsError,
    deleteActionsError,
  };
});
