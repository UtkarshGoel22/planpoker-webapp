import { API } from "@constants/api.const"
import { TEXT } from "@constants/text.const"
import { CreateGroupAPIRequestData } from "@pages/CreateGroup/types"
import { makeRequest } from "@utils/api.util"

export async function createGroup(
  requestData: CreateGroupAPIRequestData,
  token: string | undefined | null,
  rejectWithValue: (value: unknown) => any,
) {
  return await makeRequest(
    {
      method: API.methods.post,
      url: `${API.baseUrl}${API.endpoints.userGroup}`,
      headers: {
        Authorization: `${TEXT.bearer}${token}`,
        "Content-Type": API.headers.applicationJson,
      },
      data: requestData,
    },
    rejectWithValue,
  )
}

export async function getGroupSearchSuggestions(
  searchKey: string,
  rejectWithValue: (value: unknown) => any,
) {
  return await makeRequest(
    {
      method: API.methods.get,
      url: `${API.baseUrl}${API.endpoints.userGroup}?searchKey=${searchKey}`,
    },
    rejectWithValue,
  )
}

export async function listGroups(
  token: string | undefined | null,
  rejectWithValue: (value: unknown) => any,
) {
  return await makeRequest(
    {
      method: API.methods.get,
      url: `${API.baseUrl}${API.endpoints.user}${API.endpoints.groups}`,
      headers: {
        Authorization: `${TEXT.bearer}${token}`,
      },
    },
    rejectWithValue,
  )
}
