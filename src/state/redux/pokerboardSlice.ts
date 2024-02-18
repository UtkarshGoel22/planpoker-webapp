import { ERROR_MESSAGES } from "@constants/messages.const"
import { CreatePokerboardPayloadCreator } from "@pages/CreatePokerboard/types"
import {
  CreatePokerboardErrors,
  ListPokerboardsErrors,
} from "@src/types/shared/errors"
import { PokerboardData } from "@src/types/shared/pokerboard"
import { createAppSlice } from "@state/redux/createAppSlice"
import { createPokerboard, listPokerboards } from "@state/redux/pokerboardAPI"

export interface PokerboardSliceState {
  loading: boolean
  createPokerboard: {
    errors: CreatePokerboardErrors | null
    success: boolean | null
    message: string | null
  }
  listPokerboards: {
    errors: ListPokerboardsErrors | null
    success: boolean | null
    message: string | null
    data: PokerboardData[] | null
  }
}

const initialState: PokerboardSliceState = {
  loading: false,
  createPokerboard: { errors: null, success: null, message: null },
  listPokerboards: { errors: null, success: null, message: null, data: null },
}

export const pokerboardSlice = createAppSlice({
  name: "pokerboard",
  initialState,
  reducers: create => ({
    resetCreatePokerboardState: create.reducer(state => {
      state.createPokerboard = { errors: null, success: null, message: null }
    }),
    createPokerboard: create.asyncThunk(
      async function (
        { requestData, token }: CreatePokerboardPayloadCreator,
        { rejectWithValue },
      ) {
        return await createPokerboard(requestData, token, rejectWithValue)
      },
      {
        pending: state => {
          state.loading = true
        },
        fulfilled: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.createPokerboard.errors = null
          state.createPokerboard.success = action.payload.success
          state.createPokerboard.message = action.payload.message
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.createPokerboard.errors = action.payload
          state.createPokerboard.success = false
          state.createPokerboard.message = `${ERROR_MESSAGES.failedToCreatePokerboard}${
            action.payload.somethingWentWrong || action.payload.api
              ? `. ${action.payload.somethingWentWrong || action.payload.api}`
              : ""
          }`
        },
      },
    ),
    listPokerboards: create.asyncThunk(
      async function (token: string | undefined | null, { rejectWithValue }) {
        return await listPokerboards(token, rejectWithValue)
      },
      {
        pending: state => {
          state.loading = true
        },
        fulfilled: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.listPokerboards.errors = null
          state.listPokerboards.success = action.payload.success
          state.listPokerboards.message = action.payload.message
          state.listPokerboards.data = action.payload.data
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.listPokerboards.errors = action.payload
          state.listPokerboards.success = false
          state.listPokerboards.message = `${ERROR_MESSAGES.failedToFetchPokerboardsList}${action.payload.api ? `. ${action.payload.api}` : ""}`
        },
      },
    ),
  }),
})

export const pokerboardActions = pokerboardSlice.actions
