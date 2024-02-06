import * as Yup from "yup"

import { FIELDS } from "@constants/fields.const"
import { ERROR_MESSAGES } from "@constants/messages.const"

export const SIGNIN_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email(ERROR_MESSAGES.invalidEmail)
    .required(ERROR_MESSAGES.emailRequired),
  password: Yup.string()
    .required(ERROR_MESSAGES.passwordRequired)
    .min(FIELDS.password.constraints.min, ERROR_MESSAGES.passwordLength)
    .max(FIELDS.password.constraints.max, ERROR_MESSAGES.passwordLength),
})
