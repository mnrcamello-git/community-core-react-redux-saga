import { takeLatest, call, put, select } from 'redux-saga/effects';

import { push } from 'connected-react-router';

import {
  getToken,
  isResponse401,
  clearUserData,
  checkIfResponseIsSuccess,
} from '../../App/globalHelpers';
import {
  fetchClientsDueDiligence,
  getClients,
  postDueDiligence,
  updateDueDiligence,
  assignToProspectAPI,
} from './api';
import {
  CREATE_DUE_DILIGENCE,
  GET_CLIENTS,
  GET_DUE_DILIGENCE,
  initialRequirements,
  UPDATE_DUE_DILIGENCE_FAILED,
  UPDATE_DUE_DILIGENCE,
  ASSIGN_TO_PROSPECT,
} from './constants';
import {
  getClientsSuccess,
  getClientsFailed,
  getDueDiligenceSuccess,
  getDueDiligenceFailed,
  createDueDiligenceSuccess,
  updateDueDiligenceSuccess,
  createDueDiligenceFailed,
  updateDueDiligenceFailed,
  getDueDiligence,
  assignToProspectSuccess,
} from './actions';
import { makeSelectDueDiligence, makeSelectSelectedClient } from './selectors';
import { socket } from '../../App/socket';

function* getClientsSaga() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const response = yield call(getClients, config);
    yield put(getClientsSuccess(response.data.data));
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(getClientsFailed());
  }
}

/**
 * Saga for fetching client's due diligence
 */
function* getClientsDueDiligenceSaga() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const selectedClient = yield select(makeSelectSelectedClient());
    const response = yield call(
      fetchClientsDueDiligence,
      config,
      selectedClient.client_id,
    );
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(getDueDiligenceFailed([]));
      return;
    }
    // If empty set initial requirements
    if (response.data.data.length === 0) {
      yield put(
        getDueDiligenceSuccess({
          requirements: initialRequirements,
        }),
      );
      return;
    }
    yield put(getDueDiligenceSuccess(response.data.data[0]));
  } catch (error) {
    console.log(error);
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(getDueDiligenceFailed([]));
  }
}

function* createDueDiligenceSaga() {
  try {
    const dueDiligence = yield select(makeSelectDueDiligence());
    const selectedClient = yield select(makeSelectSelectedClient());
    const data = {
      client_id: selectedClient.client_id,
      status: 'IN_PROGRESS',
      requirements: dueDiligence,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    const response = yield call(postDueDiligence, data, config);
    if (!checkIfResponseIsSuccess(response.data.status)) {
      return;
    }
    yield put(getDueDiligenceSuccess(response.data.data[0]));
    yield put(createDueDiligenceSuccess());
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    console.log(error);
  }
}

function* updateDueDiligenceSaga() {
  try {
    const dueDiligence = yield select(makeSelectDueDiligence());
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    const response = yield call(updateDueDiligence, dueDiligence, config);
    yield put(updateDueDiligenceSuccess(response.data.data));
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(updateDueDiligenceFailed());
  }
}

function* assignToProspectSaga() {
  try {
    const dueDiligence = yield select(makeSelectDueDiligence());
    const client = yield select(makeSelectSelectedClient());
    const data = {
      dueDiligence,
      client,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const result = yield call(assignToProspectAPI, data, config);
    yield put(assignToProspectSuccess());
    result.data.data.token = getToken();
    socket.emit('assign-to-prospect-core2', result.data.data);
  } catch (error) {
    console.log(error);
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
  }
}
// Individual exports for testing
export default function* salesPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_CLIENTS, getClientsSaga);
  yield takeLatest(GET_DUE_DILIGENCE, getClientsDueDiligenceSaga);
  yield takeLatest(CREATE_DUE_DILIGENCE, createDueDiligenceSaga);
  yield takeLatest(UPDATE_DUE_DILIGENCE, updateDueDiligenceSaga);
  yield takeLatest(ASSIGN_TO_PROSPECT, assignToProspectSaga);
}
