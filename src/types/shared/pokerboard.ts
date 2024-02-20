import { Deck, InviteStatus } from "@enums/pokerboard.enum"
import { TicketType } from "@src/types/shared/ticket"
import { UserRoleType } from "@src/types/shared/user"

export interface BasePokerboardData {
  id: string
  manager: string
  name: string
  status: string
  deckType: DeckType
}

export interface PokerboardCardData extends BasePokerboardData {
  createdBy: string
}

export interface PokerboardData extends BasePokerboardData {
  groups: PokerboardGroup[]
  tickets: PokerboardTicket[]
  users: PokerboardUser[]
}

export interface PokerboardGroup {
  id: string
  name: string
  admin: string
  countOfMembers: number
}

export interface PokerboardTicket {
  id: string
  summary: string
  description: string
  estimate: number | null | undefined
  type: TicketType
  order: number
}

export interface PokerboardUser {
  role: UserRoleType
  userId: string
  name: string
  email: string
  inviteStatus: InviteStatusType
}

export type DeckType = Deck.EVEN | Deck.FIBONACCI | Deck.ODD | Deck.SERIAL

export type InviteStatusType =
  | InviteStatus.ACCEPTED
  | InviteStatus.PENDING
  | InviteStatus.REJECTED

export type PokerboardParamsType = {
  id: string
}
