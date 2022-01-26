import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the resetPasswordPage state domain
 */
const selectResetPasswordPageDomain = state =>
  state.resetPasswordPage || initialState;

/**
 * Selector for new_password
 */
const makeSelectNewPassword = () =>
  createSelector(
    selectResetPasswordPageDomain,
    resetPasswordState => resetPasswordState.userData.new_password,
  );

/**
 * Select user's token
 */
const makeSelectToken = () =>
  createSelector(
    selectResetPasswordPageDomain,
    resetPasswordState => resetPasswordState.userData.token,
  );

/**
 * Selector for confirm_password
 */
const makeSelectConfirmPassword = () =>
  createSelector(
    selectResetPasswordPageDomain,
    resetPasswordState => resetPasswordState.userData.confirm_password,
  );

/**
 * Selector for loading
 */
const makeSelectLoading = () =>
  createSelector(
    selectResetPasswordPageDomain,
    resetPasswordState => resetPasswordState.ui.loading,
  );

/**
 * Selector for error message
 */
const makeSelectErrorMessage = () =>
  createSelector(
    selectResetPasswordPageDomain,
    resetPasswordState => resetPasswordState.ui.errorMessage,
  );

/**
 * Selector for disabling button
 */
const makeSelectButtonDisabled = () =>
  createSelector(
    selectResetPasswordPageDomain,
    resetPasswordState => resetPasswordState.ui.buttonDisabled,
  );

/**
 * Selector for masking new password
 */
const makeSelectNewInputType = () =>
  createSelector(
    selectResetPasswordPageDomain,
    substate => substate.ui.inputNewType,
  );

/**
 * Selector for eye icon in new password
 */
const makeSelectNewEyeIcon = () =>
  createSelector(
    selectResetPasswordPageDomain,
    substate => substate.ui.newIconEye,
  );

/**
 * Selector for masking confirm password
 */
const makeSelectConfirmInputType = () =>
  createSelector(
    selectResetPasswordPageDomain,
    substate => substate.ui.inputConfirmType,
  );

/**
 * Selector for eye icon in confirm password
 */
const makeSelectConfirmEyeIcon = () =>
  createSelector(
    selectResetPasswordPageDomain,
    substate => substate.ui.confirmIconEye,
  );

const makeSelectIsTokenValidityLoading = () =>
  createSelector(
    selectResetPasswordPageDomain,
    substate => substate.ui.isTokenValidityLoading,
  );

export {
  selectResetPasswordPageDomain,
  makeSelectNewPassword,
  makeSelectLoading,
  makeSelectErrorMessage,
  makeSelectButtonDisabled,
  makeSelectConfirmPassword,
  makeSelectToken,
  makeSelectNewInputType,
  makeSelectNewEyeIcon,
  makeSelectConfirmInputType,
  makeSelectConfirmEyeIcon,
  makeSelectIsTokenValidityLoading,
};
