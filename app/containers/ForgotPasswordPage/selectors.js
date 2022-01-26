import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the forgotPasswordPage state domain
 */

const selectForgotPasswordPageDomain = state =>
  state.forgotPasswordPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectEmail = () =>
  createSelector(
    selectForgotPasswordPageDomain,
    forgotPasswordState => forgotPasswordState.userData.email,
  );

/**
 * Selector for loading
 */
const makeSelectLoading = () =>
  createSelector(
    selectForgotPasswordPageDomain,
    forgotPasswordState => forgotPasswordState.ui.loading,
  );

/**
 * Selector for error message
 */
const makeSelectErrorMessage = () =>
  createSelector(
    selectForgotPasswordPageDomain,
    forgotPasswordState => forgotPasswordState.ui.errorMessage,
  );

/**
 * Selector for disabling button
 */
const makeSelectButtonDisabled = () =>
  createSelector(
    selectForgotPasswordPageDomain,
    forgotPasswordState => forgotPasswordState.ui.buttonDisabled,
  );

export {
  selectForgotPasswordPageDomain,
  makeSelectEmail,
  makeSelectLoading,
  makeSelectErrorMessage,
  makeSelectButtonDisabled,
};
