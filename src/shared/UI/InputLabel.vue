<script setup>
  const $props = defineProps({
    name: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <label class="inputLabel" :for="$props.name"><slot></slot></label>
</template>

<style lang="scss" scoped></style>
