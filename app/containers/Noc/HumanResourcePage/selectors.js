import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the humanResourcePage state domain
 */

const selectHumanResourcePageDomain = state =>
  state.humanResourcePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HumanResourcePage
 */

const makeSelectHumanResourcePage = () =>
  createSelector(
    selectHumanResourcePageDomain,
    substate => substate,
  );

export default makeSelectHumanResourcePage;
export { selectHumanResourcePageDomain };
