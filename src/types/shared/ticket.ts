import { ImportBy, Ticket } from "@enums/ticket.enum"

export interface TicketData {
  id: string
  type: string
  summary: string
  description: string
}

export type ImportByType = ImportBy.ID | ImportBy.JQL | ImportBy.SPRINT

export type TicketType = Ticket.BUG | Ticket.STORY | Ticket.TASK
