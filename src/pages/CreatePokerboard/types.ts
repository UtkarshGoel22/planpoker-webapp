import { CreatePokerboardErrors } from "@src/types/shared/errors"
import { GroupSearchOption } from "@src/types/shared/group"
import { UserSearchOption } from "@src/types/shared/user"

export interface CreatePokerboardFormProps {
  initialValues: CreatePokerboardFormValues
  errors: CreatePokerboardErrors | null
  loading: boolean
  handleSubmit: (values: CreatePokerboardFormValues) => void
}

export interface CreatePokerboardFormValues {
  boardName: string
  deckType: string
  members: UserSearchOption[]
  groups: GroupSearchOption[]
}

export interface CreatePokerboardAPIRequestData {
  boardName: string
  deckType: string
  manager: string
  members?: { id: string; email: string }[]
  groups?: string[]
}

export interface CreatePokerboardPayloadCreator {
  requestData: CreatePokerboardAPIRequestData
  token: string | undefined | null
}
