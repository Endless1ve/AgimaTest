<script setup>
  //решение для фикса отсутствия имени компонента
  defineProps();
</script>

<template>
  <div class="hiddenError"></div>
</template>

<style lang="scss" scoped>
  .hiddenError {
    height: 18px;
  }
</style>
