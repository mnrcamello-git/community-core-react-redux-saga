/*
 *
 * SetPasswordPage actions
 *
 */

import {
  DEFAULT_ACTION,
  CHECK_TOKEN_AVAILABILITY,
  SET_FORM_AVAILABILITY,
  HANDLE_PASSWORD_CHANGE,
  HANDLE_PASSWORD_CHANGE_FAILED,
  HANDLE_RESEND_LINK,
  HANDLE_PASSWORD_STATUS,
  HANDLE_RESEND_LINK_SUCCESS,
  HANDLE_RESEND_LINK_FAILED,
  TOGGLE_PASSWORD_MASK,
  HANDLE_PASSWORD_CHANGE_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function checkTokenAvailability(payload) {
  return {
    type: CHECK_TOKEN_AVAILABILITY,
    payload,
  };
}

export function setFormAvailability(payload) {
  return {
    type: SET_FORM_AVAILABILITY,
    payload,
  };
}

export function handlePasswordChange(payload) {
  return {
    type: HANDLE_PASSWORD_CHANGE,
    payload,
  };
}

export function handlePasswordChangeFailed(message) {
  return {
    type: HANDLE_PASSWORD_CHANGE_FAILED,
    message,
  };
}

export function handleResendLink(payload) {
  return {
    type: HANDLE_RESEND_LINK,
    payload,
  };
}

export function setPasswordStatus(payload) {
  return {
    type: HANDLE_PASSWORD_STATUS,
    payload,
  };
}

export function handleResendLinkSuccess(payload) {
  return {
    type: HANDLE_RESEND_LINK_SUCCESS,
    payload,
  };
}

export function handleResendLinkFailed(payload) {
  return {
    type: HANDLE_RESEND_LINK_FAILED,
    payload,
  };
}

export function handlePasswordChangeSuccess(message) {
  return {
    type: HANDLE_PASSWORD_CHANGE_SUCCESS,
    message,
  };
}
