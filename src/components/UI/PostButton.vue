<script setup></script>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
  .button {
    background-color: transparent;
    border: 1px solid $main-color;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;
    gap: 3px;
    transition: $opacity-transition;
    @include flex-row;
    border-radius: 10px;

    @media (hover: hover) {
      &:hover {
        opacity: 0.6;
      }
    }

    &:active {
      transform: scale(0.9);
    }
  }
</style>
