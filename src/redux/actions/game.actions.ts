import { GameAction } from '../../constants/constant';
import {
  GameActionType,
  GameErrorActionType,
  GameObject,
  PlayerEstimationType,
  PokerboardTicketType,
  TimerStatus,
} from '../interfacesAndTypes';

export const setGameErrorActionCreator = (error: any): GameErrorActionType => {
  return {
    type: GameAction.SET_ERROR,
    payload: error,
  };
};

export const setCurrentTicketDetailsActionCreator = (
  ticketDetails: PokerboardTicketType
): GameActionType => {
  return {
    type: GameAction.SET_CURRENT_TICKET,
    payload: ticketDetails,
  };
};

export const setCurrentTicketCommentsActionCreator = (
  comments: string[]
): GameActionType => {
  return {
    type: GameAction.SET_CURRENT_TICKET_COMMENTS,
    payload: comments,
  };
};

export const setCurrentTicketEstimateActionCreator = (estimate: number): GameActionType => {
  return {
    type: GameAction.SET_ESTIMATE_FOR_CURRENT_TICKET,
    payload: estimate,
  }
}

export const addCommentToCurrentTicketActionCreator = (comment: string): GameActionType => {
  return {
    type: GameAction.ADD_COMMENT_TO_CURRENT_TICKET,
    payload: comment,
  };
};

export const setGameInfoActionCreator = (
  gameDetails: GameObject
): GameActionType => {
  return {
    type: GameAction.SET_GAME_INFO,
    payload: gameDetails,
  };
};

export const startGameTimerActionCreator = (): GameActionType => {
  return {
    type: GameAction.START_TIMER,
    payload: TimerStatus.onGoing,
  };
};

export const setTimerActionCreator = (timer: number): GameActionType => {
  return {
    type: GameAction.SET_TIMER,
    payload: timer,
  };
};

export const resetGameTimerActionCreator = (): GameActionType => {
  return {
    type: GameAction.RESET_TIMER,
    payload: TimerStatus.notStarted,
  };
};

export const endGameTimerActionCreator = (): GameActionType => {
  return {
    type: GameAction.END_TIMER,
    payload: TimerStatus.ended,
  };
};

export const setPlayerEstimateActionCreator = (
  playerEstimate: PlayerEstimationType
): GameActionType => {
  return {
    type: GameAction.ADD_PLAYER_ESTIMATE_TO_CURRENT_TICKET,
    payload: playerEstimate,
  };
};

export const setAllPlayersEstimateActionCreator = (
  listOfPlayerEstimates: PlayerEstimationType[]
): GameActionType => {
  return {
    type: GameAction.SET_PLAYERS_ESTIMATE_LIST,
    payload: listOfPlayerEstimates,
  };
};

export const setManagerPresetActionCreator = (
  isPresent: boolean
): GameActionType => {
  return {
    type: GameAction.SET_MANAGER_PRESENT,
    payload: isPresent,
  };
};
