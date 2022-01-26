import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Selector for email
 */
const makeSelectEmail = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.userData.email,
  );

/**
 * Selector for password
 */
const makeSelectPassword = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.userData.password,
  );

/**
 * Selector for loading
 */
const makeSelectLoading = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.ui.loading,
  );

/**
 * Selector for error Message
 */
const makeSelectErrorMessage = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.ui.errorMessage,
  );

const makeSelectButtonDisabled = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.ui.buttonDisabled,
  );

const makeSelectToken = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.userData.token,
  );

const makeSelectFirstName = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.userData.first_name,
  );

const makeSelectlastName = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.userData.last_name,
  );

const makeSelectRoles = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.userData.roles,
  );

const makeSelectTogglePasswordMask = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.ui.togglePasswordMask,
  );

const makeSelectToggleIcon = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.ui.toggleIcon,
  );

export {
  selectLoginPageDomain,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectLoading,
  makeSelectErrorMessage,
  makeSelectButtonDisabled,
  makeSelectToken,
  makeSelectFirstName,
  makeSelectlastName,
  makeSelectRoles,
  makeSelectTogglePasswordMask,
  makeSelectToggleIcon,
};
