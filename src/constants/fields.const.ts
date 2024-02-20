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
  boardName: {
    constraints: { min: 4, max: 30 },
    label: "Board Name",
    name: "boardName",
  },
  deckType: {
    label: "Deck Type",
    name: "deckType",
  },
  groups: {
    label: "Add Groups",
    name: "groups",
  },
  groupName: {
    constraints: { min: 4, max: 30 },
    label: "Group Name",
    name: "groupName",
  },
  members: {
    constraints: { min: 1 },
    label: "Add Members",
    name: "members",
  },
  ticketsInput: {
    label: "Import Tickets",
    name: "ticketsInput",
  },
  importBy: {
    label: "Import By",
    name: "importBy",
  },
}
