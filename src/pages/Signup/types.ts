import { RegistrationErrors } from "@src/types/shared/errors"

export interface SignupFormProps {
  initialValues: SignupFormValues
  errors: RegistrationErrors | null
  loading: boolean
  handleSubmit: (values: SignupFormValues) => void
}

export interface SignupFormValues {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface SignupAPIRequestData
  extends Omit<SignupFormValues, "lastName"> {
  lastName?: string
}
