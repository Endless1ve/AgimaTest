import { defineStore } from "pinia";
import { computed } from "vue";
import {
  required,
  helpers,
  email,
  minLengthValue,
  minLength,
} from "@vuelidate/validators";

export const useValidationStore = defineStore("validation", () => {
  const minPasswordLength = 6;

  const authRules = computed(() => ({
    login: {
      required: helpers.withMessage("Поле не должно быть пустым", required),
      email: helpers.withMessage("Некорректный логин", email),
    },
    password: {
      required: helpers.withMessage("Поле не должно быть пустым", required),
      minLengthValue: helpers.withMessage(
        "Минимум 6 символов",
        minLength(minPasswordLength)
      ),
    },
  }));

  const postRules = computed(() => ({
    title: {
      required: helpers.withMessage("Поле не должно быть пустым", required),
    },
    description: {
      required: helpers.withMessage("Поле не должно быть пустым", required),
    },
  }));

  return { authRules, postRules };
});
