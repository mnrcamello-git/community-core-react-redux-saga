import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the communityPage state domain
 */

const selectCommunityPageDomain = state => state.communityPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CommunityPage
 */

const makeSelectCommunityPage = () =>
  createSelector(
    selectCommunityPageDomain,
    substate => substate,
  );

export default makeSelectCommunityPage;
export { selectCommunityPageDomain };
