import { getUser } from "@/API/users";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useErrorStore } from "./error";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const errorStore = useErrorStore();

  const login = ref("");
  const password = ref("");
  const isAuth = ref(false);
  const role = ref("guest");
  const path = "users?login=";
  const isAuthError = ref(false);

  async function loginUser() {
    try {
      isAuthError.value = false;
      errorStore.isServerError = false;

      const currentPassword = password.value;
      const response = await getUser(path + login.value);
      const user = response.data[0];

      if (user) {
        if (user.password == currentPassword) {
          role.value = user.role;
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
    console.log("sas");
    role.value = "guest";
    isAuth.value = false;
  }

  function resetForm() {
    login.value = "";
    password.value = "";
  }

  return {
    login,
    password,
    role,
    isAuth,
    isAuthError,
    loginUser,
    logOut,
  };
});
