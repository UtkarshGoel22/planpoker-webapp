import * as Yup from "yup"

import { FIELDS } from "@constants/fields.const"
import { ERROR_MESSAGES } from "@constants/messages.const"
import { MEMBER_SCHEMA } from "@src/types/shared/schema"

export const CREATE_GROUP_SCHEMA = Yup.object().shape({
  groupName: Yup.string()
    .required(ERROR_MESSAGES.groupNameRequired)
    .min(FIELDS.groupName.constraints.min, ERROR_MESSAGES.groupNameLength)
    .max(FIELDS.groupName.constraints.max, ERROR_MESSAGES.groupNameLength),
  members: Yup.array(MEMBER_SCHEMA)
    .required(ERROR_MESSAGES.membersRequired)
    .min(FIELDS.members.constraints.min, ERROR_MESSAGES.minimumMembers),
})
