/*
 *
 * FileJobReqPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_ALL_JOB_REQUISITIONS_SUCCESS,
  FETCH_ALL_JOB_REQUISITIONS,
  FETCH_ALL_JOB_REQUISITIONS_FAILED,
  FETCH_CLOSED_JOB_REQUISITIONS,
  FETCH_CLOSED_JOB_REQUISITIONS_SUCCESS,
  MODIFY_JOB_ORDER,
  MODIFY_JOB_ORDER_SUCCESS,
  MODIFY_JOB_ORDER_FAILED,
  REQUEST_FETCH_KEYWORDS,
  FETCH_KEYWORDS_SUCCESS,
  FETCH_KEYWORDS_FAILED,
  REQUEST_FETCH_JOB_CATEGORIES,
  FETCH_JOB_CATEGORIES_SUCCESS,
  FETCH_JOB_CATEGORIES_FAILED,
  REQUEST_FETCH_JOB,
  FETCH_JOB_SUCCESS,
  FETCH_JOB_FAILED,
  REQUEST_FETCH_JOB_TEMPLATE,
  FETCH_JOB_TEMPLATE_SUCCESS,
  FETCH_JOB_TEMPLATE_FAILED,
  REQUEST_FETCH_FILTER_JOB_TEMPLATE,
  CHANGE_TITLE,
  CHANGE_CONTRACT,
  CHANGE_START_DATE,
  CHANGE_NUMBER_REQUEST,
  CHANGE_SUPERVISOR_EMAIL,
  CHANGE_SUPERVISOR_TITLE,
  CHANGE_IMMEDIATE_SUPERVISOR,
  CHANGE_MAX_SALARY,
  CHANGE_YEARS_EXP,
  CHANGE_SKILLS,
  CHANGE_JOB_CATEGORIES,
  CHANGE_PREAMBLE,
  CHANGE_QUALIFICATIONS,
  CHANGE_RESPONSIBILITIES,
  CHANGE_JOB_TEMPLATE,
  CHANGE_EXAM,
  CHANGE_EXAM_TYPE,
  CHANGE_EXAM_FILE,
  CHANGE_EXAM_LINK,
  CHANGE_EXAM_PB,
  CHANGE_REMARKS,
  SHOW_JOB_MODAL,
  CLEAR_JOB_FORM,
  REQUEST_SAVE_JOB,
  SAVE_JOB_SUCCESS,
  SAVE_JOB_FAILED,
  SHOW_JOB_SUCCESS_MODAL,
  REQUEST_UPDATE_JOB,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_FAILED,
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

export const initialState = {
  userData: {
    myJobReqs: [],
    closedJobReqs: [],
    blindCvs: [],
    keywords: [],
    categories: [],
    templates: [],
    job_id: '',
    exam_type: '',
    blind_cv: {
      blind_cv_id: '',
      cv_code: '',
      job_title: '',
      status: 1,
      experience_level: '',
      skills: '',
      keywords: {},
      summary: '',
      work_experience: '',
      education: '',
    },
    job_opening: {
      title: '',
      contract_type: 'FULL-TIME',
      start_date: new Date(),
      immediate_supervisor: '',
      supervisor_title: '',
      supervisor_email: '',
      number_of_request: 1,
      years_of_experience: '',
      max_salary: 0,
      job_category: [],
      skills: [],
      preamble: '',
      responsibilities: '',
      qualifications: '',
      exam: false,
      exam_file: '',
      exam_link: '',
      exam_pb: false,
      exam_path: '',
      remarks: '',
      job_template_id: '',
    },
    num_of_duplicate: 1,
  },
  job_form_errors: {
    title_error: '',
    contract_type_error: '',
    start_date_error: '',
    immediate_supervisor_error: '',
    supervisor_title_error: '',
    supervisor_email_error: '',
    number_of_request_error: '',
    years_of_experience_error: '',
    max_salary_error: '',
    job_category_error: '',
    skills_error: '',
    preamble_error: '',
    responsibilities_error: '',
    qualifications_error: '',
    exam_file_error: '',
    exam_link_error: '',
    exam_path_error: '',
    remarks_error: '',
  },
  ui: {
    loading: false,
    errorMessage: '',
    job_form_modal_loading: false,
    job_form_modal: false,
    job_form_success_modal: false,
    job_form_success_message: '',
    job_form_error: false,
    user_action: '',
    job_preview_modal: false,
    blind_cv_modal: false,
  },
  tableActions: {
    tableAction: {},
    loading: false,
    message: '',
    all_job_loading: false,
    close_job_loading: false,
    sample_cv_loading: false,
    hasErrors: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const fileJobReqPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FETCH_ALL_JOB_REQUISITIONS:
        draft.ui.all_job_loading = true;
        draft.ui.errorMessage = '';
        draft.tableActions.loading = false;
        draft.tableActions.message = '';
        draft.ui.errorMessage = '';
        break;
      case FETCH_ALL_JOB_REQUISITIONS_SUCCESS:
        draft.userData.myJobReqs = action.payload;
        draft.ui.all_job_loading = false;
        break;
      case FETCH_ALL_JOB_REQUISITIONS_FAILED:
        draft.ui.errorMessage = action.message;
        draft.ui.all_job_loading = false;
        break;
      case FETCH_CLOSED_JOB_REQUISITIONS:
        draft.ui.errorMessage = action.message;
        draft.ui.close_job_loading = true;
        break;
      case FETCH_CLOSED_JOB_REQUISITIONS_SUCCESS:
        draft.ui.close_job_loading = false;
        draft.ui.errorMessage = '';
        draft.userData.closedJobReqs = action.payload;
        break;
      case MODIFY_JOB_ORDER:
        draft.tableActions.tableAction = action.payload;
        draft.tableActions.loading = true;
        draft.tableActions.hasErrors = false;
        draft.tableActions.message = '';
        break;
      case MODIFY_JOB_ORDER_SUCCESS:
        draft.tableActions.tableAction = {};
        draft.tableActions.loading = false;
        draft.tableActions.hasErrors = false;
        draft.tableActions.message = 'Successfully modifed job order';
        break;
      case MODIFY_JOB_ORDER_FAILED:
        draft.tableActions.loading = false;
        draft.tableActions.hasErrors = true;
        draft.tableActions.message = 'Failed to modify job order';
        break;
      case CHANGE_USER_ACTION:
        draft.ui.user_action = action.payload.user_action;
        break;
      case SHOW_JOB_PREVIEW_MODAL:
        draft.ui.job_preview_modal = action.payload.job_preview_modal;
        break;
      case REQUEST_FETCH_KEYWORDS:
        draft.ui.job_form_modal_loading = true;
        break;
      case FETCH_KEYWORDS_SUCCESS:
        draft.userData.keywords = action.payload.keywords;
        draft.ui.job_form_modal_loading = false;
        break;
      case FETCH_KEYWORDS_FAILED:
        draft.userData.keywords = [];
        draft.ui.job_form_modal_loading = false;
        break;
      case REQUEST_FETCH_JOB_CATEGORIES:
        draft.ui.job_form_modal_loading = true;
        break;
      case FETCH_JOB_CATEGORIES_SUCCESS:
        draft.userData.categories = action.payload.categories;
        draft.ui.job_form_modal_loading = false;
        break;
      case FETCH_JOB_CATEGORIES_FAILED:
        draft.userData.categories = [];
        draft.ui.job_form_modal_loading = false;
        break;
      case REQUEST_FETCH_JOB_TEMPLATE:
        draft.ui.job_form_modal_loading = true;
        break;
      case REQUEST_FETCH_FILTER_JOB_TEMPLATE:
        break;
      case FETCH_JOB_TEMPLATE_SUCCESS:
        draft.userData.templates = action.payload.templates;
        draft.ui.job_form_modal_loading = false;
        break;
      case FETCH_JOB_TEMPLATE_FAILED:
        draft.userData.templates = [];
        draft.ui.job_form_modal_loading = false;
        break;
      case REQUEST_FETCH_JOB:
        draft.ui.job_form_modal_loading = true;
        draft.userData.job_id = action.payload.job_id;
        break;
      case FETCH_JOB_SUCCESS:
        draft.ui.job_form_modal_loading = action.payload.job_form_modal_loading;
        draft.ui.job_form_modal = action.payload.job_form_modal;
        draft.ui.job_preview_modal = action.payload.job_preview_modal;

        draft.userData.job_opening.title = action.payload.job.job_title;
        draft.userData.job_opening.contract_type =
          action.payload.job.engagement_type;
        draft.userData.job_opening.start_date = new Date(
          action.payload.job.start_date,
        );
        draft.userData.job_opening.immediate_supervisor =
          action.payload.job.supervisor;
        draft.userData.job_opening.supervisor_title =
          action.payload.job.supervisor_title;
        draft.userData.job_opening.supervisor_email =
          action.payload.job.supervisor_email;
        draft.userData.job_opening.years_of_experience =
          action.payload.job.experience_level;
        draft.userData.job_opening.max_salary = action.payload.job.max_salary;
        draft.userData.job_opening.responsibilities =
          action.payload.job.primary_responsibilities;
        draft.userData.job_opening.qualifications =
          action.payload.job.minimum_qualifications;
        draft.userData.job_opening.skills = action.payload.job.keywords;
        draft.userData.job_opening.job_category =
          action.payload.job.job_category_id;
        draft.userData.job_opening.preamble = action.payload.job.job_overview;
        draft.userData.job_opening.exam = action.payload.job.exam;
        draft.userData.exam_type = action.payload.job.exam_type;
        draft.userData.job_opening.exam_link = action.payload.job.exam_link;
        draft.userData.job_opening.exam_pb =
          action.payload.job.exam_penbrothers;
        draft.userData.job_opening.exam_path =
          action.payload.job.exam_file_path;
        draft.userData.job_opening.remarks = action.payload.job.comments;

        draft.userData.job_opening.job_template_id =
          action.payload.job.job_template_id;
        break;
      case FETCH_JOB_FAILED:
        draft.job_id = '';
        break;
      case SHOW_JOB_MODAL:
        draft.ui.job_form_modal = action.payload.job_form_modal;
        break;
      // Job Information
      case CHANGE_TITLE:
        draft.userData.job_opening.title = action.payload.title;
        draft.job_form_errors.title_error = action.payload.title_error;
        break;
      case CHANGE_CONTRACT:
        draft.userData.job_opening.contract_type = action.payload.contract_type;
        draft.job_form_errors.contract_type_error =
          action.payload.contract_type_error;
        break;
      case CHANGE_START_DATE:
        draft.userData.job_opening.start_date = action.payload.start_date;
        draft.job_form_errors.start_date_error =
          action.payload.start_date_error;
        break;
      case CHANGE_NUMBER_REQUEST:
        draft.userData.job_opening.number_of_request =
          action.payload.number_of_request;
        draft.job_form_errors.number_of_request_error =
          action.payload.number_of_request_error;
        break;
      case CHANGE_IMMEDIATE_SUPERVISOR:
        draft.userData.job_opening.immediate_supervisor =
          action.payload.immediate_supervisor;
        draft.job_form_errors.immediate_supervisor_error =
          action.payload.immediate_supervisor_error;
        break;
      case CHANGE_SUPERVISOR_EMAIL:
        draft.userData.job_opening.supervisor_email =
          action.payload.supervisor_email;
        draft.job_form_errors.supervisor_email_error =
          action.payload.supervisor_email_error;
        break;
      case CHANGE_SUPERVISOR_TITLE:
        draft.userData.job_opening.supervisor_title =
          action.payload.supervisor_title;
        draft.job_form_errors.supervisor_title_error =
          action.payload.supervisor_title_error;
        break;
      // Job Details
      case CHANGE_PREAMBLE:
        draft.userData.job_opening.preamble = action.payload.preamble;
        draft.job_form_errors.preamble_error = action.payload.preamble_error;
        break;
      case CHANGE_RESPONSIBILITIES:
        draft.userData.job_opening.responsibilities =
          action.payload.responsibilities;
        draft.job_form_errors.responsibilities_error =
          action.payload.responsibilities_error;
        break;
      case CHANGE_QUALIFICATIONS:
        draft.userData.job_opening.qualifications =
          action.payload.qualifications;
        draft.job_form_errors.qualifications_error =
          action.payload.qualifications_error;
        break;
      case CHANGE_YEARS_EXP:
        draft.userData.job_opening.years_of_experience =
          action.payload.years_of_experience;
        draft.job_form_errors.years_of_experience_error =
          action.payload.years_of_experience_error;
        break;
      case CHANGE_SKILLS:
        draft.userData.job_opening.skills = action.payload.skills;
        draft.job_form_errors.skills_error = action.payload.skills_error;
        break;
      case CHANGE_MAX_SALARY:
        draft.userData.job_opening.max_salary = action.payload.max_salary;
        draft.job_form_errors.max_salary_error =
          action.payload.max_salary_error;
        break;
      case CHANGE_JOB_CATEGORIES:
        draft.userData.job_opening.job_category = action.payload.job_category;
        draft.job_form_errors.job_category_error =
          action.payload.job_category_error;
        break;
      case CHANGE_JOB_TEMPLATE:
        draft.userData.job_opening.skills = action.payload.skills;
        draft.userData.job_opening.qualifications =
          action.payload.qualifications;
        draft.userData.job_opening.responsibilities =
          action.payload.responsibilities;
        draft.userData.job_opening.job_template_id =
          action.payload.job_template_id;
        break;
      // Exam and Remarks
      case CHANGE_EXAM_TYPE:
        draft.userData.exam_type = action.payload.exam_type;
        break;
      case CHANGE_EXAM:
        draft.userData.job_opening.exam = action.payload.exam;
        draft.userData.exam_type = action.payload.exam_type;
        draft.userData.job_opening.exam_file = action.payload.exam_file;
        draft.userData.job_opening.exam_path = action.payload.exam_path;
        draft.job_form_errors.exam_file_error = action.payload.exam_file_error;
        draft.userData.job_opening.exam_link = action.payload.exam_link;
        draft.job_form_errors.exam_link_error = action.payload.exam_link_error;
        draft.userData.job_opening.exam_pb = action.payload.exam_pb;
        break;
      case CHANGE_EXAM_FILE:
        draft.userData.job_opening.exam_file = action.payload.exam_file;
        draft.userData.exam_type = 'exam-file';
        draft.userData.job_opening.exam_path = action.payload.exam_path;
        draft.job_form_errors.exam_file_error = action.payload.exam_file_error;
        draft.userData.job_opening.exam_link = action.payload.exam_link;
        draft.job_form_errors.exam_link_error = action.payload.exam_link_error;
        draft.userData.job_opening.exam_pb = action.payload.exam_pb;
        break;
      case CHANGE_EXAM_LINK:
        draft.userData.job_opening.exam_link = action.payload.exam_link;
        draft.userData.exam_type = 'exam-link';
        draft.userData.job_opening.exam_path = action.payload.exam_path;
        draft.userData.job_opening.exam_file = action.payload.exam_file;
        draft.job_form_errors.exam_file_error = action.payload.exam_file_error;
        draft.job_form_errors.exam_link_error = action.payload.exam_link_error;
        draft.userData.job_opening.exam_pb = action.payload.exam_pb;
        break;
      case CHANGE_EXAM_PB:
        draft.userData.job_opening.exam_pb = action.payload.exam_pb;
        draft.userData.exam_type = 'exam-pb';
        draft.userData.job_opening.exam_path = action.payload.exam_path;
        draft.userData.job_opening.exam_file = action.payload.exam_file;
        draft.job_form_errors.exam_file_error = action.payload.exam_file_error;
        draft.userData.job_opening.exam_link = action.payload.exam_link;
        draft.job_form_errors.exam_link_error = action.payload.exam_link_error;
        break;
      case CHANGE_REMARKS:
        draft.userData.job_opening.remarks = action.payload.remarks;
        break;
      case CLEAR_JOB_FORM:
        draft.job_form_errors.title_error = '';
        draft.job_form_errors.contract_type_error = '';
        draft.job_form_errors.start_date_error = '';
        draft.job_form_errors.immediate_supervisor_error = '';
        draft.job_form_errors.supervisor_title_error = '';
        draft.job_form_errors.supervisor_email_error = '';
        draft.job_form_errors.number_of_request_error = '';
        draft.job_form_errors.years_of_experience_error = '';
        draft.job_form_errors.max_salary_error = '';
        draft.job_form_errors.job_category_error = '';
        draft.job_form_errors.skills_error = '';
        draft.job_form_errors.preamble_error = '';
        draft.job_form_errors.responsibilities_error = '';
        draft.job_form_errors.qualifications_error = '';
        draft.job_form_errors.exam_file_error = '';
        draft.job_form_errors.exam_link_error = '';
        draft.job_form_errors.exam_path_error = '';
        draft.job_form_errors.remarks_error = '';
        draft.userData.job_opening.title = '';
        draft.userData.job_opening.contract_type = 'FULL-TIME';
        draft.userData.job_opening.start_date = new Date();
        draft.userData.job_opening.immediate_supervisor = '';
        draft.userData.job_opening.supervisor_title = '';
        draft.userData.job_opening.supervisor_email = '';
        draft.userData.job_opening.number_of_request = 1;
        draft.userData.job_opening.years_of_experience = '';
        draft.userData.job_opening.max_salary = 0;
        draft.userData.job_opening.job_category = [];
        draft.userData.job_opening.skills = [];
        draft.userData.job_opening.preamble = '';
        draft.userData.job_opening.responsibilities = '';
        draft.userData.job_opening.qualifications = '';
        draft.userData.job_opening.exam = false;
        draft.userData.job_opening.exam_file = '';
        draft.userData.job_opening.exam_link = '';
        draft.userData.job_opening.exam_pb = false;
        draft.userData.job_opening.exam_path = '';
        draft.userData.job_opening.remarks = '';
        draft.userData.job_opening.job_template_id = '';
        draft.userData.job_id = '';
        draft.userData.exam_type = '';
        break;
      // Save Job Order
      case REQUEST_SAVE_JOB:
        draft.ui.job_form_modal_loading = action.payload.job_form_modal_loading;
        break;
      case SAVE_JOB_SUCCESS:
        draft.ui.job_form_modal_loading = action.payload.loading;
        draft.ui.job_form_success_modal = action.payload.show_modal;
        draft.ui.job_form_success_message = action.payload.message;
        draft.ui.job_form_error = action.payload.job_form_error;
        break;
      case SAVE_JOB_FAILED:
        draft.ui.job_form_modal_loading = action.payload.loading;
        draft.ui.job_form_success_modal = action.payload.show_modal;
        draft.ui.job_form_success_message = action.payload.message;
        draft.ui.job_form_error = action.payload.job_form_error;
        break;
      case SHOW_JOB_SUCCESS_MODAL:
        draft.ui.job_form_success_modal = action.payload.job_form_success_modal;
        break;
      // Update Job Order
      case REQUEST_UPDATE_JOB:
        draft.ui.job_form_modal_loading = action.payload.job_form_modal_loading;
        break;
      case UPDATE_JOB_SUCCESS:
        draft.ui.job_form_modal_loading = action.payload.loading;
        draft.ui.job_form_success_modal = action.payload.show_modal;
        draft.ui.job_form_success_message = action.payload.message;
        draft.ui.job_form_error = action.payload.job_form_error;
        break;
      case UPDATE_JOB_FAILED:
        draft.ui.job_form_modal_loading = action.payload.loading;
        draft.ui.job_form_success_modal = action.payload.show_modal;
        draft.ui.job_form_success_message = action.payload.message;
        draft.ui.job_form_error = action.payload.job_form_error;
        break;
      case JOB_FORM_ERROR_MODAL:
        draft.ui.job_form_error = action.payload.job_form_error;
        break;
      case CHANGE_NUM_DUPLICATE:
        draft.userData.num_of_duplicate = action.payload.num_of_duplicate;
        break;
      case REQUEST_JOB_DUPLICATE:
        draft.ui.all_job_loading = true;
        draft.userData.job_id = action.payload.job_id;
        break;
      case REQUEST_JOB_DUPLICATE_FAILED:
        draft.ui.all_job_loading = false;
        draft.ui.errorMessage = action.payload.message;
        break;
      case REQUEST_JOB_DUPLICATE_SUCCESS:
        draft.ui.all_job_loading = false;
        draft.ui.errorMessage = action.payload.message;
        draft.userData.num_of_duplicate = 1;
        break;
      case REQUEST_FETCH_BLIND_CV:
        draft.ui.sample_cv_loading = true;
        draft.ui.errorMessage = '';
        draft.tableActions.loading = false;
        draft.tableActions.message = '';
        draft.ui.errorMessage = '';
        break;
      case FETCH_BLIND_CV_SUCCESS:
        draft.userData.blindCvs = action.payload.blind_cvs;
        draft.ui.sample_cv_loading = false;
        break;
      case FETCH_BLIND_CV_FAILED:
        draft.ui.sample_cv_loading = false;
        draft.ui.errorMessage = action.message;
        break;
      case SHOW_BLIND_CV_MODAL:
        draft.ui.blind_cv_modal = action.payload.blind_cv_modal;
        break;
      case SET_BLIND_CV:
        draft.userData.blind_cv.blind_cv_id = action.payload.blind_cv_id;
        draft.userData.blind_cv.cv_code = action.payload.cv_code;
        draft.userData.blind_cv.job_title = action.payload.job_title;
        draft.userData.blind_cv.status = action.payload.status;
        draft.userData.blind_cv.experience_level =
          action.payload.experience_level;
        draft.userData.blind_cv.skills = action.payload.skills;
        draft.userData.blind_cv.keywords = action.payload.keywords;
        draft.userData.blind_cv.summary = action.payload.summary;
        draft.userData.blind_cv.work_experience =
          action.payload.work_experience;
        draft.userData.blind_cv.education = action.payload.education;
        break;
      default:
        break;
    }
  });

export default fileJobReqPageReducer;
