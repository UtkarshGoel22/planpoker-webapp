export type INVITE_STATUS =
  | InviteStatus.ACCEPTED
  | InviteStatus.PENDING
  | InviteStatus.REJECTED;

export enum PokerBoardStatus {
  CREATED = 'CREATED',
  STARTED = 'GAME_STARTED',
  ENDED = 'GAME_ENDED',
}

export type ROLE_TYPE =
  | RoleTypes.MANAGER
  | RoleTypes.PLAYER
  | RoleTypes.SPECTATOR;

export type DECK_TYPE =
  | DeckType.EVEN
  | DeckType.SERIAL
  | DeckType.FIBONACCI
  | DeckType.ODD;

export type TICKET_TYPE =
  | TicketTypes.BUG
  | TicketTypes.STORY
  | TicketTypes.Task;

export type POKER_BOARD_STATUS =
  | PokerBoardStatus.CREATED
  | PokerBoardStatus.ENDED
  | PokerBoardStatus.STARTED;

export enum TicketTypes {
  BUG = 'Bug',
  STORY = 'Story',
  Task = 'Task',
}

export enum RoleTypes {
  MANAGER = 'MANAGER',
  PLAYER = 'PLAYER',
  SPECTATOR = 'SPECTATOR',
}

export enum DeckType {
  SERIAL = 'SERIAL',
  EVEN = 'EVEN',
  ODD = 'ODD',
  FIBONACCI = 'FIBONACCI',
}

export enum InviteStatus {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}
