/**
 * saga.js
 *
 * This is where we handle the dispatching or actions
 */
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { authenticate, userDetails, fetchUsersAccessData } from './api';
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectToken,
  makeSelectFirstName,
  makeSelectlastName,
  makeSelectRoles,
} from './selectors';
import { LOGIN_REQUESTED, LOGIN_SUCCESS, INITIALIZE_ACCESS } from './constants';
import {
  loginSuccess,
  loginFailed,
  initializeUser,
  initializeAccess,
} from './actions';
import {
  checkIfResponseIsSuccess,
  setToken,
  toTitleCase,
  setUsersMenu,
  clearUserData,
} from '../App/globalHelpers';
const queryString = require('query-string');
/**
 * Saga for handling login api calls
 */
export function* attemptLogin() {
  try {
    const email = yield select(makeSelectEmail());
    const password = yield select(makeSelectPassword());

    const payload = {
      email,
      password,
    };

    const response = yield call(authenticate, payload);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(loginFailed(response.data.message));
      return;
    }

    yield put(loginSuccess(response.data.data));
  } catch (e) {
    yield put(loginFailed("Something's not right here, please contact admin"));
  }
}

/**
 * Saga for handling user states upon successfull login
 */
export function* setUserState() {
  try {
    /**
     * set user token
     */
    const token = yield select(makeSelectToken());
    setToken(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    /**
     * Set user states from response data (name. email etc)
     */
    const response = yield call(userDetails, config);
    yield put(initializeUser(response.data.data));
    /**
     * Set name to localstorage
     */
    const firstName = yield select(makeSelectFirstName());
    const lastName = yield select(makeSelectlastName());

    // If user do not have role will redirect to 404 Page
    if (response.data.data.user_roles.length === 0) {
      clearUserData();
      yield put(
        loginFailed('Failed to login, please contact PB Administrator.'),
      );
      return;
    }

    localStorage.setItem('user_name', toTitleCase(`${firstName} ${lastName}`));
    localStorage.setItem(
      'me',
      JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: response.data.data.email,
        position: response.data.data.position,
        role: response.data.data.user_roles[0].role_code,
      }),
    );
    localStorage.setItem('portals', response.data.data.user_roles[0].dashboard);
    localStorage.setItem(
      'select-portal',
      response.data.data.user_roles[0].dashboard.split(',')[0],
    );
    localStorage.setItem('client_name', response.data.data.client_name);
    yield put(initializeAccess(''));
    /**
     * redirect user to it's specific portal (based on response)
     */
  } catch (err) {
    /**
     * Error here
     */
  }
}
export function* setUserAccess() {
  try {
    const token = yield select(makeSelectToken());
    const roles = yield select(makeSelectRoles());
    setToken(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    /**
     * Set user states from response data (name. email etc)
     */
    const response = yield call(fetchUsersAccessData, config);
    localStorage.setItem('menus', JSON.stringify(response.data.data));
    setUsersMenu(response.data.data);

    /**
     * redirect user to it's specific portal (based on response)
     */
    const query = queryString.parse(location.search);
    if (query.redirect == 'true') {
      let { url } = query;
      url = url.replace('[', '').replace(']', '');
      location.href = url;
      return null;
    }
    yield put(push(roles[0].default_page));
  } catch (error) {
    /**
     * Error here
     */
  }
}
/**
 * Watcher for action LOGIN_REQUESTED
 */

export default function* watchLogin() {
  yield takeLatest(LOGIN_REQUESTED, attemptLogin);
  yield takeLatest(LOGIN_SUCCESS, setUserState);
  yield takeLatest(INITIALIZE_ACCESS, setUserAccess);
}
