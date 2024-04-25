<script setup>
  import { computed } from "vue";
  import { useUserStore } from "@/store/user";

  import PostButton from "@/components/UI/PostButton.vue";
  import ClapIcon from "@/components/UI/icons/ClapIcon.vue";

  const $props = defineProps({
    post: {
      type: Object,
      required: true,
    },
  });

  const userStore = useUserStore();

  const canClap = computed(() => {
    return (
      userStore.role !== "guest" && $props.post.userId !== useUserStore.userId
    );
  });
</script>

<template>
  <article class="post">
    <h3 class="postTitle">{{ post.title }}</h3>
    <p class="postDescription">{{ post.description }}</p>
    <div class="postActions">
      <PostButton>
        <ClapIcon />
        {{ post.claps }}
      </PostButton>
    </div>
  </article>
</template>

<style lang="scss" scoped>
  .post {
    width: 100%;
    max-width: 400px;
    min-height: 200px;
    padding: 10px;
    background-color: $card-bg;
    justify-content: space-between;
    @include flex-column;
  }

  .postTitle {
    margin-bottom: 10px;
  }
</style>
