import { getUser } from "@/API/users";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useErrorStore } from "./error";
import { useUserStore } from "./user";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const errorStore = useErrorStore();
  const userStore = useUserStore();

  const login = ref("");
  const password = ref("");
  const isAuth = ref(false);
  const isAuthError = ref(false);

  async function loginUser() {
    try {
      isAuthError.value = false;
      errorStore.isServerError = false;

      const currentPassword = password.value;
      const response = await getUser(login.value);
      const user = response.data[0];

      if (user) {
        if (user.password == currentPassword) {
          userStore.setUser(user);
          isAuth.value = true;
          router.push("/");
          resetForm();
        } else {
          isAuthError.value = true;
        }
      } else {
        isAuthError.value = true;
      }
    } catch (error) {
      errorStore.isServerError = true;
    }
  }

  function logOut() {
    isAuth.value = false;
    userStore.removeUser();
  }

  function resetForm() {
    login.value = "";
    password.value = "";
  }

  return {
    login,
    password,
    isAuth,
    isAuthError,
    loginUser,
    logOut,
  };
});
