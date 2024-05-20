<script setup>
  import { AuthForm } from "@/modules/Auth";

  AuthForm;
</script>

<template>
  <div class="auth">
    <AuthForm />
  </div>
</template>

<style lang="scss" scoped>
  .auth {
    align-items: center;
    justify-content: center;
    @include flex-column;
    height: 100vh;
    padding: 10px;
    flex: 1;
  }
</style>
