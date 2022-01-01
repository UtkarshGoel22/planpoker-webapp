import { AnyAction, Dispatch } from 'redux';
import { GroupAction } from '../../constants/constant';
import { fetchGroupsOfUser } from '../../utils/fetchHelper';
import { GroupType } from '../interfacesAndTypes';
import { RootState } from '../store';

export const fetchGroupsActionCreator = () => {
  return async (dispatch: Dispatch, getState: any) => {
    let { token, userId } = (getState() as RootState).auth;
    if (!userId || !token) {
      return;
    }

    dispatch(setGroupsLoadingActionCreator());
    const groups = await fetchGroupsOfUser(token, userId).catch(
      (errorMessage) => {
        dispatch(setGroupsErrorActionCreator(errorMessage));
      }
    );

    if (!groups) {
      return;
    }

    dispatch(setGroupsOfUserActionCreator(groups));
  };
};

export const setGroupsOfUserActionCreator = (
  groups: GroupType[]
): AnyAction => {
  return {
    type: GroupAction.SET_GROUPS_FOR_USER,
    payload: groups,
  };
};

export const setGroupsLoadingActionCreator = (): AnyAction => {
  return {
    type: GroupAction.SET_GROUPS_LOADING,
  };
};

export const setGroupsErrorActionCreator = (error: any): AnyAction => {
  return {
    type: GroupAction.SET_GROUPS_ERROR,
    payload: error,
  };
};
