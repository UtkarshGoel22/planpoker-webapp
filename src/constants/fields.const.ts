export const FIELDS = {
  firstName: {
    constraints: { min: 1, max: 50 },
    label: "First Name",
    name: "firstName",
  },
  lastName: {
    constraints: { min: 1, max: 50 },
    label: "Last Name",
    name: "lastName",
  },
  username: {
    constraints: { min: 4, max: 30 },
    label: "Username",
    name: "username",
  },
  email: {
    label: "Email Address",
    name: "email",
  },
  password: {
    constraints: { min: 6, max: 50 },
    label: "Password",
    name: "password",
  },
  confirmPassword: {
    label: "Confirm Password",
    name: "confirmPassword",
  },
}
