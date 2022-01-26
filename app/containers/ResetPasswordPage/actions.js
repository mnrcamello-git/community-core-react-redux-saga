/*
 *
 * ResetPasswordPage actions
 *
 */
import {
  CHANGE_NEW_PASSWORD,
  CHANGE_CONFIRM_PASSWORD,
  VALIDATE_NEW_PASSWORD,
  VALIDATE_CONFIRM_PASSWORD,
  RESET_PASSWORD_REQUESTED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  TOGGLE_NEW_PASSWORD_MASK,
  TOGGLE_CONFIRM_PASSWORD_MASK,
  CHECK_TOKEN_AVAILABILITY,
  CHECK_TOKEN_AVAILABILITY_FAILED,
  CHECK_TOKEN_AVAILABILITY_SUCCESS,
} from './constants';

/**
 * Action for change new password
 * @param {string} newPassword new password
 */
export function changeNewPassword(newPassword) {
  return {
    type: CHANGE_NEW_PASSWORD,
    new_password: newPassword,
  };
}

/**
 * Action for change confirm password
 * @param {string} confirmPassword confirm password
 */
export function changeConfirmPassword(confirmPassword) {
  return {
    type: CHANGE_CONFIRM_PASSWORD,
    confirm_password: confirmPassword,
  };
}

/**
 * Action for validate new password
 * @param {string} errorMessage error message
 * @param {string} password password
 * @param {bool} isDisabled is button disabled
 */
export function validateNewPassword(errorMessage, password, isDisabled) {
  return {
    type: VALIDATE_NEW_PASSWORD,
    new_password: password,
    message: errorMessage,
    buttonDisabled: isDisabled,
  };
}

/**
 * Action for validate confirm password
 * @param {string} errorMessage error message
 * @param {string} password users password
 * @param {bool} isDisabled is button disabled
 */
export function validateConfirmPassword(errorMessage, password, isDisabled) {
  return {
    type: VALIDATE_CONFIRM_PASSWORD,
    confirm_password: password,
    message: errorMessage,
    buttonDisabled: isDisabled,
  };
}

/**
 * Action for reset password request
 * @param {string} message request message
 * @param {number} userId user id
 */
export function resetPasswordRequested(message) {
  return {
    type: RESET_PASSWORD_REQUESTED,
    message,
  };
}

/**
 * Action for reset password success
 * @param {string} message  message
 */
export function resetPasswordSuccess(message, token) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    message,
    token,
  };
}

/**
 * Action for reset password failed
 * @param {string} message message
 */
export function resetPasswordFailed(message) {
  return {
    type: RESET_PASSWORD_FAILED,
    message,
  };
}

/**
 * Toggle new password mask
 * @param {object} payload payload
 */
export function toggleNewPasswordMask(payload) {
  return {
    type: TOGGLE_NEW_PASSWORD_MASK,
    payload,
  };
}

/**
 * Toggle confirm password mask
 * @param {object} payload payload
 */
export function toggleConfirmPasswordMask(payload) {
  return {
    type: TOGGLE_CONFIRM_PASSWORD_MASK,
    payload,
  };
}

export function checkTokenAvailability(payload) {
  return {
    type: CHECK_TOKEN_AVAILABILITY,
    payload,
  };
}

export function checkTokenAvailabilitySuccess() {
  return {
    type: CHECK_TOKEN_AVAILABILITY_SUCCESS,
  };
}

export function checkTokenAvailabilityFailed() {
  return {
    type: CHECK_TOKEN_AVAILABILITY_FAILED,
  };
}
