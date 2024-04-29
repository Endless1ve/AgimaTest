import { ref } from "vue";

import { defineStore } from "pinia";

import router from "@/router";

import { getUser } from "@/API/users";

import { useUserStore } from "@/store/user";
import { useFormsStore } from "@/store/forms";

export const useAuthStore = defineStore("auth", () => {
  const login = ref("");
  const password = ref("");
  const isAuth = ref(false);
  const isAuthError = ref(false);

  const userStore = useUserStore();
  const formsStore = useFormsStore();

  async function loginUser() {
    try {
      isAuthError.value = false;
      formsStore.setError(false);

      const currentPassword = password.value;
      const response = await getUser(login.value);
      const user = response.data[0];

      if (user) {
        if (user.password == currentPassword) {
          userStore.setUser(user);
          isAuth.value = true;
          router.push("/");

          formsStore.clearForm([login, password]);
        } else {
          isAuthError.value = true;
        }
      } else {
        isAuthError.value = true;
      }
    } catch (error) {
      formsStore.setError(true);
    }
  }

  function logOut() {
    isAuth.value = false;
    router.push("/");
    userStore.removeUser();
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
