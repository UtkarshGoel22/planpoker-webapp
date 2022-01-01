import {
  ticketsAdd,
  ticketsImport,
} from '../../services/import.ticket.services';
import { Ticket } from '../../utils/utils.import.tickets';

export function importTickets(
  ticketsInput: string,
  importBy: string,
  importTicketCallback: Function,
  token?: string | null | undefined,
  startAt?: number
) {
  return async (dispatch: any) => {
    ticketsImport(
      dispatch,
      ticketsInput,
      importBy,
      importTicketCallback,
      token,
      startAt
    );
  };
}

export function addTickets(
  selectedTickets: Ticket[],
  importTicketCallback: Function,
  pokerboardId?: string,
  token?: string | null | undefined
) {
  return async (dispatch: any) => {
    ticketsAdd(
      dispatch,
      selectedTickets,
      importTicketCallback,
      pokerboardId,
      token
    );
  };
}
