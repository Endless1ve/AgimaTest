import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  const role = ref("guest");
  const userId = ref(null);
  const login = ref("");

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

  return { role, userId, login, setUser, removeUser };
});
