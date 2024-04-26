<script setup>
  import { computed, onBeforeUnmount } from "vue";

  import { useErrorStore } from "@/store/error";
  import { useValidationStore } from "@/store/validate";
  import { usePostStore } from "@/store/post";

  import FormBase from "@/components/FormBase.vue";
  import InputGroup from "@/components/UI/InputGroup.vue";
  import FormButton from "@/components/UI/FormButton.vue";
  import InputLabel from "@/components/UI/InputLabel.vue";
  import FormInput from "@/components/UI/FormInput.vue";
  import FormTextarea from "@/components/UI/FormTextarea.vue";
  import InputError from "@/components/UI/InputError.vue";
  import HiddenError from "@/components/UI/HiddenError.vue";
  import FormSuccess from "@/components/UI/FormSuccess.vue";
  import FormError from "@/components/UI/FormError.vue";

  const postStore = usePostStore();
  const errorStore = useErrorStore();
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
    <FormSuccess v-if="postStore.success">Пост успешно изменен</FormSuccess>
    <FormError v-if="errorStore.isServerError">Ошибка сервера</FormError>
    <FormButton>Обновить пост</FormButton>
  </FormBase>
</template>

<style lang="scss" scoped></style>
