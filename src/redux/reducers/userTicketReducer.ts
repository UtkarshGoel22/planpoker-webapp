import { AnyAction } from 'redux';
import { UserTicketAction } from '../../constants/constant';
import { UserTicketStateType } from '../interfacesAndTypes';

let initialState: UserTicketStateType = {
  tickets: [],
};

export const userTicketReducer = (
  state: UserTicketStateType = initialState,
  action: AnyAction
): UserTicketStateType => {
  switch (action.type) {
    case UserTicketAction.SET_TICKETS_FOR_USER:
      return {
        ...state,
        tickets: action.payload,
      };
    default:
      return state;
  }
};
