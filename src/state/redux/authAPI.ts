import axios from "axios"

import { API } from "@constants/api.const"
import { ERROR_MESSAGES } from "@constants/messages.const"
import { SignupAPIRequestData } from "@pages/Signup/types"
import { makeRequest } from "@src/utils/api.util"

export async function signinUser(
  requestData: SignupAPIRequestData,
  rejectWithValue: (value: unknown) => any,
) {
  const response = await makeRequest(
    {
      method: API.methods.post,
      url: `${API.baseUrl}${API.endpoints.userLogin}`,
      headers: { "Content-Type": API.headers.applicationJson },
      data: requestData,
    },
    rejectWithValue,
  )
  return response.data
}

export async function signupUser(
  requestData: SignupAPIRequestData,
  rejectWithValue: (value: unknown) => any,
) {
  try {
    const response = await axios.post(
      `${API.baseUrl}${API.endpoints.userSignup}`,
      requestData,
      {
        headers: { "Content-Type": API.headers.applicationJson },
      },
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.data)
    } else {
      return rejectWithValue({ api: ERROR_MESSAGES.somethingWentWrong })
    }
  }
}
