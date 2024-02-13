import { ERROR_MESSAGES } from "@constants/messages.const"
import { UpdateUserPayloadCreator } from "@pages/MyProfile/types"
import { PayloadAction } from "@reduxjs/toolkit"
import { FetchUserErrors, UpdateUserErrors } from "@src/types/shared/errors"
import { User } from "@src/types/shared/user"
import { createAppSlice } from "@state/redux/createAppSlice"
import { fetchUser, updateUser } from "@state/redux/userAPI"

export interface UserSliceState {
  fetchUser: {
    errors: FetchUserErrors | null
    success: boolean | null
    message: string | null
  }
  loading: boolean
  userData: User | null
  updateUser: {
    errors: UpdateUserErrors | null
    success: boolean | null
    message: string | null
  }
}

const initialState: UserSliceState = {
  fetchUser: { errors: null, success: null, message: null },
  loading: false,
  userData: null,
  updateUser: { errors: null, success: null, message: null },
}

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: create => ({
    setUser: create.reducer((state, action: PayloadAction<User | null>) => {
      state.userData = action.payload
    }),
    resetUpdateUserState: create.reducer(state => {
      state.updateUser = { errors: null, success: null, message: null }
    }),
    fetchUser: create.asyncThunk(
      async function (token: string | null | undefined, { rejectWithValue }) {
        return await fetchUser(token, rejectWithValue)
      },
      {
        pending: state => {
          state.loading = true
        },
        fulfilled: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.fetchUser.errors = null
          state.fetchUser.success = action.payload.success
          state.fetchUser.message = action.payload.message
          state.userData = action.payload.data
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.fetchUser.errors = action.payload
          state.fetchUser.success = false
          state.fetchUser.message = ERROR_MESSAGES.failedToFetchUserDetails
          state.userData = action.payload.data
        },
      },
    ),
    updateUser: create.asyncThunk(
      async function (
        { requestData, token, setIsEditable }: UpdateUserPayloadCreator,
        { dispatch, rejectWithValue },
      ) {
        return await updateUser(
          requestData,
          token,
          dispatch,
          setIsEditable,
          rejectWithValue,
        )
      },
      {
        pending: state => {
          state.loading = true
        },
        fulfilled: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.updateUser.errors = null
          state.updateUser.success = action.payload.success
          state.updateUser.message = action.payload.message
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.updateUser.errors = action.payload
          state.updateUser.success = false
          state.updateUser.message = ERROR_MESSAGES.failedToUpdateUserDetails
        },
      },
    ),
  }),
})

export const userActions = userSlice.actions
