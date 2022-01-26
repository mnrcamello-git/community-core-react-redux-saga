import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mailConfig state domain
 */

const mailConfigManagementDomain = state =>
  state.userManagement || initialState;

const selectMailConfigPageDomain = state =>
  state.customerServicePage || initialState;

/**
 * Other specific selectors
 */

const makeAffectedUsers = () =>
  createSelector(
    mailConfigManagementDomain,
    substate => substate.ui.csv_updated_users,
  );

const makeCsvUsers = () =>
  createSelector(
    mailConfigManagementDomain,
    substate => substate.ui.emailed_users,
  );

const makeUserMailStatus = () =>
  createSelector(
    mailConfigManagementDomain,
    substate => substate.ui.user_mail_status,
  );

const makeMailRequestStatus = () =>
  createSelector(
    mailConfigManagementDomain,
    substate => substate.ui.attempt_status,
  );

const makeMailSuccessStatistic = () =>
  createSelector(
    mailConfigManagementDomain,
    substate => substate.ui.success_count,
  );

const makeMailTotalStatistic = () =>
  createSelector(
    mailConfigManagementDomain,
    substate => substate.ui.total_count,
  );

const makeTestMessage = () =>
  createSelector(
    mailConfigManagementDomain,
    substate => substate.ui.test_message,
  );

const makeUploadError = () =>
  createSelector(
    mailConfigManagementDomain,
    substate => substate.ui.upload_exceed_error,
  );

export default mailConfigManagementDomain;

export {
  selectMailConfigPageDomain,
  mailConfigManagementDomain,
  makeCsvUsers,
  makeAffectedUsers,
  makeUserMailStatus,
  makeTestMessage,
  makeMailRequestStatus,
  makeMailSuccessStatistic,
  makeMailTotalStatistic,
  createSelector,
  makeUploadError,
};
