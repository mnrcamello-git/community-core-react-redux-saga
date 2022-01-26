import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notificationsPage state domain
 */

const selectNotificationsPageDomain = state =>
  state.notificationsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NotificationsPage
 */

const makeSelectNotificationsPage = () =>
  createSelector(
    selectNotificationsPageDomain,
    substate => substate,
  );

const makeSelectEarlierNotifications = () =>
  createSelector(
    selectNotificationsPageDomain,
    substate => substate.userData.earlierNotifications,
  );

const makeSelectNewNotifications = () =>
  createSelector(
    selectNotificationsPageDomain,
    substate => substate.userData.newNotifications,
  );

const makeSelectIsLazyLoadFinished = () =>
  createSelector(
    selectNotificationsPageDomain,
    substate => substate.ui.isLazyLoadFinished,
  );

const makeSelectNotificationOffset = () =>
  createSelector(
    selectNotificationsPageDomain,
    substate => substate.userData.notificationOffset,
  );

const makeSelectLazyLoading = () =>
  createSelector(
    selectNotificationsPageDomain,
    substate => substate.ui.lazyLoadingNotif,
  );

const makeSelectMarkAsRead = () =>
  createSelector(
    selectNotificationsPageDomain,
    substate => substate.userData.toMarkAsRead,
  );

const makeSelectMarkAsReadLoading = () =>
  createSelector(
    selectNotificationsPageDomain,
    substate => substate.ui.markAsReadLoading,
  );

const makeSelectMarkAsReadSuccess = () =>
  createSelector(
    selectNotificationsPageDomain,
    substate => substate.ui.markAsReadSuccess,
  );

const makeSelectToMarkAsReadType = () =>
  createSelector(
    selectNotificationsPageDomain,
    substate => substate.userData.toMarkAsReadType,
  );

export default makeSelectNotificationsPage;
export {
  selectNotificationsPageDomain,
  makeSelectEarlierNotifications,
  makeSelectNewNotifications,
  makeSelectIsLazyLoadFinished,
  makeSelectNotificationOffset,
  makeSelectLazyLoading,
  makeSelectMarkAsRead,
  makeSelectMarkAsReadLoading,
  makeSelectMarkAsReadSuccess,
  makeSelectToMarkAsReadType,
};
