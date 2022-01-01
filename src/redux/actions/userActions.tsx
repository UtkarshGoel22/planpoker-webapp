import { Dispatch } from 'redux';
import { UserAction } from '../../constants/constant';
import { ERROR } from '../../constants/error';
import { fetchUserDetails } from '../../services/user.profile.services';
import { UserStateType, UserActionType } from '../interfacesAndTypes';
import { RootState } from '../store';

export const getUserActionCreator = (): UserActionType => {
  return {
    type: UserAction.GET,
    data: {
      loading: false,
    },
  };
};

export const setUserActionCreator = (data: UserStateType): UserActionType => {
  return {
    type: UserAction.SET,
    data: {
      ...data,
    },
  };
};

export const startFetchActionCreator = (): UserActionType => {
  return {
    type: UserAction.FETCH,
    data: {
      loading: true,
    },
  };
};

export const fetchUserActionCreator = () => {
  return async (dispatch: Dispatch, getState: any) => {
    dispatch(startFetchActionCreator());
    let state: RootState = getState();
    let { token } = state.auth;

    if (!token) return;
    try {
      let responseJson = await fetchUserDetails(token);
      const { email, firstName, lastName, userName, ticketsEstimated } =
        responseJson.data;
      dispatch(
        setUserActionCreator({
          loading: false,
          data: { email, firstName, lastName, userName, ticketsEstimated },
        })
      );
    } catch (e) {
      if (e instanceof Error) {
        dispatch(setUserActionCreator({ loading: false, err: e.message }));
      } else {
        dispatch(
          setUserActionCreator({ loading: true, err: ERROR.somethingWentWrong })
        );
      }
    }
  };
};
