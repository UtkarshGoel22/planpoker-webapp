export interface User {
  id: string
  firstName: string
  lastName?: string
  username: string
  email: string
  isActive: boolean
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface UserSearchOption {
  name: string
  id: string
  email: string
  username: string
}
