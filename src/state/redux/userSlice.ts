import { PayloadAction } from "@reduxjs/toolkit"

import { ERROR_MESSAGES } from "@constants/messages.const"
import {
  SearchUserPayloadCreator,
  UpdateUserPayloadCreator,
} from "@pages/MyProfile/types"
import {
  FetchUserErrors,
  UpdateUserErrors,
  UserSearchErrors,
} from "@src/types/shared/errors"
import { User, UserSearchOption } from "@src/types/shared/user"
import { createAppSlice } from "@state/redux/createAppSlice"
import { getUserSearchSuggestions } from "@state/redux/searchAPI"
import { fetchUser, updateUser } from "@state/redux/userAPI"
import { getItemInLocalStorage } from "@src/utils/localStorage.utils"
import { AUTH } from "@constants/webStorage.const"

export interface UserSliceState {
  fetchUser: {
    errors: FetchUserErrors | null
    success: boolean | null
    message: string | null
  }
  loading: boolean
  searchUser: {
    errors: UserSearchErrors | null
    options: UserSearchOption[]
  }
  userData: User | null
  updateUser: {
    errors: UpdateUserErrors | null
    success: boolean | null
    message: string | null
  }
}

function getUser(): User | null {
  const authString = getItemInLocalStorage(AUTH)
  const auth = authString ? JSON.parse(authString) : null
  if (auth && auth.userData) {
    return auth.userData
  }
  return null
}

const initialState: UserSliceState = {
  fetchUser: { errors: null, success: null, message: null },
  loading: false,
  searchUser: { errors: null, options: [] },
  userData: getUser(),
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
          state.fetchUser.errors = action.payload.data
          state.fetchUser.success = false
          state.fetchUser.message = ERROR_MESSAGES.failedToFetchUserDetails
          state.userData = action.payload.data.data
        },
      },
    ),
    searchUser: create.asyncThunk(
      async function (
        { searchInput, handleUnregisteredUsers }: SearchUserPayloadCreator,
        { getState, rejectWithValue },
      ) {
        return await getUserSearchSuggestions(
          searchInput,
          handleUnregisteredUsers,
          getState,
          rejectWithValue,
        )
      },
      {
        pending: state => {
          state.loading = true
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.searchUser.errors = null
          state.searchUser.options = action.payload.data
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.searchUser.errors = action.payload.data
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
          state.updateUser.errors = action.payload.data
          state.updateUser.success = false
          state.updateUser.message = ERROR_MESSAGES.failedToUpdateUserDetails
        },
      },
    ),
  }),
})

export const userActions = userSlice.actions
