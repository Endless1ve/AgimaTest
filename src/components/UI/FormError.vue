<script setup></script>

<template>
  <span class="formError"><slot></slot></span>
</template>

<style lang="scss" scoped>
  .formError {
    color: $error-color;
    text-align: center;
  }
</style>
