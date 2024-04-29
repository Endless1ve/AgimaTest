<script setup>
  //решение для фикса отсутствия имени компонента
  defineProps();
</script>

<template>
  <span class="formError"><slot></slot></span>
</template>

<style lang="scss" scoped>
  .formError {
    color: $error-color;
    text-align: center;
  }
</style>
