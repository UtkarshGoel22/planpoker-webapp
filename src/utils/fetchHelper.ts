import {
  API_HEADER,
  API_ROUTE,
  API_URL,
  CONSTANT,
  ERROR,
} from '../constants/constant';
import { GroupType, PokerboardTicketType } from '../redux/interfacesAndTypes';
import { apiCallCustom } from '../services/fetchCustom';

export const fetchPokerboardDetailsHelper = (
  id: string,
  token: string | null | undefined
) =>
  new Promise<Response>((res, rej) => {
    if (!token) return;
    apiCallCustom({
      apiUrl: `${API_URL.baseUrl}${API_ROUTE.getPokerboard}/${id}`,
      token: token,
    })
      .then((response) => {
        res(response);
      })
      .catch((error) => {
        rej(error);
      });
  });

export const updateTicketOrderHelper = (
  pokerboardId: string,
  tickets: PokerboardTicketType[],
  token: string
) =>
  new Promise<Response>((res, rej) => {
    let body = {
      tickets: tickets,
    };
    apiCallCustom({
      body: body,
      apiUrl: `${API_URL.baseUrl}${API_ROUTE.getPokerboard}/${pokerboardId}${API_ROUTE.tickets}`,
      token: token,
      methodType: 'put',
    })
      .then((response) => {
        return response.json();
      })
      .then((responseMessage) => {
        if (responseMessage.success) res(responseMessage);
        else rej(responseMessage);
      })
      .catch((e) => {
        rej(e);
      });
  });

export const updateRoleHelper = (
  pokerboardId: string,
  userDetails: unknown[],
  token: string
) =>
  new Promise((res, rej) => {
    let body = {
      users: userDetails,
    };
    apiCallCustom({
      body: body,
      methodType: 'put',
      apiUrl: `${API_URL.baseUrl}${API_ROUTE.getPokerboard}/${pokerboardId}${API_ROUTE.pokerboardPlayers}`,
      token: token,
    })
      .then((response) => {
        return response.json();
      })
      .then((responseMessage) => {
        if (responseMessage.success) res(responseMessage);
        else rej(responseMessage);
      })
      .catch((e) => {
        rej(e);
      });
  });

/**
 * Fetch group details of logged-in user
 * @param token Token
 * @param userId User id
 * @returns Promise<GroupType>
 */
export const fetchGroupsOfUser = (token: string, userId: string) =>
  new Promise<GroupType[]>((resolve, reject) => {
    apiCallCustom({
      apiUrl: ` ${API_URL.baseUrl}${API_ROUTE.groups}`,
      withAuthentication: true,
      methodType: 'get',
      token: token,
    })
      .then((response) => response.json())
      .then((responseMessage) => {
        if (responseMessage.success) {
          resolve(responseMessage.data.groups);
        } else {
          reject(responseMessage.message);
        }
      })
      .catch((_) => {
        reject(ERROR.somethingWentWrong);
      });
  });

export async function listUserTickets(
  token: string | null | undefined,
  userId: string | null | undefined,
  listTicketForUserCallback: Function,
  sortBy?: string,
  filter?: string,
  date?: Date | null
) {
  await fetch(
    `${API_URL.baseUrl}${
      API_ROUTE.userTickets
    }?sort=${sortBy}&filter=${filter}&date=${date?.getTime()}`,
    {
      headers: {
        'Content-Type': API_HEADER.applicationJson,
        authorization: `${CONSTANT.bearer}${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.success) {
        listTicketForUserCallback(true, json.data);
      } else {
        listTicketForUserCallback(false, json.data);
      }
    })
    .catch((err) => {
      listTicketForUserCallback(false, { api: ERROR.somethingWentWrong });
    });
}
