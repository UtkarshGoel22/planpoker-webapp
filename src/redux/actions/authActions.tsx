import { authInput } from '../../components/Signup';
import {
  userLogOut,
  userSignIn,
  userSignUp,
} from '../../services/auth.services';
import { RootState } from '../store';

export function signupUser(data: authInput, signUpCallback: Function) {
  return async () => {
    userSignUp(data, signUpCallback);
  };
}

export function signinUser(data: authInput, signInCallback: Function) {
  return async (dispatch: any) => {
    userSignIn(dispatch, data, signInCallback);
  };
}

export function logoutUser(redirectToHome: Function) {
  return async (dispatch: any, getState: any) => {
    let state: RootState = getState();
    let { token } = state.auth;
    userLogOut(dispatch, redirectToHome, token);
  };
}
