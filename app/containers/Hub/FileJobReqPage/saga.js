import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import Cookies from 'js-cookie';
import {
  FETCH_ALL_JOB_REQUISITIONS,
  FETCH_CLOSED_JOB_REQUISITIONS,
  MODIFY_JOB_ORDER,
  REQUEST_FETCH_KEYWORDS,
  REQUEST_FETCH_JOB_CATEGORIES,
  REQUEST_FETCH_JOB_TEMPLATE,
  REQUEST_FETCH_JOB,
  REQUEST_SAVE_JOB,
  REQUEST_UPDATE_JOB,
  REQUEST_FETCH_FILTER_JOB_TEMPLATE,
  REQUEST_JOB_DUPLICATE,
  REQUEST_FETCH_BLIND_CV,
} from './constants';
import {
  getAllJobRequisitions,
  getClosedJobRequisitions,
  updateJobRequisition,
  fetchJob,
  saveJobOrder,
  fetchJobTemplates,
  filterJobTemplates,
  updateJobOrder,
  duplicateJobOrder,
  fetchBlindCvs,
} from './api';
import {
  fetchAllJobRequisitionsFailed,
  fetchAllJobRequisitionsSuccess,
  fetchClosedJobRequisitionsFailed,
  fetchClosedJobRequisitionsSuccess,
  modifyJobOrderSuccess,
  modifyJobOrderFailed,
  fetchAllJobRequisitions,
  fetchKeywordsFailed,
  fetchKeywordsSuccess,
  fetchJobCategoriesFailed,
  fetchJobCategoriesSuccess,
  fetchJobFailed,
  fetchJobSuccess,
  fetchJobTemplatesFailed,
  fetchJobTemplatesSuccess,
  saveJobFailed,
  saveJobSuccess,
  updateJobFailed,
  updateJobSuccess,
  requestJobDuplicateFailed,
  requestJobDuplicateSuccess,
  fetchClosedJobRequisitions,
  requestBlindCvFailed,
  requestBlindCvSuccess,
} from './actions';
import {
  isResponse401,
  checkIfResponseIsSuccess,
  clearUserData,
  getToken,
} from '../../App/globalHelpers';
import {
  makeSelectTableActions,
  makeSelectJobId,
  makeSelectTitle,
  makeSelectContractType,
  makeSelectStartDate,
  makeSelectImmediateSupervisor,
  makeSelectSupervisorTitle,
  makeSelectSupervisorEmail,
  makeSelectNumberRequest,
  makeSelectYearsOfExperience,
  makeSelectMaxSalary,
  makeSelectSkills,
  makeSelectJobCategories,
  makeSelectPreamble,
  makeSelectResponsibilities,
  makeSelectQualifications,
  makeSelectExam,
  makeSelectExamFile,
  makeSelectExamLink,
  makeSelectRemarks,
  makeSelectExamPenbrother,
  makeSelectExamPath,
  makeSelectJobTemplateId,
  makeSelectUserAction,
  makeSelectNumberOfDuplicate,
  makeSelectEventJobOrderStatus,
} from './selectors';
import { fetchJobCategories, fetchKeywords } from '../../App/commonApi';
import { exportPDF } from './api';
import { socket } from '../../App/socket';
/**
 * Saga for requesting job all requisitions
 */
export function* attemptRequestAllJobRequisitions() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const response = yield call(getAllJobRequisitions, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        fetchAllJobRequisitionsFailed('Failed to fetch the job requisitions.'),
      );
      return;
    }

    yield put(fetchAllJobRequisitionsSuccess(response.data.data));
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      fetchAllJobRequisitionsFailed('Failed to fetch the job requisitions.'),
    );
  }
}

/**
 * Saga for reqesting closed job requisitions
 */
export function* attemptRequestClosedJobRequisitions() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const response = yield call(getClosedJobRequisitions, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        fetchClosedJobRequisitionsFailed(
          'Failed to fetch the job requisitions.',
        ),
      );
      return;
    }

    yield put(fetchClosedJobRequisitionsSuccess(response.data.data));
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      fetchClosedJobRequisitionsFailed('Failed to fetch the job requisitions.'),
    );
  }
}

/**
 * Modified the job order data
 */
export function* atteptModifyJobOrder() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const body = yield select(makeSelectTableActions());
    const response = yield call(updateJobRequisition, body, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(modifyJobOrderFailed(response.message));
      return;
    }

    yield put(modifyJobOrderSuccess(response.message));
    socket.emit('modify-job-order-core2', {
      jobOrderStatus: body.job_order_status,
      jobOrderId: body.jobOrderId,
      token: getToken(),
    });
    // reload
    yield put(fetchAllJobRequisitions());
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(modifyJobOrderFailed('Failed to fetch the job requisitions.'));
  }
}

/**
 * Attempt requesting all visible keywords/skills
 */
export function* attemptRequestKeywords() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const response = yield call(fetchKeywords, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        fetchKeywordsFailed({
          message: 'Failed to get all visible keywords',
        }),
      );
      return;
    }

    const keywords = response.data.data.map(keyword => ({
      value: keyword.keyword_id,
      label: keyword.word,
    }));

    yield put(
      fetchKeywordsSuccess({
        keywords,
        message: 'Success',
      }),
    );
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      fetchKeywordsFailed({
        message: 'Failed to get all visible keywords',
      }),
    );
  }
}

/**
 * Attempt requesting all job categories
 */
export function* attemptRequestJobCategories() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const response = yield call(fetchJobCategories, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        fetchJobCategoriesFailed({
          message: 'Failed to get all job categories',
        }),
      );
      return;
    }

    const categories = response.data.data.map(category => ({
      value: category.job_category_id,
      label: category.category_name,
    }));

    yield put(
      fetchJobCategoriesSuccess({
        categories,
        message: 'Success',
      }),
    );
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      fetchJobCategoriesFailed({
        message: 'Failed to get all job categories',
      }),
    );
  }
}

/**
 * Attempt requesting job
 */
export function* attemptRequestJob() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const jobOrderId = yield select(makeSelectJobId());
    const userAction = yield select(makeSelectUserAction());
    const response = yield call(fetchJob, config, jobOrderId);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        fetchJobFailed({
          message: 'Failed to get job order',
        }),
      );
      return;
    }

    if (response.data.data.length === 0) {
      yield put(push('/hub/job-opening'));
      yield put(
        fetchJobFailed({
          message: 'Failed to get job order',
        }),
      );
      return;
    }

    const jobOrder = response.data.data[0];
    if (jobOrder.exam === 1) {
      jobOrder.exam = true;
    } else {
      jobOrder.exam = false;
    }

    jobOrder.exam_type = '';
    if (jobOrder.exam_link !== '') {
      jobOrder.exam_type = 'exam-link';
      jobOrder.exam = true;
    }
    if (jobOrder.exam_file_path !== '') {
      jobOrder.exam_type = 'exam-file';
      jobOrder.exam_path = jobOrder.exam_file_path;
      jobOrder.exam = true;
    }

    if (jobOrder.exam_penbrothers === 1) {
      jobOrder.exam_pb = true;
      jobOrder.exam_type = 'exam-pb';
      jobOrder.exam = true;
    } else {
      jobOrder.exam_pb = false;
    }

    let jobFormModal = true;
    let jobFormLoading = false;
    let previewModal = false;

    if (userAction === 'view') {
      jobFormLoading = false;
      jobFormModal = false;
      previewModal = true;
    }

    yield put(
      fetchJobSuccess({
        message: 'Success',
        job: jobOrder,
        job_form_modal_loading: jobFormLoading,
        job_form_modal: jobFormModal,
        job_preview_modal: previewModal,
      }),
    );
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      fetchJobFailed({
        message: 'Failed to get all job order',
      }),
    );
  }
}

/**
 * Attempt requesting all job templates
 */
export function* attemptRequestJobTemplates() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const response = yield call(fetchJobTemplates, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        fetchJobTemplatesFailed({
          message: 'Failed to get all job templates',
        }),
      );
      return;
    }

    yield put(
      fetchJobTemplatesSuccess({
        templates: response.data.data,
        message: 'Success',
      }),
    );
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      fetchJobTemplatesFailed({
        message: 'Failed to get all job templates',
      }),
    );
  }
}

/**
 * Attempt requesting filter job templates
 */
export function* attemptRequestFilterJobTemplates() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const levelOfExp = yield select(makeSelectYearsOfExperience());
    const jobCategories = yield select(makeSelectJobCategories());

    const queryParams = {
      years_of_experience:
        levelOfExp === undefined || levelOfExp === '' ? '' : levelOfExp,
      job_category:
        jobCategories === undefined || jobCategories.length === 0
          ? ''
          : JSON.stringify(jobCategories),
    };

    const response = yield call(filterJobTemplates, config, queryParams);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        fetchJobTemplatesFailed({
          message: 'Failed to get all job templates',
        }),
      );
      return;
    }

    yield put(
      fetchJobTemplatesSuccess({
        templates: response.data.data,
        message: 'Success',
      }),
    );
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      fetchJobTemplatesFailed({
        message: 'Failed to get all job templates',
      }),
    );
  }
}
/**
 * Attempt save job order
 */
export function* attemptSaveJob() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const postingDate = yield select(makeSelectStartDate());
    const data = {
      title: yield select(makeSelectTitle()),
      contract_type: yield select(makeSelectContractType()),
      start_date: new Date(
        postingDate.getTime() - postingDate.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .split('T')[0],
      immediate_supervisor: yield select(makeSelectImmediateSupervisor()),
      supervisor_title: yield select(makeSelectSupervisorTitle()),
      supervisor_email: yield select(makeSelectSupervisorEmail()),
      years_of_experience: yield select(makeSelectYearsOfExperience()),
      max_salary: yield select(makeSelectMaxSalary()),
      job_category: yield select(makeSelectJobCategories()),
      skills: yield select(makeSelectSkills()),
      preamble: yield select(makeSelectPreamble()),
      responsibilities: yield select(makeSelectResponsibilities()),
      qualifications: yield select(makeSelectQualifications()),
      exam: yield select(makeSelectExam()),
      exam_link: yield select(makeSelectExamLink()),
      exam_file: yield select(makeSelectExamFile()),
      exam_path: yield select(makeSelectExamPath()),
      exam_pb: yield select(makeSelectExamPenbrother()),
      remarks: yield select(makeSelectRemarks()),
      number_of_request: yield select(makeSelectNumberRequest()),
      job_template_id: yield select(makeSelectJobTemplateId()),
    };

    const requestData = new FormData();
    requestData.append('title', data.title);
    requestData.append('contract_type', data.contract_type);
    requestData.append('start_date', data.start_date);
    requestData.append('immediate_supervisor', data.immediate_supervisor);
    requestData.append('supervisor_title', data.supervisor_title);
    requestData.append('supervisor_email', data.supervisor_email);
    requestData.append('years_of_experience', data.years_of_experience);
    requestData.append('max_salary', data.max_salary);
    requestData.append('job_category', JSON.stringify(data.job_category));
    requestData.append('skills', JSON.stringify(data.skills));
    requestData.append('preamble', data.preamble);
    requestData.append('responsibilities', data.responsibilities);
    requestData.append('qualifications', data.qualifications);
    requestData.append('exam', data.exam);
    requestData.append('exam_link', data.exam_link);
    requestData.append('exam_file', data.exam_file);
    requestData.append('exam_path', data.exam_path);
    requestData.append('exam_pb', data.exam_pb);
    requestData.append('remarks', data.remarks);
    requestData.append('number_of_request', data.number_of_request);
    requestData.append('job_template_id', data.job_template_id);

    const response = yield call(saveJobOrder, requestData, config);
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        saveJobFailed({
          message: 'Creating job post failed. Please contact PB Administrator.',
          loading: false,
          show_modal: true,
          job_form_error: true,
        }),
      );
      return;
    }
    response.data.data.token = getToken();
    socket.emit('add-job-order-core2', response.data.data);
    yield put(
      saveJobSuccess({
        message: 'You have successfully created a Job Opening!',
        loading: false,
        show_modal: true,
        job_form_error: false,
      }),
    );
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      saveJobFailed({
        message: 'Failed to save job order. Please contact PB Administrator.',
        loading: false,
        show_modal: false,
        job_form_error: true,
      }),
    );
  }
}

/**
 * Attempt update job order
 */
export function* attemptUpdateJob() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const postingDate = yield select(makeSelectStartDate());
    const data = {
      title: yield select(makeSelectTitle()),
      contract_type: yield select(makeSelectContractType()),
      start_date: new Date(
        postingDate.getTime() - postingDate.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .split('T')[0],
      immediate_supervisor: yield select(makeSelectImmediateSupervisor()),
      supervisor_title: yield select(makeSelectSupervisorTitle()),
      supervisor_email: yield select(makeSelectSupervisorEmail()),
      years_of_experience: yield select(makeSelectYearsOfExperience()),
      max_salary: yield select(makeSelectMaxSalary()),
      job_category: yield select(makeSelectJobCategories()),
      skills: yield select(makeSelectSkills()),
      preamble: yield select(makeSelectPreamble()),
      responsibilities: yield select(makeSelectResponsibilities()),
      qualifications: yield select(makeSelectQualifications()),
      exam: yield select(makeSelectExam()),
      exam_link: yield select(makeSelectExamLink()),
      exam_path: yield select(makeSelectExamPath()),
      exam_file: yield select(makeSelectExamFile()),
      exam_pb: yield select(makeSelectExamPenbrother()),
      remarks: yield select(makeSelectRemarks()),
      job_template_id: yield select(makeSelectJobTemplateId()),
    };

    const requestData = new FormData();
    requestData.append('title', data.title);
    requestData.append('contract_type', data.contract_type);
    requestData.append('start_date', data.start_date);
    requestData.append('immediate_supervisor', data.immediate_supervisor);
    requestData.append('supervisor_title', data.supervisor_title);
    requestData.append('supervisor_email', data.supervisor_email);
    requestData.append('years_of_experience', data.years_of_experience);
    requestData.append('max_salary', data.max_salary);
    requestData.append('job_category', JSON.stringify(data.job_category));
    requestData.append('skills', JSON.stringify(data.skills));
    requestData.append('preamble', data.preamble);
    requestData.append('responsibilities', data.responsibilities);
    requestData.append('qualifications', data.qualifications);
    requestData.append('exam', data.exam);
    requestData.append('exam_link', data.exam_link);
    requestData.append('exam_path', data.exam_path);
    requestData.append('exam_file', data.exam_file);
    requestData.append('exam_pb', data.exam_pb);
    requestData.append('remarks', data.remarks);
    requestData.append('job_template_id', data.job_template_id);

    const jobId = yield select(makeSelectJobId());
    const response = yield call(updateJobOrder, jobId, requestData, config);
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        updateJobFailed({
          message: 'Failed to save job order. Please contact PB Administrator.',
          loading: false,
          show_modal: false,
          job_form_error: true,
        }),
      );
      return;
    }

    yield put(
      updateJobSuccess({
        message: 'Job Post is changed.',
        loading: false,
        show_modal: true,
        job_form_error: false,
      }),
    );

    socket.emit('modify-job-order-core2', {jobOrderStatus: 'MODIFIED', jobOrderId: jobId, token: getToken()});

  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      updateJobFailed({
        message: 'Failed to save job order. Please contact PB Administrator.',
        loading: false,
        show_modal: false,
        job_form_error: true,
      }),
    );
  }
}

/**
 * Attempt job order duplicate
 */
export function* attemptJobDuplicate() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const requestData = {
      job_order_id: yield select(makeSelectJobId()),
      num_of_duplicate: yield select(makeSelectNumberOfDuplicate()),
    };

    const response = yield call(duplicateJobOrder, requestData, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        requestJobDuplicateFailed({
          message:
            'Failed to duplicate job order. Please contact PB Administrator.',
          loading: false,
        }),
      );
      return;
    }

    yield put(
      requestJobDuplicateSuccess({
        message: 'Job Post is succesfully duplicated.',
        loading: false,
      }),
    );
    yield put(fetchAllJobRequisitions());
    response.data.data[0].token = getToken();
    socket.emit('duplicate-job-order-core2', response.data.data);
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      requestJobDuplicateFailed({
        message: 'Failed to duplicate job order. Please contact PB Administrator.',
        loading: false,
      }),
    );
  }
}

function* attemptRequestBlindCvs() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const response = yield call(fetchBlindCvs, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        requestBlindCvFailed({
          message:
            'Failed to fetch blind cvs. Please contact PB Administrator.',
          loading: false,
        }),
      );
      return;
    }

    yield put(
      requestBlindCvSuccess({
        blind_cvs: response.data.data,
        loading: false,
      }),
    );
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      requestBlindCvFailed({
        message: 'Failed to fetch blind cvs. Please contact PB Administrator.',
        loading: false,
      }),
    );
  }
}
/**
 * Action listener for filejobreq page
 */
export default function* watchfileJobReqPageActions() {
  yield takeLatest(
    FETCH_ALL_JOB_REQUISITIONS,
    attemptRequestAllJobRequisitions,
  );
  yield takeLatest(
    FETCH_CLOSED_JOB_REQUISITIONS,
    attemptRequestClosedJobRequisitions,
  );
  yield takeLatest(MODIFY_JOB_ORDER, atteptModifyJobOrder);
  yield takeLatest(REQUEST_FETCH_KEYWORDS, attemptRequestKeywords);
  yield takeLatest(REQUEST_FETCH_JOB_CATEGORIES, attemptRequestJobCategories);
  yield takeLatest(REQUEST_FETCH_JOB_TEMPLATE, attemptRequestJobTemplates);
  yield takeLatest(REQUEST_FETCH_JOB, attemptRequestJob);
  yield takeLatest(REQUEST_SAVE_JOB, attemptSaveJob);
  yield takeLatest(REQUEST_UPDATE_JOB, attemptUpdateJob);
  yield takeLatest(REQUEST_JOB_DUPLICATE, attemptJobDuplicate);
  yield takeLatest(REQUEST_FETCH_BLIND_CV, attemptRequestBlindCvs);
  yield takeLatest(
    REQUEST_FETCH_FILTER_JOB_TEMPLATE,
    attemptRequestFilterJobTemplates,
  );
}
