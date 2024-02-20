import * as Yup from "yup"

import { ERROR_MESSAGES } from "@constants/messages.const"
import { ImportByType } from "@src/types/shared/ticket"

export const IMPORT_TICKETS_SCHEMA = Yup.object().shape({
  ticketsInput: Yup.string().required(ERROR_MESSAGES.required),
  importBy: Yup.mixed<ImportByType>().required(ERROR_MESSAGES.required),
})
