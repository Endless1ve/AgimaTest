<script setup>
  import { MainHeader } from "@/modules/Header";
</script>

<template>
  <MainHeader />
  <router-view />
</template>

<style lang="scss">
  @import "./assets/styles/normalize.scss";
  @import "./assets/styles/fonts.scss";

  #app {
    font-family: $main-fonts;
    background-color: $second-ligth-color;
    min-height: 100vh;
    height: 100%;
    @include flex-column;
  }
</style>
