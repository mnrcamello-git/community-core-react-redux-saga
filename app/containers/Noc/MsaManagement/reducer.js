/*
 *
 * MailConfigPage reducer
 *
 */
import produce from 'immer';
import {
  REQUEST_TEST_MESSAGE,
  REQUEST_EMPLOYEE,
  REQUEST_ALL_EMPLOYEES,
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
      case REQUEST_TEST_MESSAGE:
        draft.ui.test_message = action.message;
        break;
      case REQUEST_EMPLOYEE:
        draft.ui.select_employee = action.payload.employees;
        break;
      case REQUEST_ALL_EMPLOYEES:
        draft.ui.select_all_employees = action.payload.request;
        break;
      default:
        return state;
    }
  });

export default mailConfigReducer;