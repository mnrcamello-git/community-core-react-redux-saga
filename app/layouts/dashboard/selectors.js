import { createSelector } from 'reselect';
import { initialState } from './reducers';

/**
 * Direct selector to the forgotPasswordPage state domain
 */
const selectDashboardPageDomain = state => state.dashboardPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectToggleStatus = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.userData.toggle_status,
  );

const makeSelectNotifications = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.userData.notifications,
  );

const makeSelectNewNotifications = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.userData.newNotifications,
  );

const makeSelectEarlierNotifications = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.userData.earlierNotifications,
  );

const makeSelectNotificationCount = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.userData.notifCount,
  );

const makeSelectNotificationOffset = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.userData.notificationOffset,
  );

const makeSelectLazyLoading = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.lazyLoadingNotif,
  );

const makeSelectMarkAsRead = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.userData.toMarkAsRead,
  );

const makeSelectMarkAsReadLoading = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.markAsReadLoading,
  );

const makeSelectMarkAsReadSuccess = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.markAsReadSuccess,
  );

const makeSelectIsLazyLoadFinished = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.isLazyLoadFinished,
  );

const makeSelectToMarkAsReadType = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.userData.toMarkAsReadType,
  );

const makeSelectUserSettings = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.userData.settings,
  );

const makeSelectNewUserSettings = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.userData.newSettings,
  );

const makeSelectUserSettingsIsLoading = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.isUserSettingsLoading,
  );

const makeSelectUserSettingsHasErrors = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.userSettingsHasErrors,
  );

const makeSelectUserSettingsIsSaved = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.userSettingsIsSaved,
  );

const makeSelectIsSendFeedbackSuccess = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.isSendFeedbackSuccess,
  );

const makeSelectIsSendFeedbackFailed = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.isSendFeedbackFailed,
  );

const makeSelectFeedbackRating = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.userData.rating,
  );

const makeSelectFeedbackComment = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.userData.comment,
  );

const makeSelectIsSendFeedbackLoading = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.isSendFeedBackLoading,
  );

const makeSelectGlobalSettings = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.userData.globalSettings,
  );

const makeSelectCrmUsers = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.userData.crmUsers,
  );

const makeSelectCrmRequestIsLoading = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.crmRequestIsLoading,
  );

const makeSelectCrmRequestFailed = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.failedRequestZohoUsers,
  );

const makeSelectXeroSuccess = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.syncXeroSuccess,
  );

const makeSelectXeroFailed = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.syncXeroFailed,
  );

const makeSelectXeroLoading = () =>
  createSelector(
    selectDashboardPageDomain,
    substate => substate.ui.syncXeroLoading,
  );

  
export {
  selectDashboardPageDomain,
  makeSelectToggleStatus,
  makeSelectNotifications,
  makeSelectNewNotifications,
  makeSelectEarlierNotifications,
  makeSelectNotificationCount,
  makeSelectNotificationOffset,
  makeSelectLazyLoading,
  makeSelectMarkAsRead,
  makeSelectMarkAsReadLoading,
  makeSelectMarkAsReadSuccess,
  makeSelectIsLazyLoadFinished,
  makeSelectToMarkAsReadType,
  makeSelectUserSettings,
  makeSelectNewUserSettings,
  makeSelectUserSettingsIsLoading,
  makeSelectUserSettingsHasErrors,
  makeSelectUserSettingsIsSaved,
  makeSelectIsSendFeedbackSuccess,
  makeSelectIsSendFeedbackFailed,
  makeSelectFeedbackRating,
  makeSelectFeedbackComment,
  makeSelectIsSendFeedbackLoading,
  makeSelectGlobalSettings,
  makeSelectCrmUsers,
  makeSelectCrmRequestIsLoading,
  makeSelectCrmRequestFailed,
  makeSelectXeroFailed,
  makeSelectXeroLoading,
  makeSelectXeroSuccess,
};
