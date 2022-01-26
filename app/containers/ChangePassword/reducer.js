/*
 *
 * ChangePassword reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  ONCHANGE_OLD_PASSWORD,
  ONCHANGE_NEW_PASSWORD,
  ONCHANGE_CONFIRM_PASSWORD,
  PASSWORD_CHANGE_FAILED,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
  TOGGLE_OLD_PASSWORD_MASK,
  TOGGLE_NEW_PASSWORD_MASK,
  TOGGLE_CONFIRM_PASSWORD_MASK,
} from './constants';

export const initialState = {
  data: {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
  ui: {
    hasErrors: false,
    errorMessage: '',
    successMessage: '',
    loading: false,
    inputOldType: 'password',
    oldEyeIcon: 'fa fa-eye',
    inputNewType: 'password',
    newEyeIcon: 'fa fa-eye',
    inputConfirmType: 'password',
    confirmEyeIcon: 'fa fa-eye',
  },
};

/* eslint-disable default-case, no-param-reassign */
const changePasswordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case ONCHANGE_OLD_PASSWORD:
        draft.data.oldPassword = action.payload;
        draft.ui.hasErrors = false;
        draft.ui.errorMessage = '';
        break;
      case ONCHANGE_NEW_PASSWORD:
        draft.data.newPassword = action.payload;
        draft.ui.hasErrors = false;
        draft.ui.errorMessage = '';
        break;
      case ONCHANGE_CONFIRM_PASSWORD:
        draft.data.confirmPassword = action.payload;
        draft.ui.hasErrors = false;
        draft.ui.errorMessage = '';
        break;
      case PASSWORD_CHANGE_FAILED:
        draft.ui.errorMessage = action.payload;
        draft.ui.hasErrors = true;
        draft.ui.loading = false;
        break;
      case PASSWORD_CHANGE_REQUEST:
        draft.ui.errorMessage = '';
        draft.ui.hasErrors = false;
        draft.ui.loading = true;
        break;
      case PASSWORD_CHANGE_SUCCESS:
        draft.ui.hasErrors = false;
        draft.ui.errorMessage = '';
        draft.ui.successMessage = action.payload;
        draft.ui.loading = false;
        break;
      case TOGGLE_OLD_PASSWORD_MASK:
        draft.ui.inputOldType = action.payload.input_type;
        draft.ui.oldEyeIcon = action.payload.eye_icon;
        break;
      case TOGGLE_NEW_PASSWORD_MASK:
        draft.ui.inputNewType = action.payload.input_type;
        draft.ui.newEyeIcon = action.payload.eye_icon;
        break;
      case TOGGLE_CONFIRM_PASSWORD_MASK:
        draft.ui.inputConfirmType = action.payload.input_type;
        draft.ui.confirmEyeIcon = action.payload.eye_icon;
        break;
      default:
        break;
    }
  });

export default changePasswordReducer;
