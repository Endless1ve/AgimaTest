<script setup>
  const { name } = defineProps({
    name: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <label class="inputLabel" :for="name"><slot></slot></label>
</template>

<style lang="scss" scoped></style>
