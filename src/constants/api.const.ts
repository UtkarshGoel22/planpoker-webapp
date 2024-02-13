export const API = {
  baseUrl: "http://localhost:5000",
  endpoints: {
    user: "/user",
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
