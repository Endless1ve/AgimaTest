<script setup>
  const emit = defineEmits(["update:modelValue"]);
  const $props = defineProps({
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
  });

  const handleChange = (event) => {
    emit("update:modelValue", event.target.value);
  };
</script>

<template>
  <textarea
    class="textarea"
    :id="id"
    cols="20"
    rows="5"
    :value="modelValue"
    @input="handleChange"></textarea>
</template>

<style lang="scss" scoped>
  .textarea {
    resize: none;
    outline: none;
    padding: 10px;
  }
</style>
