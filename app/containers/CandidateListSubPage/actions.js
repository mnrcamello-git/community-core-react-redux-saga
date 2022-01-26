/*
 *
 * CandidateListSubPage actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_COLUMNS_AND_DATA,
  FETCH_CANDIDATE_SUCCESS,
  FETCH_CANDIDATE_REQUEST,
  FETCH_CANDIDATE_FAILED,
  SHOW_MODAL,
  CHANGE_COMMUNICATION,
  CHANGE_ADAPTABILITY,
  CHANGE_DECISION,
  CHANGE_ORIENTATION,
  CHANGE_RISKTAKER,
  CHANGE_PLANNING,
  CHANGE_PROBLEM_SOLVING,
  CHANGE_DELEGATION,
  CHANGE_DETAIL,
  CHANGE_AMBIGUITY,
  CHANGE_STRESS,
  CHANGE_INITIATIVE,
  CHANGE_MINIMAL,
  CHANGE_TEAMWORK,
  CHANGE_INTERPERSONAL,
  CHANGE_CONFIDENCE,
  CHANGE_EXAM_STATUS,
  UPDATE_CANDIDATE_REQUEST,
  UPDATE_CANDIDATE_SUCCESS,
  UPDATE_CANDIDATE_FAILED,
  CHANGE_CREATIVITY,
  UPDATE_APPLICATION_STATUS_REQUEST,
  UPDATE_APPLICATION_STATUS_SUCCESS,
  UPDATE_APPLICATION_STATUS_FAILED,
  SHOW_MESSAGE_MODAL,
  CHANGE_OFFERED_SALARY,
  CHANGE_OFFICIAL_STARTDATE,
  SET_CANDIDATE_ID,
  SHOW_JOBOFFER_MODAL,
  FETCH_INTERVIEW_NOTES_SUCCESS,
  FETCH_INTERVIEW_NOTES_REQUEST,
  FETCH_INTERVIEW_NOTES_FAILED,
  CHANGE_INTERVIEWER_NAME,
  CHANGE_INTERVIEWER_POSITION,
  CHANGE_INTERVIEWER_EMAIL,
  CHANGE_INTERVIEW_DATE,
  CHANGE_INTERVIEW_RATE,
  CHANGE_INTERVIEW_REMARKS,
  CHANGE_INTERVIEW_STATUS,
  SAVE_INTERVIEW_NOTES_REQUEST,
  SAVE_INTERVIEW_NOTES_SUCCESS,
  SAVE_INTERVIEW_NOTES_FAILED,
  UPDATE_INTERVIEW_NOTES_REQUEST,
  UPDATE_INTERVIEW_NOTES_SUCCESS,
  UPDATE_INTERVIEW_NOTES_FAILED,
  DELETE_INTERVIEW_NOTES_REQUEST,
  DELETE_INTERVIEW_NOTES_SUCCESS,
  DELETE_INTERVIEW_NOTES_FAILED,
  VIEW_INTERVIEW_NOTE,
  FETCH_CANDIDATES_REQUEST,
  FETCH_CANDIDATES_SUCCESS,
  FETCH_CANDIDATES_FAILED,
  CHANGE_HMO_EFFECTIVITY,
  SHOW_FOR_INTERVIEW_MODAL,
  SET_FIRST_START_DATE,
  SET_FIRST_END_DATE,
  SET_SECOND_START_DATE,
  SET_SECOND_END_DATE,
  SET_THIRD_START_DATE,
  SET_THIRD_END_DATE,
  CLEAR_DATES,
  REQUEST_INTERVIEW_VACANT_SCHED,
  REQUEST_INTERVIEW_VACANT_SCHED_FAILED,
  REQUEST_INTERVIEW_VACANT_SCHED_SUCCESS,
  SET_FIRST_VACANT_ID,
  SET_SECOND_VACANT_ID,
  SET_THIRD_VACANT_ID,
  SET_CANDIDATE_NAME,
  SET_MY_VACANT_SCHED,
  SET_VACANT_SCHED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestFetchCandidates(payload) {
  return {
    type: FETCH_CANDIDATES_REQUEST,
    payload,
  };
}

export function setMyVacantSched(payload) {
  return {
    type: SET_MY_VACANT_SCHED,
    payload,
  };
}

export function setVacantSched(payload) {
  return {
    type: SET_VACANT_SCHED,
    payload,
  };
}

export function setCandidateName(payload) {
  return {
    type: SET_CANDIDATE_NAME,
    payload,
  };
}

export function requestFetchCandidatesSuccess(payload) {
  return {
    type: FETCH_CANDIDATES_SUCCESS,
    payload,
  };
}

export function requestFetchCandidatesFailed(payload) {
  return {
    type: FETCH_CANDIDATES_FAILED,
    payload,
  };
}

export function setColumnsAndData(payload) {
  return {
    type: SET_COLUMNS_AND_DATA,
    payload,
  };
}

export function showModal(payload) {
  return {
    type: SHOW_MODAL,
    payload,
  };
}

export function requestCandidate(payload) {
  return {
    type: FETCH_CANDIDATE_REQUEST,
    payload,
  };
}

export function fetchCandidateSuccess(payload) {
  return {
    type: FETCH_CANDIDATE_SUCCESS,
    payload,
  };
}

export function fetchCandidateFailed(payload) {
  return {
    type: FETCH_CANDIDATE_FAILED,
    payload,
  };
}

export function changeCommunication(payload) {
  return {
    type: CHANGE_COMMUNICATION,
    payload,
  };
}

export function changeAdaptibility(payload) {
  return {
    type: CHANGE_ADAPTABILITY,
    payload,
  };
}

export function changeDecisionMaking(payload) {
  return {
    type: CHANGE_DECISION,
    payload,
  };
}

export function changeOrientation(payload) {
  return {
    type: CHANGE_ORIENTATION,
    payload,
  };
}

export function changeRiskTaker(payload) {
  return {
    type: CHANGE_RISKTAKER,
    payload,
  };
}

export function changePlanning(payload) {
  return {
    type: CHANGE_PLANNING,
    payload,
  };
}

export function changeProblem(payload) {
  return {
    type: CHANGE_PROBLEM_SOLVING,
    payload,
  };
}

export function changeDelegation(payload) {
  return {
    type: CHANGE_DELEGATION,
    payload,
  };
}

export function changeDetail(payload) {
  return {
    type: CHANGE_DETAIL,
    payload,
  };
}

export function changeTolerance(payload) {
  return {
    type: CHANGE_AMBIGUITY,
    payload,
  };
}

export function changeStress(payload) {
  return {
    type: CHANGE_STRESS,
    payload,
  };
}

export function changeInitiative(payload) {
  return {
    type: CHANGE_INITIATIVE,
    payload,
  };
}

export function changeMinimal(payload) {
  return {
    type: CHANGE_MINIMAL,
    payload,
  };
}

export function changeTeamwork(payload) {
  return {
    type: CHANGE_TEAMWORK,
    payload,
  };
}

export function changeCreativity(payload) {
  return {
    type: CHANGE_CREATIVITY,
    payload,
  };
}

export function changeInterpersonal(payload) {
  return {
    type: CHANGE_INTERPERSONAL,
    payload,
  };
}

export function changeConfidence(payload) {
  return {
    type: CHANGE_CONFIDENCE,
    payload,
  };
}

export function changeExamStatus(payload) {
  return {
    type: CHANGE_EXAM_STATUS,
    payload,
  };
}

export function changeOfferedSalary(payload) {
  return {
    type: CHANGE_OFFERED_SALARY,
    payload,
  };
}

export function changeHmoEffectivity(payload) {
  return {
    type: CHANGE_HMO_EFFECTIVITY,
    payload,
  };
}

export function changeOfficialStartDate(payload) {
  return {
    type: CHANGE_OFFICIAL_STARTDATE,
    payload,
  };
}

export function updateCandidateRequest(payload) {
  return {
    type: UPDATE_CANDIDATE_REQUEST,
    payload,
  };
}

export function updateCandidateSuccess(payload) {
  return {
    type: UPDATE_CANDIDATE_SUCCESS,
    payload,
  };
}

export function updateCandidateFailed(payload) {
  return {
    type: UPDATE_CANDIDATE_FAILED,
    payload,
  };
}

export function updateApplicationStatusRequest(payload) {
  return {
    type: UPDATE_APPLICATION_STATUS_REQUEST,
    payload,
  };
}

export function updateApplicationStatusSuccess(payload) {
  return {
    type: UPDATE_APPLICATION_STATUS_SUCCESS,
    payload,
  };
}

export function updateApplicationStatusFailed(payload) {
  return {
    type: UPDATE_APPLICATION_STATUS_FAILED,
    payload,
  };
}

export function setShowMessageModal(payload) {
  return {
    type: SHOW_MESSAGE_MODAL,
    payload,
  };
}

export function setCandidateId(payload) {
  return {
    type: SET_CANDIDATE_ID,
    payload,
  };
}

export function setShowJobOfferModal(payload) {
  return {
    type: SHOW_JOBOFFER_MODAL,
    payload,
  };
}

export function setShowForInterviewModal(payload) {
  return {
    type: SHOW_FOR_INTERVIEW_MODAL,
    payload,
  };
}

export function requestInterviewNotes(payload) {
  return {
    type: FETCH_INTERVIEW_NOTES_REQUEST,
    payload,
  };
}

export function fetchInterviewNotesSuccess(payload) {
  return {
    type: FETCH_INTERVIEW_NOTES_SUCCESS,
    payload,
  };
}

export function fetchInterviewNotesFailed(payload) {
  return {
    type: FETCH_INTERVIEW_NOTES_FAILED,
    payload,
  };
}

export function changeInterviewerName(payload) {
  return {
    type: CHANGE_INTERVIEWER_NAME,
    payload,
  };
}

export function changeInterviewerPosition(payload) {
  return {
    type: CHANGE_INTERVIEWER_POSITION,
    payload,
  };
}

export function changeInterviewerEmail(payload) {
  return {
    type: CHANGE_INTERVIEWER_EMAIL,
    payload,
  };
}

export function changeInterviewDate(payload) {
  return {
    type: CHANGE_INTERVIEW_DATE,
    payload,
  };
}

export function changeInterviewRate(payload) {
  return {
    type: CHANGE_INTERVIEW_RATE,
    payload,
  };
}

export function changeInterviewRemarks(payload) {
  return {
    type: CHANGE_INTERVIEW_REMARKS,
    payload,
  };
}

export function changeInterviewStatus(payload) {
  return {
    type: CHANGE_INTERVIEW_STATUS,
    payload,
  };
}

export function saveInterviewNotesRequest() {
  return {
    type: SAVE_INTERVIEW_NOTES_REQUEST,
  };
}

export function saveInterviewNotesSuccess(payload) {
  return {
    type: SAVE_INTERVIEW_NOTES_SUCCESS,
    payload,
  };
}

export function saveInterviewNotesFailed(payload) {
  return {
    type: SAVE_INTERVIEW_NOTES_FAILED,
    payload,
  };
}

export function viewInterviewNote(payload) {
  return {
    type: VIEW_INTERVIEW_NOTE,
    payload,
  };
}

export function updateInterviewNotesRequest() {
  return {
    type: UPDATE_INTERVIEW_NOTES_REQUEST,
  };
}

export function updateInterviewNotesSuccess(payload) {
  return {
    type: UPDATE_INTERVIEW_NOTES_SUCCESS,
    payload,
  };
}

export function updateInterviewNotesFailed(payload) {
  return {
    type: UPDATE_INTERVIEW_NOTES_FAILED,
    payload,
  };
}

export function deleteInterviewNotesRequest(payload) {
  return {
    type: DELETE_INTERVIEW_NOTES_REQUEST,
    payload,
  };
}

export function deleteInterviewNotesSuccess(payload) {
  return {
    type: DELETE_INTERVIEW_NOTES_SUCCESS,
    payload,
  };
}

export function deleteInterviewNotesFailed(payload) {
  return {
    type: DELETE_INTERVIEW_NOTES_FAILED,
    payload,
  };
}

export function setFirstStartDate(payload) {
  return {
    type: SET_FIRST_START_DATE,
    payload,
  };
}

export function setFirstEndDate(payload) {
  return {
    type: SET_FIRST_END_DATE,
    payload,
  };
}

export function setSecondStartDate(payload) {
  return {
    type: SET_SECOND_START_DATE,
    payload,
  };
}

export function setSecondEndDate(payload) {
  return {
    type: SET_SECOND_END_DATE,
    payload,
  };
}

export function setThirdStartDate(payload) {
  return {
    type: SET_THIRD_START_DATE,
    payload,
  };
}

export function setThirdEndDate(payload) {
  return {
    type: SET_THIRD_END_DATE,
    payload,
  };
}

export function clearDates() {
  return {
    type: CLEAR_DATES,
  };
}

export function requestInterviewVacantScheds(payload) {
  return {
    type: REQUEST_INTERVIEW_VACANT_SCHED,
    payload,
  };
}

export function requestInterviewVacantSchedsFailed(payload) {
  return {
    type: REQUEST_INTERVIEW_VACANT_SCHED_FAILED,
    payload,
  };
}

export function requestInterviewVacantSchedsSuccess(payload) {
  return {
    type: REQUEST_INTERVIEW_VACANT_SCHED_SUCCESS,
    payload,
  };
}

export function setFirstVacantId(payload) {
  return {
    type: SET_FIRST_VACANT_ID,
    payload,
  };
}

export function setSecondVacantId(payload) {
  return {
    type: SET_SECOND_VACANT_ID,
    payload,
  };
}

export function setThirdVacantId(payload) {
  return {
    type: SET_THIRD_VACANT_ID,
    payload,
  };
}
