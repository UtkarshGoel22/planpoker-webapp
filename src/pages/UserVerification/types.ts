import { AuthErrors } from "@src/types/shared/errors"

export interface UserVerificationFormProps {
  initialValues: UserVerificationFormValues
  errors: AuthErrors | null
  loading: boolean
  handleSubmit: (values: UserVerificationFormValues) => void
}

export interface UserVerificationFormValues {
  email: string
}

export interface ReSendVerificationLinkAPIRequestData
  extends UserVerificationFormValues {}
