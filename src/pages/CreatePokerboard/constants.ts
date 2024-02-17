import * as Yup from "yup"

import { ERROR_MESSAGES } from "@constants/messages.const"
import { FIELDS } from "@constants/fields.const"
import { TEXT } from "@constants/text.const"
import { MEMBER_SCHEMA } from "@src/types/shared/schema"

export const CREATE_POKERBOARD_SCHEMA = Yup.object()
  .shape({
    boardName: Yup.string()
      .min(FIELDS.boardName.constraints.min, ERROR_MESSAGES.boardNameLength)
      .max(FIELDS.boardName.constraints.max, ERROR_MESSAGES.boardNameLength)
      .required(ERROR_MESSAGES.boardNameRequired),
    deckType: Yup.string()
      .oneOf([TEXT.fibonacci, TEXT.even, TEXT.odd, TEXT.serial])
      .required(ERROR_MESSAGES.deckTypeRequired),
    members: Yup.array(MEMBER_SCHEMA),
    groups: Yup.array().of(Yup.string()),
  })
  .test({
    name: "min-members",
    test: function (values) {
      const { members, groups } = values || {}
      if (!members?.length && !groups?.length) {
        return this.createError({
          message: ERROR_MESSAGES.minimumMembers,
          path: FIELDS.members.name,
        })
      }
      return true
    },
  })
