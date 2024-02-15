import { ERROR_MESSAGES } from "@constants/messages.const"
import { CreateGroupPayloadCreator } from "@pages/CreateGroup/types"
import { CreateGroupErrors } from "@src/types/shared/errors"
import { createAppSlice } from "@state/redux/createAppSlice"
import { createGroup } from "@state/redux/groupAPI"

export interface GroupSliceState {
  loading: boolean
  createGroup: {
    errors: CreateGroupErrors | null
    success: boolean | null
    message: string | null
  }
}

const initialState: GroupSliceState = {
  loading: false,
  createGroup: { errors: null, success: null, message: null },
}

export const groupSlice = createAppSlice({
  name: "group",
  initialState,
  reducers: create => ({
    resetCreateGroupState: create.reducer(state => {
      state.createGroup = { errors: null, success: null, message: null }
    }),
    createGroup: create.asyncThunk(
      async function (
        { requestData, token }: CreateGroupPayloadCreator,
        { rejectWithValue },
      ) {
        return await createGroup(requestData, token, rejectWithValue)
      },
      {
        pending: state => {
          state.loading = true
        },
        fulfilled: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.createGroup.errors = null
          state.createGroup.success = action.payload.success
          state.createGroup.message = action.payload.message
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.createGroup.errors = action.payload
          state.createGroup.success = false
          state.createGroup.message = `${ERROR_MESSAGES.failedToCreateGroup}${
            action.payload.somethingWentWrong || action.payload.api
              ? `. ${action.payload.somethingWentWrong || action.payload.api}`
              : ""
          }`
        },
      },
    ),
  }),
})

export const groupActions = groupSlice.actions
