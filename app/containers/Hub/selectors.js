import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the hub state domain
 */

const selectHubDomain = state => state.hub || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Hub
 */

const makeSelectHub = () =>
  createSelector(
    selectHubDomain,
    substate => substate,
  );

export default makeSelectHub;
export { selectHubDomain };
