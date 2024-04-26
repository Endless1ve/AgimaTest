<script setup>
  import router from "@/router";

  import PostButton from "@/components/UI/PostButton.vue";

  const $props = defineProps({
    postId: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <div class="postEditors">
    <PostButton @click="router.push(`/changePost/${postId}`)">
      Изменить
    </PostButton>
    <PostButton>Удалить</PostButton>
  </div>
</template>

<style lang="scss">
  .postEditors {
    gap: 10px;
    @include flex-row;
  }
</style>
