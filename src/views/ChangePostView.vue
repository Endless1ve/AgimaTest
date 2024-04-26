<script setup>
  import ChangePostForm from "@/components/ChangePostForm.vue";
</script>

<template>
  <div class="changePost">
    <ChangePostForm />
  </div>
</template>

<style lang="scss" scoped>
  .changePost {
    align-items: center;
    justify-content: center;
    @include flex-column;
    height: 100vh;
    padding: 10px;
    flex: 1;
  }
</style>
