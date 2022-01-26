/*
 *
 * SetPasswordPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CHECK_TOKEN_AVAILABILITY,
  SET_FORM_AVAILABILITY,
  HANDLE_PASSWORD_CHANGE,
  HANDLE_RESEND_LINK,
  HANDLE_PASSWORD_STATUS,
  HANDLE_RESEND_LINK_SUCCESS,
  HANDLE_RESEND_LINK_FAILED,
  TOGGLE_PASSWORD_MASK,
  TOGGLE_ICON,
  HANDLE_PASSWORD_CHANGE_SUCCESS,
} from './constants';

export const initialState = {
  userData: {
    token: '',
    passwordData: {},
    isPasswordSet: false,
  },
  ui: {
    isFormVisible: false,
    loading: true,
    resendSuccess: false,
    resendFailed: false,
    togglePasswordMask: 'password',
    toggleIcon: 'fa fa-eye',
    passwordChangeSuccessMessage: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const setPasswordPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHECK_TOKEN_AVAILABILITY:
        draft.userData.token = action.payload;
        draft.ui.loading = true;
        break;
      case SET_FORM_AVAILABILITY:
        draft.ui.isFormVisible = action.payload;
        draft.ui.loading = false;
        break;
      case HANDLE_PASSWORD_CHANGE:
        draft.userData.passwordData = action.payload;
        draft.ui.loading = true;
        break;
      case HANDLE_RESEND_LINK:
        draft.ui.loading = true;
        break;
      case HANDLE_PASSWORD_STATUS:
        draft.userData.isPasswordSet = action.payload;
        break;
      case HANDLE_RESEND_LINK_SUCCESS:
        draft.ui.loading = false;
        draft.ui.resendSuccess = true;
        break;
      case HANDLE_RESEND_LINK_FAILED:
        draft.ui.loading = false;
        draft.ui.resendFailed = true;
        break;
      case TOGGLE_PASSWORD_MASK:
        draft.ui.togglePasswordMask = action.payload.mask;
        draft.ui.toggleIcon = action.payload.className;
        break;
      case HANDLE_PASSWORD_CHANGE_SUCCESS:
        draft.ui.loading = false;
        draft.ui.passwordChangeSuccessMessage = action.message;
        break;
    }
  });

export default setPasswordPageReducer;
