import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the operationsPage state domain
 */

const selectOperationsPageDomain = state =>
  state.operationsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OperationsPage
 */

const makeSelectOperationsPage = () =>
  createSelector(
    selectOperationsPageDomain,
    substate => substate,
  );

export default makeSelectOperationsPage;
export { selectOperationsPageDomain };
