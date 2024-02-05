import * as Yup from "yup"

import { FIELDS } from "@constants/fields.const"
import { ERROR_MESSAGES } from "@constants/messages.const"

export const SIGNUP_SCHEMA = Yup.object().shape({
  firstName: Yup.string()
    .required(ERROR_MESSAGES.firstNameRequired)
    .max(FIELDS.firstName.constraints.max, ERROR_MESSAGES.firstNameLength),
  lastName: Yup.string()
    .optional()
    .max(FIELDS.lastName.constraints.max, ERROR_MESSAGES.lastNameLength),
  username: Yup.string()
    .required(ERROR_MESSAGES.usernameRequired)
    .min(FIELDS.username.constraints.min, ERROR_MESSAGES.usernameLength)
    .max(FIELDS.username.constraints.max, ERROR_MESSAGES.usernameLength),
  email: Yup.string()
    .email(ERROR_MESSAGES.invalidEmail)
    .required(ERROR_MESSAGES.emailRequired),
  password: Yup.string()
    .required(ERROR_MESSAGES.passwordRequired)
    .min(FIELDS.password.constraints.min, ERROR_MESSAGES.passwordLength)
    .max(FIELDS.password.constraints.max, ERROR_MESSAGES.passwordLength),
  confirmPassword: Yup.string()
    .required(ERROR_MESSAGES.confirmPasswordRequired)
    .when("password", {
      is: (password: string) => password && password.length > 0,
      then: schema =>
        schema.oneOf([Yup.ref("password")], ERROR_MESSAGES.passwordsDoNotMatch),
    }),
})
