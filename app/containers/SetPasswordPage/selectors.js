import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the setPasswordPage state domain
 */

const selectSetPasswordPageDomain = state =>
  state.setPasswordPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SetPasswordPage
 */

const makeSelectSetPasswordPage = () =>
  createSelector(
    selectSetPasswordPageDomain,
    substate => substate,
  );

const makeSelectToken = () =>
  createSelector(
    selectSetPasswordPageDomain,
    substate => substate.userData.token,
  );

const makeSelectIsFormVisible = () =>
  createSelector(
    selectSetPasswordPageDomain,
    substate => substate.ui.isFormVisible,
  );

const makeSelectLoading = () =>
  createSelector(
    selectSetPasswordPageDomain,
    substate => substate.ui.loading,
  );

const makeSelectPassword = () =>
  createSelector(
    selectSetPasswordPageDomain,
    substate => substate.userData.passwordData,
  );

const makeSelectPasswordStatus = () =>
  createSelector(
    selectSetPasswordPageDomain,
    substate => substate.userData.isPasswordSet,
  );

const makeSelectResendSuccess = () =>
  createSelector(
    selectSetPasswordPageDomain,
    substate => substate.ui.resendSuccess,
  );

const makeSelectResendFailed = () =>
  createSelector(
    selectSetPasswordPageDomain,
    substate => substate.ui.resendFailed,
  );

const makeSelectTogglePasswordMask = () =>
  createSelector(
    selectSetPasswordPageDomain,
    substate => substate.ui.togglePasswordMask,
  );

const makeSelectToggleIcon = () =>
  createSelector(
    selectSetPasswordPageDomain,
    substate => substate.ui.toggleIcon,
  );

const makeSelectHandlePasswordSuccessMessage = () =>
  createSelector(
    selectSetPasswordPageDomain,
    substate => substate.ui.passwordChangeSuccessMessage,
  );

export default makeSelectSetPasswordPage;
export {
  selectSetPasswordPageDomain,
  makeSelectToken,
  makeSelectIsFormVisible,
  makeSelectLoading,
  makeSelectPassword,
  makeSelectPasswordStatus,
  makeSelectResendSuccess,
  makeSelectResendFailed,
  makeSelectTogglePasswordMask,
  makeSelectToggleIcon,
  makeSelectHandlePasswordSuccessMessage,
};
