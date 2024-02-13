import * as Yup from "yup"

import { FIELDS } from "@constants/fields.const"
import { ERROR_MESSAGES } from "@constants/messages.const"

export const UPDATE_USER_SCHEMA = Yup.object().shape({
  firstName: Yup.string()
    .min(FIELDS.firstName.constraints.min, ERROR_MESSAGES.firstNameLength)
    .max(FIELDS.firstName.constraints.max, ERROR_MESSAGES.firstNameLength)
    .optional(),
  lastName: Yup.string()
    .max(FIELDS.lastName.constraints.max, ERROR_MESSAGES.lastNameLength)
    .optional(),
  username: Yup.string()
    .min(FIELDS.username.constraints.min, ERROR_MESSAGES.usernameLength)
    .max(FIELDS.username.constraints.max, ERROR_MESSAGES.usernameLength)
    .optional(),
})
