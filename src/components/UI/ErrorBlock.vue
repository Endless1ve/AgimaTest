<script setup>
  import { useErrorStore } from "@/store/error";

  import ErrorText from "@/components/UI/ErrorText.vue";
  import ErrorButton from "@/components/UI/ErrorButton.vue";

  const errorStore = useErrorStore();
</script>

<template>
  <div class="errorBlock">
    <ErrorButton @click="errorStore.deleteActionsError" />
    <ErrorText class="errorText" />
  </div>
</template>

<style lang="scss" scoped>
  .errorBlock {
    position: fixed;
    bottom: 20px;
    padding: 10px 35px;
    background-color: $error-color;
    border-radius: 100px;
    z-index: 100;
  }

  .errorText {
    color: $white-color;
  }
</style>
