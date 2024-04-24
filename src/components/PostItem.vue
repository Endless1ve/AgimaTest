<script setup>
  const $props = defineProps({
    post: {
      type: Object,
      required: true,
    },
  });
</script>

<template>
  <article class="post">
    <h3 class="postTitle">{{ post.title }}</h3>
    <p class="postDescription">{{ post.description }}</p>
  </article>
</template>

<style lang="scss" scoped>
  .post {
    width: 100%;
    max-width: 400px;
    min-height: 200px;
    padding: 10px;
    background-color: $card-bg;
  }

  .postTitle {
    margin-bottom: 10px;
  }
</style>
