import Cookies from 'js-cookie';
import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_INVOICE } from './constants';
import { fetchInvoiceFailed, fetchInvoiceSuccess } from './actions';
import { getInvoices } from './api';
import { checkIfResponseIsSuccess } from '../../App/globalHelpers';

/**
 * Attempt requestuing client's invoices
 */
export function* attemptRequestInvoices() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const response = yield call(getInvoices, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        fetchInvoiceFailed({
          message: 'Failed to get invoies',
        }),
      );
      return;
    }

    yield put(
      fetchInvoiceSuccess({
        invoices: response.data.data,
        message: 'Success',
      }),
    );
  } catch (error) {
    yield put(
      fetchInvoiceFailed({
        message: 'Failed to get invoies',
      }),
    );
  }
}

export default function* watchBillingHistoryPageActions() {
  yield takeLatest(FETCH_INVOICE, attemptRequestInvoices);
}
