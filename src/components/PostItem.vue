<script setup>
  import { ref, computed } from "vue";

  import { useUserStore } from "@/store/user";

  import { getFormattedDate } from "@/utils/date";

  import PostEditors from "@/components/PostEditors.vue";
  import PostButton from "@/components/UI/PostButton.vue";
  import ClapIcon from "@/components/UI/icons/ClapIcon.vue";
  import { usePostStore } from "@/store/post";

  const $props = defineProps({
    post: {
      type: Object,
      required: true,
    },
  });

  const userStore = useUserStore();
  const postStore = usePostStore();

  const claps = ref($props.post.claps);
  const clappedUsers = ref($props.post.clappedUsers);

  const canClap = computed(() => {
    return userStore.role !== "guest" && $props.post.userId != userStore.userId;
  });

  const isClapped = computed(() => {
    return (
      !!clappedUsers.value && clappedUsers.value.includes(userStore.userId)
    );
  });

  const canEdit = computed(() => {
    return (
      userStore.role === "writer" && $props.post.userId === userStore.userId
    );
  });

  const clap = async () => {
    const response = await postStore.clapPost(
      $props.post.id,
      clappedUsers.value,
      claps.value
    );

    claps.value = response.data.claps;
    clappedUsers.value = response.data.clappedUsers;
  };
</script>

<template>
  <article class="post">
    <h3 class="postTitle">{{ post.title }}</h3>
    <p class="postDescription">{{ post.description }}</p>
    <div class="postActions">
      <time class="postDate" :datetime="post.updateAt">
        {{ getFormattedDate(post.updateAt) }}
      </time>
      <PostButton
        @click="clap"
        v-if="canClap"
        class="clap"
        :class="{ clapped: isClapped }">
        <ClapIcon :isClapped="isClapped" />
        {{ claps }}
      </PostButton>
      <PostEditors v-if="canEdit" :postId="post.id" />
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

  .postDescription {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .postDate {
    margin: 10px auto 0 0;
  }

  .clapped {
    color: $light-color;
    border-color: $light-color;
  }

  .postActions {
    justify-content: flex-end;
    @include flex-row;
  }
</style>
