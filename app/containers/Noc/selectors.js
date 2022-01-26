import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the noc state domain
 */

const selectNocDomain = state => state.noc || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Noc
 */

const makeSelectNoc = () =>
  createSelector(
    selectNocDomain,
    substate => substate,
  );

export default makeSelectNoc;
export { selectNocDomain };
