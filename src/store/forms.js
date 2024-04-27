import { ref } from "vue";

import { defineStore } from "pinia";

export const useFormsStore = defineStore("forms", () => {
  const isFormError = ref(false);
  const isFormSuccess = ref(false);

  function clearForm(fields) {
    fields.forEach((field) => (field.value = ""));
  }

  function setError(value) {
    isFormError.value = value;
  }

  function setSucces(value) {
    isFormSuccess.value = value;
  }

  return {
    isFormError,
    isFormSuccess,
    clearForm,
    setError,
    setSucces,
  };
});
