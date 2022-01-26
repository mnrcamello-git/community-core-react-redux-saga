import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the fileJobReqPage state domain
 */

const selectFileJobReqPageDomain = state =>
  state.fileJobReqPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FileJobReqPage
 */

const makeSelectFileJobReqPage = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate,
  );

const makeSelectAllJobRequisitons = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.myJobReqs,
  );

const makeSelectClosedJobRequisitions = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.closedJobReqs,
  );

const makeSelectErrorMessage = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.ui.errorMessage,
  );

const makeSelectLoading = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.ui.loading,
  );

const makeSelectTableActions = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.tableActions.tableAction,
  );

const makeSelectTableActionLoading = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.tableActions.loading,
  );

const makeSelectTableActionMessage = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.tableActions.message,
  );

const makeSelectTableActionHasErrors = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.tableActions.hasErrors,
  );

// ==== Selectors for Job Opening Form =====

// Job Information Forms
const makeSelectTitle = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.title,
  );
const makeSelectContractType = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.contract_type,
  );

const makeSelectStartDate = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.start_date,
  );

const makeSelectNumberRequest = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.number_of_request,
  );

const makeSelectImmediateSupervisor = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.immediate_supervisor,
  );

const makeSelectSupervisorTitle = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.supervisor_title,
  );

const makeSelectSupervisorEmail = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.supervisor_email,
  );

const makeSelectTitleError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.title_error,
  );

const makeSelectContractTypeError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.contract_type_error,
  );

const makeSelectStartDateError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.start_date_error,
  );

const makeSelectImmediateSupervisorError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.immediate_supervisor_error,
  );

const makeSelectSupervisorEmailError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.supervisor_email_error,
  );

const makeSelectSupervisorTitleError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.supervisor_title_error,
  );

const makeSelectNumberRequestError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.number_of_request_error,
  );

// Job Details Forms
const makeSelectYearsOfExperience = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.years_of_experience,
  );

const makeSelectMaxSalary = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.max_salary,
  );

const makeSelectJobTemplateId = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.job_template_id,
  );

const makeSelectJobCategories = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.job_category,
  );

const makeSelectSkills = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.skills,
  );

const makeSelectPreamble = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.preamble,
  );

const makeSelectResponsibilities = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.responsibilities,
  );

const makeSelectQualifications = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.qualifications,
  );

const makeSelectYearsOfExperienceError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.years_of_experience_error,
  );

const makeSelectMaxSalaryError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.max_salary_error,
  );

const makeSelectJobCategoriesError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.job_category_error,
  );

const makeSelectSkillsError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.skills_error,
  );

const makeSelectPreambleError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.preamble_error,
  );

const makeSelectResponsibilitiesError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.responsibilities_error,
  );

const makeSelectQualificationsError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.qualifications_error,
  );
// Exam and Remarks Forms
const makeSelectExam = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.exam,
  );

const makeSelectExamType = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.exam_type,
  );
const makeSelectExamFile = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.exam_file,
  );

const makeSelectExamPath = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.exam_path,
  );

const makeSelectExamLink = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.exam_link,
  );

const makeSelectExamPenbrother = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.exam_pb,
  );

const makeSelectRemarks = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_opening.remarks,
  );

const makeSelectExamLinkError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.exam_link_error,
  );

const makeSelectExamFileError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.job_form_errors.exam_file_error,
  );

// Job Templates
const makeSelectTemplates = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.templates,
  );

// Keywords
const makeSelectKeywords = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.keywords,
  );

// Categories
const makeSelectCategories = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.categories,
  );

// Selected Job Order Id
const makeSelectJobId = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.job_id,
  );

// Show Job Modal
const makeSelectShowJobModal = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.ui.job_form_modal,
  );

// Job Form Modal Loading
const makeSelectJobFormModalLoading = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.ui.job_form_modal_loading,
  );

// Show Success Job Form Modal
const makeSelectJobFormSuccessModal = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.ui.job_form_success_modal,
  );

const makeSelectJobFormSuccessMessage = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.ui.job_form_success_message,
  );

const makeSelectJobFormError = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.ui.job_form_error,
  );

const makeSelectUserAction = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.ui.user_action,
  );

const makeSelectPreviewModal = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.ui.job_preview_modal,
  );

const makeSelectNumberOfDuplicate = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.num_of_duplicate,
  );

// Blind Cv's
const makeSelectBlindCvs = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.blindCvs,
  );

const makeSelectShowBlindCvModal = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.ui.blind_cv_modal,
  );

const makeSelectBlindCv = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.userData.blind_cv,
  );

// Loading State
const makeSelectAllJobLoading = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.ui.all_job_loading,
  );

const makeSelectCloseJobLoading = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.ui.close_job_loading,
  );

const makeSelectSampleCvLoading = () =>
  createSelector(
    selectFileJobReqPageDomain,
    substate => substate.ui.sample_cv_loading,
  );


export default makeSelectFileJobReqPage;
export {
  selectFileJobReqPageDomain,
  makeSelectAllJobRequisitons,
  makeSelectClosedJobRequisitions,
  makeSelectLoading,
  makeSelectErrorMessage,
  makeSelectTableActions,
  makeSelectTableActionLoading,
  makeSelectTableActionMessage,
  makeSelectTableActionHasErrors,
  // Job Information
  makeSelectTitle,
  makeSelectContractType,
  makeSelectStartDate,
  makeSelectNumberRequest,
  makeSelectImmediateSupervisor,
  makeSelectSupervisorTitle,
  makeSelectSupervisorEmail,
  makeSelectTitleError,
  makeSelectContractTypeError,
  makeSelectStartDateError,
  makeSelectImmediateSupervisorError,
  makeSelectSupervisorEmailError,
  makeSelectSupervisorTitleError,
  makeSelectNumberRequestError,
  // Job Details
  makeSelectYearsOfExperience,
  makeSelectJobTemplateId,
  makeSelectMaxSalary,
  makeSelectJobCategories,
  makeSelectSkills,
  makeSelectPreamble,
  makeSelectResponsibilities,
  makeSelectQualifications,
  makeSelectYearsOfExperienceError,
  makeSelectMaxSalaryError,
  makeSelectJobCategoriesError,
  makeSelectSkillsError,
  makeSelectPreambleError,
  makeSelectResponsibilitiesError,
  makeSelectQualificationsError,
  // Exam and Remarks
  makeSelectExam,
  makeSelectExamType,
  makeSelectExamPath,
  makeSelectExamFile,
  makeSelectExamLink,
  makeSelectExamPenbrother,
  makeSelectRemarks,
  makeSelectExamLinkError,
  makeSelectExamFileError,
  // Templates
  makeSelectTemplates,
  // Keywords
  makeSelectKeywords,
  // Categories
  makeSelectCategories,
  // Job unique id
  makeSelectJobId,
  // Show Job Modal
  makeSelectShowJobModal,
  // Job Form Modal Loading
  makeSelectJobFormModalLoading,
  // Job Form Success Modal
  makeSelectJobFormSuccessModal,
  makeSelectJobFormSuccessMessage,
  makeSelectJobFormError,
  makeSelectUserAction,
  makeSelectPreviewModal,
  // Duplicate Job Offer
  makeSelectNumberOfDuplicate,
  // Blind Cvs
  makeSelectBlindCvs,
  makeSelectShowBlindCvModal,
  makeSelectBlindCv,
  // File Req Loading
  makeSelectAllJobLoading,
  makeSelectCloseJobLoading,
  makeSelectSampleCvLoading,
};
