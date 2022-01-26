import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the invoicingPage state domain
 */

const selectInvoicingPageDomain = state => state.invoicingPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectLastUpdate = () =>
  createSelector(
    selectInvoicingPageDomain,
    substate => substate.userData.last_update,
  );

const makeSelectModalErrorMessage = () =>
  createSelector(
    selectInvoicingPageDomain,
    substate => substate.ui.modalErrorMessage,
  );

const makeSelectInvoiceNumber = () =>
  createSelector(
    selectInvoicingPageDomain,
    substate => substate.userData.invoiceNumber,
  );

const makeSelectInvoiceBreakdown = () =>
  createSelector(
    selectInvoicingPageDomain,
    substate => substate.userData.invoiceBreakdown,
  );

const makeSelectInvoiceBreakdownModalLoading = () =>
  createSelector(
    selectInvoicingPageDomain,
    substate => substate.ui.invoiceBreakdownLoading,
  );

export {
  selectInvoicingPageDomain,
  makeSelectLastUpdate,
  makeSelectModalErrorMessage,
  makeSelectInvoiceNumber,
  makeSelectInvoiceBreakdown,
  makeSelectInvoiceBreakdownModalLoading,
};
