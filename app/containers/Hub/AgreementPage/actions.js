/*
 *
 * AgreementPage actions
 *
 */

import {
  DEFAULT_ACTION,
  REQUEST_CLIENT_DETAILS,
  REQUEST_CLIENT_DETAILS_SUCCESS,
  REQUEST_CLIENT_DETAILS_FAILED,
  REQUEST_FORM_DATA,
  GET_FORM_DATA_SUCCESS,
  UPDATE_CLIENT_PROFILE,
  UPDATE_CLIENT_PROFILE_SUCCESS,
  CLOSE_MESSAGES,
  REQUEST_CONTRACT_DRAFTS,
  REQUEST_CONTRACT_DRAFTS_SUCCESS,
  REQUEST_CONTRACT_DRAFTS_FAILED,
  VIEW_CONTRACT_DRAFT,
  SHOW_CONTRACT_DRAFT_MODAL,
  SET_ACTIVE_TAB,
  REQUEST_SAVE_CONTRACT_DRAFT,
  SAVE_CONTRACT_DRAFT_SUCCESS,
  SAVE_CONTRACT_DRAFT_FAILED,
  REQUEST_DUE_DILIGENCE,
  REQUEST_DUE_DILIGENCE_SUCCESS,
  SUBMIT_DUE_DILIGENCE,
  UPDATE_DUE_DILIGENCE,
  SUCCESS_DUE_DILIGENCE,
  FAILED_DUE_DILIGENCE,
  VIEW_CONTRACT_VIA_NOTIFICATION
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestClientDetails() {
  return {
    type: REQUEST_CLIENT_DETAILS,
  };
}

export function requestClientDetailsSuccess(payload) {
  return {
    type: REQUEST_CLIENT_DETAILS_SUCCESS,
    payload,
  };
}

export function requestClientDetailsFailed() {
  return {
    type: REQUEST_CLIENT_DETAILS_FAILED,
  };
}

export function requestFormData() {
  return {
    type: REQUEST_FORM_DATA,
  };
}

export function getFormDataSuccess(payload) {
  return {
    type: GET_FORM_DATA_SUCCESS,
    payload,
  };
}

export function updateClientProfile(payload) {
  return {
    type: UPDATE_CLIENT_PROFILE,
    payload,
  };
}

export function updateClientProfileSuccess() {
  return {
    type: UPDATE_CLIENT_PROFILE_SUCCESS,
  };
}

export function closeMsgs() {
  return {
    type: CLOSE_MESSAGES,
  };
}

export function requestContractDrafts() {
  return {
    type: REQUEST_CONTRACT_DRAFTS,
  };
}

export function requestContractDraftsSuccess(payload) {
  return {
    type: REQUEST_CONTRACT_DRAFTS_SUCCESS,
    payload,
  };
}

export function requestContractDraftsFailed(payload) {
  return {
    type: REQUEST_CONTRACT_DRAFTS_FAILED,
    payload,
  };
}

export function viewContractDraft(payload) {
  return {
    type: VIEW_CONTRACT_DRAFT,
    payload,
  };
}

export function showContractDraftModal(payload) {
  return {
    type: SHOW_CONTRACT_DRAFT_MODAL,
    payload,
  };
}

export function setActiveTab(payload) {
  return {
    type: SET_ACTIVE_TAB,
    payload,
  };
}

export function requestSaveContractDraft(payload) {
  return {
    type: REQUEST_SAVE_CONTRACT_DRAFT,
    payload,
  };
}

export function saveContractDraftSuccess(payload) {
  return {
    type: SAVE_CONTRACT_DRAFT_SUCCESS,
    payload,
  };
}

export function saveContractDraftFailed(payload) {
  return {
    type: SAVE_CONTRACT_DRAFT_FAILED,
    payload,
  };
}

export function requestDueDiligence() {
  return {
    type: REQUEST_DUE_DILIGENCE,
  };
}

export function requestDueDiligenceSuccess(payload) {
  return {
    type: REQUEST_DUE_DILIGENCE_SUCCESS,
    payload,
  };
}

export function submitDueDiligence(payload) {
  return {
    type: SUBMIT_DUE_DILIGENCE,
    payload,
  };
}

export function updateDueDiligence(payload) {
  return {
    type: UPDATE_DUE_DILIGENCE,
    payload,
  };
}

export function successModifiedDueDiligence() {
  return {
    type: SUCCESS_DUE_DILIGENCE,
  };
}

export function failedModifiedDueDiligence() {
  return {
    type: FAILED_DUE_DILIGENCE,
  };
}

export function viewContractViaNotification(payload) {
  return {
    type: VIEW_CONTRACT_VIA_NOTIFICATION,
    payload
  }
}