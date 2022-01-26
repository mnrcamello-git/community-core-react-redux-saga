import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the candidateListSubPage state domain
 */

const selectCandidateListSubPageDomain = state =>
  state.candidateListSubPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CandidateListSubPage
 */

const makeSelectCandidateListSubPage = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate,
  );

const makeSelectTableColumn = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.columns,
  );

const makeSelectTableData = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.tableData,
  );

const makeSelectJobTitle = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.jobTitle,
  );

const makeSelectJobOrderId = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.jobOrderId,
  );

const makeSelectModalLoading = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.ui.is_modal_loading,
  );

const makeSelectCandidateId = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate_id,
  );

const makeSelectErrorMessage = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.ui.error_message,
  );

const makeSelectCandidate = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate,
  );

const makeSelectCandidateSkills = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.skills,
  );

const makeSelectApplicationDetails = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.application_details,
  );

const makeSelectShowModal = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.ui.modal_show,
  );

const makeSelectBaCommunication = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_communication,
  );

const makeSelectBaAdaptibility = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_adaptability,
  );

const makeSelectBaDecisionMaking = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_decision_making,
  );

const makeSelectBaOrientation = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_orientation,
  );

const makeSelectBaRiskTaker = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_risk_taker,
  );

const makeSelectBaPlanning = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_planning,
  );

const makeSelectBaProblemSolving = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_problem_solving,
  );

const makeSelectBaDelegation = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_delegation,
  );

const makeSelectBaDetail = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_detail,
  );

const makeSelectBaTolerance = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_tolerance_ambiguity,
  );

const makeSelectBaStress = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_stress_mgt,
  );

const makeSelectBaInitiative = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_initiative_taker,
  );

const makeSelectBaMinimal = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_minimal_supervision,
  );

const makeSelectBaTeamwork = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_team_work,
  );

const makeSelectBaCreativity = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_creativity,
  );

const makeSelectBaInterpersonal = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_interpersonal_skills,
  );

const makeSelectBaConfidence = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate.ba_confidence,
  );

const makeSelectJobShortlistId = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.list_id,
  );

const makeSelectExamStatus = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.application_details.exam_result,
  );

const makeSelectApplicationStatus = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.application_details.status,
  );

const makeSelectSavingMessage = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.ui.saving_message,
  );

const makeSelectMessageModal = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.ui.modal_message_show,
  );

const makeSelectResume = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.resume,
  );

const makeSelectOfferedSalary = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.offered_salary,
  );

const makeSelectHmoEffectivity = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.hmo_effectivity,
  );

const makeSelectOfficialStartDate = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.official_start_date,
  );

const makeSelectJobOfferModal = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.ui.job_offer_modal,
  );

const makeSelectForInterviewModal = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.ui.for_interview_modal,
  );

// Interview Notes
const makeSelectInterviewNotes = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.interview_notes,
  );

const makeSelectInterviewerName = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.interview_note.interviewer_name,
  );

const makeSelectInterviewerPosition = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.interview_note.interviewer_position,
  );

const makeSelectInterviewerEmail = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.interview_note.interviewer_email,
  );

const makeSelectInterviewDate = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.interview_note.interview_date,
  );

const makeSelectInterviewRate = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.interview_note.rate,
  );

const makeSelectInterviewStatus = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.interview_note.status,
  );

const makeSelectInterviewRemarks = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.interview_note.remarks,
  );

const makeSelectInterviewNoteId = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.interview_note_id,
  );

const makeSelectButtonSaveInterviewNotes = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.ui.is_disable_save_interview,
  );

const makeSelectInterviewNotesLoading = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.ui.interview_notes_loading,
  );

const makeSelectInterviewMethodRequest = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.interview_method_request,
  );

const makeSelectFirstStartDate = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.first_option.start_date,
  );

const makeSelectFirstEndDate = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.first_option.end_date,
  );

const makeSelectSecondStartDate = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.second_option.start_date,
  );

const makeSelectSecondEndDate = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.second_option.end_date,
  );

const makeSelectThirdStartDate = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.third_option.start_date,
  );

const makeSelectThirdEndDate = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.third_option.end_date,
  );

const makeSelectFirstVacantId = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.first_option.interview_vacant_id,
  );

const makeSelectSecondVacantId = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.second_option.interview_vacant_id,
  );

const makeSelectThirdVacantId = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.third_option.interview_vacant_id,
  );

const makeSelectForInterviewLoading = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.ui.for_interview_loading,
  );

const makeSelectUsersVacantSchedule = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.users_vacant_sched,
  );

const makeSelectCandidateName = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.candidate_name,
  );

const makeSelectMyVacantSchedule = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.my_vacant_sched,
  );

const makeSelectVacantSchedule = () =>
  createSelector(
    selectCandidateListSubPageDomain,
    substate => substate.userData.vacant_sched,
  );
export default makeSelectCandidateListSubPage;
export {
  selectCandidateListSubPageDomain,
  makeSelectTableColumn,
  makeSelectMessageModal,
  makeSelectResume,
  makeSelectBaTolerance,
  makeSelectJobShortlistId,
  makeSelectBaInitiative,
  makeSelectExamStatus,
  makeSelectBaMinimal,
  makeSelectBaTeamwork,
  makeSelectBaConfidence,
  makeSelectBaCreativity,
  makeSelectBaInterpersonal,
  makeSelectBaDetail,
  makeSelectBaCommunication,
  makeSelectBaAdaptibility,
  makeSelectBaDecisionMaking,
  makeSelectBaOrientation,
  makeSelectBaRiskTaker,
  makeSelectBaDelegation,
  makeSelectBaPlanning,
  makeSelectBaProblemSolving,
  makeSelectModalLoading,
  makeSelectTableData,
  makeSelectJobTitle,
  makeSelectCandidateId,
  makeSelectBaStress,
  makeSelectErrorMessage,
  makeSelectCandidate,
  makeSelectJobOrderId,
  makeSelectApplicationDetails,
  makeSelectCandidateSkills,
  makeSelectShowModal,
  makeSelectApplicationStatus,
  makeSelectSavingMessage,
  makeSelectOfferedSalary,
  makeSelectOfficialStartDate,
  makeSelectJobOfferModal,
  makeSelectInterviewNotes,
  makeSelectInterviewerName,
  makeSelectInterviewerPosition,
  makeSelectInterviewerEmail,
  makeSelectInterviewDate,
  makeSelectInterviewRate,
  makeSelectInterviewStatus,
  makeSelectInterviewRemarks,
  makeSelectInterviewNoteId,
  makeSelectButtonSaveInterviewNotes,
  makeSelectInterviewNotesLoading,
  makeSelectInterviewMethodRequest,
  makeSelectHmoEffectivity,
  makeSelectForInterviewModal,
  makeSelectFirstStartDate,
  makeSelectFirstEndDate,
  makeSelectSecondStartDate,
  makeSelectSecondEndDate,
  makeSelectThirdStartDate,
  makeSelectThirdEndDate,
  makeSelectFirstVacantId,
  makeSelectSecondVacantId,
  makeSelectThirdVacantId,
  makeSelectForInterviewLoading,
  makeSelectUsersVacantSchedule,
  makeSelectCandidateName,
  makeSelectMyVacantSchedule,
  makeSelectVacantSchedule,
};
