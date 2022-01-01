import { ERROR, SearchGroupAction } from '../../constants/constant';
import { groupSearchOptionsGet } from '../../services/group.services';
import { SearchGroupOptionType } from '../../utils/utils.pokerboard';

export const getGroupSearchOption = (input: string) => {
  return async (dispatch: any) => {
    await groupSearchOptionsGet(input)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          dispatch(setGroupSearchOptionsActionCreator([...json.data]));
        }
      })
      .catch((err) => {
        dispatch(setSearchGroupError(ERROR.somethingWentWrong));
      });
  };
};

export const setGroupSearchOptionsActionCreator = (
  data: SearchGroupOptionType[]
) => {
  return {
    type: SearchGroupAction.SET_OPTIONS,
    payload: data,
  };
};

export const setGroupSearchSelectesOptionActionCreator = (
  data: SearchGroupOptionType[]
) => {
  return {
    type: SearchGroupAction.SET_SELECTED_OPTIONS,
    payload: data,
  };
};

export const setSearchGroupError = (error: string | undefined) => {
  return {
    type: SearchGroupAction.SET_SEARCH_GROUP_ERROR,
    payload: error,
  };
};
