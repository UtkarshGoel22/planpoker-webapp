import { AUTH } from "@constants/webStorage.const"
import { SigninAPIRequestData } from "@pages/Signin/types"
import { SignupAPIRequestData } from "@pages/Signup/types"
import { ReSendVerificationLinkAPIRequestData } from "@pages/UserVerification/types"
import {
  LoginErrors,
  RegistrationErrors,
  UserVerificationErrors,
} from "@src/types/shared/errors"
import {
  logoutUser,
  reSendVerificationLink,
  signinUser,
  signupUser,
  verifyEmail,
} from "@state/redux/authAPI"
import { createAppSlice } from "@state/redux/createAppSlice"
import { getItemInLocalStorage } from "@utils/localStorage.utils"

export interface AuthSliceState {
  loading: boolean
  login: {
    errors: LoginErrors | null
    success: boolean | null
    message: string | null
  }
  registration: {
    errors: RegistrationErrors | null
    success: boolean | null
    message: string | null
  }
  token: string | undefined | null
  userVerification: {
    errors: UserVerificationErrors | null
    success: boolean | null
    message: string | null
  }
}

const authString = getItemInLocalStorage(AUTH)
const auth = authString ? JSON.parse(authString) : null

const initialState: AuthSliceState = {
  loading: false,
  login: { errors: null, success: null, message: null },
  registration: { errors: null, success: null, message: null },
  token: auth?.token,
  userVerification: { errors: null, success: null, message: null },
}

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({
    reset: create.reducer(state => {
      state.loading = false
      state.login = { errors: null, success: null, message: null }
      state.registration = { errors: null, success: null, message: null }
      state.token = null
      state.userVerification = { errors: null, success: null, message: null }
    }),
    logoutUser: create.asyncThunk(
      async (
        token: string | null | undefined,
        { dispatch, rejectWithValue },
      ) => {
        return await logoutUser(token, dispatch, rejectWithValue)
      },
      {
        pending: state => {
          state.loading = true
        },
        fulfilled: state => {
          state.loading = false
          state.token = null
        },
        rejected: state => {
          state.loading = false
        },
      },
    ),
    reSendVerificationLink: create.asyncThunk(
      async (
        requestData: ReSendVerificationLinkAPIRequestData,
        { rejectWithValue },
      ) => {
        return await reSendVerificationLink(requestData, rejectWithValue)
      },
      {
        pending: state => {
          state.loading = true
        },
        fulfilled: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.userVerification.errors = null
          state.userVerification.success = action.payload.success
          state.userVerification.message = action.payload.message
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.userVerification.errors = action.payload.data
          state.userVerification.success = false
          state.userVerification.message = null
        },
      },
    ),
    signinUser: create.asyncThunk(
      async (
        requestData: SigninAPIRequestData,
        { dispatch, rejectWithValue },
      ) => {
        return await signinUser(requestData, dispatch, rejectWithValue)
      },
      {
        pending: state => {
          state.loading = true
        },
        fulfilled: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.login.errors = null
          state.login.success = action.payload.success
          state.login.message = action.payload.message
          state.token = action.payload.data.token
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.login.errors = action.payload.data
          state.login.success = false
          state.login.message = null
        },
      },
    ),
    signupUser: create.asyncThunk(
      async (requestData: SignupAPIRequestData, { rejectWithValue }) => {
        return await signupUser(requestData, rejectWithValue)
      },
      {
        pending: state => {
          state.loading = true
        },
        fulfilled: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.registration.errors = null
          state.registration.success = action.payload.success
          state.registration.message = action.payload.message
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.registration.errors = action.payload.data
          state.registration.success = false
          state.registration.message = null
        },
      },
    ),
    verifyEmail: create.asyncThunk(
      async (token: string, { rejectWithValue }) => {
        return await verifyEmail(token, rejectWithValue)
      },
      {
        pending: state => {
          state.loading = true
        },
        fulfilled: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.userVerification.errors = null
          state.userVerification.success = action.payload.success
          state.userVerification.message = action.payload.message
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.userVerification.errors = action.payload.data
          state.userVerification.success = false
          state.userVerification.message = null
        },
      },
    ),
  }),
})

export const authActions = authSlice.actions
