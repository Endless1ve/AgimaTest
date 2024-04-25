<script setup></script>

<template>
  <button class="formButton"><slot></slot></button>
</template>

<style lang="scss" scoped>
  .formButton {
    width: 50%;
    align-self: center;
    background-color: $light-color;
    border: none;
    padding: 10px;
    color: $white-color;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
</style>
