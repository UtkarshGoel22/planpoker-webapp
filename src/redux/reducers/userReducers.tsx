import { UserAction } from '../../constants/constant';
import { UserStateType, UserActionType } from '../interfacesAndTypes';

const initialState: UserStateType = {
  loading: true,
  data: {
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    ticketsEstimated: 0,
  },
};

export const userDataReducer = (
  state: UserStateType = initialState,
  action: UserActionType
) => {
  const data = action.data;
  switch (action.type) {
    case UserAction.SET:
      // we need to set the data
      return action.data ? action.data : state;
    case UserAction.FETCH:
      return { loading: true };
    case UserAction.GET:
      return state;
    default:
      return state;
  }
};
