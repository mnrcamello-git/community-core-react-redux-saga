/*
 *
 * ForgotPasswordPage actions
 *
 */

import {
  CHANGE_EMAIL,
  VALIDATE_EMAIL,
  FORGOT_PASSWORD_REQUESTED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from './constants';

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function validateEmail(email, message, buttonDisabled) {
  return {
    type: VALIDATE_EMAIL,
    email,
    message,
    buttonDisabled,
  };
}

export function forgotPasswordRequested(message) {
  return {
    type: FORGOT_PASSWORD_REQUESTED,
    message,
  };
}

export function forgotPasswordSuccess(message) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    message,
  };
}

export function forgotPasswordFailed(message) {
  return {
    type: FORGOT_PASSWORD_FAILED,
    message,
  };
}
