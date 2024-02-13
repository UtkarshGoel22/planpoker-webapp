import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"

import { API } from "@constants/api.const"
import { TEXT } from "@constants/text.const"
import { AUTH } from "@constants/webStorage.const"
import { SigninAPIRequestData } from "@pages/Signin/types"
import { SignupAPIRequestData } from "@pages/Signup/types"
import { ReSendVerificationLinkAPIRequestData } from "@pages/UserVerification/types"
import { userActions } from "@state/redux/userSlice"
import { makeRequest } from "@utils/api.util"
import {
  removeItemInLocalStorage,
  setItemInLocalStorage,
} from "@utils/localStorage.utils"

export async function logoutUser(
  token: string | null | undefined,
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
  rejectWithValue: (value: unknown) => any,
) {
  const response = await makeRequest(
    {
      method: API.methods.post,
      url: `${API.baseUrl}${API.endpoints.userLogout}`,
      headers: { Authorization: `${TEXT.bearer}${token}` },
    },
    rejectWithValue,
  )
  if (response.success) {
    dispatch(userActions.setUser(null))
    removeItemInLocalStorage(AUTH)
  }
  return response
}

export async function reSendVerificationLink(
  requestData: ReSendVerificationLinkAPIRequestData,
  rejectWithValue: (value: unknown) => any,
) {
  const response = await makeRequest(
    {
      method: API.methods.post,
      url: `${API.baseUrl}${API.endpoints.userVerify}`,
      data: requestData,
    },
    rejectWithValue,
  )
  return response
}

export async function signinUser(
  requestData: SigninAPIRequestData,
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
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
  if (response.success) {
    dispatch(userActions.setUser(response.data.userData))
    setItemInLocalStorage(AUTH, JSON.stringify(response.data))
  }
  return response
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
