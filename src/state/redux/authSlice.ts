import { AUTH } from "@constants/webStorage.const"
import { SignupAPIRequestData } from "@pages/Signup/types"
import { signinUser, signupUser } from "@state/redux/authAPI"
import { createAppSlice } from "@state/redux/createAppSlice"
import { AuthErrors } from "@src/types/shared/errors"
import { User } from "@src/types/shared/user"
import { getItemInLocalStorage } from "@src/utils/localStorage.utils"

export interface AuthSliceState {
  errors: AuthErrors | null
  loading: boolean
  registration: { success: boolean; message: string } | null
  token: string | undefined | null
  userData: User | undefined | null
}

const authString = getItemInLocalStorage(AUTH)
const auth = authString ? JSON.parse(authString) : null

const initialState: AuthSliceState = {
  errors: null,
  loading: false,
  registration: null,
  token: auth?.token,
  userData: auth?.userData,
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
    }),
    signinUser: create.asyncThunk(
      async (requestData, { rejectWithValue }) => {
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
  }),
})

export const authActions = authSlice.actions
