/*
 *
 * NotificationsPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_NOTIFICATIONS_SUCCESS_NEW,
  FETCH_NOTIFICATIONS_SUCCESS_EARLIER,
  FETCH_NEXT_NOTIFICATIONS,
  FETCH_NEXT_NOTIFICATIONS_SUCCESS,
  STOP_LAZY_LOAD,
  MARK_NOTIFICATION_AS_READ,
  MARK_NOTIFICATION_AS_READ_SUCCESS,
  MARK_NOTIFICATION_AS_READ_FAILED,
  UPDATE_NOTIFICATION_MARK_AS_READ,
} from './constants';

export const initialState = {
  userData: {
    newNotifications: [],
    earlierNotifications: [],
    notificationOffset: 0,
    toMarkAsRead: null,
    toMarkAsReadType: '',
  },
  ui: {
    isLazyLoadFinished: false,
    message: '',
    lazyLoadingNotif: false,
    markAsReadLoading: false,
    markAsReadSuccess: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const notificationsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FETCH_NOTIFICATIONS_SUCCESS_NEW:
        draft.userData.newNotifications = action.payload.notif;
        break;
      case FETCH_NOTIFICATIONS_SUCCESS_EARLIER:
        draft.userData.earlierNotifications = action.payload.notif;
        break;
      case FETCH_NEXT_NOTIFICATIONS:
        draft.userData.notificationOffset = action.payload.offset;
        draft.ui.lazyLoadingNotif = true;
        break;
      case FETCH_NEXT_NOTIFICATIONS_SUCCESS:
        draft.userData.earlierNotifications = draft.userData.earlierNotifications.concat(
          action.payload.newEarlierNotifications.notif,
        );
        draft.ui.lazyLoadingNotif = false;
        break;
      case STOP_LAZY_LOAD:
        draft.ui.lazyLoadingNotif = false;
        draft.ui.isLazyLoadFinished = true;
        break;
      case MARK_NOTIFICATION_AS_READ:
        draft.userData.toMarkAsRead = action.payload.notification_id;
        draft.userData.toMarkAsReadType = action.payload.type;
        draft.ui.markAsReadLoading = true;
        draft.ui.markAsReadSuccess = false;
        break;
      case MARK_NOTIFICATION_AS_READ_SUCCESS:
        draft.ui.markAsReadLoading = false;
        draft.ui.markAsReadSuccess = action.payload;
        break;
      case MARK_NOTIFICATION_AS_READ_FAILED:
        draft.ui.markAsReadLoading = false;
        break;
      case UPDATE_NOTIFICATION_MARK_AS_READ:
        draft.userData.newNotifications = action.payload.newNotifications;
        draft.userData.earlierNotifications =
          action.payload.earlierNotifications;
        break;
      default:
        break;
    }
  });

export default notificationsPageReducer;
