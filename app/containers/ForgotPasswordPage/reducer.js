/*
 *
 * ForgotPasswordPage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_EMAIL,
  VALIDATE_EMAIL,
  FORGOT_PASSWORD_REQUESTED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from './constants';

export const initialState = {
  userData: {
    email: '',
  },
  ui: {
    loading: false,
    errorMessage: '',
    buttonDisabled: true,
  },
};

const forgotPasswordPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_EMAIL:
        draft.userData.email = action.email;
        break;
      case VALIDATE_EMAIL:
        draft.userData.email = action.email;
        draft.ui.errorMessage = action.message;
        draft.ui.buttonDisabled = action.buttonDisabled;
        break;
      case FORGOT_PASSWORD_REQUESTED:
        draft.ui.loading = true;
        draft.ui.errorMessage = action.message;
        break;
      case FORGOT_PASSWORD_SUCCESS:
        draft.ui.loading = false;
        draft.ui.buttonDisabled = false;
        draft.ui.errorMessage = action.message;
        break;
      case FORGOT_PASSWORD_FAILED:
        draft.ui.loading = false;
        draft.ui.buttonDisabled = false;
        draft.ui.errorMessage = action.message;
        break;
      default:
        draft.ui.loading = false;
        draft.ui.buttonDisabled = false;
        draft.ui.errorMessage = '';
        draft.userData.email = '';
        break;
    }
  });

export default forgotPasswordPageReducer;
