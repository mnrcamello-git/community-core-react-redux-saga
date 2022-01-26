import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the recruitmentPage state domain
 */

const selectRecruitmentPageDomain = state =>
  state.recruitmentPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RecruitmentPage
 */

const makeSelectRecruitmentPage = () =>
  createSelector(
    selectRecruitmentPageDomain,
    substate => substate,
  );

export default makeSelectRecruitmentPage;
export { selectRecruitmentPageDomain };
