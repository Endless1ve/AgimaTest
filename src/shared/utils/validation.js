import useVuelidate from "@vuelidate/core";

import {
  required,
  helpers,
  email,
  minLength,
  maxLength,
} from "@vuelidate/validators";

const minPasswordLength = 6;
const maxTitleLength = 100;
const maxDescriptionLength = 500;
const minTitleLength = 3;
const minDescriptionLength = 50;

const postRules = {
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
};
const authRules = {
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
};

function setupValidation(rules, fields) {
  return useVuelidate(rules, fields);
}

function validate(v$, callback) {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    callback();
    v$.value.$reset();
  }
}

export { authRules, postRules, setupValidation, validate };
