import { AnyAction } from 'redux';
import { GameAction } from '../../constants/constant';
import {
  GameObject,
  GameStateType,
  PlayerEstimationType,
  PokerboardTicketType,
  TimerStatus,
  TimerType,
} from '../interfacesAndTypes';

let initialState: GameStateType = {
  err: undefined,
  gameDetail: undefined,
};

export const gameReducer = (
  state: GameStateType = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case GameAction.SET_ERROR: {
      return setGameError(state, action.payload);
    }
    case GameAction.SET_CURRENT_TICKET: {
      return setCurrentTicketDetails(state, action.payload);
    }
    case GameAction.SET_CURRENT_TICKET_COMMENTS: {
      return setCurrentTicketComments(state, action.payload);
    }
    case GameAction.ADD_COMMENT_TO_CURRENT_TICKET: {
      return addCommentToCurrentTicket(state, action.payload);
    }
    case GameAction.SET_GAME_INFO: {
      return setGameInfo(state, action.payload);
    }
    case GameAction.START_TIMER: {
      return setTimerStatus(state, TimerStatus.onGoing);
    }
    case GameAction.SET_TIMER: {
      return setTimerValue(state, action.payload);
    }
    case GameAction.RESET_TIMER: {
      return setTimerStatus(state, TimerStatus.notStarted);
    }
    case GameAction.END_TIMER: {
      return setTimerStatus(state, TimerStatus.ended);
    }
    case GameAction.ADD_PLAYER_ESTIMATE_TO_CURRENT_TICKET: {
      return addPlayerEstimate(state, action.payload);
    }
    case GameAction.SET_PLAYERS_ESTIMATE_LIST: {
      return setAllPlayersEstimates(state, action.payload);
    }
    case GameAction.SET_ESTIMATE_FOR_CURRENT_TICKET : {
      return setEstimateForCurrentTicket(state,action.payload);
    }
    case GameAction.SET_MANAGER_PRESENT: {
      return setManagerPresent(state, action.payload);
    }
    default:
      return state;
  }
};

const setGameError = (state: GameStateType, error: any): GameStateType => {
  return {
    ...state,
    err: error,
  };
};

const setCurrentTicketDetails = (
  state: GameStateType,
  ticketDetail: PokerboardTicketType
): GameStateType => {
  if (!state.gameDetail) {
    return state;
  }
  let gameDetails = state.gameDetail;
  return {
    ...state,
    err: undefined,
    gameDetail: {
      ...gameDetails,
      currentTicket: {
        ...ticketDetail,
      },
    },
  };
};

const setEstimateForCurrentTicket = (
  state: GameStateType,
  estimate: number
) => {
  if (!state.gameDetail) {
    return state;
  }

  let currentTicket = state.gameDetail.currentTicket;
  currentTicket = { ...currentTicket, estimate };
  return {
    ...state,
    err: undefined,
    gameDetail: {
      ...state.gameDetail,
      currentTicket: {
        ...currentTicket,
      },
    },
  };
};

const setCurrentTicketComments = (
  state: GameStateType,
  comments: string[]
): GameStateType => {
  if (!state.gameDetail) {
    return state;
  }

  let gameDetails = state.gameDetail;
  return {
    ...state,
    err: undefined,
    gameDetail: {
      ...gameDetails,
      currentTicketComments: [...comments],
    },
  };
};

const addCommentToCurrentTicket = (
  state: GameStateType,
  comment: string
): GameStateType => {
  if (!state.gameDetail) {
    return state;
  }

  let gameDetails = state.gameDetail;
  let comments = state.gameDetail.currentTicketComments;
  return {
    ...state,
    err: undefined,
    gameDetail: {
      ...gameDetails,
      currentTicketComments: [...comments, comment],
    },
  };
};

const setGameInfo = (state: GameStateType, gameDetail: any): GameStateType => {
  return { ...state, err: undefined, gameDetail };
};

const setTimerStatus = (
  state: GameStateType,
  timerStatus: TimerType
): GameStateType => {
  if (!state.gameDetail) {
    return state;
  }

  let gameDetail: GameObject = {
    ...state.gameDetail,
    timerStatus: timerStatus,
  };
  if (timerStatus === TimerStatus.notStarted) {
    gameDetail.timerValue = 30;
  }

  return { ...state, err: undefined, gameDetail };
};

const setTimerValue = (
  state: GameStateType,
  timerValue: number
): GameStateType => {
  if (!state.gameDetail) {
    return state;
  }
  let gameDetail: GameObject = {
    ...state.gameDetail,
    timerValue: timerValue,
  };

  return { ...state, err: undefined, gameDetail };
};

const addPlayerEstimate = (
  state: GameStateType,
  playerEstimate: PlayerEstimationType
): GameStateType => {
  if (!state.gameDetail) {
    return state;
  }
  let playerEstimationArray = state.gameDetail.currentTickPlayerEstimation.filter(
    (estimate) => estimate.id != playerEstimate.id
  );

  let gameDetail: GameObject = {
    ...state.gameDetail,
    currentTickPlayerEstimation: [...playerEstimationArray, playerEstimate],
  };
  return { ...state, err: undefined, gameDetail };
};

const setAllPlayersEstimates = (
  state: GameStateType,
  playersEstimate: PlayerEstimationType[]
): GameStateType => {
  if (!state.gameDetail) {
    return state;
  }
  let gameDetail: GameObject = {
    ...state.gameDetail,
    currentTickPlayerEstimation: [...playersEstimate],
  };
  return { ...state, err: undefined, gameDetail };
};

const setManagerPresent = (
  state: GameStateType,
  isManagerPresent: boolean
): GameStateType => {
  if (!state.gameDetail) {
    return state;
  }
  let gameDetail: GameObject = {
    ...state.gameDetail,
    isManagerPresent: isManagerPresent,
  };
  return { ...state, err: undefined, gameDetail };
};
