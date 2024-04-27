<script setup>
  //решение для фикса отсутствия имени компонента
  defineProps();
</script>

<template>
  <div class="inputGroup">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .inputGroup {
    gap: 5px;
    @include flex-column;
  }
</style>
