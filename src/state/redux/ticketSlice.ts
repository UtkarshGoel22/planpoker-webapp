import { PayloadAction } from "@reduxjs/toolkit"

import { ERROR_MESSAGES } from "@constants/messages.const"
import {
  AddTicketsToPokerboardPayloadCreator,
  ImportTicketsPayloadCreator,
} from "@pages/ImportTickets/types"
import {
  AddTicketsToPokerboardErrors,
  ImportTicketErrors,
} from "@src/types/shared/errors"
import { TicketData } from "@src/types/shared/ticket"
import { createAppSlice } from "@state/redux/createAppSlice"
import { addTicketsToPokerboard, importTickets } from "@state/redux/ticketAPI"

export interface TicketSliceState {
  loading: boolean
  addTicketstoPokerboard: {
    errors: AddTicketsToPokerboardErrors | null
    success: boolean | null
    message: string | null
    data: { partialExist?: string[] } | null
  }
  importTickets: {
    errors: ImportTicketErrors | null
    success: boolean | null
    message: string | null
    options: TicketData[]
    selectedOptions: TicketData[]
    pagination: { maxResults: number; startAt: number; total: number }
  }
}

const initialState: TicketSliceState = {
  loading: false,
  addTicketstoPokerboard: {
    errors: null,
    success: null,
    message: null,
    data: null,
  },
  importTickets: {
    errors: null,
    success: null,
    message: null,
    options: [],
    selectedOptions: [],
    pagination: { maxResults: 5, startAt: 0, total: 0 },
  },
}

export const ticketSlice = createAppSlice({
  name: "ticket",
  initialState,
  reducers: create => ({
    addTicketsToPokerboard: create.asyncThunk(
      async function (
        { tickets, pokerboardId, token }: AddTicketsToPokerboardPayloadCreator,
        { rejectWithValue },
      ) {
        return await addTicketsToPokerboard(
          pokerboardId,
          tickets,
          token,
          rejectWithValue,
        )
      },
      {
        pending: state => {
          state.loading = true
        },
        fulfilled: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.addTicketstoPokerboard.errors = null
          state.addTicketstoPokerboard.success = action.payload.success
          state.addTicketstoPokerboard.message =
            action.payload.message +
            `${action.payload.data?.partialExist ? `. ${action.payload.data.partialExist.toString() + " already exist"}` : ""}`
          state.addTicketstoPokerboard.data = action.payload.data
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.addTicketstoPokerboard.errors = action.payload.data
          state.addTicketstoPokerboard.success = false
          state.addTicketstoPokerboard.message =
            action.payload.message || action.payload.data?.api
        },
      },
    ),
    importTickets: create.asyncThunk(
      async function (
        { queryParams, token, startAt }: ImportTicketsPayloadCreator,
        { rejectWithValue },
      ) {
        return await importTickets(queryParams, token, rejectWithValue, startAt)
      },
      {
        pending: state => {
          state.loading = true
        },
        fulfilled: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.importTickets.errors = null
          state.importTickets.success = action.payload.success
          state.importTickets.message = action.payload.message
          state.importTickets.options = action.payload.data.ticketData
          if (action.payload.data.pagination) {
            state.importTickets.pagination = action.payload.data.pagination
          }
        },
        rejected: (state, action: { [key: string]: any }) => {
          state.loading = false
          state.importTickets.errors = action.payload.data
          state.importTickets.success = false
          state.importTickets.message = `${ERROR_MESSAGES.failedToImportTickets}${action.payload.message ? `. ${action.payload.message}` : ""}`
        },
      },
    ),
    resetAddTicketsToPokerboardSuccess: create.reducer(state => {
      state.addTicketstoPokerboard.success = null
    }),
    resetImportTicketsSuccess: create.reducer(state => {
      state.importTickets.success = null
    }),
    setSelectedOptions: create.reducer(
      (state, action: PayloadAction<TicketData[]>) => {
        state.importTickets.selectedOptions = action.payload
      },
    ),
  }),
})

export const ticketActions = ticketSlice.actions
