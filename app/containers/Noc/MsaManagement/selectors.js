import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mailConfig state domain
 */

const msaManagementDomain = state => state.userManagement || initialState;

/**
 * Other specific selectors
 */

const makeEmployeeAll = () =>
  createSelector(
    msaManagementDomain,
    substate => substate.ui.select_all_employees,
  );

const makeTestMessage = () =>
  createSelector(
    msaManagementDomain,
    substate => substate.ui.test_message,
  );

export default msaManagementDomain;

export { msaManagementDomain, makeEmployeeAll, makeTestMessage };