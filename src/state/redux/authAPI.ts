import { API } from "@constants/api.const"
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
  return await makeRequest(
    {
      method: API.methods.post,
      url: `${API.baseUrl}${API.endpoints.userSignup}`,
      headers: { "Content-Type": API.headers.applicationJson },
      data: requestData,
    },
    rejectWithValue,
  )
}
