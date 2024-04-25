<script setup>
  const emit = defineEmits(["update:modelValue"]);
  const props = defineProps({
    type: {
      type: String,
      required: true,
    },
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
  <input
    class="formInput"
    :value="modelValue"
    @input="handleChange"
    :type="type"
    :id="id" />
</template>

<style lang="scss" scoped>
  .formInput {
    padding: 5px;
    outline: none;
  }
</style>
