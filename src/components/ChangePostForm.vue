<script setup>
  import { computed, onBeforeUnmount } from "vue";

  import { useValidationStore } from "@/store/validate";
  import { usePostStore } from "@/store/post";
  import { useFormsStore } from "@/store/forms";

  const postStore = usePostStore();
  const formsStore = useFormsStore();
  const validationStore = useValidationStore();

  const title = computed(() => postStore.changedTitle);
  const description = computed(() => postStore.changedDescription);

  const v$ = validationStore.setupValidation(validationStore.postRules, {
    title,
    description,
  });

  const submitForm = () => {
    validationStore.validate(v$, postStore.updateNewPost);
  };

  onBeforeUnmount(() => (postStore.success = false));
</script>

<template>
  <FormBase :formTitle="'Изменить пост'" @submit.prevent="submitForm">
    <InputGroup>
      <InputLabel :name="'title'">Заголовок</InputLabel>
      <FormInput
        v-model="postStore.changedTitle"
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
        v-model="postStore.changedDescription"
        :id="'description'" />
      <InputError v-if="v$.description.$error">
        {{ v$.description.$errors[0].$message }}
      </InputError>
      <HiddenError v-else />
    </InputGroup>
    <FormSuccess v-if="formsStore.isFormSuccess">
      Пост успешно изменен
    </FormSuccess>
    <FormError v-if="formsStore.isFormError">Ошибка сервера</FormError>
    <FormButton>Обновить пост</FormButton>
  </FormBase>
</template>

<style lang="scss" scoped></style>
