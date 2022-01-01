import { AUTH_ACTIONS } from '../../constants/action';
import { CONSTANT } from '../../constants/constant';
import { AuthActionInterface, AuthStateType } from '../interfacesAndTypes';

let authString = localStorage.getItem(CONSTANT.auth);

let auth = authString ? JSON.parse(authString) : null;

const initialState: AuthStateType = {
  token: auth?.token,
  userId: auth?.userId,
};

export default function authReducer(
  state: AuthStateType = initialState,
  action: AuthActionInterface
): AuthStateType {
  switch (action.type) {
    case AUTH_ACTIONS.loginUser:
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      } as AuthStateType;
    case AUTH_ACTIONS.logoutUser:
      return {
        token: null,
        userId: null,
      };
    default:
      return state;
  }
}
