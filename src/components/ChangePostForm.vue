<script setup>
  import { computed } from "vue";

  import { useValidationStore } from "@/store/validate";
  import { useFormsStore } from "@/store/forms";
  import { useUpdatePostStore } from "@/store/updatePost";

  const updatePostStore = useUpdatePostStore();
  const formsStore = useFormsStore();
  const validationStore = useValidationStore();

  const title = computed(() => updatePostStore.title);
  const description = computed(() => updatePostStore.description);

  const v$ = validationStore.setupValidation(validationStore.postRules, {
    title,
    description,
  });

  const submitForm = () => {
    validationStore.validate(v$, updatePostStore.updatePost);
  };
</script>

<template>
  <FormBase :formTitle="'Изменить пост'" @submit.prevent="submitForm">
    <InputGroup>
      <InputLabel :name="'title'">Заголовок</InputLabel>
      <FormInput v-model="updatePostStore.title" :type="'text'" :id="'title'" />
      <InputError v-if="v$.title.$error">
        {{ v$.title.$errors[0].$message }}
      </InputError>
      <HiddenError v-else />
    </InputGroup>
    <InputGroup>
      <InputLabel :name="'description'">Описание</InputLabel>
      <FormTextarea v-model="updatePostStore.description" :id="'description'" />
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
