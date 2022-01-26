import { takeLatest, call, select, put, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import Cookies from 'js-cookie';
import {
  REQUEST_CLIENT_DETAILS,
  REQUEST_FORM_DATA,
  UPDATE_CLIENT_PROFILE,
  REQUEST_CONTRACT_DRAFTS,
  REQUEST_SAVE_CONTRACT_DRAFT,
  REQUEST_DUE_DILIGENCE,
  SUBMIT_DUE_DILIGENCE,
  VIEW_CONTRACT_VIA_NOTIFICATION,
} from './constants';
import {
  getToken,
  isResponse401,
  clearUserData,
  checkIfResponseIsSuccess,
} from '../../App/globalHelpers';
import {
  getClientDetails,
  getFormData,
  updateClientProfile,
  fetchClientProspectContracDrafts,
  updateContractDraft,
  fetchDueDiligence,
  submitDueDiligence,
  updateDueDiligence,
  checkContractLatestVersion,
} from './api';
import {
  requestClientDetailsSuccess,
  getFormDataSuccess,
  updateClientProfileSuccess,
  requestContractDraftsFailed,
  requestContractDraftsSuccess,
  requestClientDetails,
  saveContractDraftSuccess,
  saveContractDraftFailed,
  requestContractDrafts,
  requestDueDiligence,
  requestDueDiligenceSuccess,
  successModifiedDueDiligence,
  failedModifiedDueDiligence,
  viewContractDraft,
} from './actions';
import {
  makeSelectActiveContractDraft,
  makeSelectActiveContractDraftFromNotification,
  makeSelectClientProfile,
  makeSelectDueDiligence,
  makeSelectUpdatedClientProfile,
} from './selectors';

function* attemptRequestDetails() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const response = yield call(getClientDetails, config);

    yield put(requestClientDetailsSuccess(response.data.data));
    yield put(requestDueDiligence());
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
  }
}

function* attemptRequestFormData() {
  try {
    const response = yield call(getFormData);
    yield put(getFormDataSuccess(response));
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
  }
}

function* updateClientProfileSaga() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    const data = yield select(makeSelectUpdatedClientProfile());
    yield call(updateClientProfile, data, config);
    yield put(updateClientProfileSuccess());

    // request after success
    yield put(requestClientDetails());
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
  }
}

function* attemptRequestContractDrafts() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const response = yield call(fetchClientProspectContracDrafts, config);
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        requestContractDraftsFailed(
          'Failed to fetch client prospects contract drafts',
        ),
      );
    }
    yield put(requestContractDraftsSuccess(response.data.data));
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      requestContractDraftsFailed(
        'Failed to fetch client prospects contract drafts',
      ),
    );
  }
}

function* attemptRequestSaveContractDraft() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    let response;

    const contractDraft = yield select(makeSelectActiveContractDraft());
    const requestData = new FormData();

    for (const [key, value] of Object.entries(contractDraft)) {
      requestData.append(key, value);
    }

    // if else because we don't want to request to server 2x
    if (contractDraft.isParent) {
      response = yield call(updateContractDraft, requestData, config, true);
    } else {
      response = yield call(updateContractDraft, requestData, config, {
        revision_id: contractDraft.id,
        isParent: false,
      });
    }

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        saveContractDraftFailed({
          message: 'Failed to save the contract. Please contact PB Admin.',
        }),
      );
    }
    yield put(saveContractDraftSuccess({ message: '' }));
    yield put(requestContractDrafts());
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      saveContractDraftFailed({
        message: 'Failed to save the contract. Please contact PB Admin.',
      }),
    );
  }
}

function* attemptRequestDueDiligence() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const clientProfile = yield select(makeSelectClientProfile());
    const response = yield call(
      fetchDueDiligence,
      clientProfile.client_id,
      config,
    );

    yield put(requestDueDiligenceSuccess(response.data.data));
  } catch (err) {
    if (isResponse401(err)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
  }
}

function* attemptSubmitDueDiligence() {
  try {
    const dd = yield select(makeSelectDueDiligence());
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const requestData = new FormData();

    dd.authorization.forEach(auth => {
      requestData.append('authorizationFiles', auth);
    });

    dd.registration.forEach(registration => {
      requestData.append('registrationFiles', registration);
    });

    dd.others.forEach(other => {
      requestData.append('otherDocumentFiles', other.file);
    });

    requestData.append('othersDocumentData', JSON.stringify(dd.others));

    dd.validIds.forEach(ids => {
      requestData.append('validIdsFiles', ids.file);
    });

    requestData.append('validIdsData', JSON.stringify(dd.validIds));
    requestData.append('dueDiligenceId', dd.dueDiligenceId);
    requestData.append('clientId', dd.clientId);
    requestData.append(
      'authorizationRequirementId',
      dd.authorizationRequirementId,
    );
    requestData.append(
      'registrationRequirementId',
      dd.registrationRequirementId,
    );
    requestData.append(
      'removedExistingFiles',
      JSON.stringify(dd.removedExistingFiles),
    );
    requestData.append(
      'removedExistingFilesKey',
      JSON.stringify(dd.removedExistingFilesKey),
    );

    if (dd.status === 'SUBMITTED') {
      const reponse = yield call(
        updateDueDiligence,
        requestData,
        dd.dueDiligenceId,
        config,
      );
      yield put(requestDueDiligence());
      yield put(successModifiedDueDiligence());
      return;
    }
    const response = yield call(submitDueDiligence, requestData, config);
    yield put(requestDueDiligence());
    yield put(successModifiedDueDiligence());
  } catch (err) {
    if (isResponse401(err)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(failedModifiedDueDiligence());
  }
}

function* viewContractDraftNotification() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const contractDraft = yield select(makeSelectActiveContractDraftFromNotification());

    let response;

    if (contractDraft.id) {
      response = yield call(checkContractLatestVersion, contractDraft.id, config, false);
    } else {
      response = yield call(checkContractLatestVersion, contractDraft.agreement_id, config, true);
    }
    yield put(viewContractDraft({ contract: response.data.data}));

  } catch (error) {
    console.log(error);
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
  }
}

// Individual exports for testing
export default function* agreementPageSaga() {
  yield takeLatest(REQUEST_CLIENT_DETAILS, attemptRequestDetails);
  yield takeLatest(REQUEST_FORM_DATA, attemptRequestFormData);
  yield takeLatest(UPDATE_CLIENT_PROFILE, updateClientProfileSaga);
  yield takeLatest(REQUEST_CONTRACT_DRAFTS, attemptRequestContractDrafts);
  yield takeLatest(
    REQUEST_SAVE_CONTRACT_DRAFT,
    attemptRequestSaveContractDraft,
  );
  yield takeLatest(REQUEST_DUE_DILIGENCE, attemptRequestDueDiligence);
  yield takeLatest(SUBMIT_DUE_DILIGENCE, attemptSubmitDueDiligence);
  yield takeLatest(VIEW_CONTRACT_VIA_NOTIFICATION, viewContractDraftNotification);
}
