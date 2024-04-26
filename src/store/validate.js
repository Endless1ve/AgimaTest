import { defineStore } from "pinia";
import { computed } from "vue";
import {
  required,
  helpers,
  email,
  minLengthValue,
  minLength,
  maxLength,
  maxLengthValue,
} from "@vuelidate/validators";

export const useValidationStore = defineStore("validation", () => {
  const minPasswordLength = 6;
  const maxTitleLength = 100;
  const maxDescriptionLength = 500;
  const minTitleLength = 3;
  const minDescriptionLength = 50;

  const authRules = computed(() => ({
    login: {
      required: helpers.withMessage("Поле не должно быть пустым", required),
      email: helpers.withMessage("Некорректный логин", email),
    },
    password: {
      required: helpers.withMessage("Поле не должно быть пустым", required),
      minLengthValue: helpers.withMessage(
        `Минимум ${minPasswordLength} символов`,
        minLength(minPasswordLength)
      ),
    },
  }));

  const postRules = computed(() => ({
    title: {
      required: helpers.withMessage("Поле не должно быть пустым", required),
      maxLengthValue: helpers.withMessage(
        `Максимум ${maxTitleLength} символов`,
        maxLength(maxTitleLength)
      ),
      minLengthValue: helpers.withMessage(
        `Минимум ${minTitleLength} символа`,
        minLength(minTitleLength)
      ),
    },
    description: {
      required: helpers.withMessage("Поле не должно быть пустым", required),
      maxLengthValue: helpers.withMessage(
        `Максимум ${maxDescriptionLength} символов`,
        maxLength(maxDescriptionLength)
      ),
      minLengthValue: helpers.withMessage(
        `Минимум ${minDescriptionLength} символов`,
        minLength(minDescriptionLength)
      ),
    },
  }));

  return { authRules, postRules };
});
