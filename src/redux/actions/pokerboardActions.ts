import { Dispatch } from 'redux';
import { ERROR, PokerboardAction } from '../../constants/constant';
import { PokerboardErrorType } from '../../constants/pokerboardErrorTagsAndTypes';
import { POKER_BOARD_STATUS } from '../../constants/pokerboardTypes';
import {
  listPokerboard,
  pokerboardCreate,
} from '../../services/pokerboard.services';
import { fetchPokerboardDetailsHelper } from '../../utils/fetchHelper';
import { createPokerboardInputType } from '../../utils/utils.pokerboard';
import { PokerboardTicketType } from '../interfacesAndTypes';
import { RootState } from '../store';

export type PokerboardActionType = {
  type: PokerboardAction;
  payload: any;
};

export const setPokerboardDetail = (data: any): PokerboardActionType => {
  return {
    type: PokerboardAction.SET_POKERBOARD_DATA,
    payload: data,
  };
};

export const setPokerboardError = (err: any): PokerboardActionType => {
  return {
    type: PokerboardAction.SET_POKERBOARD_ERROR,
    payload: err,
  };
};

export const setPokerboardLoadingFalse = (): PokerboardActionType => {
  return {
    type: PokerboardAction.SET_LOADING_FALSE,
    payload: undefined,
  };
};

export const setPokerboardLoadingTrue = (): PokerboardActionType => {
  return {
    type: PokerboardAction.SET_LOADING_TRUE,
    payload: undefined,
  };
};

export const fetchPokerboardDetails = (id: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    let state: RootState = getState();
    let { token } = state.auth;

    dispatch(setPokerboardLoadingTrue());

    const response = await fetchPokerboardDetailsHelper(id, token).catch(
      (_) => {
        let err: any = {};
        err[PokerboardErrorType.SOMETHING_WENT_WRONG] =
          ERROR.somethingWentWrong;
        dispatch(setPokerboardError(err));
      }
    );

    if (!response) {
      dispatch(setPokerboardLoadingFalse());
      return;
    }

    const responseJson = await response.json();
    const data = responseJson.data;

    if (responseJson.success) {
      dispatch(setPokerboardDetail(data));
    } else {
      dispatch(setPokerboardError(data));
    }

    dispatch(setPokerboardLoadingFalse());
  };
};

export function createPokerboard(
  createPokerboardInput: createPokerboardInputType,
  createPokerboardCallback: Function
) {
  return async () => {
    pokerboardCreate(createPokerboardInput, createPokerboardCallback);
  };
}

/**
 *
 * @param dashboardCallback
 * @param userId
 * @param token
 * @returns
 */

export function pokerboardList(
  dashboardCallback: Function,
  userId?: string | null | undefined,
  token?: string | null | undefined
) {
  return async () => {
    listPokerboard(dashboardCallback, userId, token);
  };
}

export const setPokerboardTicketsActionCreator = (
  tickets: PokerboardTicketType[]
): PokerboardActionType => {
  return {
    type: PokerboardAction.SET_POKERBOARD_TICKET,
    payload: tickets,
  };
};

export const addEstimateToTicket = (
  estimate: number,
  ticketId: string
): PokerboardActionType => {
  return {
    type: PokerboardAction.ADD_ESTIMATE_TO_TICKET,
    payload: { estimate, ticketId },
  };
};

export const changeBoardStatusActionCreator = (
  pokerboardStatus: POKER_BOARD_STATUS
): PokerboardActionType => {
  return {
    type: PokerboardAction.SET_STATUS_OF_POKERBOARD,
    payload: pokerboardStatus,
  };
};
