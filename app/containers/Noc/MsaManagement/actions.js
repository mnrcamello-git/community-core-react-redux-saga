/*
 *
 * msaManagement actions
 *
 */

import {
    REQUEST_USERS,
    REQUEST_USERS_SUCCESS,
    REQUEST_ROLES,
    REQUEST_TEST_MESSAGE,
    REQUEST_EMPLOYEE,
    REQUEST_ALL_EMPLOYEES,
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
  
  export function requestTestMessage(message) {
    return {
      type: REQUEST_TEST_MESSAGE,
      message,
    };
  }
  
  export function requestEmployee(payload) {
    return {
      type: REQUEST_EMPLOYEE,
      payload,
    };
  }
  
  export function requestAllEmployees(payload) {
    return {
      type: REQUEST_ALL_EMPLOYEES,
      payload,
    };
  }
  
  export function defaultAction() {
    return {
      type: DEFAULT_ACTION,
    };
  }