import axios, { AxiosRequestConfig } from "axios"

import { ERROR_MESSAGES } from "@constants/messages.const"

export async function makeRequest(
  config: AxiosRequestConfig,
  rejectWithValue: (value: unknown) => any,
) {
  try {
    const response = await axios.request(config)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.data)
    } else {
      return rejectWithValue({ api: ERROR_MESSAGES.somethingWentWrong })
    }
  }
}
