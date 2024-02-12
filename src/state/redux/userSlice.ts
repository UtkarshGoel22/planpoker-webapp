import { PayloadAction } from "@reduxjs/toolkit"

import { User } from "@src/types/shared/user"
import { createAppSlice } from "@state/redux/createAppSlice"

export interface UserSliceState {
  loading: false
  userData: User | null
}

const initialState: UserSliceState = {
  loading: false,
  userData: null,
}

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: create => ({
    setUser: create.reducer((state, action: PayloadAction<User | null>) => {
      state.userData = action.payload
    }),
  }),
})

export const userActions = userSlice.actions
