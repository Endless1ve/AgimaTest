<script setup>
  import { ref, onMounted } from "vue";
  import { usePostsStore } from "@/store/posts";
  import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

  import PostItem from "@/components/PostItem.vue";

  const store = usePostsStore();

  const observerRef = ref(null);

  onMounted(() => {
    useIntersectionObserver(observerRef.value, store.fetchPosts);
  });
</script>

<template>
  <div class="postList">
    <PostItem v-for="post in store.posts" :key="post.id" :post="post" />
    <div class="observer" ref="observerRef"></div>
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
