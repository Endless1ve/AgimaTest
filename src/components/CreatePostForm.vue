<script setup>
  import { computed } from "vue";

  import { useFormsStore } from "@/store/forms";
  import { usePostStore } from "@/store/post";
  import { postRules, setupValidation, validate } from "@/utils/validation";

  const postStore = usePostStore();
  const formsStore = useFormsStore();

  const title = computed(() => postStore.newPostTitle);
  const description = computed(() => postStore.newPostDescription);

  const v$ = setupValidation(postRules, {
    title,
    description,
  });

  const submitForm = () => {
    validate(v$, postStore.sendPost);
  };
</script>

<template>
  <FormBase :formTitle="'Создать пост'" @submit.prevent="submitForm">
    <InputGroup>
      <InputLabel :name="'title'">Заголовок</InputLabel>
      <FormInput
        v-model="postStore.newPostTitle"
        :type="'text'"
        :id="'title'" />
      <InputError v-if="v$.title.$error">
        {{ v$.title.$errors[0].$message }}
      </InputError>
      <HiddenError v-else />
    </InputGroup>
    <InputGroup>
      <InputLabel :name="'description'">Описание</InputLabel>
      <FormTextarea
        v-model="postStore.newPostDescription"
        :id="'description'" />
      <InputError v-if="v$.description.$error">
        {{ v$.description.$errors[0].$message }}
      </InputError>
      <HiddenError v-else />
    </InputGroup>
    <FormSuccess v-if="formsStore.isFormSuccess">
      Пост успешно отправлен
    </FormSuccess>
    <FormError v-if="formsStore.isFormError">Ошибка сервера</FormError>
    <FormButton>Создать пост</FormButton>
  </FormBase>
</template>

<style lang="scss" scoped></style>
