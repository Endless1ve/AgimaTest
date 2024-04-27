<script setup>
  import { computed, onBeforeUnmount } from "vue";

  import { useErrorStore } from "@/store/error";
  import { useValidationStore } from "@/store/validate";
  import { usePostStore } from "@/store/post";

  const postStore = usePostStore();
  const errorStore = useErrorStore();
  const validationStore = useValidationStore();

  const title = computed(() => postStore.title);
  const description = computed(() => postStore.description);

  const v$ = validationStore.setupValidation(validationStore.postRules, {
    title,
    description,
  });

  const submitForm = () => {
    validationStore.validate(v$, postStore.sendNewPost);
  };

  onBeforeUnmount(() => (postStore.success = false));
</script>

<template>
  <FormBase :formTitle="'Создать пост'" @submit.prevent="submitForm">
    <InputGroup>
      <InputLabel :name="'title'">Заголовок</InputLabel>
      <FormInput v-model="postStore.title" :type="'text'" :id="'title'" />
      <InputError v-if="v$.title.$error">
        {{ v$.title.$errors[0].$message }}
      </InputError>
      <HiddenError v-else />
    </InputGroup>
    <InputGroup>
      <InputLabel :name="'description'">Описание</InputLabel>
      <FormTextarea v-model="postStore.description" :id="'description'" />
      <InputError v-if="v$.description.$error">
        {{ v$.description.$errors[0].$message }}
      </InputError>
      <HiddenError v-else />
    </InputGroup>
    <FormSuccess v-if="postStore.success">Пост успешно отправлен</FormSuccess>
    <FormError v-if="errorStore.isServerError">Ошибка сервера</FormError>
    <FormButton>Создать пост</FormButton>
  </FormBase>
</template>

<style lang="scss" scoped></style>
