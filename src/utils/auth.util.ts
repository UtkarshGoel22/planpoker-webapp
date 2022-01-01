import React from 'react';
import { authInput } from '../components/Signup';
import { REGEX_FOR_EMAIL, VALUE } from '../constants/finalConstant';
import { ERROR } from '../constants/error';

export function validateForm(data: authInput) {
  let temp: authInput = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  if (REGEX_FOR_EMAIL.test(data.email)) {
    temp.email = '';
  } else {
    temp.email = ERROR.invalidEmail;
  }

  if (data.firstName) {
    if (
      data.firstName.length > VALUE.nameLengthLowerBound &&
      data.firstName.length < VALUE.nameLengthUpperBound
    ) {
      temp.firstName = '';
    } else {
      temp.firstName = ERROR.firstNameShouldHaveLessThanFiftyCharacters;
    }
  }

  if (data.lastName) {
    if (
      data.lastName.length > VALUE.nameLengthLowerBound &&
      data.lastName.length < VALUE.nameLengthUpperBound
    ) {
      temp.lastName = '';
    } else {
      temp.lastName = ERROR.lastNameShouldHaveLessThanFiftyCharacters;
    }
  } else {
    temp.lastName = '';
  }

  if (data.username) {
    if (data.username.length < VALUE.usernameLengthLowerBound) {
      temp.username = ERROR.usernameShouldHaveFourToThirtyCharacters;
    } else {
      temp.username = '';
    }
  }

  if (data.password.length < VALUE.passwordLengthLowerBound) {
    temp.password = ERROR.passswordShouldHaveMoreThanFiveCharacters;
  } else {
    temp.username = '';
  }

  if (data.confirmPassword) {
    if (data.confirmPassword && data.password !== data.confirmPassword) {
      temp.confirmPassword = ERROR.passwordsDoNotMatch;
    } else {
      temp.confirmPassword = '';
    }
  }

  const noError = Object.values(temp).every((value) => value == '');
  return { temp, noError };
}
