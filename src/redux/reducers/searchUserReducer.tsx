import { AnyAction } from 'redux';
import { SearchUserAction } from '../../constants/constant';
import { UserSearchStateType } from '../interfacesAndTypes';

const initialState: UserSearchStateType = {
  options: [],
  selectedOptions: [],
  error: undefined,
};

export default function searchUserReducer(
  state: UserSearchStateType = initialState,
  action: AnyAction
): UserSearchStateType {
  switch (action.type) {
    case SearchUserAction.SET_OPTIONS:
      return {
        ...state,
        options: action.payload,
        error: undefined,
      };
    case SearchUserAction.SET_SELECTED_OPTIONS:
      return {
        ...state,
        selectedOptions: action.payload,
        error: undefined,
      };
    case SearchUserAction.SET_SEARCH_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
