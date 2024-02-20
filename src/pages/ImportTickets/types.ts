import { ImportByType, TicketData } from "@src/types/shared/ticket"

export interface AddTicketsToPokerboardPayloadCreator {
  tickets: TicketData[]
  pokerboardId: string
  token: string | undefined | null
}

export interface ImportTicketsFormProps {
  loading: boolean
  pokerboardId: string
}

export interface ImportTicketsFormValues {
  ticketsInput: string
  importBy: ImportByType
}

export interface ImportTicketsPayloadCreator {
  queryParams: ImportTicketsFormValues
  token: string | undefined | null
  startAt?: number
}
