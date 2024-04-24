<script setup>
  import { onMounted } from "vue";
  import { usePostsStore } from "@/store/posts";

  import PostItem from "@/components/PostItem.vue";

  const store = usePostsStore();

  store.fetchPosts();
</script>

<template>
  <div class="postList">
    <PostItem v-for="post in store.posts" :key="post.id" :post="post" />
  </div>
</template>

<style lang="scss" scoped>
  .postList {
    padding: 10px;
    gap: 15px;
    align-items: center;
    @include flex-column;
  }
</style>
