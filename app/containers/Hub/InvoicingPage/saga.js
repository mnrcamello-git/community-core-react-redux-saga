import Cookies from 'js-cookie';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeSelectInvoiceNumber } from './selectors';
import { FETCH_LATEST_INVOICE, FETCH_INVOICE_BREAKDOWN } from './constants';
import {
  fetchLatestInvoiceFailed,
  fetchLatestInvoiceSuccess,
  fetchInvoiceBreakdownSuccess,
  fetchInvoiceBreakdownFailed,
} from './actions';
import {
  checkIfResponseIsSuccess,
  isResponse401,
  clearUserData,
  formatCompleteTimestamp,
} from '../../App/globalHelpers';
import { getLatestInvoice, getInvoiceBreakdown } from './api';

export function* attemptRequestLatestInvoice() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const response = yield call(getLatestInvoice, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        fetchLatestInvoiceFailed({
          message: 'Failed to fetch the latest invoice.',
        }),
      );
      return;
    }

    yield put(
      fetchLatestInvoiceSuccess({
        last_update: response.data.data,
      }),
    );
  } catch (error) {
    yield put(
      fetchLatestInvoiceFailed({
        message: 'Failed to fetch the latest invice.',
      }),
    );
  }
}

export function* attemptRequestInvoiceBreakdown() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const invoiceNumber = yield select(makeSelectInvoiceNumber());

    const response = yield call(getInvoiceBreakdown, invoiceNumber, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        fetchInvoiceBreakdownFailed({
          message: 'Failed to fetch track items',
        }),
      );
      return;
    }

    yield put(
      fetchInvoiceBreakdownSuccess({
        invoiceBreakdown: {
          client: response.data.data.client,
          invoice: response.data.data.invoice,
          tracked_items: response.data.data.tracked_items,
          columns: response.data.data.columns,
          message: 'Success',
        },
      }),
    );
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(fetchInvoiceBreakdownFailed('Failed to fetch track items'));
  }
}
/**
 * Watch all action in Invoice Page
 */
export default function* watchInvoicePageActions() {
  yield takeLatest(FETCH_LATEST_INVOICE, attemptRequestLatestInvoice);
  yield takeLatest(FETCH_INVOICE_BREAKDOWN, attemptRequestInvoiceBreakdown);
}
