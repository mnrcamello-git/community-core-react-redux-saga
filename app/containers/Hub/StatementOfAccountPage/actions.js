/*
 *
 * StatementOfAccountPage actions
 *
 */

import {
  EXPORT_SOA_REQUESTED,
  EXPORT_SOA_SUCCESS,
  EXPORT_SOA_FAILED,
  REQUEST_SOA,
  REQUEST_SOA_SUCCESS,
  REQUEST_SOA_FAILED,
} from './constants';

export function exportSoa(payload) {
  return {
    type: EXPORT_SOA_REQUESTED,
    payload,
  };
}

export function exportSoaSuccess(payload) {
  return {
    type: EXPORT_SOA_SUCCESS,
    payload,
  };
}

export function exportSoaFailed(payload) {
  return {
    type: EXPORT_SOA_FAILED,
    payload,
  };
}

export function requestSOA() {
  return {
    type: REQUEST_SOA,
  };
}

export function requestSoaAPISuccess(payload) {
  return {
    type: REQUEST_SOA_SUCCESS,
    payload,
  };
}

export function requestSOAFailed(message) {
  return {
    type: REQUEST_SOA_FAILED,
    message,
  };
}
