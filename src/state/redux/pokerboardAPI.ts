import { API } from "@constants/api.const"
import { TEXT } from "@constants/text.const"
import { CreatePokerboardAPIRequestData } from "@pages/CreatePokerboard/types"
import { makeRequest } from "@utils/api.util"

export async function createPokerboard(
  requestData: CreatePokerboardAPIRequestData,
  token: string | undefined | null,
  rejectWithValue: (value: unknown) => any,
) {
  return await makeRequest(
    {
      method: API.methods.post,
      url: `${API.baseUrl}${API.endpoints.pokerboard}`,
      headers: {
        Authorization: `${TEXT.bearer}${token}`,
        "Content-Type": API.headers.applicationJson,
      },
      data: requestData,
    },
    rejectWithValue,
  )
}
