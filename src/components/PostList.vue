<script setup>
  import { ref, onMounted } from "vue";

  import { usePostsStore } from "@/store/posts";
  import { useErrorStore } from "@/store/error";

  import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

  import PostItem from "@/components/PostItem.vue";
  import ErrorText from "@/components/UI/ErrorText.vue";
  import ErrorBlock from "@/components/UI/ErrorBlock.vue";

  const postsStore = usePostsStore();
  const errorStore = useErrorStore();

  const observerRef = ref(null);

  onMounted(() => {
    useIntersectionObserver(observerRef.value, postsStore.fetchPosts);
  });
</script>

<template>
  <div class="postList">
    <ErrorBlock v-if="errorStore.isPostActionsError" />
    <ErrorText v-if="errorStore.isPostsError" />
    <PostItem v-for="post in postsStore.posts" :key="post.id" :post="post" />
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
