import { AnyAction } from 'redux';
import { GraphDataAction } from '../../constants/constant';
import { GraphDataStateType } from '../interfacesAndTypes';

let initialState: GraphDataStateType = {
  data: {},
};

export const graphDataReducer = (
  state: GraphDataStateType = initialState,
  action: AnyAction
): GraphDataStateType => {
  switch (action.type) {
    case GraphDataAction.SET_GRAPH_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
