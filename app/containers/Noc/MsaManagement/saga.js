import Cookies from 'js-cookie';
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { REQUEST_EMPLOYEE } from './constants';
import { allEmployees } from './api';
import { makeEmployeeAll } from './selectors';
import { requestAllEmployees } from './actions';

export function* attemptRequestEmployees() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const data = {
      users: yield select(makeEmployeeAll()),
    };

    const employees = yield call(allEmployees, config, data);

    yield put(
      requestAllEmployees({
        request: employees.data.data.data,
        sending_status: true,
        statistic_response: employees.data.message,
      }),
    );
  } catch (err) {
    console.log(`err catch${err}`);
  }
}

export default function* msaManagementSaga() {
  yield takeLatest(REQUEST_EMPLOYEE, attemptRequestEmployees);
}