export const API = {
  baseUrl: "http://localhost:5000",
  debounce: {
    userSearch: 1500,
    groupSearch: 1500,
  },
  endpoints: {
    groups: "/groups",
    importTickets: "/pokerboard/import-tickets",
    pokerboard: "/pokerboard",
    pokerboards: "/pokerboards",
    tickets: "/tickets",
    user: "/user",
    users: "/users",
    userGroup: "/user/group",
    userSignup: "/user/signup",
    userLogin: "/user/login",
    userLogout: "/user/logout",
    userVerify: "/user/verify",
  },
  headers: {
    applicationJson: "application/json",
  },
  methods: {
    get: "GET",
    patch: "PATCH",
    post: "POST",
  },
  paginationLimit: 5,
}
