import { API } from "@constants/api.const"
import { UserSearchOption } from "@src/types/shared/user"
import { RootState } from "@state/redux/store"
import { makeRequest } from "@utils/api.util"

export async function getUserSearchSuggestions(
  searchKey: string,
  handleUnregisteredUsers: boolean,
  getState: () => any,
  rejectWithValue: (value: unknown) => any,
) {
  const response = await makeRequest(
    {
      method: API.methods.get,
      url: `${API.baseUrl}${API.endpoints.users}?searchKey=${searchKey}`,
    },
    rejectWithValue,
  )
  if (response.success) {
    const state: RootState = getState()
    const userId = state.user.userData?.id
    let data = response.data.filter(
      (user: UserSearchOption) => user.id != userId,
    )
    if (handleUnregisteredUsers && data.length === 0) {
      let unregisteredUser: UserSearchOption = {
        email: searchKey,
        id: "unregistered",
        name: "",
        username: "",
      }
      data.push(unregisteredUser)
    }
    response.data = data
  }
  return response
}
