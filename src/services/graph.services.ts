import {
  API_HEADER,
  API_URL,
  CONSTANT,
  ERROR,
  GraphDataAction,
} from '../constants/constant';

export async function graphData(
  dispatch: any,
  token: string | null | undefined,
  graphDataCallback: Function,
  pokerboardId?: string | null
) {
  pokerboardId = pokerboardId ? pokerboardId : '';
  await fetch(
    `${API_URL.baseUrl}/user/reports/tickets?pokerboardId=${pokerboardId}`,
    {
      headers: {
        'Content-Type': API_HEADER.applicationJson,
        authorization: `${CONSTANT.bearer}${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.success === true) {
        dispatch({ type: GraphDataAction.SET_GRAPH_DATA, payload: json.data });
        graphDataCallback(true, json.data);
      } else {
        graphDataCallback(false, json.data);
      }
    })
    .catch((err) => {
      graphDataCallback(false, { api: ERROR.somethingWentWrong });
    });
}
