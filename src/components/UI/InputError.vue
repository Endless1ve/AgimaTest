<script setup></script>

<template>
  <span class="inputError"><slot></slot></span>
</template>

<style lang="scss" scoped>
  .inputError {
    color: $error-color;
  }
</style>
