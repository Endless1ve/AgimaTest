<script setup>
  import { useAuthStore } from "@/store/auth";
  import { useUserStore } from "@/store/user";
  import router from "@/router";
  const auth = useAuthStore();
  const userStore = useUserStore();
</script>

<template>
  <header class="header">
    <p class="headerItem" @click="router.push('/')">Посты</p>
    <p v-if="!auth.isAuth" class="headerItem" @click="router.push('/login')">
      Войти
    </p>
    <div v-else class="profile">
      <p>{{ userStore.login }}</p>
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
    z-index: 10;
  }

  .profile {
    gap: 30px;
    @include flex-row;
  }

  .headerItem {
    transition: $opacity-transition;

    @media (hover: hover) {
      &:hover {
        opacity: 0.6;
        cursor: pointer;
      }
    }
  }
</style>
