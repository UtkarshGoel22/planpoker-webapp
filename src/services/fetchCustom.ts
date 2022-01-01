import { API_HEADER, CONSTANT } from '../constants/constant';

export type apiMethodType = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface customFetchInterface {
  body?: any;
  methodType?: apiMethodType;
  withAuthentication?: boolean;
  apiUrl: string;
  token?: string;
}

/**
 * Makes API call request to given API Url with body and method type
 * @param params body, methodType, withAuthentication, apiUrl, token
 * @returns Promise<Response>
 */
export const apiCallCustom = ({
  body,
  methodType,
  withAuthentication = true,
  apiUrl,
  token,
}: customFetchInterface) =>
  new Promise<Response>((resolve, reject) => {
    if (withAuthentication && token) {
      fetch(`${apiUrl}`, {
        method: methodType,
        headers: {
          authorization: `${CONSTANT.bearer}${token}`,
          'Content-Type': API_HEADER.applicationJson,
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      fetch(`${apiUrl}`, {
        method: methodType,
        headers: {
          'Content-Type': API_HEADER.applicationJson,
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
