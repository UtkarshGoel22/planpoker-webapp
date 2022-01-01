import {
  DeckType,
  DECK_TYPE,
  PokerBoardStatus,
  RoleTypes,
} from '../constants/pokerboardTypes';
import {
  GameObject,
  PokerboardTicketType,
  TimerStatus,
} from '../redux/interfacesAndTypes';

export const generateEstimate = (type: DECK_TYPE, size: number) => {
  const cardsValues: number[] = [];

  if (type == DeckType.EVEN) {
    for (let i = 1; i <= size; i++) {
      cardsValues.push(i * 2);
    }
  } else if (type === DeckType.ODD) {
    for (let i = 0; i < size; i++) {
      cardsValues.push(2 * i + 1);
    }
  } else if (type === DeckType.SERIAL) {
    for (let i = 1; i <= size; i++) {
      cardsValues.push(i);
    }
  } else if (type === DeckType.FIBONACCI) {
    _generateFibonacci(cardsValues, size);
  }

  return cardsValues;
};

const _generateFibonacci = (cardsValues: Array<number>, size: number) => {
  cardsValues.push(1);
  cardsValues.push(2);

  for (let i = 2; i < size; i++) {
    cardsValues.push(cardsValues[i - 1] + cardsValues[i - 2]);
  }
};

export const isEstimateCardClickable = (gameDetail: GameObject) => {
  return (
    gameDetail.timerStatus === TimerStatus.onGoing &&
    gameDetail.userRole === RoleTypes.PLAYER
  );
};

export const isManager = (gameDetails: GameObject | undefined) => {
  return gameDetails?.userRole === RoleTypes.MANAGER;
};

export const isSpectator = (gameDetails: GameObject | undefined) => {
  return gameDetails?.userRole === RoleTypes.SPECTATOR;
};

export const isPlayer = (gameDetails: GameObject | undefined) => {
  return gameDetails?.userRole === RoleTypes.PLAYER;
};

export const getGameDetails = (gameDetailsFromBackend: any, gameId: string) => {
  return {
    currentTicket: gameDetailsFromBackend.currentTicket,
    currentTicketComments: gameDetailsFromBackend.comments,
    gameId: gameId,
    timerStatus: gameDetailsFromBackend.timerStatus,
    userEmail: gameDetailsFromBackend.userEmail,
    userName: gameDetailsFromBackend.userName,
    timerValue: gameDetailsFromBackend.timerDuration,
    userRole: gameDetailsFromBackend.role,
    currentTickPlayerEstimation:
      gameDetailsFromBackend.currentTicketPlayerEstimate,
    isManagerPresent: gameDetailsFromBackend.isManagerPresent,
  };
};

export const checkIsLastTicket = (
  ticket: PokerboardTicketType,
  tickets: PokerboardTicketType[] | undefined
): boolean => {
  if (!tickets) {
    return false;
  }
  let lastTicket = tickets[tickets.length - 1];
  if (ticket.id === lastTicket.id) {
    return true;
  }
  return false;
};

export const isGameEnded = (status: any) => {
  return status === PokerBoardStatus.ENDED;
};
