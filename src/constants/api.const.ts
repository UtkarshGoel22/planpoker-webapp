export const API = {
  baseUrl: "http://localhost:5000",
  debounce: {
    userSearch: 1500,
    groupSearch: 1500,
  },
  endpoints: {
    groups: "/groups",
    pokerboard: "/pokerboard",
    pokerboards: "/pokerboards",
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
}
