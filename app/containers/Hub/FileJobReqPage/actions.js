/*
 *
 * FileJobReqPage actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_ALL_JOB_REQUISITIONS,
  FETCH_ALL_JOB_REQUISITIONS_FAILED,
  FETCH_ALL_JOB_REQUISITIONS_SUCCESS,
  FETCH_CLOSED_JOB_REQUISITIONS,
  FETCH_CLOSED_JOB_REQUISITIONS_FAILED,
  FETCH_CLOSED_JOB_REQUISITIONS_SUCCESS,
  MODIFY_JOB_ORDER,
  MODIFY_JOB_ORDER_SUCCESS,
  MODIFY_JOB_ORDER_FAILED,
  CHANGE_PREAMBLE,
  CHANGE_CONTRACT,
  CHANGE_START_DATE,
  CHANGE_IMMEDIATE_SUPERVISOR,
  CHANGE_SUPERVISOR_TITLE,
  CHANGE_SUPERVISOR_EMAIL,
  CHANGE_YEARS_EXP,
  CHANGE_JOB_CATEGORIES,
  CHANGE_MAX_SALARY,
  CHANGE_SKILLS,
  CHANGE_RESPONSIBILITIES,
  CHANGE_QUALIFICATIONS,
  REQUEST_FETCH_JOB_CATEGORIES,
  FETCH_JOB_CATEGORIES_SUCCESS,
  FETCH_JOB_CATEGORIES_FAILED,
  REQUEST_FETCH_KEYWORDS,
  FETCH_KEYWORDS_SUCCESS,
  FETCH_KEYWORDS_FAILED,
  REQUEST_FETCH_JOB,
  FETCH_JOB_FAILED,
  FETCH_JOB_SUCCESS,
  CHANGE_EXAM,
  CHANGE_EXAM_FILE,
  CHANGE_EXAM_LINK,
  CHANGE_EXAM_PB,
  CHANGE_REMARKS,
  REQUEST_FETCH_JOB_TEMPLATE,
  FETCH_JOB_TEMPLATE_SUCCESS,
  FETCH_JOB_TEMPLATE_FAILED,
  REQUEST_FETCH_FILTER_JOB_TEMPLATE,
  CHANGE_JOB_TEMPLATE,
  REQUEST_SAVE_JOB,
  SAVE_JOB_SUCCESS,
  SAVE_JOB_FAILED,
  REQUEST_UPDATE_JOB,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_FAILED,
  CHANGE_NUMBER_REQUEST,
  CHANGE_EXAM_TYPE,
  CHANGE_TITLE,
  SHOW_JOB_MODAL,
  CLEAR_JOB_FORM,
  SHOW_JOB_SUCCESS_MODAL,
  JOB_FORM_ERROR_MODAL,
  CHANGE_USER_ACTION,
  SHOW_JOB_PREVIEW_MODAL,
  CHANGE_NUM_DUPLICATE,
  REQUEST_JOB_DUPLICATE,
  REQUEST_JOB_DUPLICATE_FAILED,
  REQUEST_JOB_DUPLICATE_SUCCESS,
  REQUEST_FETCH_BLIND_CV,
  FETCH_BLIND_CV_SUCCESS,
  FETCH_BLIND_CV_FAILED,
  SHOW_BLIND_CV_MODAL,
  SET_BLIND_CV,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchAllJobRequisitions() {
  return {
    type: FETCH_ALL_JOB_REQUISITIONS,
  };
}

export function fetchAllJobRequisitionsFailed(message) {
  return {
    type: FETCH_ALL_JOB_REQUISITIONS_FAILED,
    message,
  };
}

export function fetchAllJobRequisitionsSuccess(payload) {
  return {
    type: FETCH_ALL_JOB_REQUISITIONS_SUCCESS,
    payload,
  };
}

export function fetchClosedJobRequisitions() {
  return {
    type: FETCH_CLOSED_JOB_REQUISITIONS,
  };
}

export function fetchClosedJobRequisitionsFailed(message) {
  return {
    type: FETCH_CLOSED_JOB_REQUISITIONS_FAILED,
    message,
  };
}

export function fetchClosedJobRequisitionsSuccess(payload) {
  return {
    type: FETCH_CLOSED_JOB_REQUISITIONS_SUCCESS,
    payload,
  };
}

export function modifyJobOrder(payload) {
  return {
    type: MODIFY_JOB_ORDER,
    payload,
  };
}

export function modifyJobOrderSuccess(message) {
  return {
    type: MODIFY_JOB_ORDER_SUCCESS,
    message,
  };
}

export function modifyJobOrderFailed(message) {
  return {
    type: MODIFY_JOB_ORDER_FAILED,
    message,
  };
}

// Job
export function requestFetchJob(payload) {
  return {
    type: REQUEST_FETCH_JOB,
    payload,
  };
}

export function fetchJobSuccess(payload) {
  return {
    type: FETCH_JOB_SUCCESS,
    payload,
  };
}

export function fetchJobFailed(payload) {
  return {
    type: FETCH_JOB_FAILED,
    payload,
  };
}

// Job Categories
export function requestFetchJobCategories() {
  return {
    type: REQUEST_FETCH_JOB_CATEGORIES,
  };
}

export function fetchJobCategoriesSuccess(payload) {
  return {
    type: FETCH_JOB_CATEGORIES_SUCCESS,
    payload,
  };
}

export function fetchJobCategoriesFailed(payload) {
  return {
    type: FETCH_JOB_CATEGORIES_FAILED,
    payload,
  };
}
// Job Templates
export function requestFetchJobTemplates() {
  return {
    type: REQUEST_FETCH_JOB_TEMPLATE,
  };
}

export function fetchJobTemplatesSuccess(payload) {
  return {
    type: FETCH_JOB_TEMPLATE_SUCCESS,
    payload,
  };
}

export function fetchJobTemplatesFailed(payload) {
  return {
    type: FETCH_JOB_TEMPLATE_FAILED,
    payload,
  };
}

// Keywords
export function requestFetchKeywords() {
  return {
    type: REQUEST_FETCH_KEYWORDS,
  };
}

export function fetchKeywordsSuccess(payload) {
  return {
    type: FETCH_KEYWORDS_SUCCESS,
    payload,
  };
}

export function fetchKeywordsFailed(payload) {
  return {
    type: FETCH_KEYWORDS_FAILED,
    payload,
  };
}

// Job Overview

export function changeTitle(payload) {
  return {
    type: CHANGE_TITLE,
    payload,
  };
}

export function changeContract(payload) {
  return {
    type: CHANGE_CONTRACT,
    payload,
  };
}

export function changeStartDate(payload) {
  return {
    type: CHANGE_START_DATE,
    payload,
  };
}

export function changeNumberRequest(payload) {
  return {
    type: CHANGE_NUMBER_REQUEST,
    payload,
  };
}

export function changeImmSupervisor(payload) {
  return {
    type: CHANGE_IMMEDIATE_SUPERVISOR,
    payload,
  };
}

export function changeSupervisorTitle(payload) {
  return {
    type: CHANGE_SUPERVISOR_TITLE,
    payload,
  };
}

export function changeSupervisorEmail(payload) {
  return {
    type: CHANGE_SUPERVISOR_EMAIL,
    payload,
  };
}

// Job Details
export function changeYearsOfExp(payload) {
  return {
    type: CHANGE_YEARS_EXP,
    payload,
  };
}

export function changeJobCategories(payload) {
  return {
    type: CHANGE_JOB_CATEGORIES,
    payload,
  };
}

export function changeMaxSalary(payload) {
  return {
    type: CHANGE_MAX_SALARY,
    payload,
  };
}

export function changeSkills(payload) {
  return {
    type: CHANGE_SKILLS,
    payload,
  };
}

export function changePreamble(payload) {
  return {
    type: CHANGE_PREAMBLE,
    payload,
  };
}

export function changeResponsibilities(payload) {
  return {
    type: CHANGE_RESPONSIBILITIES,
    payload,
  };
}

export function changeQualifications(payload) {
  return {
    type: CHANGE_QUALIFICATIONS,
    payload,
  };
}

// Job Exam
export function changeExam(payload) {
  return {
    type: CHANGE_EXAM,
    payload,
  };
}

export function changeExamType(payload) {
  return {
    type: CHANGE_EXAM_TYPE,
    payload,
  };
}

export function changeExamFile(payload) {
  return {
    type: CHANGE_EXAM_FILE,
    payload,
  };
}

export function changeExamLink(payload) {
  return {
    type: CHANGE_EXAM_LINK,
    payload,
  };
}

export function changeExamPb(payload) {
  return {
    type: CHANGE_EXAM_PB,
    payload,
  };
}

export function changeRemarks(payload) {
  return {
    type: CHANGE_REMARKS,
    payload,
  };
}

export function changeJobTemplates(payload) {
  return {
    type: CHANGE_JOB_TEMPLATE,
    payload,
  };
}

// Save job
export function requestSaveJob(payload) {
  return {
    type: REQUEST_SAVE_JOB,
    payload,
  };
}

export function saveJobSuccess(payload) {
  return {
    type: SAVE_JOB_SUCCESS,
    payload,
  };
}

export function saveJobFailed(payload) {
  return {
    type: SAVE_JOB_FAILED,
    payload,
  };
}

// Update job
export function requestUpdateJob(payload) {
  return {
    type: REQUEST_UPDATE_JOB,
    payload,
  };
}

export function updateJobSuccess(payload) {
  return {
    type: UPDATE_JOB_SUCCESS,
    payload,
  };
}

export function updateJobFailed(payload) {
  return {
    type: UPDATE_JOB_FAILED,
    payload,
  };
}

// Show job modal
export function showJobModal(payload) {
  return {
    type: SHOW_JOB_MODAL,
    payload,
  };
}

// Clear job form
export function clearJobForm() {
  return {
    type: CLEAR_JOB_FORM,
  };
}

export function showJobFormSuccessModal(payload) {
  return {
    type: SHOW_JOB_SUCCESS_MODAL,
    payload,
  };
}

export function setJobFormErrorModal(payload) {
  return {
    type: JOB_FORM_ERROR_MODAL,
    payload,
  };
}

export function requestFilterJobTemplate() {
  return {
    type: REQUEST_FETCH_FILTER_JOB_TEMPLATE,
  };
}

export function changeUserAction(payload) {
  return {
    type: CHANGE_USER_ACTION,
    payload,
  };
}

export function showJobPreviewModal(payload) {
  return {
    type: SHOW_JOB_PREVIEW_MODAL,
    payload,
  };
}

// Duplicate Job Requisition
export function changeNumberDuplicate(payload) {
  return {
    type: CHANGE_NUM_DUPLICATE,
    payload,
  };
}

export function requestJobDuplicate(payload) {
  return {
    type: REQUEST_JOB_DUPLICATE,
    payload,
  };
}

export function requestJobDuplicateSuccess(payload) {
  return {
    type: REQUEST_JOB_DUPLICATE_SUCCESS,
    payload,
  };
}

export function requestJobDuplicateFailed(payload) {
  return {
    type: REQUEST_JOB_DUPLICATE_FAILED,
    payload,
  };
}

export function fetchBlindCv() {
  return {
    type: REQUEST_FETCH_BLIND_CV,
  };
}

export function requestBlindCvSuccess(payload) {
  return {
    type: FETCH_BLIND_CV_SUCCESS,
    payload,
  };
}

export function requestBlindCvFailed(payload) {
  return {
    type: FETCH_BLIND_CV_FAILED,
    payload,
  };
}

export function showBlindCvModal(payload) {
  return {
    type: SHOW_BLIND_CV_MODAL,
    payload,
  };
}

export function setBlindCv(payload) {
  return {
    type: SET_BLIND_CV,
    payload,
  };
}
