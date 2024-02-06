import { AuthErrors } from "@src/types/shared/errors"

export interface SigninFormProps {
  initialValues: SigninFormValues
  errors: AuthErrors | null
  loading: boolean
  handleSubmit: (values: SigninFormValues) => void
}

export interface SigninFormValues {
  email: string
  password: string
}

export interface SigninAPIRequestData extends SigninFormValues {}
