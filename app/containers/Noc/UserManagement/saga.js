import Cookies from 'js-cookie';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  REQUEST_USERS,
  SUCCESS_BLOCK_UNBLOCK_USER,
  REQUEST_CLIENTS,
  REQUEST_ROLES,
  REQUEST_SAVE_USER,
  REQUEST_CONFIGURE_USER,
  SUCCESS_CONFIGURE_USER,
  REQUEST_FETCH_USER,
} from './constants';
import {
  failedRequestUsers,
  successRequestUsers,
  failedConfigureUsers,
  successConfigureUsers,
  failedRequestClients,
  successRequestClients,
  failedRequestRoles,
  successRequestRoles,
  saveUserFailed,
  saveUserSuccess,
  requestFetchUserFailed,
} from './actions';

import { users, configureUsers, saveUser } from './api';
import { formatUserData } from './helpers';
import {
  makeSelectSelectedUsers,
  makeSelectDropdownAction,
  makeSelectClient,
  makeSelectGroups,
  makeSelectRole,
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectEmail,
  makeSelectPosition,
  makeSelectSkype,
  makeSelectLandline,
  makeSelectMobile,
  makeSelectActive,
} from './selectors';
import {
  clearUserData,
  isResponse401,
  checkIfResponseIsSuccess,
} from '../../App/globalHelpers';
import { fetchActiveClients, fetchRoles } from '../../App/commonApi';

/**
 * Saga for API call for all users
 */
export function* attemptRequestUsers() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const response = yield call(users, config);
    const formatted = formatUserData(response.data.data);
    yield put(successRequestUsers(formatted));
  } catch (err) {
    console.log(err);
    if (isResponse401(err)) {
      yield put(failedRequestUsers('Token expired, please login again'));
      clearUserData();
      yield put(push('/token-expired'));
    }
  }
}

/**
 * Saga for API call configuring users
 */
export function* attemptConfigureUser() {
  try {
    const storedUsers = yield select(makeSelectSelectedUsers());
    const action = yield select(makeSelectDropdownAction());

    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: JSON.stringify(storedUsers),
      action,
    };
    const response = yield call(configureUsers, config);
    yield put(successConfigureUsers(response.data.message));
  } catch (err) {
    yield put(
      failedConfigureUsers(
        'We encountered an error while processing your request, please try again or contact admin',
      ),
    );
    if (isResponse401(err)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
  }
}

/**
 * Saga for API call fetching all active clients
 */
export function* attemptRequestActiveClients() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const response = yield call(fetchActiveClients, config);
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        failedRequestClients({
          clients: [],
        }),
      );
      return;
    }

    const clients = response.data.data.map(client => ({
      value: client.client_id,
      label: client.client_name,
    }));

    yield put(successRequestClients({ clients }));
  } catch (err) {
    if (isResponse401(err)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      failedRequestClients({
        clients: [],
      }),
    );
  }
}

/**
 * Saga for API call fetching all active clients
 */
export function* attemptRequestRoles() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const response = yield call(fetchRoles, config);
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        failedRequestRoles({
          roles: [],
        }),
      );
      return;
    }

    const roles = response.data.data.map(role => ({
      value: role.role_id,
      label: role.role_name,
    }));

    yield put(successRequestRoles({ roles }));
  } catch (err) {
    if (isResponse401(err)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      failedRequestRoles({
        roles: [],
      }),
    );
  }
}

/**
 * Saga for API call fetching all active clients
 */
export function* attemptRequestSaveUser() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const client = yield select(makeSelectClient());
    const groups = yield select(makeSelectGroups());
    const role = yield select(makeSelectRole());

    const data = {
      first_name: yield select(makeSelectFirstName()),
      last_name: yield select(makeSelectLastName()),
      email: yield select(makeSelectEmail()),
      position: yield select(makeSelectPosition()),
      groups: groups.value,
      skype: yield select(makeSelectSkype()),
      landline_nbr: yield select(makeSelectLandline()),
      mobile_nbr: yield select(makeSelectMobile()),
      active: yield select(makeSelectActive()),
      role_id: role.value,
      client_id: client.value,
    };

    const response = yield call(saveUser, config, data);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        saveUserFailed({
          show_user_save_success_modal: false,
          show_user_save_error_modal: true,
          user_saving: false,
        }),
      );
      return;
    }

    yield put(
      saveUserSuccess({
        show_user_save_success_modal: true,
        user_saving: false,
      }),
    );
  } catch (err) {
    if (isResponse401(err)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(
      saveUserFailed({
        show_user_save_success_modal: false,
        show_user_save_error_modal: true,
        user_saving: false,
      }),
    );
  }
}

function* attemptFetchUser() {
  try {
    yield put(requestFetchUserFailed());
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(requestFetchUserFailed());
  }
}

// Individual exports for testing
export default function* watchUserManagementActions() {
  yield takeLatest(REQUEST_USERS, attemptRequestUsers);
  yield takeLatest(REQUEST_FETCH_USER, attemptFetchUser);
  yield takeLatest(SUCCESS_BLOCK_UNBLOCK_USER, attemptRequestUsers);
  yield takeLatest(REQUEST_CLIENTS, attemptRequestActiveClients);
  yield takeLatest(REQUEST_ROLES, attemptRequestRoles);
  yield takeLatest(REQUEST_SAVE_USER, attemptRequestSaveUser);
  yield takeLatest(REQUEST_CONFIGURE_USER, attemptConfigureUser);
  yield takeLatest(SUCCESS_CONFIGURE_USER, attemptRequestUsers);
}
