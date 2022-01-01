import {
  API_HEADER,
  API_METHOD,
  API_ROUTE,
  API_URL,
  CONSTANT,
  ERROR,
} from '../constants/constant';
import { createPokerboardInputType } from '../utils/utils.pokerboard';

export async function pokerboardCreate(
  createPokerboardInput: createPokerboardInputType,
  createPokerboardCallback: Function
) {
  const { token, body } = createPokerboardInput;

  await fetch(`${API_URL.baseUrl}${API_ROUTE.createPokerboard}`, {
    method: API_METHOD.post,
    headers: {
      'Content-Type': API_HEADER.applicationJson,
      authorization: `${CONSTANT.bearer}${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.success === true) {
        createPokerboardCallback(true, json.data);
      } else {
        createPokerboardCallback(false, json.data);
      }
    })
    .catch((err) => {
      createPokerboardCallback(false, { api: ERROR.somethingWentWrong });
    });
}

export async function listPokerboard(
  dashboardCallback: Function,
  userId?: string | null | undefined,
  token?: string | null | undefined
) {
  await fetch(`${API_URL.baseUrl}${API_ROUTE.user}${API_ROUTE.pokerboard}`, {
    headers: {
      'Content-Type': API_HEADER.applicationJson,
      authorization: `${CONSTANT.bearer}${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.success) {
        dashboardCallback(true, json);
      } else {
        dashboardCallback(false, json);
      }
    })
    .catch((err) => {
      dashboardCallback(false, { api: ERROR.somethingWentWrong });
    });
}
