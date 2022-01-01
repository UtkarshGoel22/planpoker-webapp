import {
  API_HEADER,
  API_URL,
  CONSTANT,
  ERROR,
  ROUTE,
} from '../constants/constant';

export async function inviteAccept(
  token: string,
  pokerboardId: string,
  acceptInviteCallback: Function
) {
  await fetch(
    `${API_URL.baseUrl}${ROUTE.acceptInviteWithQueryParam}${pokerboardId}`,
    {
      headers: {
        'Content-Type': API_HEADER.applicationJson,
        Authorization: `${CONSTANT.bearer}${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        acceptInviteCallback(true, data);
      } else {
        acceptInviteCallback(false, data.data);
      }
    })
    .catch((err) => {
      acceptInviteCallback(false, { api: ERROR.somethingWentWrong });
    });
}
