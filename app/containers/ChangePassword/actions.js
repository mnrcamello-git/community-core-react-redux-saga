/*
 *
 * ChangePassword actions
 *
 */

import {
  DEFAULT_ACTION,
  ONCHANGE_OLD_PASSWORD,
  ONCHANGE_NEW_PASSWORD,
  ONCHANGE_CONFIRM_PASSWORD,
  PASSWORD_CHANGE_FAILED,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
  TOGGLE_OLD_PASSWORD_MASK,
  TOGGLE_NEW_PASSWORD_MASK,
  TOGGLE_CONFIRM_PASSWORD_MASK,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function onChangeOldPassword(payload) {
  return {
    type: ONCHANGE_OLD_PASSWORD,
    payload,
  };
}

export function onChangeNewPassword(payload) {
  return {
    type: ONCHANGE_NEW_PASSWORD,
    payload,
  };
}

export function onChangeConfirmPassword(payload) {
  return {
    type: ONCHANGE_CONFIRM_PASSWORD,
    payload,
  };
}

export function passwordChangeFailed(payload) {
  return {
    type: PASSWORD_CHANGE_FAILED,
    payload,
  };
}

export function passwordChangeRequest() {
  return {
    type: PASSWORD_CHANGE_REQUEST,
  };
}

export function passwordChangeSuccess(payload) {
  return {
    type: PASSWORD_CHANGE_SUCCESS,
    payload,
  };
}

export function toggleOldPasswordMask(payload) {
  return {
    type: TOGGLE_OLD_PASSWORD_MASK,
    payload,
  };
}

export function toggleNewPasswordMask(payload) {
  return {
    type: TOGGLE_NEW_PASSWORD_MASK,
    payload,
  };
}

export function toggleConfirmPasswordMask(payload) {
  return {
    type: TOGGLE_CONFIRM_PASSWORD_MASK,
    payload,
  };
}
