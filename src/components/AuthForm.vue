<script setup>
  import { computed } from "vue";
  import { useAuthStore } from "@/store/auth";
  import { useValidationStore } from "@/store/validate";
  import { useErrorStore } from "@/store/error";
  import { useVuelidate } from "@vuelidate/core";

  import InputError from "@/components/UI/InputError.vue";
  import InputLabel from "@/components/UI/InputLabel.vue";
  import FormInput from "@/components/UI/FormInput.vue";
  import HiddenError from "@/components/UI/HiddenError.vue";
  import FormButton from "@/components/UI/FormButton.vue";

  const auth = useAuthStore();
  const error = useErrorStore();
  const validation = useValidationStore();

  const loginValue = computed(() => auth.login);
  const passwordValue = computed(() => auth.password);

  const v$ = useVuelidate(validation.authRules, {
    login: loginValue,
    password: passwordValue,
  });

  const submitForm = () => {
    v$.value.$touch();
    if (!v$.value.$invalid) {
      auth.loginUser();
    }
  };
</script>

<template>
  <form class="form" @submit.prevent="submitForm">
    <h3 class="formTitle">Авторизоваться</h3>

    <div class="inputGroup">
      <InputLabel :name="'login'">Логин</InputLabel>
      <FormInput v-model="auth.login" :type="'text'" :id="'login'" />
      <InputError v-if="v$.login.$error">
        {{ v$.login.$errors[0].$message }}
      </InputError>
      <HiddenError v-else />
    </div>

    <div class="inputGroup">
      <InputLabel :name="'password'">Пароль</InputLabel>
      <FormInput v-model="auth.password" :type="'text'" :id="'password'" />
      <InputError v-if="v$.password.$error">
        {{ v$.password.$errors[0].$message }}
      </InputError>
      <HiddenError v-else />
    </div>
    <InputError v-if="error.isServerError">Ошибка сервера</InputError>
    <InputError v-if="auth.isAuthError">
      Неправильный логин или пароль
    </InputError>
    <HiddenError v-else />
    <FormButton>Войти</FormButton>
  </form>
</template>

<style lang="scss" scoped>
  .form {
    background-color: $card-bg;
    gap: 10px;
    width: 100%;
    max-width: 300px;
    padding: 15px;
    border-radius: 10px;
    @include flex-column;
  }

  .formTitle {
    text-align: center;
  }

  .inputGroup {
    gap: 5px;
    @include flex-column;
  }
</style>
