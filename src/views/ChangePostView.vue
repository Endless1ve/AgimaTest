<script setup>
  import { onMounted } from "vue";

  import { useRoute } from "vue-router";

  import { usePostStore } from "@/store/post";

  import ChangePostForm from "@/components/ChangePostForm.vue";

  const route = useRoute();

  const postId = route.params.id;

  const postStore = usePostStore();

  onMounted(() => {
    postStore.getPostByID(postId);
  });
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
