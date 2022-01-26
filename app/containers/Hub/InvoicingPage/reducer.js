/*
 *
 * InvoicingPage reducer
 *
 */
import produce from 'immer';
import {
  FETCH_LATEST_INVOICE,
  FETCH_LATEST_INVOICE_SUCCESS,
  FETCH_LATEST_INVOICE_FAILED,
  FETCH_INVOICE_BREAKDOWN,
  FETCH_INVOICE_BREAKDOWN_SUCCESS,
  FETCH_INVOICE_BREAKDOWN_FAILED,
} from './constants';

export const initialState = {
  userData: {
    last_update: '',
    invoiceBreakdown: null,
    invoiceNumber: '',
  },
  ui: {
    modalErrorMessage: '',
    errorMessage: '',
    invoiceBreakdownLoading: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const invoicingPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_LATEST_INVOICE:
        break;
      case FETCH_LATEST_INVOICE_SUCCESS:
        draft.userData.last_update = action.payload.last_update;
        break;
      case FETCH_LATEST_INVOICE_FAILED:
        draft.ui.errorMessage = action.payload.message;
        break;
      case FETCH_INVOICE_BREAKDOWN:
        draft.userData.invoiceNumber = action.payload.invoiceNumber;
        draft.ui.invoiceBreakdownLoading = action.payload.isLoading;
        draft.ui.modalErrorMessage = '';
        draft.userData.invoiceBreakdown = null;
        break;
      case FETCH_INVOICE_BREAKDOWN_SUCCESS:
        draft.userData.invoiceBreakdown = action.payload.invoiceBreakdown;
        draft.ui.modalErrorMessage = '';
        draft.ui.invoiceBreakdownLoading = false;
        break;
      case FETCH_INVOICE_BREAKDOWN_FAILED:
        draft.ui.modalErrorMessage = action.payload;
        draft.ui.invoiceBreakdownLoading = false;
      default:
        break;
    }
  });

export default invoicingPageReducer;
