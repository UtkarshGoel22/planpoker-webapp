import { AUTH } from "@constants/webStorage.const"
import { SigninAPIRequestData } from "@pages/Signin/types"
import { SignupAPIRequestData } from "@pages/Signup/types"
import { ReSendVerificationLinkAPIRequestData } from "@pages/UserVerification/types"
import { AuthErrors } from "@src/types/shared/errors"
import { User } from "@src/types/shared/user"
import { getItemInLocalStorage } from "@src/utils/localStorage.utils"
import {
  reSendVerificationLink,
  signinUser,
  signupUser,
  verifyEmail,
} from "@state/redux/authAPI"
import { createAppSlice } from "@state/redux/createAppSlice"

export interface AuthSliceState {
  errors: AuthErrors | null
  loading: boolean
  registration: { success: boolean; message: string } | null
  token: string | undefined | null
  userData: User | undefined | null
  userVerification: { success: boolean; message: string } | null
}

const authString = getItemInLocalStorage(AUTH)
const auth = authString ? JSON.parse(authString) : null

const initialState: AuthSliceState = {
  errors: null,
  loading: false,
  registration: null,
  token: auth?.token,
  userData: auth?.userData,
  userVerification: null,
}

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({
    logoutUser: create.reducer(state => {
      state.token = null
      state.userData = null
    }),
    reset: create.reducer(state => {
      state.errors = null
      state.loading = false
      state.registration = null
      state.token = null
      state.userData = null
      state.userVerification = null
    }),
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
          state.errors = null
          state.userVerification = action.payload
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.errors = action.payload
        },
      },
    ),
    signinUser: create.asyncThunk(
      async (requestData: SigninAPIRequestData, { rejectWithValue }) => {
        return await signinUser(requestData, rejectWithValue)
      },
      {
        pending: state => {
          state.loading = true
        },
        fulfilled: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.errors = null
          state.token = action.payload.token
          state.userData = action.payload.userData
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.errors = action.payload
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
          state.errors = null
          state.registration = action.payload
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.errors = action.payload
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
          state.errors = null
          state.userVerification = action.payload
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.errors = action.payload
        },
      },
    ),
  }),
})

export const authActions = authSlice.actions
