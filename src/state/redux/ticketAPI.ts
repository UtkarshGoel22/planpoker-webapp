import { API } from "@constants/api.const"
import { TEXT } from "@constants/text.const"
import { ImportTicketsFormValues } from "@pages/ImportTickets/types"
import { TicketData } from "@src/types/shared/ticket"
import { makeRequest } from "@utils/api.util"

export async function addTicketsToPokerboard(
  pokerboardId: string,
  tickets: TicketData[],
  token: string | undefined | null,
  rejectWithValue: (value: unknown) => any,
) {
  const response = await makeRequest(
    {
      method: API.methods.post,
      url: `${API.baseUrl}${API.endpoints.pokerboard}/${pokerboardId}${API.endpoints.tickets}`,
      headers: {
        Authorization: `${TEXT.bearer}${token}`,
        "Content-Type": API.headers.applicationJson,
      },
      data: { tickets },
    },
    rejectWithValue,
  )
  return response
}

export async function importTickets(
  { ticketsInput, importBy }: ImportTicketsFormValues,
  token: string | undefined | null,
  rejectWithValue: (value: unknown) => any,
  startAt?: number,
) {
  let startAtVal = startAt ? startAt : 0
  const response = await makeRequest(
    {
      method: API.methods.post,
      url: `${API.baseUrl}${API.endpoints.importTickets}?ticketsInput=${ticketsInput}&importBy=${importBy}&startAt=${startAtVal}`,
      headers: {
        Authorization: `${TEXT.bearer}${token}`,
      },
    },
    rejectWithValue,
  )
  return response
}
