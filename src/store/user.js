import { ref, computed } from "vue";

import { defineStore } from "pinia";

import { useAuthStore } from "./auth";

export const useUserStore = defineStore("user", () => {
  const role = ref("guest");
  const userId = ref(null);
  const login = ref("");

  const authStore = useAuthStore();

  const canCreatePost = computed(() => {
    return role.value === "writer" && authStore.isAuth;
  });

  function setUser(user) {
    role.value = user.role;
    userId.value = user.id;
    login.value = user.login;
  }

  function removeUser() {
    role.value = "guest";
    userId.value = 0;
    login.value = "";
  }

  return { role, userId, login, canCreatePost, setUser, removeUser };
});
