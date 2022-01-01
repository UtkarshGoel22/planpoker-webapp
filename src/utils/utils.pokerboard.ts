import React from 'react';
import { ERROR } from '../constants/constant';
import { SearchUserOptionType } from '../components/SearchUser';
import { VALUE } from '../constants/finalConstant';
import {
  PokerBoardStatus,
  POKER_BOARD_STATUS,
} from '../constants/pokerboardTypes';

export type SearchGroupOptionType = {
  name: string;
  admin: string;
  countOfMembers: number;
  id: string;
};

export type PokerboardErrorType = {
  name?: string;
  deck?: string;
  users?: string;
  groups?: string;
  somethingWentWrong?: string;
};

export type PokerboardData = {
  name: string;
  manager: string;
  createdBy: string;
  status: POKER_BOARD_STATUS;
  id: string;
  deckType: string;
};

export type createPokerboardInputType = {
  token: string | null | undefined;
  body: { [k: string]: any };
};

export type validatePokerboardInput = {
  boardName: string;
  selectedOptions: SearchUserOptionType[];
  selectedGroupOptions: SearchGroupOptionType[];
};

export function validatePokerboard(data: validatePokerboardInput) {
  const { boardName, selectedOptions, selectedGroupOptions } = data;
  let validationError = {
    name: '',
    users: '',
  };

  if (
    boardName.length < VALUE.boardNameLowerBound ||
    boardName.length > VALUE.boardNameUpperBound
  ) {
    validationError.name = ERROR.pokerboardNameCharactersError;
  } else {
    validationError.name = '';
  }

  if (
    selectedOptions.length < VALUE.one &&
    selectedGroupOptions.length < VALUE.one
  ) {
    validationError.users = ERROR.memberShouldAtLeastBeTwo;
  } else {
    validationError.users = '';
  }

  const noError = Object.values(validationError).every((value) => value == '');
  return { validationError, noError };
}

export const getStatusMessageOfPokerboard = (
  status: POKER_BOARD_STATUS | undefined
): string => {
  if (status === PokerBoardStatus.CREATED) {
    return 'Created';
  } else if (status === PokerBoardStatus.ENDED) {
    return 'Game Ended';
  } else return 'Ongoing';
};
