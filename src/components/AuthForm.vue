<script setup>
  import { computed } from "vue";

  import { useAuthStore } from "@/store/auth";
  import { useValidationStore } from "@/store/validate";
  import { useErrorStore } from "@/store/error";

  const authStore = useAuthStore();
  const errorStore = useErrorStore();
  const validationStore = useValidationStore();

  const login = computed(() => authStore.login);
  const password = computed(() => authStore.password);

  const v$ = validationStore.setupValidation(validationStore.authRules, {
    login,
    password,
  });

  const submitForm = () => {
    validationStore.validate(v$, authStore.loginUser);
  };
</script>

<template>
  <FormBase :formTitle="'Авторизоваться'" @submit.prevent="submitForm">
    <InputGroup>
      <InputLabel :name="'login'">Логин</InputLabel>
      <FormInput
        v-model="authStore.login"
        :type="'text'"
        :id="'login'"
        autocomplete="email" />
      <InputError v-if="v$.login.$error">
        {{ v$.login.$errors[0].$message }}
      </InputError>
      <HiddenError v-else />
    </InputGroup>

    <InputGroup>
      <InputLabel :name="'password'">Пароль</InputLabel>
      <FormInput
        v-model="authStore.password"
        :type="'password'"
        :id="'password'"
        autocomplete="current-password" />
      <InputError v-if="v$.password.$error">
        {{ v$.password.$errors[0].$message }}
      </InputError>
      <HiddenError v-else />
    </InputGroup>
    <FormError v-if="errorStore.isServerError">Ошибка сервера</FormError>
    <FormError v-if="authStore.isAuthError">
      Неправильный логин или пароль
    </FormError>
    <HiddenError v-else />
    <FormButton>Войти</FormButton>
  </FormBase>
</template>

<style lang="scss" scoped></style>
