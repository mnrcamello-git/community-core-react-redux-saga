import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the salesPage state domain
 */

const selectSalesPageDomain = state => state.salesPage || initialState;
/**
 * Other specific selectors
 */

/**
 * Default selector used by SalesPage
 */

const makeSelectSalesPage = () =>
  createSelector(
    selectSalesPageDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectSalesPageDomain,
    substate => substate.ui.loading,
  );

const makeSelectClients = () =>
  createSelector(
    selectSalesPageDomain,
    substate => substate.data.clients,
  );

const makeSelectIsModalShow = () =>
  createSelector(
    selectSalesPageDomain,
    substate => substate.ui.isModalShow,
  );

const makeSelectDueDiligence = () =>
  createSelector(
    selectSalesPageDomain,
    substate => substate.data.dueDiligence,
  );

const makeSelectSelectedClient = () =>
  createSelector(
    selectSalesPageDomain,
    substate => substate.data.selectedClient,
  );

const makeSelectDdFailed = () =>
  createSelector(
    selectSalesPageDomain,
    substate => substate.ui.isDdFailed,
  );

const makeSelectDdSuccess = () =>
  createSelector(
    selectSalesPageDomain,
    substate => substate.ui.isDdSuccess,
  );

const makeSelectConfirmation = () =>
  createSelector(
    selectSalesPageDomain,
    substate => substate.ui.confirmation,
  );

const makeSelectAssignToProspectModal = () =>
  createSelector(
    selectSalesPageDomain,
    substate => substate.ui.assignToProspectModal,
  );

const makeSelectAssignToProspectModalSuccess = () =>
  createSelector(
    selectSalesPageDomain,
    substate => substate.ui.assignToProspectSuccess,
  );

export default makeSelectSalesPage;
export {
  selectSalesPageDomain,
  makeSelectClients,
  makeSelectLoading,
  makeSelectIsModalShow,
  makeSelectDueDiligence,
  makeSelectSelectedClient,
  makeSelectDdFailed,
  makeSelectDdSuccess,
  makeSelectConfirmation,
  makeSelectAssignToProspectModalSuccess,
  makeSelectAssignToProspectModal,
};
