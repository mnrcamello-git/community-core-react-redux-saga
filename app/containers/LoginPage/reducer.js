/*
 * Reducers specify how the application's state changes in response to actions sent to the store
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  INITIALIZE_USER,
  INITIALIZE_ACCESS,
  TOGGLE_PASSWORD_MASK,
  TOGGLE_ICON,
} from './constants';

export const initialState = {
  userData: {
    email: '',
    password: '',
    token: null,
    first_name: '',
    last_name: '',
    roles: [],
    client_name: '',
  },
  ui: {
    loading: false,
    errorMessage: '',
    buttonDisabled: false,
    togglePasswordMask: 'password',
    toggleIcon: 'fa fa-eye',
    successMessage: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_EMAIL:
        draft.userData.email = action.email;
        draft.ui.errorMessage = '';
        draft.ui.successMessage = '';
        break;
      case CHANGE_PASSWORD:
        draft.userData.password = action.password;
        draft.ui.errorMessage = '';
        draft.ui.successMessage = '';
        break;
      case LOGIN_REQUESTED:
        draft.ui.loading = true;
        draft.ui.errorMessage = action.message;
        draft.ui.buttonDisabled = true;
        break;
      case LOGIN_SUCCESS:
        draft.ui.loading = false;
        draft.ui.buttonDisabled = false;
        draft.userData.token = action.token;
        break;
      case LOGIN_FAILED:
        draft.ui.loading = false;
        draft.ui.errorMessage = action.message;
        draft.ui.buttonDisabled = false;
        break;
      case INITIALIZE_USER:
        draft.userData.first_name = action.payload.first_name;
        draft.userData.last_name = action.payload.last_name;
        draft.userData.roles = action.payload.user_roles;
        draft.userData.client_name = action.payload.client_name;
        break;
      case INITIALIZE_ACCESS:
        draft.ui.errorMessage = action.message;
        break;
      case TOGGLE_PASSWORD_MASK:
        draft.ui.togglePasswordMask = action.payload.mask;
        draft.ui.toggleIcon = action.payload.className;
        break;
      default:
        break;
    }
  });

export default loginPageReducer;
