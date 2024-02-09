import { API } from "@constants/api.const"
import { SigninAPIRequestData } from "@pages/Signin/types"
import { SignupAPIRequestData } from "@pages/Signup/types"
import { ReSendVerificationLinkAPIRequestData } from "@pages/UserVerification/types"
import { makeRequest } from "@src/utils/api.util"

export async function reSendVerificationLink(
  requestData: ReSendVerificationLinkAPIRequestData,
  rejectWithValue: (value: unknown) => any,
) {
  const response = await makeRequest(
    {
      method: API.methods.post,
      url: `${API.baseUrl}${API.endpoints.userVerify}`,
      headers: { "Content-Type": API.headers.applicationJson },
      data: requestData,
    },
    rejectWithValue,
  )
  return response
}

export async function signinUser(
  requestData: SigninAPIRequestData,
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

export async function verifyEmail(
  token: string,
  rejectWithValue: (value: unknown) => any,
) {
  return await makeRequest(
    {
      method: API.methods.get,
      url: `${API.baseUrl}${API.endpoints.userVerify}?token=${token}`,
      headers: { "Content-Type": API.headers.applicationJson },
    },
    rejectWithValue,
  )
}
