<script setup></script>

<template>
  <span class="formSuccess"><slot></slot></span>
</template>

<style lang="scss" scoped>
  .formSuccess {
    color: $success-color;
    text-align: center;
  }
</style>
