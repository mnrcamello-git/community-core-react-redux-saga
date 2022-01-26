import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userManagement state domain
 */

const selectUserManagementDomain = state =>
  state.userManagement || initialState;

/**
 * Other specific selectors
 */

const makeSelectErrorMessage = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.ui.errorMessage,
  );

const makeSelectUsers = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.api.users,
  );

const makeSelectSelectedUsers = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.componentData.selectedUsers,
  );

const makeSelectDropdownAction = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.componentData.dropdownAction,
  );

const makeSelectConfigureLoading = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.ui.configureLoading,
  );

const makeSelectConfigureLoadingMessage = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.ui.configureLoadingMessage,
  );

const makeSelectConfigureError = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.ui.configureError,
  );

const makeSelectConfigureErrorMessage = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.ui.configureErrorMessage,
  );

const makeSelectConfigureSuccessMessage = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.ui.configureSuccessMessage,
  );

const makeSelectConfigureSuccess = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.ui.configureSuccess,
  );

const makeSelectClearRows = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.ui.toggleClearSelectedRows,
  );

const makeSelectClients = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.api.clients,
  );

const makeSelectRoles = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.api.roles,
  );

const makeSelectFirstName = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.user.first_name,
  );

const makeSelectLastName = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.user.last_name,
  );

const makeSelectEmail = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.user.email,
  );

const makeSelectPosition = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.user.position,
  );

const makeSelectGroups = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.user.groups,
  );

const makeSelectSkype = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.user.skype,
  );

const makeSelectLandline = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.user.landline_nbr,
  );

const makeSelectMobile = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.user.mobile_nbr,
  );

const makeSelectActive = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.user.active,
  );

const makeSelectClient = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.user.client,
  );

const makeSelectRole = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.user.role,
  );

const makeSelectFirstNameError = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.errors.first_name_error,
  );

const makeSelectLastNameError = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.errors.last_name_error,
  );

const makeSelectEmailError = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.errors.email_error,
  );

const makeSelectPositionError = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.errors.position_error,
  );

const makeSelectGroupsError = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.errors.groups_error,
  );

const makeSelectClientError = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.errors.client_error,
  );

const makeSelectRoleError = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.userData.errors.role_error,
  );

const makeSelectUserShowModal = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.ui.show_user_modal,
  );

const makeSelectUserSuccessShowModal = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.ui.show_user_save_success_modal,
  );

const makeSelectUserErrorShowModal = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.ui.show_user_save_error_modal,
  );

const makeSelectUserSaving = () =>
  createSelector(
    selectUserManagementDomain,
    substate => substate.ui.user_saving,
  );

export {
  selectUserManagementDomain,
  makeSelectErrorMessage,
  makeSelectUsers,
  makeSelectSelectedUsers,
  makeSelectDropdownAction,
  makeSelectConfigureLoading,
  makeSelectConfigureLoadingMessage,
  makeSelectConfigureError,
  makeSelectConfigureErrorMessage,
  makeSelectConfigureSuccessMessage,
  makeSelectConfigureSuccess,
  makeSelectClearRows,
  makeSelectClients,
  makeSelectRoles,
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectEmail,
  makeSelectPosition,
  makeSelectGroups,
  makeSelectSkype,
  makeSelectLandline,
  makeSelectMobile,
  makeSelectActive,
  makeSelectClient,
  makeSelectRole,
  makeSelectFirstNameError,
  makeSelectLastNameError,
  makeSelectEmailError,
  makeSelectPositionError,
  makeSelectGroupsError,
  makeSelectClientError,
  makeSelectRoleError,
  makeSelectUserShowModal,
  makeSelectUserSuccessShowModal,
  makeSelectUserErrorShowModal,
  makeSelectUserSaving,
};
