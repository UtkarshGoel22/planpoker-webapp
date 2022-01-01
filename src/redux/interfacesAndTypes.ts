import { SearchUserOptionType } from '../components/SearchUser';
import { AUTH_ACTIONS, GameAction } from '../constants/constant';
import {
  DECK_TYPE,
  INVITE_STATUS,
  POKER_BOARD_STATUS,
  ROLE_TYPE,
  TICKET_TYPE,
} from '../constants/pokerboardTypes';
import { Ticket } from '../utils/utils.import.tickets';
import { SearchGroupOptionType } from '../utils/utils.pokerboard';

export type AuthStateType = {
  token: string | undefined | null;
  userId: string | undefined | null;
};

export interface AuthActionInterface {
  type: string;
  payload: AuthStateType;
}

export type UserDetailsType = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  ticketsEstimated: number;
};

export type UserStateType = {
  err?: any;
  data?: UserDetailsType;
  loading: boolean;
};

export type UserActionType = {
  type: string;
  data: UserStateType;
};

export const loginActionCreator = (
  data: AuthStateType
): AuthActionInterface => {
  return {
    type: AUTH_ACTIONS.loginUser,
    payload: data,
  };
};

export type UserSearchStateType = {
  options: SearchUserOptionType[];
  selectedOptions: SearchUserOptionType[];
  error?: string;
};

export type GroupSearchStateType = {
  options: SearchGroupOptionType[];
  selectedOptions: SearchGroupOptionType[];
  error?: string;
};

export type PokerboardDetailStateType = {
  loading: boolean;
  err?: any;
  data?: {
    id: string;
    name: string;
    manager: string;
    deckType: DECK_TYPE;
    status: POKER_BOARD_STATUS;
    users: PokerboardUserType[];
    groups: PokerboardGroupType[];
    tickets: PokerboardTicketType[];
  };
};

export type PokerboardUserType = {
  role: ROLE_TYPE;
  userId: string;
  name: string;
  email: string;
  inviteStatus: INVITE_STATUS;
};

export type PokerboardGroupType = {
  id: string;
  name: string;
  admin: string;
  countOfMembers: number;
};

export type PokerboardTicketType = {
  id: string;
  summary: string;
  description: string;
  estimate: number | null | undefined;
  type: TICKET_TYPE;
  order: number;
};

export type TicketStateType = {
  ticketOptions: Ticket[];
  selectedTickets: Ticket[];
};

export const enum TimerStatus {
  onGoing = 'TIMER_STARTED',
  ended = 'TIMER_ENDED',
  notStarted = 'NOT_STARTED',
}

export type TimerType =
  | TimerStatus.onGoing
  | TimerStatus.notStarted
  | TimerStatus.ended;

export type PlayerEstimationType = {
  id: string;
  userName: string;
  estimate: number;
};

export type GameObject = {
  gameId: string;
  userRole: ROLE_TYPE;
  userName: string;
  userEmail: string;
  currentTicket: PokerboardTicketType;
  timerValue: number;
  timerStatus: TimerType;
  currentTicketComments: string[];
  currentTickPlayerEstimation: PlayerEstimationType[];
  isManagerPresent: boolean;
};

export type GameStateType = {
  err?: any;
  gameDetail?: GameObject;
};

export type GameErrorActionType = {
  type: GameAction;
  payload: any;
};

export type GameActionType = {
  type: GameAction;
  payload: any;
};

export type GroupType = {
  id: string;
  name: string;
  countOfMembers: number;
  admin: string;
  members: string[];
};

export type GroupsStateType = {
  groups: GroupType[];
  loading: boolean;
  error: string | undefined;
};

export type UserTicketType = {
  id: string;
  type: string;
  managerEstimate: number;
  playerEstimate: number;
  date: Date;
};

export type UserTicketStateType = {
  tickets: UserTicketType[];
};

export type GraphDataStateType = {
  data: GraphDataType;
};

export type GraphDataType = {
  [key: string]: {
    actualEstimate: number;
    playersEstimate: PlayerEstimate[];
  };
};

export type PlayerEstimate = {
  id: string;
  estimate: number;
  name: string;
  time: number;
};

export type ChartPlayerEstimate = {
  [key: string]: number[];
};

export type PlayerInfo = {
  [key: string]: {
    username: string;
    time: number;
  };
};
