/*
 * Actions are payloads of information that send data from your application to your store
 *
 * Action creators are exactly that—functions that create actions.
 * LoginPage action creators
 *
 */

import {
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  INITIALIZE_USER,
  INITIALIZE_ACCESS,
  TOGGLE_PASSWORD_MASK,
} from './constants';

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function loginRequested(message) {
  return {
    type: LOGIN_REQUESTED,
    message,
  };
}

export function loginFailed(message) {
  return {
    type: LOGIN_FAILED,
    message,
  };
}

export function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token,
  };
}

export function initializeUser(payload) {
  return {
    type: INITIALIZE_USER,
    payload,
  };
}

export function initializeAccess(message) {
  return {
    type: INITIALIZE_ACCESS,
    message,
  };
}

export function togglePasswordMask(payload) {
  return {
    type: TOGGLE_PASSWORD_MASK,
    payload,
  };
}
