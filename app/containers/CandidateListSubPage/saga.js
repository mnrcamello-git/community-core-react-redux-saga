import { takeLatest, call, put, select, push } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import moment from 'moment';
import {
  FETCH_CANDIDATE_REQUEST,
  UPDATE_CANDIDATE_REQUEST,
  UPDATE_APPLICATION_STATUS_REQUEST,
  FETCH_INTERVIEW_NOTES_REQUEST,
  SAVE_INTERVIEW_NOTES_REQUEST,
  UPDATE_INTERVIEW_NOTES_REQUEST,
  DELETE_INTERVIEW_NOTES_REQUEST,
  FETCH_CANDIDATES_REQUEST,
  REQUEST_INTERVIEW_VACANT_SCHED,
} from './constants';
import {
  isResponse401,
  clearUserData,
  checkIfResponseIsSuccess,
  getToken,
  getUserInformation,
} from '../App/globalHelpers';
import {
  fetchCandidateFailed,
  fetchCandidateSuccess,
  updateCandidateFailed,
  updateCandidateSuccess,
  updateApplicationStatusFailed,
  updateApplicationStatusSuccess,
  fetchInterviewNotesFailed,
  fetchInterviewNotesSuccess,
  saveInterviewNotesFailed,
  saveInterviewNotesSuccess,
  requestInterviewNotes,
  updateInterviewNotesSuccess,
  updateInterviewNotesFailed,
  deleteInterviewNotesFailed,
  deleteInterviewNotesSuccess,
  requestFetchCandidatesSuccess,
  requestFetchCandidatesFailed,
  requestInterviewVacantSchedsFailed,
  clearDates,
  setFirstEndDate,
  setFirstStartDate,
  setSecondStartDate,
  setSecondEndDate,
  setThirdEndDate,
  setThirdStartDate,
  setFirstVacantId,
  setSecondVacantId,
  setThirdVacantId,
  requestInterviewVacantSchedsSuccess,
} from './actions';
import {
  fetchCandidate,
  updateCandidate,
  updateShortlist,
  fetchInterviewNotes,
  addInterviewNotes,
  updateInterviewNotes,
  deleteInterviewNotes,
  fetchAvailableCandidates,
  fetchInterviewVacantSched,
} from './api';
import {
  makeSelectCandidateId,
  makeSelectJobOrderId,
  makeSelectBaCommunication,
  makeSelectBaAdaptibility,
  makeSelectBaDecisionMaking,
  makeSelectBaOrientation,
  makeSelectBaRiskTaker,
  makeSelectBaPlanning,
  makeSelectBaProblemSolving,
  makeSelectBaDelegation,
  makeSelectBaDetail,
  makeSelectBaTolerance,
  makeSelectBaStress,
  makeSelectBaInitiative,
  makeSelectBaMinimal,
  makeSelectBaTeamwork,
  makeSelectBaCreativity,
  makeSelectBaInterpersonal,
  makeSelectBaConfidence,
  makeSelectJobShortlistId,
  makeSelectOfficialStartDate,
  makeSelectApplicationStatus,
  makeSelectOfferedSalary,
  makeSelectInterviewerName,
  makeSelectInterviewerPosition,
  makeSelectInterviewerEmail,
  makeSelectInterviewDate,
  makeSelectInterviewRate,
  makeSelectInterviewRemarks,
  makeSelectInterviewStatus,
  makeSelectInterviewNoteId,
  makeSelectHmoEffectivity,
  makeSelectFirstStartDate,
  makeSelectFirstEndDate,
  makeSelectSecondStartDate,
  makeSelectSecondEndDate,
  makeSelectThirdStartDate,
  makeSelectThirdEndDate,
  makeSelectFirstVacantId,
  makeSelectSecondVacantId,
  makeSelectThirdVacantId,
  makeSelectVacantSchedule,
} from './selectors';

import { socket } from '../App/socket';

// Individual exports for testing
export function* attemptRequestCandidate() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const candidateId = yield select(makeSelectCandidateId());
    const jobOrderId = yield select(makeSelectJobOrderId());
    const response = yield call(
      fetchCandidate,
      config,
      candidateId,
      jobOrderId,
    );

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        fetchCandidateFailed({
          is_modal_loading: false,
          error_message:
            'Failed to fetch the candidate. Please try again or contact PB Administrator.',
        }),
      );
      return;
    }

    let myVacantSched = [];
    if (response.data.data.my_schedules[0]) {
      myVacantSched = response.data.data.my_schedules[0].interview_vacant_schedules.map(
        schedule => {
          return {
            start: schedule.start,
            end: schedule.end,
            start_error: '',
            end_error: '',
          };
        },
      );
    }
    yield put(
      fetchCandidateSuccess({
        candidate: response.data.data.candidate,
        application_details: response.data.data.application_details,
        candidate_skills: response.data.data.candidate_skills,
        users_vacant_sched: response.data.data.schedules,
        my_vacant_sched: myVacantSched,
        resume: response.data.data.resume,
        is_modal_loading: false,
        modal_show: true,
      }),
    );
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      fetchCandidateFailed({
        error_message:
          'Failed to fetch the candidate. Please try again or contact PB Administrator.',
        is_modal_loading: false,
      }),
    );
  }
}

/**
 * Request to update candidate
 */
export function* attemptUpdateCandidate() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const candidateId = yield select(makeSelectCandidateId());
    const jobOrderId = yield select(makeSelectJobOrderId());
    // Format candidate soft skill assestment
    const baCommunication = yield select(makeSelectBaCommunication());
    const baAdaptability = yield select(makeSelectBaAdaptibility());
    const baDecisionmaking = yield select(makeSelectBaDecisionMaking());
    const baOrientation = yield select(makeSelectBaOrientation());
    const baRisktaker = yield select(makeSelectBaRiskTaker());
    const baPlanning = yield select(makeSelectBaPlanning());
    const baProblemsolving = yield select(makeSelectBaProblemSolving());
    const baDelegation = yield select(makeSelectBaDelegation());
    const baDetail = yield select(makeSelectBaDetail());
    const baToleranceambiguity = yield select(makeSelectBaTolerance());
    const baStressmgt = yield select(makeSelectBaStress());
    const baInitiativetaker = yield select(makeSelectBaInitiative());
    const baMinimalsupervision = yield select(makeSelectBaMinimal());
    const baTeamwork = yield select(makeSelectBaTeamwork());
    const baCreativity = yield select(makeSelectBaCreativity());
    const baInterpersonalskills = yield select(makeSelectBaInterpersonal());
    const baConfidence = yield select(makeSelectBaConfidence());

    const offeredSalary = yield select(makeSelectOfferedSalary());
    const officialStartDate = yield select(makeSelectOfficialStartDate());
    const hmoEffectivity = yield select(makeSelectHmoEffectivity());
    const vacantSchedules = yield select(makeSelectVacantSchedule());

    const schedules = vacantSchedules.map(sched => {

      
      return {
        start: moment(sched.start).format('YYYY-MM-DD HH:mm:00') === 'Invalid date' ? 'Skipped' : moment(sched.start).format('YYYY-MM-DD HH:mm:00'),
        end: moment(sched.end).format('YYYY-MM-DD HH:mm:00') === 'Invalid date' ? 'Skipped' : moment(sched.end).format('YYYY-MM-DD HH:mm:00'),
      };
    });

    const candidate = {
      ba_communication: baCommunication / 20,
      ba_adaptability: baAdaptability / 20,
      ba_decision_making: baDecisionmaking / 20,
      ba_orientation: baOrientation / 20,
      ba_risk_taker: baRisktaker / 20,
      ba_planning: baPlanning / 20,
      ba_problem_solving: baProblemsolving / 20,
      ba_delegation: baDelegation / 20,
      ba_detail: baDetail / 20,
      ba_tolerance_ambiguity: baToleranceambiguity / 20,
      ba_stress_mgt: baStressmgt / 20,
      ba_initiative_taker: baInitiativetaker / 20,
      ba_minimal_supervision: baMinimalsupervision / 20,
      ba_team_work: baTeamwork / 20,
      ba_creativity: baCreativity / 20,
      ba_interpersonal_skills: baInterpersonalskills / 20,
      ba_confidence: baConfidence / 20,
      offered_salary: offeredSalary,
      official_start_date: officialStartDate,
      hmo_effectivity: hmoEffectivity,
      job_order_id: jobOrderId,
      vacant_schedules: schedules,
    };

    const response = yield call(
      updateCandidate,
      config,
      candidateId,
      candidate,
    );

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        updateCandidateFailed({
          is_modal_loading: false,
          show_modal: true,
          error_message:
            "Failed to update candidate's information. Please try again or contact your PB Administrator.",
        }),
      );
      return;
    }

    yield put(
      updateCandidateSuccess({
        is_modal_loading: false,
        error_message: 'Applied Changes!',
        show_modal: true,
      }),
    );

    response.data.data.jobOrderId = jobOrderId;
    response.data.data.shortlist_status = 'MODIFY';
    response.data.data.token = getToken();
    socket.emit('modify-candidate-profile-core2', response.data.data);
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      updateCandidateFailed({
        error_message:
          "Failed to update candidate's information. Please try again or contact your PB Administrator.",
        is_modal_loading: false,
        show_modal: true,
      }),
    );
  }
}

/**
 * Request to update candidate
 */
export function* attemptUpdateApplicationStatus() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const candidateId = yield select(makeSelectCandidateId());
    const jobOrderId = yield select(makeSelectJobOrderId());
    const applicationStatus = yield select(makeSelectApplicationStatus());

    let message = 'Applied Changes!';

    let shortlistData = {
      status: applicationStatus,
      candidate_id: candidateId,
      job_order_id: jobOrderId,
    };

    if (shortlistData.status === 'JOB-OFFER') {
      const offeredSalary = yield select(makeSelectOfferedSalary());
      const officialStartDate = yield select(makeSelectOfficialStartDate());
      const hmoEffectivity = yield select(makeSelectHmoEffectivity());

      shortlistData.offered_salary = offeredSalary;
      shortlistData.official_start_date = officialStartDate;
      shortlistData.hmo_effectivity = hmoEffectivity;
    }

    if (shortlistData.status === 'FOR INTERVIEW') {
      message =
        'Our Recruitment Team will reach to you to enable the interview arrangement with the candidate.';
      const firstStartDate = yield select(makeSelectFirstStartDate());
      const firstEndDate = yield select(makeSelectFirstEndDate());
      const secondStartDate = yield select(makeSelectSecondStartDate());
      const secondEndDate = yield select(makeSelectSecondEndDate());
      const thirdStartDate = yield select(makeSelectThirdStartDate());
      const thirdEndDate = yield select(makeSelectThirdEndDate());

      shortlistData.vacant_scheds = [
        {
          start_date: moment(firstStartDate).format('YYYY-MM-DD HH:mm:00') === 'Invalid date' ? 'Skipped' : moment(firstStartDate).format('YYYY-MM-DD HH:mm:00'),
          end_date: moment(firstEndDate).format('YYYY-MM-DD HH:mm:00') === 'Invalid date' ? 'Skipped' : moment(firstEndDate).format('YYYY-MM-DD HH:mm:00'),
          interview_vacant_id: yield select(makeSelectFirstVacantId()),
        },
        {
          start_date: moment(secondStartDate).format('YYYY-MM-DD HH:mm:00') === 'Invalid date' ? 'Skipped' : moment(secondStartDate).format('YYYY-MM-DD HH:mm:00'),
          end_date: moment(secondEndDate).format('YYYY-MM-DD HH:mm:00') === 'Invalid date' ? 'Skipped' : moment(secondEndDate).format('YYYY-MM-DD HH:mm:00'),
          interview_vacant_id: yield select(makeSelectSecondVacantId()),
        },
        {
          start_date: moment(thirdStartDate).format('YYYY-MM-DD HH:mm:00') === 'Invalid date' ? 'Skipped' : moment(thirdStartDate).format('YYYY-MM-DD HH:mm:00'),
          end_date: moment(thirdEndDate).format('YYYY-MM-DD HH:mm:00') === 'Invalid date' ? 'Skipped' : moment(thirdEndDate).format('YYYY-MM-DD HH:mm:00'),
          interview_vacant_id: yield select(makeSelectThirdVacantId()),
        },
      ];
    }

    const response = yield call(updateShortlist, config, shortlistData);
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        updateApplicationStatusFailed({
          is_modal_loading: false,
          error_message:
            "Failed to update candidate's application status. Please try again or contact your PB Administrator.",
          show_modal: true,
        }),
      );
      return;
    }

    const obj = {
      shortlist_status: applicationStatus,
      jobOrderId,
      token: getToken(),
      candidate_id: candidateId,
    };
    socket.emit('modify-candidate-status-core2', obj);

    yield put(
      updateApplicationStatusSuccess({
        is_modal_loading: false,
        error_message: message,
        show_modal: true,
      }),
    );
    yield put(clearDates());
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      updateApplicationStatusFailed({
        error_message:
          "Failed to update candidate's application status. Please try again or contact your PB Administrator.",
        is_modal_loading: false,
        show_modal: true,
      }),
    );
  }
}

/**
 * Request to update candidate
 */
export function* attemptRequestInterviewNotes() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const candidateId = yield select(makeSelectCandidateId());
    const jobOrderId = yield select(makeSelectJobOrderId());

    const response = yield call(
      fetchInterviewNotes,
      config,
      candidateId,
      jobOrderId,
    );
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        fetchInterviewNotesFailed({
          error_message:
            'Failed to fetch interview notes. Please try again or contact your PB Administrator.',
        }),
      );
      return;
    }

    yield put(
      fetchInterviewNotesSuccess({
        interview_notes: response.data.data,
        error_message: '',
      }),
    );
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      fetchInterviewNotesFailed({
        error_message:
          'Failed to fetch interview notes. Please try again or contact your PB Administrator.',
      }),
    );
  }
}

export function* attemaptSaveInterviewNote() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const interviewNotes = {
      candidate_id: yield select(makeSelectCandidateId()),
      list_id: yield select(makeSelectJobShortlistId()),
      job_order_id: yield select(makeSelectJobOrderId()),
      interviewer_name: yield select(makeSelectInterviewerName()),
      interviewer_position: yield select(makeSelectInterviewerPosition()),
      interviewer_email: yield select(makeSelectInterviewerEmail()),
      interview_date: yield select(makeSelectInterviewDate()),
      rate: yield select(makeSelectInterviewRate()),
      remarks: yield select(makeSelectInterviewRemarks()),
      status: yield select(makeSelectInterviewStatus()),
    };

    const response = yield call(addInterviewNotes, config, interviewNotes);
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        saveInterviewNotesFailed({
          error_message:
            'Failed to save interview notes. Please try again or contact your PB Administrator.',
        }),
      );
      return;
    }

    yield put(saveInterviewNotesSuccess());

    const userInfo = getUserInformation();
    yield put(requestInterviewNotes(userInfo));
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      saveInterviewNotesFailed({
        error_message:
          'Failed to save interview note. Please try again or contact your PB Administrator.',
      }),
    );
  }
}

export function* attemaptUpdateInterviewNote() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const interviewNotes = {
      candidate_id: yield select(makeSelectCandidateId()),
      list_id: yield select(makeSelectJobShortlistId()),
      job_order_id: yield select(makeSelectJobOrderId()),
      interviewer_name: yield select(makeSelectInterviewerName()),
      interviewer_position: yield select(makeSelectInterviewerPosition()),
      interviewer_email: yield select(makeSelectInterviewerEmail()),
      interview_date: yield select(makeSelectInterviewDate()),
      rate: yield select(makeSelectInterviewRate()),
      remarks: yield select(makeSelectInterviewRemarks()),
      status: yield select(makeSelectInterviewStatus()),
    };
    const interviewNoteId = yield select(makeSelectInterviewNoteId());

    const response = yield call(
      updateInterviewNotes,
      config,
      interviewNoteId,
      interviewNotes,
    );
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        updateInterviewNotesFailed({
          error_message:
            'Failed to save interview notes. Please try again or contact your PB Administrator.',
        }),
      );
      return;
    }

    yield put(updateInterviewNotesSuccess());
    const userInfo = getUserInformation();
    yield put(requestInterviewNotes(userInfo));
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      updateInterviewNotesFailed({
        error_message:
          'Failed to save interview note. Please try again or contact your PB Administrator.',
      }),
    );
  }
}

export function* attemaptDeleteInterviewNote() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const interviewNoteId = yield select(makeSelectInterviewNoteId());

    const response = yield call(deleteInterviewNotes, config, interviewNoteId);
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        deleteInterviewNotesFailed({
          error_message:
            'Failed to delete interview notes. Please try again or contact your PB Administrator.',
        }),
      );
      return;
    }

    yield put(deleteInterviewNotesSuccess());
    const userInfo = getUserInformation();
    yield put(requestInterviewNotes(userInfo));
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      deleteInterviewNotesFailed({
        error_message:
          'Failed to delete interview note. Please try again or contact your PB Administrator.',
      }),
    );
  }
}

export function* attemptFetchCandidates() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const jobOrderId = yield select(makeSelectJobOrderId());

    const response = yield call(fetchAvailableCandidates, config, jobOrderId);
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        requestFetchCandidatesFailed({
          data: [],
          jobTitle: '',
        }),
      );
      return;
    }

    yield put(
      requestFetchCandidatesSuccess({
        data: response.data.data.candidates,
        jobTitle: response.data.data.job_title,
      }),
    );
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      requestFetchCandidatesFailed({
        data: [],
        jobTitle: '',
      }),
    );
  }
}

export function* attemptFetchInterviewVacantSchedule() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const listId = yield select(makeSelectJobShortlistId());

    const response = yield call(fetchInterviewVacantSched, config, listId);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(requestInterviewVacantSchedsFailed());
      return;
    }

    if (response.data.data.length > 0) {
      const schedules = response.data.data;
      if (schedules[0]) {
        yield put(
          setFirstEndDate({
            end_date: new Date(schedules[0].end),
          }),
        );
        yield put(
          setFirstStartDate({
            start_date: new Date(schedules[0].start),
          }),
        );
        yield put(
          setFirstVacantId({
            interview_vacant_id: schedules[0].interview_vacant_id,
          }),
        );
      }
      if (schedules[1]) {
        yield put(
          setSecondEndDate({
            end_date: new Date(schedules[1].end),
          }),
        );
        yield put(
          setSecondStartDate({
            start_date: new Date(schedules[1].start),
          }),
        );
        yield put(
          setSecondVacantId({
            interview_vacant_id: schedules[1].interview_vacant_id,
          }),
        );
      }
      if (schedules[2]) {
        yield put(
          setThirdEndDate({
            end_date: new Date(schedules[2].end),
          }),
        );
        yield put(
          setThirdStartDate({
            start_date: new Date(schedules[2].start),
          }),
        );
        yield put(
          setThirdVacantId({
            interview_vacant_id: schedules[2].interview_vacant_id,
          }),
        );
      }
    }
    yield put(requestInterviewVacantSchedsSuccess());
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(requestInterviewVacantSchedsFailed());
  }
}

export default function* watchAddRequisitonPagePageActions() {
  yield takeLatest(FETCH_CANDIDATE_REQUEST, attemptRequestCandidate);
  yield takeLatest(UPDATE_CANDIDATE_REQUEST, attemptUpdateCandidate);
  yield takeLatest(
    UPDATE_APPLICATION_STATUS_REQUEST,
    attemptUpdateApplicationStatus,
  );
  yield takeLatest(FETCH_INTERVIEW_NOTES_REQUEST, attemptRequestInterviewNotes);
  yield takeLatest(SAVE_INTERVIEW_NOTES_REQUEST, attemaptSaveInterviewNote);
  yield takeLatest(UPDATE_INTERVIEW_NOTES_REQUEST, attemaptUpdateInterviewNote);
  yield takeLatest(DELETE_INTERVIEW_NOTES_REQUEST, attemaptDeleteInterviewNote);
  yield takeLatest(FETCH_CANDIDATES_REQUEST, attemptFetchCandidates);
  yield takeLatest(
    REQUEST_INTERVIEW_VACANT_SCHED,
    attemptFetchInterviewVacantSchedule,
  );
}
