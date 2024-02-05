import type { PayloadAction } from "@reduxjs/toolkit"

import { AUTH } from "@constants/webStorage.const"
import { SignupAPIRequestData } from "@pages/Signup/types"
import { signupUser } from "@state/redux/authAPI"
import { createAppSlice } from "@state/redux/createAppSlice"
import { AuthErrors } from "@src/types/shared/errors"
import { getItemInLocalStorage } from "@src/utils/localStorage.utils"

export interface AuthSliceState {
  errors: AuthErrors | null
  loading: boolean
  registration: { success: boolean; message: string } | null
  token: string | undefined | null
  userId: string | undefined | null
}

const authString = getItemInLocalStorage(AUTH)
const auth = authString ? JSON.parse(authString) : null

const initialState: AuthSliceState = {
  errors: null,
  loading: false,
  registration: null,
  token: auth?.token,
  userId: auth?.userId,
}

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({
    loginUser: create.reducer(
      (state, action: PayloadAction<AuthSliceState>) => {
        state.token = action.payload.token
        state.userId = action.payload.userId
      },
    ),
    logoutUser: create.reducer(state => {
      state.token = null
      state.userId = null
    }),
    reset: create.reducer(state => {
      state.errors = null
      state.loading = false
      state.registration = null
      state.token = null
      state.userId = null
    }),
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
