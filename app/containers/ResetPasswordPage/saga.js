import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  resetPasswordSuccess,
  resetPasswordFailed,
  checkTokenAvailabilitySuccess,
  checkTokenAvailabilityFailed,
} from './actions';
import {
  checkIfResponseIsSuccess,
  setToken,
  toTitleCase,
  setUsersMenu,
  clearUserData,
  setUserPortal,
} from '../App/globalHelpers';
import { makeSelectNewPassword, makeSelectToken } from './selectors';
import { resetPassword } from './api';
import { verifyToken } from '../SetPasswordPage/api';
import { userDetails, fetchUsersAccessData } from '../LoginPage/api';
import {
  CHECK_TOKEN_AVAILABILITY,
  RESET_PASSWORD_REQUESTED,
  RESET_PASSWORD_SUCCESS,
} from './constants';

/**
 * User attempts to reset password
 */
export function* attemptResetPassword() {
  try {
    const newPassword = yield select(makeSelectNewPassword());

    const payload = {
      new_password: newPassword,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${window.location.search.replace(
          '?token=',
          '',
        )}`,
      },
    };

    const response = yield call(resetPassword, payload, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(resetPasswordFailed(response.data.message));
      return;
    }
    yield put(
      resetPasswordSuccess('Reset Password Success', response.data.data),
    );
  } catch (error) {
    yield put(resetPasswordFailed('Reset Password Failed'));
  }
}

/**
 * Login user after successful reset password
 */
export function* loginUser() {
  try {
    /**
     * set user token
     */
    const token = yield select(makeSelectToken());

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const userDetailsResponse = yield call(userDetails, config);

    // Clear localstorage for possible loginned user.
    clearUserData();

    // Set user information
    localStorage.setItem(
      'user_name',
      toTitleCase(
        `${userDetailsResponse.data.data.first_name} ${
          userDetailsResponse.data.data.last_name
        }`,
      ),
    );
    localStorage.setItem(
      'me',
      JSON.stringify({
        first_name: userDetailsResponse.data.data.first_name,
        last_name: userDetailsResponse.data.data.last_name,
        email: userDetailsResponse.data.data.email,
        position: userDetailsResponse.data.data.position,
        role: userDetailsResponse.data.data.user_roles[0].role_code,
      }),
    );

    // Set selected portal
    setUserPortal(
      userDetailsResponse.data.data.user_roles[0].dashboard,
      userDetailsResponse.data.data.user_roles[0].dashboard.split(',')[0],
    );

    // Set Token
    setToken(token);

    // Set user's menu
    const userAccessResponse = yield call(fetchUsersAccessData, config);
    setUsersMenu(userAccessResponse.data.data);

    // Redirect user to its default page after login
    yield put(push(userDetailsResponse.data.data.user_roles[0].default_page));
  } catch (error) {
    yield put(resetPasswordFailed('Reset Password Failed'));
  }
}

export function* attemptCheckTokenAvailability() {
  try {
    const token = yield select(makeSelectToken());
    const response = yield call(verifyToken, token);

    if (response.data.data !== 0) {
      // expired link
      // window.location.href = '/link-expired';
      return;
    }
    yield put(checkTokenAvailabilitySuccess());
  } catch (error) {
    window.location.href = '/link-expired';
  }
}

/**
 * Action function that will watch for RESET_PASSWORD_REQUESTED Action
 */
export default function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD_REQUESTED, attemptResetPassword);
  yield takeLatest(RESET_PASSWORD_SUCCESS, loginUser);
  yield takeLatest(CHECK_TOKEN_AVAILABILITY, attemptCheckTokenAvailability);
}
