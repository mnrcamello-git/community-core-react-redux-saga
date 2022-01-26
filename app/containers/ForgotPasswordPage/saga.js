import { call, put, select, takeLatest } from 'redux-saga/effects';
import { checkIfResponseIsSuccess } from '../App/globalHelpers';
import { FORGOT_PASSWORD_REQUESTED } from './constants';
import { makeSelectEmail } from './selectors';
import { forgotPassword } from './api';
import { forgotPasswordFailed, forgotPasswordSuccess } from './actions';

/**
 * Forgot password attempt
 */
export function* attemptForgotPassword() {
  try {
    const email = yield select(makeSelectEmail());

    const payload = {
      email,
    };

    const response = yield call(forgotPassword, payload);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(forgotPasswordFailed(response.data.message));
      return;
    }

    yield put(
      forgotPasswordSuccess('Please check your email for reset password link'),
    );
  } catch (error) {
    yield put(forgotPasswordFailed('Forgot Password Failed'));
  }
}

/**
 * Function that watch every FORGOT_PASSWORD_REQUESTED action
 */
export default function* watchForgotPassword() {
  yield takeLatest(FORGOT_PASSWORD_REQUESTED, attemptForgotPassword);
}
