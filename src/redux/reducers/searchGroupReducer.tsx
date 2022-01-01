import { AnyAction } from 'redux';
import { SearchGroupAction } from '../../constants/constant';
import { GroupSearchStateType } from '../interfacesAndTypes';

const initialState: GroupSearchStateType = {
  options: [],
  selectedOptions: [],
  error: undefined,
};

export default function searchUserReducer(
  state: GroupSearchStateType = initialState,
  action: AnyAction
): GroupSearchStateType {
  switch (action.type) {
    case SearchGroupAction.SET_OPTIONS:
      return {
        ...state,
        options: action.payload,
        error: undefined,
      };
    case SearchGroupAction.SET_SELECTED_OPTIONS:
      return {
        ...state,
        selectedOptions: action.payload,
        error: undefined,
      };
    case SearchGroupAction.SET_SEARCH_GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
