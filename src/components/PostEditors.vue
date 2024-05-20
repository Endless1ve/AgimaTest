<script setup>
  import router from "@/app/router";

  import { usePostStore } from "@/store/post";

  import PostButton from "@/components/UI/PostButton.vue";

  const $props = defineProps({
    postId: {
      type: String,
      required: true,
    },
  });

  const postStore = usePostStore();

  const deletePost = () => {
    postStore.deletePost($props.postId);
  };
</script>

<template>
  <div class="postEditors">
    <PostButton
      @click="
        router.push({ name: 'changePost', params: { id: $props.postId } })
      ">
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
