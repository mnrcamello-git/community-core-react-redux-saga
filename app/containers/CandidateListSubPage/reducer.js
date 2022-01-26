/*
 *
 * CandidateListSubPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SET_COLUMNS_AND_DATA,
  FETCH_CANDIDATE_REQUEST,
  FETCH_CANDIDATE_SUCCESS,
  FETCH_CANDIDATE_FAILED,
  SHOW_MODAL,
  CHANGE_COMMUNICATION,
  CHANGE_ADAPTABILITY,
  CHANGE_DECISION,
  CHANGE_ORIENTATION,
  CHANGE_RISKTAKER,
  CHANGE_PROBLEM_SOLVING,
  CHANGE_PLANNING,
  CHANGE_DELEGATION,
  CHANGE_DETAIL,
  CHANGE_AMBIGUITY,
  CHANGE_STRESS,
  CHANGE_INITIATIVE,
  CHANGE_MINIMAL,
  CHANGE_TEAMWORK,
  CHANGE_CREATIVITY,
  CHANGE_INTERPERSONAL,
  CHANGE_CONFIDENCE,
  CHANGE_EXAM_STATUS,
  CHANGE_OFFICIAL_STARTDATE,
  CHANGE_OFFERED_SALARY,
  UPDATE_CANDIDATE_REQUEST,
  UPDATE_CANDIDATE_SUCCESS,
  UPDATE_CANDIDATE_FAILED,
  UPDATE_APPLICATION_STATUS_REQUEST,
  UPDATE_APPLICATION_STATUS_SUCCESS,
  UPDATE_APPLICATION_STATUS_FAILED,
  SHOW_MESSAGE_MODAL,
  SET_CANDIDATE_ID,
  SHOW_JOBOFFER_MODAL,
  FETCH_INTERVIEW_NOTES_REQUEST,
  FETCH_INTERVIEW_NOTES_SUCCESS,
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
  SET_VACANT_SCHED,
  SET_MY_VACANT_SCHED,
} from './constants';

export const initialState = {
  userData: {
    columns: {},
    tableData: {},
    jobTitle: '',
    resume: '',
    candidate: {
      first_name: '',
      last_name: '',
      middle_name: '',
      mobile_nbr: '',
      landline_nbr: '',
      email: '',
      expected_salary: '',
      last_salary: '',
      experience_level: '',
      notes: '',
      apply_date: '',
      earliest_start_date: '',
      ba_communication: '',
      ba_adaptability: '',
      ba_decision_making: '',
      ba_orientation: '',
      ba_risk_taker: '',
      ba_planning: '',
      ba_problem_solving: '',
      ba_delegation: '',
      ba_detail: '',
      ba_tolerance_ambiguity: '',
      ba_stress_mgt: '',
      ba_initiative_taker: '',
      ba_minimal_supervision: '',
      ba_team_work: '',
      ba_creativity: '',
      ba_interpersonal_skills: '',
      ba_confidence: '',
      last_job_role: '',
      last_employer: '',
      ratings: 0,
    },
    candidate_name: '',
    first_option: {
      start_date: null,
      end_date: null,
      interview_vacant_id: null,
    },
    second_option: {
      start_date: null,
      end_date: null,
      interview_vacant_id: null,
    },
    third_option: {
      start_date: null,
      end_date: null,
      interview_vacant_id: null,
    },
    interview_note: {
      interviewer_name: '',
      interviewer_position: '',
      interviewer_email: '',
      interview_date: '',
      rate: '',
      remarks: '',
      status: '',
    },
    interview_note_id: '',
    interview_method_request: 'create',
    interview_notes: [],
    list_id: '',
    application_details: {
      exam_result: '',
      status: '',
    },
    users_vacant_sched: [],
    my_vacant_sched: [],
    vacant_sched: [],
    offered_salary: 0,
    official_start_date: new Date(),
    hmo_effectivity: '6-MONTHS',
    candidate_id: '',
    jobOrderId: '',
    skills: [],
  },
  ui: {
    modal_show: false,
    is_modal_loading: false,
    error_message: '',
    saving_message: '',
    modal_message_show: false,
    job_offer_modal: false,
    for_interview_modal: false,
    is_disable_save_interview: false,
    interview_notes_loading: true,
    for_interview_loading: true,
  },
};

/* eslint-disable default-case, no-param-reassign */
const candidateListSubPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SHOW_MODAL:
        draft.ui.modal_show = action.payload.modal_show;
        break;
      case SET_VACANT_SCHED:
        draft.userData.vacant_sched = action.payload.vacant_sched;
        break;
      case SET_MY_VACANT_SCHED:
        draft.userData.my_vacant_sched = action.payload.my_vacant_sched;
        break;
      case SET_CANDIDATE_NAME:
        draft.userData.candidate_name = action.payload.candidate_name;
        break;
      case SET_COLUMNS_AND_DATA:
        draft.userData.columns = action.payload.columns;
        draft.userData.tableData = action.payload.data;
        draft.userData.jobTitle = action.payload.jobTitle;
        draft.userData.jobOrderId = action.payload.jobOrderId;
        break;
      case FETCH_CANDIDATES_REQUEST:
        draft.userData.columns = action.payload.columns;
        draft.userData.jobOrderId = action.payload.jobOrderId;
        break;
      case FETCH_CANDIDATES_SUCCESS:
        draft.userData.jobTitle = action.payload.jobTitle;
        draft.userData.tableData = action.payload.data;
        break;
      case FETCH_CANDIDATES_FAILED:
        draft.userData.jobTitle = action.payload.jobTitle;
        draft.userData.tableData = action.payload.data;
        break;
      case FETCH_CANDIDATE_REQUEST:
        draft.ui.is_modal_loading = action.payload.is_modal_loading;
        draft.userData.candidate_id = action.payload.candidate_id;
        break;
      case FETCH_CANDIDATE_SUCCESS:
        draft.ui.is_modal_loading = action.payload.is_modal_loading;
        draft.userData.my_vacant_sched = action.payload.my_vacant_sched;
        draft.userData.vacant_sched = action.payload.my_vacant_sched;
        draft.userData.users_vacant_sched = action.payload.users_vacant_sched;
        draft.ui.modal_show = action.payload.modal_show;
        draft.userData.skills = action.payload.candidate_skills;
        draft.userData.application_details = action.payload.application_details;
        draft.userData.candidate.first_name =
          action.payload.candidate.first_name;
        draft.userData.candidate.last_name = action.payload.candidate.last_name;
        draft.userData.candidate.middle_name =
          action.payload.candidate.middle_name;
        draft.userData.candidate.mobile_nbr =
          action.payload.candidate.mobile_nbr;
        draft.userData.candidate.landline_nbr =
          action.payload.candidate.landline_nbr;
        draft.userData.candidate.email = action.payload.candidate.email;
        draft.userData.candidate.expected_salary =
          action.payload.candidate.expected_salary;
        draft.userData.candidate.apply_date =
          action.payload.candidate.apply_date;
        draft.userData.candidate.earliest_start_date =
          action.payload.candidate.earliest_start_date;
        draft.userData.candidate.status = action.payload.candidate.status;
        draft.userData.candidate.ba_communication =
          action.payload.candidate.ba_communication;
        draft.userData.candidate.ba_adaptability =
          action.payload.candidate.ba_adaptability;
        draft.userData.candidate.ba_decision_making =
          action.payload.candidate.ba_decision_making;
        draft.userData.candidate.ba_orientation =
          action.payload.candidate.ba_orientation;
        draft.userData.candidate.ba_risk_taker =
          action.payload.candidate.ba_risk_taker;
        draft.userData.candidate.ba_planning =
          action.payload.candidate.ba_planning;
        draft.userData.candidate.ba_problem_solving =
          action.payload.candidate.ba_problem_solving;
        draft.userData.candidate.ba_delegation =
          action.payload.candidate.ba_delegation;
        draft.userData.candidate.ba_detail = action.payload.candidate.ba_detail;
        draft.userData.candidate.ba_tolerance_ambiguity =
          action.payload.candidate.ba_tolerance_ambiguity;
        draft.userData.candidate.ba_team_work =
          action.payload.candidate.ba_team_work;
        draft.userData.candidate.ba_stress_mgt =
          action.payload.candidate.ba_stress_mgt;
        draft.userData.candidate.ba_initiative_taker =
          action.payload.candidate.ba_initiative_taker;
        draft.userData.candidate.ba_confidence =
          action.payload.candidate.ba_confidence;
        draft.userData.candidate.ba_minimal_supervision =
          action.payload.candidate.ba_minimal_supervision;
        draft.userData.candidate.ba_creativity =
          action.payload.candidate.ba_creativity;
        draft.userData.candidate.ba_interpersonal_skills =
          action.payload.candidate.ba_interpersonal_skills;
        draft.userData.list_id = action.payload.application_details.list_id;
        draft.userData.resume = action.payload.resume;
        draft.userData.candidate.experience_level =
          action.payload.candidate.experience_level;
        draft.userData.candidate.last_salary =
          action.payload.candidate.last_salary;
        draft.userData.candidate.last_employer =
          action.payload.candidate.last_employer;
        draft.userData.candidate.last_job_role =
          action.payload.candidate.last_job_role;
        draft.userData.candidate.notes = action.payload.candidate.notes;
        draft.userData.candidate.ratings = action.payload.candidate.ratings;
        break;
      case FETCH_CANDIDATE_FAILED:
        draft.ui.is_modal_loading = action.payload.is_modal_loading;
        draft.ui.error_message = action.payload.error_message;
        break;
      case CHANGE_COMMUNICATION:
        draft.userData.candidate.ba_communication = action.payload.value;
        break;
      case CHANGE_ADAPTABILITY:
        draft.userData.candidate.ba_adaptability = action.payload.value;
        break;
      case CHANGE_DECISION:
        draft.userData.candidate.ba_decision_making = action.payload.value;
        break;
      case CHANGE_ORIENTATION:
        draft.userData.candidate.ba_orientation = action.payload.value;
        break;
      case CHANGE_RISKTAKER:
        draft.userData.candidate.ba_risk_taker = action.payload.value;
        break;
      case CHANGE_PLANNING:
        draft.userData.candidate.ba_planning = action.payload.value;
        break;
      case CHANGE_PROBLEM_SOLVING:
        draft.userData.candidate.ba_problem_solving = action.payload.value;
        break;
      case CHANGE_DELEGATION:
        draft.userData.candidate.ba_delegation = action.payload.value;
        break;
      case CHANGE_DETAIL:
        draft.userData.candidate.ba_detail = action.payload.value;
        break;
      case CHANGE_AMBIGUITY:
        draft.userData.candidate.ba_tolerance_ambiguity = action.payload.value;
        break;
      case CHANGE_STRESS:
        draft.userData.candidate.ba_stress_mgt = action.payload.value;
        break;
      case CHANGE_INITIATIVE:
        draft.userData.candidate.ba_initiative_taker = action.payload.value;
        break;
      case CHANGE_MINIMAL:
        draft.userData.candidate.ba_minimal_supervision = action.payload.value;
        break;
      case CHANGE_TEAMWORK:
        draft.userData.candidate.ba_team_work = action.payload.value;
        break;
      case CHANGE_CREATIVITY:
        draft.userData.candidate.ba_creativity = action.payload.value;
        break;
      case CHANGE_INTERPERSONAL:
        draft.userData.candidate.ba_interpersonal_skills = action.payload.value;
        break;
      case CHANGE_CONFIDENCE:
        draft.userData.candidate.ba_confidence = action.payload.value;
        break;
      case CHANGE_EXAM_STATUS:
        draft.userData.application_details.exam_result = action.payload.value;
        break;
      case CHANGE_OFFERED_SALARY:
        draft.userData.offered_salary = action.payload.offered_salary;
        break;
      case CHANGE_HMO_EFFECTIVITY:
        draft.userData.hmo_effectivity = action.payload.hmo_effectivity;
        break;
      case CHANGE_OFFICIAL_STARTDATE:
        draft.userData.official_start_date = action.payload.official_start_date;
        break;
      case UPDATE_CANDIDATE_REQUEST:
        draft.ui.is_modal_loading = action.payload.is_modal_loading;
        break;
      case UPDATE_CANDIDATE_SUCCESS:
        draft.ui.is_modal_loading = action.payload.is_modal_loading;
        draft.ui.saving_message = action.payload.error_message;
        draft.ui.modal_message_show = action.payload.show_modal;
        draft.userData.offered_salary = 0;
        draft.userData.official_start_date = new Date();
        draft.userData.hmo_effectivity = '6-MONTHS';
        break;
      case UPDATE_CANDIDATE_FAILED:
        draft.ui.is_modal_loading = action.payload.is_modal_loading;
        draft.ui.saving_message = action.payload.error_message;
        draft.ui.modal_message_show = action.payload.show_modal;
        break;
      case UPDATE_APPLICATION_STATUS_REQUEST:
        draft.ui.is_modal_loading = action.payload.is_modal_loading;
        draft.userData.application_details.status = action.payload.status;
        draft.userData.candidate_id = action.payload.candidate_id;
        draft.ui.for_interview_loading = true;
        break;
      case UPDATE_APPLICATION_STATUS_SUCCESS:
        draft.ui.is_modal_loading = action.payload.is_modal_loading;
        draft.ui.saving_message = action.payload.error_message;
        draft.ui.modal_message_show = action.payload.show_modal;
        draft.userData.offered_salary = 0;
        draft.userData.official_start_date = new Date();
        draft.userData.hmo_effectivity = '6-MONTHS';
        draft.ui.for_interview_loading = false;
        break;
      case UPDATE_APPLICATION_STATUS_FAILED:
        draft.ui.is_modal_loading = action.payload.is_modal_loading;
        draft.ui.saving_message = action.payload.error_message;
        draft.ui.modal_message_show = action.payload.show_modal;
        draft.ui.for_interview_loading = false;
        break;
      case SHOW_MESSAGE_MODAL:
        draft.ui.modal_message_show = action.payload.show_modal;
        break;
      case SET_CANDIDATE_ID:
        draft.userData.candidate_id = action.payload.candidate_id;
        break;
      case SHOW_JOBOFFER_MODAL:
        draft.ui.job_offer_modal = action.payload.job_offer_modal;
        break;
      case SHOW_FOR_INTERVIEW_MODAL:
        draft.ui.for_interview_modal = action.payload.for_interview_modal;
        break;
      // Interview Notes
      case FETCH_INTERVIEW_NOTES_REQUEST:
        draft.ui.interview_notes_loading = true;
        draft.userData.interview_note.interviewer_name =
          action.payload.interviewer_name;
        draft.userData.interview_note.interviewer_position =
          action.payload.interviewer_position;
        draft.userData.interview_note.interviewer_email =
          action.payload.interviewer_email;
        break;
      case FETCH_INTERVIEW_NOTES_SUCCESS:
        draft.userData.interview_notes = action.payload.interview_notes;
        draft.ui.interview_notes_loading = false;
        break;
      case FETCH_INTERVIEW_NOTES_FAILED:
        draft.userData.interview_notes = [];
        draft.ui.interview_notes_loading = false;
        break;
      case CHANGE_INTERVIEWER_NAME:
        draft.userData.interview_note.interviewer_name =
          action.payload.interviewer_name;
        break;
      case CHANGE_INTERVIEWER_POSITION:
        draft.userData.interview_note.interviewer_position =
          action.payload.interviewer_position;
        break;
      case CHANGE_INTERVIEWER_EMAIL:
        draft.userData.interview_note.interviewer_email =
          action.payload.interviewer_email;
        break;
      case CHANGE_INTERVIEW_DATE:
        draft.userData.interview_note.interview_date =
          action.payload.interview_date;
        break;
      case CHANGE_INTERVIEW_RATE:
        draft.userData.interview_note.rate = action.payload.rate;
        break;
      case CHANGE_INTERVIEW_REMARKS:
        draft.userData.interview_note.remarks = action.payload.remarks;
        break;
      case CHANGE_INTERVIEW_STATUS:
        draft.userData.interview_note.status = action.payload.status;
        break;
      case SAVE_INTERVIEW_NOTES_REQUEST:
        draft.ui.is_disable_save_interview = true;
        draft.ui.interview_notes_loading = true;
        draft.userData.interview_method_request = 'create';
        break;
      case SAVE_INTERVIEW_NOTES_SUCCESS:
        draft.userData.interview_note.interviewer_name = '';
        draft.userData.interview_note.interviewer_position = '';
        draft.userData.interview_note.interviewer_email = '';
        draft.userData.interview_note.interview_date = '';
        draft.userData.interview_note.rate = 0;
        draft.userData.interview_note.remarks = '';
        draft.userData.interview_note.status = '';
        draft.ui.is_disable_save_interview = false;
        draft.ui.interview_notes_loading = false;
        draft.userData.interview_method_request = 'create';
        break;
      case SAVE_INTERVIEW_NOTES_FAILED:
        draft.ui.is_disable_save_interview = false;
        draft.userData.interview_method_request = 'create';
        draft.ui.interview_notes_loading = false;
        break;
      case VIEW_INTERVIEW_NOTE:
        draft.userData.interview_method_request = 'edit';
        draft.userData.interview_note_id = action.payload.interview_note_id;
        draft.userData.interview_note.interviewer_name =
          action.payload.interviewer_name;
        draft.userData.interview_note.interviewer_position =
          action.payload.interviewer_position;
        draft.userData.interview_note.interviewer_email =
          action.payload.interviewer_email;
        draft.userData.interview_note.interview_date = new Date(
          action.payload.interview_date,
        );
        draft.userData.interview_note.rate = action.payload.rate;
        draft.userData.interview_note.remarks = action.payload.remarks;
        draft.userData.interview_note.status = action.payload.status;
        break;
      case UPDATE_INTERVIEW_NOTES_REQUEST:
        draft.userData.interview_method_request = 'edit';
        draft.ui.interview_notes_loading = true;
        break;
      case UPDATE_INTERVIEW_NOTES_SUCCESS:
        draft.userData.interview_method_request = 'create';
        draft.userData.interview_note.interviewer_name = '';
        draft.userData.interview_note.interviewer_position = '';
        draft.userData.interview_note.interviewer_email = '';
        draft.userData.interview_note.interview_date = '';
        draft.userData.interview_note.rate = 0;
        draft.userData.interview_note.remarks = '';
        draft.userData.interview_note.status = '';
        draft.ui.interview_notes_loading = false;
        draft.userData.interview_note_id = '';
        break;
      case UPDATE_INTERVIEW_NOTES_FAILED:
        draft.ui.interview_notes_loading = false;
        draft.userData.interview_note_id = '';
        draft.userData.interview_method_request = 'create';
        break;
      case DELETE_INTERVIEW_NOTES_REQUEST:
        draft.userData.interview_method_request = 'delete';
        draft.userData.interview_note_id = action.payload.interview_note_id;
        draft.ui.interview_notes_loading = true;
        break;
      case DELETE_INTERVIEW_NOTES_SUCCESS:
        draft.ui.interview_notes_loading = false;
        draft.userData.interview_note_id = '';
        draft.userData.interview_method_request = 'create';
        break;
      case DELETE_INTERVIEW_NOTES_FAILED:
        draft.ui.interview_notes_loading = false;
        draft.userData.interview_note_id = '';
        draft.userData.interview_method_request = 'create';
        break;
      case SET_FIRST_START_DATE:
        draft.userData.first_option.start_date = action.payload.start_date;
        break;
      case SET_FIRST_END_DATE:
        draft.userData.first_option.end_date = action.payload.end_date;
        break;
      case SET_SECOND_START_DATE:
        draft.userData.second_option.start_date = action.payload.start_date;
        break;
      case SET_SECOND_END_DATE:
        draft.userData.second_option.end_date = action.payload.end_date;
        break;
      case SET_THIRD_START_DATE:
        draft.userData.third_option.start_date = action.payload.start_date;
        break;
      case SET_THIRD_END_DATE:
        draft.userData.third_option.end_date = action.payload.end_date;
        break;
      case CLEAR_DATES:
        draft.userData.first_option.start_date = null;
        draft.userData.first_option.end_date = null;
        draft.userData.second_option.start_date = null;
        draft.userData.second_option.end_date = null;
        draft.userData.third_option.start_date = null;
        draft.userData.third_option.end_date = null;
        draft.userData.first_option.interview_vacant_id = null;
        draft.userData.second_option.interview_vacant_id = null;
        draft.userData.third_option.interview_vacant_id = null;
        break;
      case REQUEST_INTERVIEW_VACANT_SCHED:
        draft.userData.list_id = action.payload.list_id;
        draft.ui.for_interview_loading = true;
        break;
      case REQUEST_INTERVIEW_VACANT_SCHED_FAILED:
        draft.userData.first_option.start_date = null;
        draft.userData.first_option.end_date = null;
        draft.userData.second_option.start_date = null;
        draft.userData.second_option.end_date = null;
        draft.userData.third_option.start_date = null;
        draft.userData.third_option.end_date = null;
        draft.userData.first_option.interview_vacant_id = null;
        draft.userData.second_option.interview_vacant_id = null;
        draft.userData.third_option.interview_vacant_id = null;
        break;
      case REQUEST_INTERVIEW_VACANT_SCHED_SUCCESS:
        draft.ui.for_interview_loading = false;
        break;
      case SET_FIRST_VACANT_ID:
        draft.userData.first_option.interview_vacant_id =
          action.payload.interview_vacant_id;
        break;
      case SET_SECOND_VACANT_ID:
        draft.userData.second_option.interview_vacant_id =
          action.payload.interview_vacant_id;
        break;
      case SET_THIRD_VACANT_ID:
        draft.userData.third_option.interview_vacant_id =
          action.payload.interview_vacant_id;
        break;
      default:
        break;
    }
  });

export default candidateListSubPageReducer;
