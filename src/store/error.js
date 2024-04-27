import { ref } from "vue";

import { defineStore } from "pinia";

export const useErrorStore = defineStore("error", () => {
  const isServerError = ref(false);
  return {
    isServerError,
  };
});
