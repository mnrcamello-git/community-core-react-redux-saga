/*
 *
 * StatementOfAccountPage reducer
 *
 */
import produce from 'immer';
import {
  EXPORT_SOA_REQUESTED,
  EXPORT_SOA_SUCCESS,
  EXPORT_SOA_FAILED,
  REQUEST_SOA_SUCCESS,
  REQUEST_SOA,
  REQUEST_SOA_FAILED,
} from './constants';

export const initialState = {
  userData: {
    invoices: [],
    client: {
      clientName: '',
      clientAddress: '',
      clientCurrency: '',
      clientAttention: '',
      clientGrandTotalBalance: 0,
      invoiceFrom: '',
      invoiceTo: '',
    },
  },
  ui: {
    errorMessage: '',
    loading: false,
    isExportHide: false,
    exportSuccessMessage: '',
    exportLoadingMessage: '',
    exportFailedMessage: '',
    requestSoaSuccessMessage: '',
    requestSoaFailedMessage: '',
  },
  invoiceBreakdown: {
    loading: false,
    requestInvoiceBreakdownLoadingMessage: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const statementOfAccountPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case EXPORT_SOA_REQUESTED:
        draft.ui.isExportHide = true;
        draft.ui.exportLoadingMessage = action.payload.message;
        draft.ui.exportSuccessMessage = '';
        draft.ui.exportFailedMessage = '';
        break;
      case EXPORT_SOA_SUCCESS:
        draft.ui.errorMessage = action.payload.message;
        draft.ui.isExportHide = false;
        draft.ui.exportSuccessMessage = action.payload.message;
        draft.ui.exportLoadingMessage = '';
        draft.ui.exportFailedMessage = '';
        break;
      case EXPORT_SOA_FAILED:
        draft.ui.errorMessage = action.payload.message;
        draft.ui.isExportHide = false;
        draft.ui.exportFailedMessage = action.payload.message;
        draft.ui.exportLoadingMessage = '';
        draft.ui.exportSuccessMessage = '';
        break;
      case REQUEST_SOA:
        draft.ui.loading = true;
        break;
      case REQUEST_SOA_SUCCESS:
        draft.userData.invoices = action.payload.data.soas;
        draft.userData.client.clientName =
          action.payload.data.client.client_name;
        draft.userData.client.clientAddress =
          action.payload.data.client.address;
        draft.userData.client.clientCurrency =
          action.payload.data.client.preferred_currency;
        draft.userData.client.clientAttention =
          action.payload.data.client.attention;
        draft.userData.client.invoiceFrom =
          action.payload.data.client.invoiceFrom;
        draft.userData.client.invoiceTo = action.payload.data.client.invoiceTo;
        draft.userData.client.clientGrandTotalBalance =
          action.payload.data.client.invoiceTotal;
        draft.ui.requestSoaSuccessMessage = action.payload.message;
        draft.ui.loading = false;
        break;
      case REQUEST_SOA_FAILED:
        draft.ui.loading = false;
        draft.ui.requestSoaFailedMessage = action.message;
        break;
      default:
        break;
    }
  });

export default statementOfAccountPageReducer;
