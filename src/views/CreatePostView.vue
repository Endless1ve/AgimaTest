<script setup>
  import CreatePostForm from "@/components/CreatePostForm.vue";
</script>

<template>
  <div class="createPost">
    <CreatePostForm />
  </div>
</template>

<style lang="scss" scoped>
  .createPost {
    align-items: center;
    justify-content: center;
    @include flex-column;
    height: 100vh;
    padding: 10px;
    flex: 1;
  }
</style>
