import { SearchUserOptionType } from '../../components/SearchUser';
import {
  API_ROUTE,
  API_URL,
  ERROR,
  SearchUserAction,
} from '../../constants/constant';
import { RootState } from '../store';

export const getSearchOption = (input: string, customInput: boolean) => {
  return async (dispatch: any, getState: any) => {
    let state: RootState = getState();
    let { userId } = state.auth;

    try {
      const response = await fetch(
        `${API_URL.baseUrl}${API_ROUTE.users}?searchKey=${input}`
      );
      const json = await response.json();
      if (json.success) {
        let data = json.data.filter((v: any) => v.id != userId);

        if (customInput && data.length === 0) {
          let unregisteredUser: SearchUserOptionType = {
            email: input,
            id: 'un-registered',
            name: '',
            userName: '',
          };
          data.push(unregisteredUser);
        }
        dispatch(setUserSearchOptionsActionCreator(data));
      }
    } catch (e) {
      dispatch(setSearchUserError(ERROR.somethingWentWrong));
    }
  };
};

export const setUserSearchOptionsActionCreator = (
  searchUserOptions: SearchUserOptionType[]
) => {
  return {
    type: SearchUserAction.SET_OPTIONS,
    payload: searchUserOptions,
  };
};

export const setUserSearchSelectesOptionActionCreator = (
  selectedOptions: SearchUserOptionType[]
) => {
  return {
    type: SearchUserAction.SET_SELECTED_OPTIONS,
    payload: selectedOptions,
  };
};

export const setSearchUserError = (error: string | undefined) => {
  return {
    type: SearchUserAction.SET_SEARCH_USER_ERROR,
    payload: error,
  };
};
