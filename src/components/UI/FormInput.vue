<script setup>
  const emit = defineEmits(["update:modelValue"]);
  const $props = defineProps({
    type: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  });

  const model = defineModel();
</script>

<template>
  <input class="formInput" v-model="model" :type="type" :id="id" />
</template>

<style lang="scss" scoped>
  .formInput {
    padding: 5px;
    outline: none;
  }
</style>
