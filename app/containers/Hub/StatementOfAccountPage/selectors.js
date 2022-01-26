import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the statementOfAccountPage state domain
 */

const selectStatementOfAccountPageDomain = state =>
  state.statementOfAccountPage || initialState;

/**
 * Other specific selectors
 */

const makeSelectInvoices = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.userData.invoices,
  );

const makeSelectErrorMessage = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.ui.errorMessage,
  );

const makeSelectLoading = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.ui.loading,
  );

const makeSelectExportHide = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.ui.isExportHide,
  );

const makeSelectExportFailedMessage = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.ui.exportFailedMessage,
  );
const makeSelectExportLoadingMessage = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.ui.exportLoadingMessage,
  );

const makeSelectExportSuccessMessage = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.ui.exportSuccessMessage,
  );

const makeSelectClientName = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.userData.client.clientName,
  );

const makeSelectClientAddress = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.userData.client.clientAddress,
  );

const makeSelectClientAttention = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.userData.client.clientAttention,
  );

const makeSelectClientCurrency = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.userData.client.clientCurrency,
  );

const makeSelectInvoiceFrom = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.userData.client.invoiceFrom,
  );

const makeSelectInvoiceTo = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.userData.client.invoiceTo,
  );

const makeSelectClientGrandTotalBalance = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.userData.client.clientGrandTotalBalance,
  );

const makeSelectSoaFailedMessage = () =>
  createSelector(
    selectStatementOfAccountPageDomain,
    substate => substate.ui.requestSoaFailedMessage,
  );

export {
  selectStatementOfAccountPageDomain,
  makeSelectErrorMessage,
  makeSelectLoading,
  makeSelectExportHide,
  makeSelectInvoices,
  makeSelectExportLoadingMessage,
  makeSelectExportSuccessMessage,
  makeSelectExportFailedMessage,
  makeSelectClientName,
  makeSelectClientAddress,
  makeSelectClientAttention,
  makeSelectClientCurrency,
  makeSelectInvoiceFrom,
  makeSelectInvoiceTo,
  makeSelectClientGrandTotalBalance,
  makeSelectSoaFailedMessage,
};
