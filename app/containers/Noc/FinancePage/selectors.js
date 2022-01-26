import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the financePage state domain
 */

const selectFinancePageDomain = state => state.financePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FinancePage
 */

const makeSelectFinancePage = () =>
  createSelector(
    selectFinancePageDomain,
    substate => substate,
  );

export default makeSelectFinancePage;
export { selectFinancePageDomain };
