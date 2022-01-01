import { AnyAction } from 'redux';
import { TicketAction } from '../../constants/constant';
import { TicketStateType } from '../interfacesAndTypes';

const initialState: TicketStateType = {
  ticketOptions: [],
  selectedTickets: [],
};

export default function ticketsReducer(
  state: TicketStateType = initialState,
  action: AnyAction
): TicketStateType {
  switch (action.type) {
    case TicketAction.SET_SELECTED_TICKETS:
      return {
        ...state,
        selectedTickets: action.payload,
      };
    case TicketAction.SET_TICKET_OPTIONS: {
      return {
        ...state,
        ticketOptions: action.payload,
      };
    }
    default:
      return state;
  }
}
