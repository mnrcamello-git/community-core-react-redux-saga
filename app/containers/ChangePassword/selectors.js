import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePassword state domain
 */

const selectChangePasswordDomain = state =>
  state.changePassword || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ChangePassword
 */

const makeSelectChangePassword = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate,
  );

const makeSelectOldPassword = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.data.oldPassword,
  );

const makeSelectNewPassword = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.data.newPassword,
  );

const makeSelectConfirmPassword = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.data.confirmPassword,
  );

const makeSelectErrorMessage = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.ui.errorMessage,
  );

const makeSelectHasErrors = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.ui.hasErrors,
  );

const makeSelectSuccessMessage = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.ui.successMessage,
  );

const makeSelectLoading = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.ui.loading,
  );

const makeSelectOldInputType = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.ui.inputOldType,
  );

const makeSelectOldEyeIcon = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.ui.oldEyeIcon,
  );

const makeSelectNewInputType = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.ui.inputNewType,
  );

const makeSelectNewEyeIcon = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.ui.newEyeIcon,
  );

const makeSelectConfirmInputType = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.ui.inputConfirmType,
  );

const makeSelectConfirmEyeIcon = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.ui.confirmEyeIcon,
  );

export {
  makeSelectChangePassword,
  makeSelectOldPassword,
  makeSelectNewPassword,
  makeSelectConfirmPassword,
  makeSelectHasErrors,
  makeSelectErrorMessage,
  makeSelectSuccessMessage,
  makeSelectLoading,
  makeSelectOldInputType,
  makeSelectOldEyeIcon,
  makeSelectNewInputType,
  makeSelectNewEyeIcon,
  makeSelectConfirmInputType,
  makeSelectConfirmEyeIcon,
};
