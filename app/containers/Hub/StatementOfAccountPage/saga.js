import { put, takeLatest, delay, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { EXPORT_SOA_REQUESTED, REQUEST_SOA } from './constants';
import {
  exportSoaFailed,
  exportSoaSuccess,
  requestSoaAPISuccess,
  requestSOAFailed,
} from './actions';
import { requestSoaAPI } from './api';
import {
  exportDocumentToPdf,
  getToken,
  isResponse401,
  clearUserData,
} from '../../App/globalHelpers';
/**
 * Export html to Pdf
 */
export function* attemptExportSoaToPdf() {
  try {
    yield delay(2500);
    exportDocumentToPdf(
      document.getElementById('statement-of-account'),
      'Statement Of Account',
    );
    yield put(
      exportSoaSuccess({
        message: 'Successfully Exported Statement of Account.',
      }),
    );
  } catch (error) {
    yield put(
      exportSoaFailed({
        message: 'Failed To Export Statement of Account. Please try again.',
      }),
    );
  }
}

/**
 * Saga for requestingSoa
 */
export function* attemptRequestSoa() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const response = yield call(requestSoaAPI, config);
    const payload = {
      data: response.data.data,
      message: response.data.message,
    };

    yield put(requestSoaAPISuccess(payload));
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      requestSOAFailed('We Encountered an error, please contact admin'),
    );
  }
}

/**
 * Function that watch every actions in SOA Page
 */
export default function* watchSoaActions() {
  yield takeLatest(EXPORT_SOA_REQUESTED, attemptExportSoaToPdf);
  yield takeLatest(REQUEST_SOA, attemptRequestSoa);
}
