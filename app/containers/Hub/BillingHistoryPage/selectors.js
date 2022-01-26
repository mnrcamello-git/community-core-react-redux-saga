import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the billingHistoryPage state domain
 */

const selectBillingHistoryPageDomain = state =>
  state.billingHistoryPage || initialState;

/**
 * Other specific selectors
 */

const makeSelectInvoices = () =>
  createSelector(
    selectBillingHistoryPageDomain,
    substate => substate.userData.invoices,
  );

const makeSelectErrorMessage = () =>
  createSelector(
    selectBillingHistoryPageDomain,
    substate => substate.ui.errorMessage,
  );

const makeSelectLoading = () =>
  createSelector(
    selectBillingHistoryPageDomain,
    substate => substate.ui.loading,
  );

const makeSelectBillingHistoryPage = () =>
  createSelector(
    selectBillingHistoryPageDomain,
    substate => substate,
  );

const makeSelectedInvoice = () =>
  createSelector(
    selectBillingHistoryPageDomain,
    substate => substate.userData.selected_invoice,
  );

export {
  selectBillingHistoryPageDomain,
  makeSelectInvoices,
  makeSelectErrorMessage,
  makeSelectLoading,
  makeSelectBillingHistoryPage,
  makeSelectedInvoice,
};
