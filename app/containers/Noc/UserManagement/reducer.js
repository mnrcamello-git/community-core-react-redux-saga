/*
 *
 * UserManagement reducer
 *
 */
import produce from 'immer';
import {
  REQUEST_USERS_FAILED,
  REQUEST_USERS_SUCCESS,
  USER_SELECT,
  UPDATE_DROPDOWN_ACTION,
  REQUEST_CONFIGURE_USER,
  FAILED_CONFIGURE_USER,
  SUCCESS_CONFIGURE_USER,
  REQUEST_USERS,
  REQUEST_CLIENTS,
  REQUEST_CLIENTS_SUCCESS,
  REQUEST_CLIENTS_FAILED,
  REQUEST_ROLES,
  REQUEST_ROLES_SUCCESS,
  REQUEST_ROLES_FAILED,
  CHANGE_FIRSTNAME,
  CHANGE_LASTNAME,
  CHANGE_EMAIL,
  CHANGE_POSITION,
  CHANGE_LANDLINE,
  CHANGE_MOBILE,
  CHANGE_CLIENT,
  CHANGE_ROLE,
  CHANGE_SKYPE,
  CHANGE_GROUP,
  CHANGE_ACTIVE,
  SAVE_USER_SUCCESS,
  REQUEST_SAVE_USER,
  SAVE_USER_FAILED,
  CHANGE_SHOW_USER_MODAL,
  CLEAR_USER_FORM,
  CHANGE_SHOW_USER_SUCCESS_MODAL,
  CHANGE_SHOW_USER_ERROR_MODAL,
  CHANGE_SAVING_USER_LOADING,
  REQUEST_FETCH_USER,
  REQUEST_FETCH_USER_FAILED,
  REQUEST_FETCH_USER_SUCCESS,
} from './constants';

export const initialState = {
  ui: {
    configureLoading: false,
    configureLoadingMessage: '',
    configureError: false,
    configureErrorMessage: '',
    configureSuccess: false,
    configureSuccessMessage: '',
    toggleClearSelectedRows: false,
    show_user_modal: false,
    show_user_save_success_modal: false,
    show_user_save_error_modal: false,
    user_saving: false,
  },
  api: {
    users: [],
    clients: [],
    roles: [],
  },
  userData: {
    user: {
      first_name: '',
      last_name: '',
      email: '',
      position: '',
      groups: [],
      skype: '',
      landline_nbr: '',
      mobile_nbr: '',
      active: 1,
      role: [],
      client: [],
    },
    errors: {
      first_name_error: '',
      last_name_error: '',
      email_error: '',
      position_error: '',
      groups_error: '',
      role_error: '',
      client_error: '',
    },
  },
  componentData: {
    selectedUsers: [],
    dropdownAction: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const userManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_USERS_FAILED:
        draft.ui.errorMessage = action.message;
        break;
      case REQUEST_USERS_SUCCESS:
        draft.api.users = action.payload;
        draft.ui.toggleClearSelectedRows = true;
        (draft.ui.selectedUsers = []),
          (draft.componentData.dropdownAction = '');
        break;
      case USER_SELECT:
        draft.componentData.selectedUsers = action.payload;
        break;
      case UPDATE_DROPDOWN_ACTION:
        draft.componentData.dropdownAction = action.payload;
        break;
      case REQUEST_CONFIGURE_USER:
        draft.ui.configureLoading = true;
        draft.ui.configureLoadingMessage = action.payload.message;
        draft.ui.dropdownAction = action.payload.action;
        draft.ui.configureErrorMessage = '';
        draft.ui.configureSuccessMessage = '';
        draft.ui.configureError = false;
        draft.ui.configureSuccess = false;
        break;
      case FAILED_CONFIGURE_USER:
        draft.ui.configureLoading = false;
        draft.ui.configureLoadingMessage = '';
        draft.ui.configureError = true;
        draft.ui.configureErrorMessage = action.message;
        break;
      case SUCCESS_CONFIGURE_USER:
        draft.ui.configureLoading = false;
        draft.ui.configureLoadingMessage = '';
        draft.ui.configureError = false;
        draft.ui.configureSuccessMessage = action.message;
        draft.ui.configureSuccess = true;
        draft.ui.toggleClearSelectedRows = false;
        draft.componentData.selectedUsers = [];
        break;
      case REQUEST_CLIENTS:
        break;
      case REQUEST_CLIENTS_SUCCESS:
        draft.api.clients = action.payload.clients;
        break;
      case REQUEST_CLIENTS_FAILED:
        draft.api.clients = action.payload.clients;
        break;
      case REQUEST_ROLES:
        break;
      case REQUEST_ROLES_SUCCESS:
        draft.api.roles = action.payload.roles;
        break;
      case REQUEST_ROLES_FAILED:
        draft.api.roles = action.payload.roles;
        break;
      case CHANGE_FIRSTNAME:
        draft.userData.user.first_name = action.payload.first_name;
        draft.userData.errors.first_name_error =
          action.payload.first_name_error;
        break;
      case CHANGE_LASTNAME:
        draft.userData.user.last_name = action.payload.last_name;
        draft.userData.errors.last_name_error = action.payload.last_name_error;
        break;
      case CHANGE_EMAIL:
        draft.userData.user.email = action.payload.email;
        draft.userData.errors.email_error = action.payload.email_error;
        break;
      case CHANGE_POSITION:
        draft.userData.user.position = action.payload.position;
        draft.userData.errors.position_error = action.payload.position_error;
        break;
      case CHANGE_LANDLINE:
        draft.userData.user.landline_nbr = action.payload.landline_nbr;
        break;
      case CHANGE_MOBILE:
        draft.userData.user.mobile_nbr = action.payload.mobile_nbr;
        break;
      case CHANGE_CLIENT:
        draft.userData.user.client = action.payload.client;
        draft.userData.errors.client_error = action.payload.client_error;
        break;
      case CHANGE_ROLE:
        draft.userData.user.role = action.payload.role;
        draft.userData.errors.role_error = action.payload.role_error;
        break;
      case CHANGE_GROUP:
        draft.userData.user.groups = action.payload.groups;
        draft.userData.errors.groups_error = action.payload.groups_error;
        break;
      case CHANGE_SKYPE:
        draft.userData.user.skype = action.payload.skype;
        break;
      case CHANGE_ACTIVE:
        draft.userData.user.active = action.payload.active;
        break;
      case REQUEST_SAVE_USER:
        draft.ui.user_saving = action.payload.user_saving;
        break;
      case SAVE_USER_SUCCESS:
        draft.ui.show_user_save_success_modal =
          action.payload.show_user_save_success_modal;
        draft.ui.user_saving = action.payload.user_saving;
        break;
      case SAVE_USER_FAILED:
        draft.ui.show_user_save_error_modal =
          action.payload.show_user_save_error_modal;
        draft.ui.user_saving = action.payload.user_saving;
        break;
      case CHANGE_SHOW_USER_MODAL:
        draft.ui.show_user_modal = action.payload.show_user_modal;
        break;
      case CHANGE_SHOW_USER_SUCCESS_MODAL:
        draft.ui.show_user_save_success_modal =
          action.payload.show_user_save_success_modal;
        break;
      case CHANGE_SHOW_USER_ERROR_MODAL:
        draft.ui.show_user_save_error_modal =
          action.payload.show_user_save_error_modal;
        break;
      case CLEAR_USER_FORM:
        draft.userData.user.first_name = '';
        draft.userData.user.last_name = '';
        draft.userData.user.email = '';
        draft.userData.user.position = '';
        draft.userData.user.groups = '';
        draft.userData.user.skype = '';
        draft.userData.user.landline_nbr = '';
        draft.userData.user.mobile_nbr = '';
        draft.userData.user.active = 1;
        draft.userData.user.role = [];
        draft.userData.user.client = [];
        draft.userData.errors.first_name_error = '';
        draft.userData.errors.last_name_error = '';
        draft.userData.errors.email_error = '';
        draft.userData.errors.position_error = '';
        draft.userData.errors.groups_error = '';
        draft.userData.errors.role_error = '';
        draft.userData.errors.client_error = '';
        break;
      case CHANGE_SAVING_USER_LOADING:
        draft.ui.user_saving = action.payload.user_saving;
        break;
      case REQUEST_FETCH_USER:
        draft.ui.user_saving = true;
        break;
      case REQUEST_FETCH_USER_SUCCESS:
        draft.ui.user_saving = false;
        break;
      case REQUEST_FETCH_USER_FAILED:
        draft.ui.user_saving = false;
        break;
      default:
        return state;
    }
  });

export default userManagementReducer;
