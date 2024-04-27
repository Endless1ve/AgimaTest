<script setup>
  import { onMounted } from "vue";

  import { useFormsStore } from "@/store/forms";

  const $props = defineProps({
    formTitle: {
      type: String,
      required: true,
    },
  });

  const formsStore = useFormsStore();

  onMounted(() => {
    formsStore.setError(false);
    formsStore.setSucces(false);
  });
</script>

<template>
  <form class="form">
    <h3 class="formTitle">{{ formTitle }}</h3>
    <slot></slot>
  </form>
</template>

<style lang="scss" scoped>
  .form {
    background-color: $card-bg;
    gap: 10px;
    width: 100%;
    max-width: 300px;
    padding: 15px;
    border-radius: 10px;
    @include flex-column;
  }

  .formTitle {
    text-align: center;
  }
</style>
