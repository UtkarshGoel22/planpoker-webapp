import { CreateGroupErrors } from "@src/types/shared/errors"
import { UserSearchOption } from "@src/types/shared/user"

export interface CreateGroupFormProps {
  initialValues: CreateGroupFormValues
  errors: CreateGroupErrors | null
  loading: boolean
  handleSubmit: (values: CreateGroupFormValues) => void
}

export interface CreateGroupFormValues {
  groupName: string
  members: UserSearchOption[]
}

export interface CreateGroupAPIRequestData {
  admin: string
  groupName: string
  members: string[]
}

export interface CreateGroupPayloadCreator {
  requestData: CreateGroupAPIRequestData
  token: string | undefined | null
}
