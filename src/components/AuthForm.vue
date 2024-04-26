<script setup>
  import { computed } from "vue";
  import { useAuthStore } from "@/store/auth";
  import { useValidationStore } from "@/store/validate";
  import { useErrorStore } from "@/store/error";

  import FormBase from "@/components/FormBase.vue";
  import InputGroup from "@/components/UI/InputGroup.vue";

  import InputError from "@/components/UI/InputError.vue";
  import InputLabel from "@/components/UI/InputLabel.vue";
  import FormInput from "@/components/UI/FormInput.vue";
  import HiddenError from "@/components/UI/HiddenError.vue";
  import FormButton from "@/components/UI/FormButton.vue";
  import FormError from "@/components/UI/FormError.vue";

  const auth = useAuthStore();
  const error = useErrorStore();
  const validationStore = useValidationStore();

  const login = computed(() => auth.login);
  const password = computed(() => auth.password);

  const v$ = validationStore.setupValidation(validationStore.authRules, {
    login,
    password,
  });

  const submitForm = () => {
    validationStore.validate(v$, auth.loginUser);
  };
</script>

<template>
  <FormBase :formTitle="'Авторизоваться'" @submit.prevent="submitForm">
    <InputGroup>
      <InputLabel :name="'login'">Логин</InputLabel>
      <FormInput v-model="auth.login" :type="'text'" :id="'login'" />
      <InputError v-if="v$.login.$error">
        {{ v$.login.$errors[0].$message }}
      </InputError>
      <HiddenError v-else />
    </InputGroup>

    <InputGroup>
      <InputLabel :name="'password'">Пароль</InputLabel>
      <FormInput v-model="auth.password" :type="'text'" :id="'password'" />
      <InputError v-if="v$.password.$error">
        {{ v$.password.$errors[0].$message }}
      </InputError>
      <HiddenError v-else />
    </InputGroup>
    <FormError v-if="error.isServerError">Ошибка сервера</FormError>
    <FormError v-if="auth.isAuthError">Неправильный логин или пароль</FormError>
    <HiddenError v-else />
    <FormButton>Войти</FormButton>
  </FormBase>
</template>

<style lang="scss" scoped></style>
