/*
 *
 * UserManagement actions
 *
 */

import {
  REQUEST_USERS,
  REQUEST_USERS_FAILED,
  REQUEST_USERS_SUCCESS,
  USER_SELECT,
  UPDATE_DROPDOWN_ACTION,
  REQUEST_CLIENTS,
  REQUEST_CLIENTS_FAILED,
  REQUEST_CLIENTS_SUCCESS,
  REQUEST_ROLES,
  REQUEST_ROLES_FAILED,
  REQUEST_ROLES_SUCCESS,
  CHANGE_FIRSTNAME,
  CHANGE_LASTNAME,
  CHANGE_MOBILE,
  CHANGE_LANDLINE,
  CHANGE_CLIENT,
  CHANGE_EMAIL,
  CHANGE_POSITION,
  CHANGE_ROLE,
  CHANGE_GROUP,
  CHANGE_SKYPE,
  CHANGE_ACTIVE,
  REQUEST_SAVE_USER,
  SAVE_USER_SUCCESS,
  SAVE_USER_FAILED,
  CHANGE_SHOW_USER_MODAL,
  CHANGE_SHOW_USER_SUCCESS_MODAL,
  CHANGE_SHOW_USER_ERROR_MODAL,
  CHANGE_SAVING_USER_LOADING,
  CLEAR_USER_FORM,
  REQUEST_CONFIGURE_USER,
  FAILED_CONFIGURE_USER,
  SUCCESS_CONFIGURE_USER,
  REQUEST_FETCH_USER,
  REQUEST_FETCH_USER_SUCCESS,
  REQUEST_FETCH_USER_FAILED,
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

export function failedRequestUsers(message) {
  return {
    type: REQUEST_USERS_FAILED,
    message,
  };
}

export function selectUser(payload) {
  return {
    type: USER_SELECT,
    payload,
  };
}

export function updateDropdownAction(payload) {
  return {
    type: UPDATE_DROPDOWN_ACTION,
    payload,
  };
}

export function requestConfigureUser(payload) {
  return {
    type: REQUEST_CONFIGURE_USER,
    payload,
  };
}

export function failedConfigureUsers(message) {
  return {
    type: FAILED_CONFIGURE_USER,
    message,
  };
}

export function successConfigureUsers(message) {
  return {
    type: SUCCESS_CONFIGURE_USER,
    message,
  };
}

export function requestClients() {
  return {
    type: REQUEST_CLIENTS,
  };
}

export function successRequestClients(payload) {
  return {
    type: REQUEST_CLIENTS_SUCCESS,
    payload,
  };
}

export function failedRequestClients(payload) {
  return {
    type: REQUEST_CLIENTS_FAILED,
    payload,
  };
}

export function requestRoles() {
  return {
    type: REQUEST_ROLES,
  };
}

export function successRequestRoles(payload) {
  return {
    type: REQUEST_ROLES_SUCCESS,
    payload,
  };
}

export function failedRequestRoles(payload) {
  return {
    type: REQUEST_ROLES_FAILED,
    payload,
  };
}

export function changeFirstName(payload) {
  return {
    type: CHANGE_FIRSTNAME,
    payload,
  };
}

export function changeLastName(payload) {
  return {
    type: CHANGE_LASTNAME,
    payload,
  };
}

export function changeClient(payload) {
  return {
    type: CHANGE_CLIENT,
    payload,
  };
}

export function changeEmail(payload) {
  return {
    type: CHANGE_EMAIL,
    payload,
  };
}

export function changePosition(payload) {
  return {
    type: CHANGE_POSITION,
    payload,
  };
}

export function changeLandline(payload) {
  return {
    type: CHANGE_LANDLINE,
    payload,
  };
}

export function changeMobile(payload) {
  return {
    type: CHANGE_MOBILE,
    payload,
  };
}

export function changeAccess(payload) {
  return {
    type: CHANGE_ROLE,
    payload,
  };
}

export function changeGroup(payload) {
  return {
    type: CHANGE_GROUP,
    payload,
  };
}

export function changeSkype(payload) {
  return {
    type: CHANGE_SKYPE,
    payload,
  };
}

export function changeActive(payload) {
  return {
    type: CHANGE_ACTIVE,
    payload,
  };
}

export function requestSaveUser(payload) {
  return {
    type: REQUEST_SAVE_USER,
    payload,
  };
}

export function saveUserSuccess(payload) {
  return {
    type: SAVE_USER_SUCCESS,
    payload,
  };
}

export function saveUserFailed(payload) {
  return {
    type: SAVE_USER_FAILED,
    payload,
  };
}

export function changeShowUserModal(payload) {
  return {
    type: CHANGE_SHOW_USER_MODAL,
    payload,
  };
}

export function clearUserForm(payload) {
  return {
    type: CLEAR_USER_FORM,
    payload,
  };
}

export function changeShowUserSuccessModal(payload) {
  return {
    type: CHANGE_SHOW_USER_SUCCESS_MODAL,
    payload,
  };
}

export function changeShowUserErrorModal(payload) {
  return {
    type: CHANGE_SHOW_USER_ERROR_MODAL,
    payload,
  };
}

export function changeUserSavingLoading(payload) {
  return {
    type: CHANGE_SAVING_USER_LOADING,
    payload,
  };
}

export function requestFetchUser() {
  return {
    type: REQUEST_FETCH_USER,
  };
}

export function requestFetchUserSuccess(payload) {
  return {
    type: REQUEST_FETCH_USER_SUCCESS,
    payload,
  };
}

export function requestFetchUserFailed() {
  return {
    type: REQUEST_FETCH_USER_FAILED,
  };
}
