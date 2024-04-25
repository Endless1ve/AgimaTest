import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const login = ref("");
  const password = ref("");

  function loginUser() {
    console.log("ok");
  }

  return { login, password, loginUser };
});
