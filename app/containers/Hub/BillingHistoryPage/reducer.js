/*
 *
 * BillingHistoryPage reducer
 *
 */
import produce from 'immer';
import {
  FETCH_INVOICE,
  FETCH_INVOICE_SUCCESS,
  FETCH_INVOICE_FAILED,
  VIEW_INVOICE,
  VIEW_INVOICE_SUCCESS,
  VIEW_INVOICE_FAILED,
} from './constants';

export const initialState = {
  userData: {
    selected_invoice: '',
    invoices: [],
  },
  ui: {
    errorMessage: '',
    loading: true,
  },
};

/* eslint-disable default-case, no-param-reassign */
const billingHistoryPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_INVOICE:
        draft.ui.loading = true;
        break;
      case FETCH_INVOICE_SUCCESS:
        draft.userData.invoices = action.payload.invoices;
        draft.ui.loading = false;
        break;
      case FETCH_INVOICE_FAILED:
        draft.ui.loading = false;
        draft.ui.errorMessage = action.payload.message;
        break;
      case VIEW_INVOICE:
        draft.userData.selected_invoice = action.payload.invoice_number;
        break;
      case VIEW_INVOICE_SUCCESS:
        draft.ui.errorMessage = action.payload.message;
        break;
      case VIEW_INVOICE_FAILED:
        draft.ui.errorMessage = action.payload.message;
        break;
      default:
        break;
    }
  });

export default billingHistoryPageReducer;
