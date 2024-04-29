<script setup>
  //решение для фикса отсутствия имени компонента
  defineProps();
</script>

<template>
  <span class="inputError"><slot></slot></span>
</template>

<style lang="scss" scoped>
  .inputError {
    color: $error-color;
  }
</style>
