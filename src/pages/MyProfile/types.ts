import { UpdateUserErrors } from "@src/types/shared/errors"

export interface EditProfileFormProps {
  initialValues: EditProfileFormValues
  errors: UpdateUserErrors | null
  loading: boolean
  handleSubmit: (values: EditProfileFormValues) => void
}

export interface EditProfileFormValues {
  firstName?: string
  lastName?: string
  username?: string
}

export interface SearchUserPayloadCreator {
  searchInput: string
  handleUnregisteredUsers: boolean
}

export interface UpdateUserPayloadCreator {
  requestData: EditProfileFormValues
  token: string | undefined | null
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
}
