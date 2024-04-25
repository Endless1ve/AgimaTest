<script setup>
  import { useAuthStore } from "@/store/auth";
  import router from "@/router";
  const auth = useAuthStore();
</script>

<template>
  <header class="header">
    <p class="headerItem" @click="router.push('/')">Посты</p>
    <p v-if="!auth.isAuth" class="headerItem" @click="router.push('/login')">
      Войти
    </p>
    <div v-else class="profile">
      <p>Логин профиля</p>
      <p class="headerItem" @click="auth.logOut">Выйти</p>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    background-color: $light-color;
    color: $white-color;
    justify-content: space-between;
    @include flex-row;
  }

  .profile {
    gap: 30px;
    @include flex-row;
  }

  .headerItem:hover {
    opacity: 0.6;
    cursor: pointer;
  }
</style>
