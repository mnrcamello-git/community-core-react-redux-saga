/*
 *
 * mailConfig actions
 *
 */

import {
  REQUEST_USERS,
  REQUEST_USERS_SUCCESS,
  REQUEST_ROLES,
  REQUEST_CSV_USER,
  DEFAULT_ACTION,
  REQUEST_TEST_MESSAGE,
  REQUEST_USER_MAIL_STATUS,
  REQUEST_CSV_UPLOAD,
} from './constants';

export function requestUsers() {
  return {
    type: REQUEST_USERS,
  };
}

export function successRequestUsers(payload) {
  return {
    type: REQUEST_USERS_SUCCESS,
    payload,
  };
}

export function requestRoles() {
  return {
    type: REQUEST_ROLES,
  };
}

export function requestCsvUser(payload) {
  return {
    type: REQUEST_CSV_USER,
    payload,
  };
}

export function requestUpload(payload) {
  return {
    type: REQUEST_CSV_UPLOAD,
    payload,
  };
}

export function requestTestMessage(message) {
  return {
    type: REQUEST_TEST_MESSAGE,
    message,
  };
}

export function requestUserMailStatus(payload) {
  return {
    type: REQUEST_USER_MAIL_STATUS,
    payload,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
