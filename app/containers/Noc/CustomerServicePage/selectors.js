import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the customerServicePage state domain
 */

const selectCustomerServicePageDomain = state =>
  state.customerServicePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CustomerServicePage
 */

const makeSelectCustomerServicePage = () =>
  createSelector(
    selectCustomerServicePageDomain,
    substate => substate,
  );

export default makeSelectCustomerServicePage;
export { selectCustomerServicePageDomain };
