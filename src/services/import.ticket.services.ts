import {
  API_HEADER,
  API_METHOD,
  API_ROUTE,
  API_URL,
  CONSTANT,
  ERROR,
  TicketAction,
} from '../constants/constant';
import { Ticket } from '../utils/utils.import.tickets';

export async function ticketsImport(
  dispatch: any,
  ticketsInput: string,
  importBy: string,
  importTicketCallback: Function,
  token?: string | null | undefined,
  startAt?: number
) {
  if (importBy == '') {
    importTicketCallback(false);
  } else {
    let startAtVal = startAt ? startAt : 0;
    await fetch(
      `${API_URL.baseUrl}${API_ROUTE.importTickets}${ticketsInput}${API_ROUTE.importBy}${importBy}${API_ROUTE.startAt}${startAtVal}`,
      {
        headers: {
          'Content-Type': API_HEADER.applicationJson,
          authorization: `${CONSTANT.bearer}${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          dispatch({
            type: TicketAction.SET_TICKET_OPTIONS,
            payload: json.data.ticketData,
          });
          importTicketCallback(true, json);
        } else {
          importTicketCallback(false, json);
        }
      })
      .catch((err) => {
        importTicketCallback(false, { api: ERROR.somethingWentWrong });
      });
  }
}

export async function ticketsAdd(
  dispatch: any,
  selectedTickets: Ticket[],
  importTicketCallback: Function,
  pokerboardId?: string,
  token?: string | null | undefined
) {
  await fetch(
    `${API_URL.baseUrl}${API_ROUTE.getPokerboard}/${pokerboardId}${API_ROUTE.tickets}`,
    {
      method: API_METHOD.post,
      headers: {
        'Content-Type': API_HEADER.applicationJson,
        authorization: `${CONSTANT.bearer}${token}`,
      },
      body: JSON.stringify({
        tickets: selectedTickets,
      }),
    }
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.success) {
        importTicketCallback(true, json);
      } else {
        importTicketCallback(false, json);
      }
    })
    .catch((err) => {
      importTicketCallback(false, { api: ERROR.somethingWentWrong });
    });
}
