import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the marketingPage state domain
 */

const selectMarketingPageDomain = state => state.marketingPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MarketingPage
 */

const makeSelectMarketingPage = () =>
  createSelector(
    selectMarketingPageDomain,
    substate => substate,
  );

export default makeSelectMarketingPage;
export { selectMarketingPageDomain };
