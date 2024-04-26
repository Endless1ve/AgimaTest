<template>
  <div class="inputGroup">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .inputGroup {
    gap: 5px;
    @include flex-column;
  }
</style>
