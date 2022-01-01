import {
  EditDetailErrors,
  EditUserDetailType,
} from '../components/EditProfileDetail';
import { API_ROUTE, API_URL } from '../constants/constant';
import { ERROR } from '../constants/error';
import { apiCallCustom } from './fetchCustom';

export const fetchUserDetails = (token: string) =>
  new Promise<any>((resolve, reject) => {
    apiCallCustom({
      methodType: 'get',
      apiUrl: `${API_URL.baseUrl}${API_ROUTE.myProfile}`,
      withAuthentication: true,
      token: token,
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) resolve(responseData);
        else {
          let error = responseData.data;
          if (error.auth) {
            reject(new Error(ERROR.sessionExpired));
          } else {
            reject(new Error(ERROR.somethingWentWrong));
          }
        }
      })
      .catch((_) => {
        reject(new Error(ERROR.somethingWentWrong));
      });
  });

export const updateUserDetails = (requestBody: any, token: string) =>
  new Promise((resolve, reject) => {
    apiCallCustom({
      methodType: 'put',
      withAuthentication: true,
      token: token,
      body: requestBody,
      apiUrl: `${API_URL.baseUrl}${API_ROUTE.myProfile}`,
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) resolve(responseData);
        else reject(responseData.data);
      })
      .catch((_) => {
        reject(ERROR.somethingWentWrong);
      });
  });

export const validateEditDetails = (
  editDetails: EditUserDetailType
): EditDetailErrors | null => {
  let error: EditDetailErrors = {
    firstName: '',
    lastName: '',
    username: '',
  };
  if (editDetails) {
    const { firstName, lastName, userName } = editDetails;
    if (!checkCondition(firstName, 0, 51)) {
      error.firstName = ERROR.firstNameShouldHaveLessThanFiftyCharacters;
      return error;
    }

    if (!checkCondition(lastName, -1, 51)) {
      error.lastName = ERROR.lastNameShouldHaveLessThanFiftyCharacters;
      return error;
    }

    if (!checkCondition(userName, 3, 31)) {
      error.username = ERROR.usernameShouldHaveFourToThirtyCharacters;
      return error;
    }
  }
  return null;
};

const checkCondition = (field: string, min: number, max: number): boolean => {
  if (field && field.length > min && field.length < max) return true;
  else return false;
};
