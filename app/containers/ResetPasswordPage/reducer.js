/*
 *
 * ResetPasswordPage reducer
 *
 */
import produce from 'immer';

import {
  CHANGE_NEW_PASSWORD,
  CHANGE_CONFIRM_PASSWORD,
  VALIDATE_NEW_PASSWORD,
  VALIDATE_CONFIRM_PASSWORD,
  RESET_PASSWORD_REQUESTED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  TOGGLE_NEW_PASSWORD_MASK,
  TOGGLE_CONFIRM_PASSWORD_MASK,
  CHECK_TOKEN_AVAILABILITY,
  CHECK_TOKEN_AVAILABILITY_SUCCESS,
  CHECK_TOKEN_AVAILABILITY_FAILED,
} from './constants';

export const initialState = {
  userData: {
    new_password: '',
    confirm_password: '',
    reset_token: '',
    token: '',
  },
  ui: {
    loading: false,
    isTokenValidityLoading: false,
    errorMessage: '',
    buttonDisabled: true,
    inputNewType: 'password',
    inputConfirmType: 'password',
    newIconEye: 'fa fa-eye',
    confirmIconEye: 'fa fa-eye',
  },
};

const resetPasswordPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_NEW_PASSWORD:
        draft.userData.new_password = action.new_password;
        break;
      case CHANGE_CONFIRM_PASSWORD:
        draft.userData.confirm_password = action.confirm_password;
        break;
      case VALIDATE_NEW_PASSWORD:
        draft.userData.new_password = action.new_password;
        draft.ui.errorMessage = action.message;
        draft.ui.buttonDisabled = action.buttonDisabled;
        break;
      case VALIDATE_CONFIRM_PASSWORD:
        draft.userData.confirm_password = action.confirm_password;
        draft.ui.errorMessage = action.message;
        draft.ui.buttonDisabled = action.buttonDisabled;
        break;
      case RESET_PASSWORD_REQUESTED:
        draft.ui.loading = true;
        draft.ui.errorMessage = action.message;
        draft.userData.reset_token = action.reset_token;
        break;
      case RESET_PASSWORD_SUCCESS:
        draft.ui.loading = false;
        draft.ui.buttonDisabled = false;
        draft.ui.errorMessage = action.message;
        draft.userData.token = action.token;
        break;
      case RESET_PASSWORD_FAILED:
        draft.ui.loading = false;
        draft.ui.buttonDisabled = false;
        draft.ui.errorMessage = action.message;
        break;
      case TOGGLE_NEW_PASSWORD_MASK:
        draft.ui.inputNewType = action.payload.input_type;
        draft.ui.newIconEye = action.payload.eye_icon;
        break;
      case TOGGLE_CONFIRM_PASSWORD_MASK:
        draft.ui.inputConfirmType = action.payload.input_type;
        draft.ui.confirmIconEye = action.payload.eye_icon;
        break;
      case CHECK_TOKEN_AVAILABILITY:
        draft.userData.token = action.payload;
        draft.ui.isTokenValidityLoading = true;
        break;
      case CHECK_TOKEN_AVAILABILITY_SUCCESS:
        draft.userData.token = action.payload;
        draft.ui.isTokenValidityLoading = false;
        break;
      case CHECK_TOKEN_AVAILABILITY_FAILED:
        draft.userData.token = action.payload;
        draft.ui.isTokenValidityLoading = false;
        break;
      default:
        draft.userData.new_password = '';
        draft.userData.confirm_password = '';
        draft.ui.errorMessage = '';
        break;
    }
  });

export default resetPasswordPageReducer;
