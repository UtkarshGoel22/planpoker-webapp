import { AnyAction } from 'redux';
import { PokerboardAction } from '../../constants/constant';
import { POKER_BOARD_STATUS } from '../../constants/pokerboardTypes';
import {
  PokerboardDetailStateType,
  PokerboardTicketType,
} from '../interfacesAndTypes';

const initialState: PokerboardDetailStateType = {
  loading: true,
  data: undefined,
  err: undefined,
};

export default function pokerboardDetailReducer(
  state: PokerboardDetailStateType = initialState,
  action: AnyAction
): PokerboardDetailStateType {
  switch (action.type) {
    case PokerboardAction.SET_POKERBOARD_DATA:
      return {
        loading: state.loading,
        data: action.payload,
      };
    case PokerboardAction.SET_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case PokerboardAction.SET_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    case PokerboardAction.SET_POKERBOARD_ERROR:
      return {
        loading: state.loading,
        err: action.payload,
      };

    case PokerboardAction.SET_POKERBOARD_TICKET: {
      return setPokerboardTicket(state, action.payload);
    }
    case PokerboardAction.ADD_ESTIMATE_TO_TICKET: {
      return addEstimateToTicket(
        state,
        action.payload.estimate,
        action.payload.ticketId
      );
    }
    case PokerboardAction.SET_STATUS_OF_POKERBOARD: {
      return changeBoardStatus(state, action.payload);
    }
    default:
      return state;
  }
}

const setPokerboardTicket = (
  state: PokerboardDetailStateType,
  tickets: PokerboardTicketType[]
) => {
  if (!state.data) {
    return state;
  }
  let data = state.data;
  return {
    loading: false,
    data: {
      ...data,
      tickets: [...tickets],
    },
  };
};

const addEstimateToTicket = (
  state: PokerboardDetailStateType,
  estimate: number,
  ticketId: string
): PokerboardDetailStateType => {
  if (!state.data) {
    return state;
  }

  let tickets = [...state.data.tickets];
  tickets = tickets.map((ticket) => {
    if (ticket.id === ticketId) {
      return { ...ticket, estimate: estimate };
    } else {
      return ticket;
    }
  });

  return {
    ...state,
    data: {
      ...state.data,
      tickets: tickets,
    },
  };
};

const changeBoardStatus = (
  state: PokerboardDetailStateType,
  status: POKER_BOARD_STATUS
): PokerboardDetailStateType => {
  if (!state.data) {
    return state;
  }

  return {
    ...state,
    data: {
      ...state.data,
      status: status,
    },
  };
};
