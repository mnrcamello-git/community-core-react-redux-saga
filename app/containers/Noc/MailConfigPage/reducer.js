/*
 *
 * MailConfigPage reducer
 *
 */
import produce from 'immer';
import {
  REQUEST_CSV_USER,
  REQUEST_USER_MAIL_STATUS,
  REQUEST_CSV_UPLOAD,
} from './constants';

export const initialState = {
  ui: {},
  api: {},
  userData: {
    user: {},
    errors: {},
  },
  componentData: {},
};

/* eslint-disable default-case, no-param-reassign */
const mailConfigReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_CSV_USER:
        draft.ui.emailed_users = action.payload.users;
        draft.ui.mail_statistic = 'test_mail_statistic';
        break;
      case REQUEST_USER_MAIL_STATUS:
        draft.ui.user_mail_status = action.payload.request;
        draft.ui.attempt_status = true;
        draft.ui.success_count = action.payload.statistic_response.successCount;
        draft.ui.total_count = action.payload.statistic_response.totalCount;
        break;
      case REQUEST_CSV_UPLOAD:
        draft.ui.upload_exceed_error = action.payload.uploadError;
        break;
      default:
        return state;
    }
  });

export default mailConfigReducer;
