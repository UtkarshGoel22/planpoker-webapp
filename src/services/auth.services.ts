import { authInput } from '../components/Signup';
import { AUTH_ACTIONS } from '../constants/action';
import { API_HEADER, API_METHOD, API_URL } from '../constants/api';
import { CONSTANT, TEXT } from '../constants/finalConstant';
import { ERROR } from '../constants/error';
import { ROUTE } from '../constants/route';
import { loginActionCreator } from '../redux/interfacesAndTypes';

export async function userSignUp(
  inputData: authInput,
  signUpCallback: Function
) {
  await fetch(`${API_URL.baseUrl}${API_URL.userSignup}`, {
    method: API_METHOD.post,
    headers: {
      'Content-Type': API_HEADER.applicationJson,
    },
    body: JSON.stringify({
      firstName: inputData.firstName,
      lastName: inputData.lastName,
      userName: inputData.username,
      email: inputData.email,
      password: inputData.password,
      confirmPassword: inputData.confirmPassword,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        signUpCallback(true);
      } else {
        signUpCallback(false, data.data);
      }
    })
    .catch((err) => {
      signUpCallback(false, { api: ERROR.somethingWentWrong });
    });
}

export async function userSignIn(
  dispatch: any,
  inputData: authInput,
  signInCallback: Function
) {
  await fetch(`${API_URL.baseUrl}${API_URL.userLogin}`, {
    method: API_METHOD.post,
    headers: {
      'Content-Type': API_HEADER.applicationJson,
    },
    body: JSON.stringify({
      email: inputData.email,
      password: inputData.password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem(CONSTANT.auth, JSON.stringify(data.data));
        dispatch(loginActionCreator(data.data));
        signInCallback(true);
      } else {
        signInCallback(false, data.data);
      }
    })
    .catch((err) => {
      signInCallback(false, { api: ERROR.somethingWentWrong });
    });
}

export async function userLogOut(
  dispatch: any,
  redirectToHome: Function,
  token: string | null | undefined
) {
  await fetch(`${API_URL.baseUrl}${API_URL.userLogout}`, {
    method: API_METHOD.post,
    headers: {
      authorization: `${TEXT.bearer}${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        localStorage.removeItem(CONSTANT.auth);
        dispatch({ type: AUTH_ACTIONS.logoutUser });
        redirectToHome();
      }
    });
}

export function verifyEmail(token: string, verifyEmailCallback: Function) {
  fetch(`${API_URL.baseUrl}${ROUTE.verifyWithQueryParam}${token}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        verifyEmailCallback(true);
      } else {
        verifyEmailCallback(false, data.data);
      }
    })
    .catch((err) => {
      verifyEmailCallback(false, { api: ERROR.somethingWentWrong });
    });
}

export function resendEmail(email: string, verifyEmailCallback: Function) {
  fetch(`${API_URL.baseUrl}${ROUTE.verify}`, {
    method: API_METHOD.post,
    headers: {
      'Content-Type': API_HEADER.applicationJson,
    },
    body: JSON.stringify({
      email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        verifyEmailCallback(true);
      } else {
        verifyEmailCallback(false, data.data);
      }
    })
    .catch((err) => {
      verifyEmailCallback(false, { api: ERROR.somethingWentWrong });
    });
}
