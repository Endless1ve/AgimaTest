<script setup>
  import { computed } from "vue";

  import { useValidationStore } from "@/store/validate";
  import { useFormsStore } from "@/store/forms";
  import { useCreatePostStore } from "@/store/createPost";

  const createPostStore = useCreatePostStore();
  const validationStore = useValidationStore();
  const formsStore = useFormsStore();

  const title = computed(() => createPostStore.title);
  const description = computed(() => createPostStore.description);

  const v$ = validationStore.setupValidation(validationStore.postRules, {
    title,
    description,
  });

  const submitForm = () => {
    validationStore.validate(v$, createPostStore.sendPost);
  };
</script>

<template>
  <FormBase :formTitle="'Создать пост'" @submit.prevent="submitForm">
    <InputGroup>
      <InputLabel :name="'title'">Заголовок</InputLabel>
      <FormInput v-model="createPostStore.title" :type="'text'" :id="'title'" />
      <InputError v-if="v$.title.$error">
        {{ v$.title.$errors[0].$message }}
      </InputError>
      <HiddenError v-else />
    </InputGroup>
    <InputGroup>
      <InputLabel :name="'description'">Описание</InputLabel>
      <FormTextarea v-model="createPostStore.description" :id="'description'" />
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
