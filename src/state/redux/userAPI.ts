import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"

import { API } from "@constants/api.const"
import { TEXT } from "@constants/text.const"
import { EditProfileFormValues } from "@pages/MyProfile/types"
import { userActions } from "@state/redux/userSlice"
import { makeRequest } from "@utils/api.util"

export async function fetchUser(
  token: string | null | undefined,
  rejectWithValue: (value: unknown) => any,
) {
  const response = await makeRequest(
    {
      method: API.methods.get,
      url: `${API.baseUrl}${API.endpoints.user}`,
      headers: { Authorization: `${TEXT.bearer}${token}` },
    },
    rejectWithValue,
  )
  return response
}

export async function updateUser(
  requestData: EditProfileFormValues,
  token: string | undefined | null,
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>,
  rejectWithValue: (value: unknown) => any,
) {
  const response = await makeRequest(
    {
      method: API.methods.patch,
      url: `${API.baseUrl}${API.endpoints.user}`,
      headers: { Authorization: `${TEXT.bearer}${token}` },
      data: requestData,
    },
    rejectWithValue,
  )
  if (response.success) {
    dispatch(userActions.setUser(response.data))
    setIsEditable((isEditable: boolean) => !isEditable)
  }
  return response
}
