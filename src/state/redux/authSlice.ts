import type { PayloadAction } from "@reduxjs/toolkit"

import { AUTH } from "@constants/webStorage.const"
import { createAppSlice } from "@state/redux/createAppSlice"
import { getItemInLocalStorage } from "@src/utils/localStorage.utils"

export interface AuthSliceState {
  token: string | undefined | null
  userId: string | undefined | null
}

const authString = getItemInLocalStorage(AUTH)
const auth = authString ? JSON.parse(authString) : null

const initialState: AuthSliceState = {
  token: auth?.token,
  userId: auth?.userId,
}

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<AuthSliceState>) => {
      state.token = action.payload.token
      state.userId = action.payload.userId
    },
    logoutUser: state => {
      state.token = null
      state.userId = null
    },
  },
})

export const authActions = authSlice.actions
