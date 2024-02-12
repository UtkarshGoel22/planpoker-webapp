export interface LoginErrors {
  email?: string
  password?: string
  api?: string
}

export interface RegistrationErrors {
  firstName?: string
  lastName?: string
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  api?: string
}

export interface UserVerificationErrors {
  email?: string
  token?: string
  verify?: string
  reVerify?: string
  alreadyVerified?: string
  api?: string
}
