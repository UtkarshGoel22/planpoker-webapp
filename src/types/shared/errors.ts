export interface AddTicketsToPokerboardErrors {
  auth?: string
  id?: string
  permission?: string
}

export interface CreateGroupErrors {
  groupName?: string
  members?: string
  api?: string
}

export interface CreatePokerboardErrors {
  boardName: string
  members: string
  groups: string
  manager?: string
  api?: string
}

export interface FetchPokerboardErrors {
  id?: string
  auth?: string
  api?: string
}

export interface FetchUserErrors {
  verify?: string
  auth?: string
  api?: string
}

export interface GroupSearchErrors {
  limit?: string
  searchKey?: string
  api?: string
}

export interface ImportTicketErrors {
  auth?: string
  api?: string
}

export interface ListPokerboardsErrors {
  auth?: string
  api?: string
}

export interface ListGroupsErrors {
  auth?: string
  api?: string
}

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

export interface UpdateUserErrors {
  firstName?: string
  lastName?: string
  username?: string
  auth?: string
  api?: string
}

export interface UserSearchErrors {
  limit?: string
  searchKey?: string
  api?: string
}
