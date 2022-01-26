import Cookies from 'js-cookie';
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { REQUEST_CSV_USER } from './constants';

import { uploadPbCsvUser } from './api';
import {
  makeCsvUsers,
} from './selectors';
import { requestTestMessage, requestUserMailStatus } from './actions';

export function* attemptRequestCsvSaveUser() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const data = {
      users: yield select(makeCsvUsers()),
    };

    const updatedUsers = yield call(uploadPbCsvUser, config, data);

    yield put(
      requestUserMailStatus({
        request: updatedUsers.data.data.data.request,
        sending_status: true,
        statistic_response: updatedUsers.data.data,
      }),
    );
  } catch (err) {
    console.log(`err catch${err}`);
  }
}

export default function* mailConfigPageSaga() {
  yield takeLatest(REQUEST_CSV_USER, attemptRequestCsvSaveUser);
}
