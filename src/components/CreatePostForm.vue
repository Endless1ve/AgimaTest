<script setup>
  import { computed } from "vue";

  import { useErrorStore } from "@/store/error";
  import { useValidationStore } from "@/store/validate";
  import { useCreatePostStore } from "@/store/createPost";
  import { useVuelidate } from "@vuelidate/core";

  import FormBase from "@/components/FormBase.vue";
  import InputGroup from "@/components/UI/InputGroup.vue";
  import FormButton from "@/components/UI/FormButton.vue";
  import InputLabel from "@/components/UI/InputLabel.vue";
  import FormInput from "@/components/UI/FormInput.vue";
  import FormTextarea from "@/components/UI/FormTextarea.vue";
  import InputError from "@/components/UI/InputError.vue";
  import HiddenError from "@/components/UI/HiddenError.vue";
  import FormSuccess from "@/components/UI/FormSuccess.vue";

  const createPostStore = useCreatePostStore();
  const errorStore = useErrorStore();
  const validation = useValidationStore();

  const titleValue = computed(() => createPostStore.title);
  const descriptionValue = computed(() => createPostStore.description);

  const v$ = useVuelidate(validation.postRules, {
    title: titleValue,
    description: descriptionValue,
  });

  const submitForm = () => {
    v$.value.$touch();
    if (!v$.value.$invalid) {
      createPostStore.sendNewPost();
      v$.value.$reset();
    }
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
    <FormSuccess v-if="createPostStore.success">
      Пост успешно отправлен
    </FormSuccess>
    <InputError v-if="errorStore.isServerError">Ошибка сервера</InputError>
    <FormButton>Создать пост</FormButton>
  </FormBase>
</template>

<style lang="scss" scoped></style>
