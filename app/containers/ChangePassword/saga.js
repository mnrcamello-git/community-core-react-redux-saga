import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { PASSWORD_CHANGE_REQUEST } from './constants';
import {
  makeSelectOldPassword,
  makeSelectNewPassword,
  makeSelectConfirmPassword,
} from './selectors';
import { passwordChange } from './api';
import {
  getToken,
  checkIfResponseIsSuccess,
  clearUserData,
} from '../App/globalHelpers';
import { passwordChangeFailed, passwordChangeSuccess } from './actions';

export function* passwordChangeSaga() {
  try {
    const oldPassword = yield select(makeSelectOldPassword());
    const newPassword = yield select(makeSelectNewPassword());
    const confirmPassword = yield select(makeSelectConfirmPassword());
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    const response = yield call(passwordChange, data, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(passwordChangeFailed(response.data.message));
      return;
    }

    yield put(passwordChangeSuccess(response.data.message));
    clearUserData();
    yield put(push('/'));
  } catch (err) {
    yield put(
      passwordChangeFailed("Somthing's not right here, please contact admin"),
    );
  }
}

/**
 * Watcher for action PASSWORD_CHANGE_REQUEST
 */

export default function* watchPasswordChange() {
  yield takeLatest(PASSWORD_CHANGE_REQUEST, passwordChangeSaga);
}
