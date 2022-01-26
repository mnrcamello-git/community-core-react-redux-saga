/*
 *
 * SalesPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_CLIENTS,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAILED,
  SET_SHOW_MODAL,
  GET_DUE_DILIGENCE,
  GET_DUE_DILIGENCE_SUCCESS,
  GET_DUE_DILIGENCE_FAILED,
  SET_CLIENT,
  CREATE_DUE_DILIGENCE,
  UPDATE_DUE_DILIGENCE,
  CREATE_DUE_DILIGENCE_SUCCESS,
  UPDATE_DUE_DILIGENCE_SUCCESS,
  CREATE_DUE_DILIGENCE_FAILED,
  UPDATE_DUE_DILIGENCE_FAILED,
  CLOSE_MESSAGES,
  ASSIGN_TO_PROSPECT,
  SET_CONFIRMATION_MODAL,
  ASSIGN_TO_PROSPECT_MODAL,
  ASSIGN_TO_PROSPECT_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getClients() {
  return {
    type: GET_CLIENTS,
  };
}

export function getClientsSuccess(payload) {
  return {
    type: GET_CLIENTS_SUCCESS,
    payload,
  };
}

export function getClientsFailed() {
  return {
    type: GET_CLIENTS_FAILED,
  };
}

export function setShowModal(payload) {
  return {
    type: SET_SHOW_MODAL,
    payload,
  };
}

export function getDueDiligence(payload) {
  return {
    type: GET_DUE_DILIGENCE,
    payload,
  };
}

export function getDueDiligenceSuccess(payload) {
  return {
    type: GET_DUE_DILIGENCE_SUCCESS,
    payload,
  };
}

export function getDueDiligenceFailed() {
  return {
    type: GET_DUE_DILIGENCE_FAILED,
  };
}

export function setClient(payload) {
  return {
    type: SET_CLIENT,
    payload,
  };
}

export function createDueDiligence(payload) {
  return {
    type: CREATE_DUE_DILIGENCE,
    payload,
  };
}

export function updateDueDiligence(payload) {
  return {
    type: UPDATE_DUE_DILIGENCE,
    payload,
  };
}

export function createDueDiligenceSuccess() {
  return {
    type: CREATE_DUE_DILIGENCE_SUCCESS,
  };
}

export function updateDueDiligenceSuccess(payload) {
  return {
    type: UPDATE_DUE_DILIGENCE_SUCCESS,
    payload
  };
}

export function createDueDiligenceFailed() {
  return {
    type: CREATE_DUE_DILIGENCE_FAILED,
  };
}

export function updateDueDiligenceFailed() {
  return {
    type: UPDATE_DUE_DILIGENCE_FAILED,
  };
}

export function closeMsgs() {
  return {
    type: CLOSE_MESSAGES,
  }
}

export function assignToProspect() {
  return {
    type: ASSIGN_TO_PROSPECT,
  }
}

export function setConfirmationModal(payload) {
  return {
    type: SET_CONFIRMATION_MODAL,
    payload,
  }
}

export function setAssignToProspectModal(payload) {
  return {
    type: ASSIGN_TO_PROSPECT_MODAL,
    payload,
  }
}

export function assignToProspectSuccess() {
  return {
    type: ASSIGN_TO_PROSPECT_SUCCESS,
  }
}