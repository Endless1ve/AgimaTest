<script setup>
  import router from "@/router";

  import { usePostsStore } from "@/store/posts";

  import { deletePostAPI } from "@/API/posts";

  import PostButton from "@/components/UI/PostButton.vue";

  const $props = defineProps({
    postId: {
      type: String,
      required: true,
    },
  });

  const postsStore = usePostsStore();

  const deletePost = async () => {
    try {
      await deletePostAPI($props.postId);

      postsStore.posts = postsStore.posts.filter(
        (post) => post.id !== $props.postId
      );
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  <div class="postEditors">
    <PostButton @click="router.push(`/changePost/${postId}`)">
      Изменить
    </PostButton>
    <PostButton @click="deletePost">Удалить</PostButton>
  </div>
</template>

<style lang="scss">
  .postEditors {
    gap: 10px;
    @include flex-row;
  }
</style>
