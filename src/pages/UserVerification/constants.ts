import * as Yup from "yup"

import { ERROR_MESSAGES } from "@constants/messages.const"

export const USER_VERIFICATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email(ERROR_MESSAGES.invalidEmail)
    .required(ERROR_MESSAGES.emailRequired),
})
