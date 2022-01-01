import { GroupErrorType } from '../components/CreateGroup';
import { SearchUserOptionType } from '../components/SearchUser';
import {
  API_HEADER,
  API_METHOD,
  API_ROUTE,
  API_URL,
  ERROR,
} from '../constants/constant';
import { TEXT } from '../constants/finalConstant';
import { ConstGroupErrorType } from '../constants/groupErrorType';

/**
 * Validate while creating the group
 * @param groupName Name of the group
 * @param selectedOptions Selected Options
 * @param onGroupNameError Callback for group name
 * @param onMemberError Callback if selected members does't meet the criteria
 * @returns Promise<void>
 */
export const validateGroupService = async (
  groupName: string,
  selectedOptions: SearchUserOptionType[],
  onMemberError: (errorMessage?: string) => void,
  onGroupNameError: (errorData: GroupErrorType) => void
): Promise<void> => {
  let error: GroupErrorType = {};
  if (!groupName || groupName.length < 4 || groupName.length > 30) {
    onGroupNameError({
      ...error,
      groupName: ERROR.groupNameShouldBeFourAndThirty,
    });
    // throw an error at this point
    throw new Error();
  } else {
    onGroupNameError({
      ...error,
      groupName: undefined,
    });
  }

  if (selectedOptions.length < 1) {
    onMemberError(ERROR.memberShouldAtLeastBeTwo);
    throw new Error();
  } else {
    onMemberError(undefined);
  }
};

export const createGroupService = (
  userId: string,
  groupName: string,
  selectedOptions: SearchUserOptionType[],
  token: string
) =>
  new Promise<any>((res, rej) => {
    let requestBody: { [k: string]: any } = {
      admin: userId,
      name: groupName,
      members: [],
    };

    requestBody.members = selectedOptions.map((invitee) => {
      return invitee.id;
    });
    if (userId) {
      requestBody.members.push(userId);
    }
    fetch(`${API_URL.baseUrl}${API_ROUTE.createGroup}`, {
      method: API_METHOD.post,
      headers: {
        'Content-Type': API_HEADER.applicationJson,
        authorization: `${TEXT.bearer}${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) res(data);
        else {
          let error: GroupErrorType = {};
          let errorData = data.data;
          if (
            errorData[ConstGroupErrorType.members] ||
            errorData[ConstGroupErrorType.groupName]
          ) {
            error = errorData;
          } else {
            error.somethingWentWrong = ERROR.somethingWentWrong;
          }

          rej(error);
        }
      })
      .catch((_) => {
        let error: GroupErrorType = {
          somethingWentWrong: ERROR.somethingWentWrong,
        };
        rej(error);
      });
  });

export async function groupSearchOptionsGet(input: string) {
  return fetch(`${API_URL.baseUrl}${API_ROUTE.searchGroup}?searchKey=${input}`);
}
