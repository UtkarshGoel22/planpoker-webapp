import { listUserTickets } from '../../utils/fetchHelper';

export function listTickets(
  token: string | null | undefined,
  userId: string | null | undefined,
  listTicketForUserCallback: Function,
  sortBy?: string,
  filter?: string,
  date?: Date | null
) {
  return async (getState: any) => {
    listUserTickets(
      token,
      userId,
      listTicketForUserCallback,
      sortBy,
      filter,
      date
    );
  };
}
