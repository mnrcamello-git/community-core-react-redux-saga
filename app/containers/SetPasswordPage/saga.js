import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  CHECK_TOKEN_AVAILABILITY,
  HANDLE_PASSWORD_CHANGE,
  HANDLE_RESEND_LINK,
} from './constants';
import { makeSelectToken, makeSelectPassword } from './selectors';
import { verifyToken, resendLink } from './api';
import {
  setFormAvailability,
  handlePasswordChangeFailed,
  setPasswordStatus,
  handleResendLinkSuccess,
  handleResendLinkFailed,
  handlePasswordChangeSuccess,
} from './actions';
import { isResponse401, checkIfResponseIsSuccess } from '../App/globalHelpers';
import { setPassword } from './api';

// Individual exports for testing
export function* checkTokenAvailability() {
  // See example in containers/HomePage/saga.js
  try {
    const token = yield select(makeSelectToken());
    const response = yield call(verifyToken, token);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(setFormAvailability(false));
    }
    if (response.data.data !== 0) {
      //password is already set
      yield put(setPasswordStatus(true));
    }
    yield put(setFormAvailability(true));
  } catch (error) {
    if (isResponse401(error)) {
      yield put(setFormAvailability(false));
    }
  }
}

export function* handlePasswordChange() {
  try {
    const token = yield select(makeSelectToken());
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const passwordData = yield select(makeSelectPassword());
    const response = yield call(setPassword, passwordData, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      handlePasswordChangeFailed(
        'Failed to set password, please contact admin',
      );
    }

    yield put(
      handlePasswordChangeSuccess(
        'Successfully set password, you may now login',
      ),
    );
  } catch (error) {
    yield put(
      handlePasswordChangeFailed(
        'We encountered a server error, please try again later',
      ),
    );
  }
}

export function* handleResendLink() {
  try {
    const token = yield select(makeSelectToken());

    const response = yield call(resendLink, token);
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(handleResendLinkFailed(true));
    }

    yield put(handleResendLinkSuccess(true));
  } catch (error) {
    yield put(handleResendLinkFailed(true));
  }
}

export default function* watchSetPasswordActions() {
  yield takeLatest(CHECK_TOKEN_AVAILABILITY, checkTokenAvailability);
  yield takeLatest(HANDLE_PASSWORD_CHANGE, handlePasswordChange);
  yield takeLatest(HANDLE_RESEND_LINK, handleResendLink);
}
