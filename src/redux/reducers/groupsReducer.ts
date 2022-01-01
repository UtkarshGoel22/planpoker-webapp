import { AnyAction } from 'redux';
import { GroupAction } from '../../constants/constant';
import { GroupsStateType } from '../interfacesAndTypes';

let initialState: GroupsStateType = {
  error: undefined,
  loading: false,
  groups: [],
};

export const groupReducer = (
  state: GroupsStateType = initialState,
  action: AnyAction
): GroupsStateType => {
  switch (action.type) {
    case GroupAction.SET_GROUPS_FOR_USER:
      return {
        ...state,
        error: undefined,
        loading: false,
        groups: action.payload,
      };
    case GroupAction.SET_GROUPS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        groups: [],
      };

    case GroupAction.SET_GROUPS_LOADING:
      return {
        ...state,
        loading: true,
        error: undefined,
        groups: [],
      };
    default:
      return state;
  }
};
