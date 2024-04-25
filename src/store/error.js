import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore("error", () => {
  const isServerError = ref(false);
  return {
    isServerError,
  };
});
