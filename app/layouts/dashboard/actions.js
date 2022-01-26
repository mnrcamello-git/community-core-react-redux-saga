import {
  TOGGLE_SIDEBAR,
  FETCH_NOTIFICATIONS_NEW,
  FETCH_NOTIFICATIONS_EARLIER,
  FETCH_NOTIFICATIONS_SUCCESS_NEW,
  FETCH_NOTIFICATIONS_SUCCESS_EARLIER,
  FETCH_NOTIFICATIONS_FAILED,
  UPDATE_NOTIFICATION,
  UPDATE_NOTIFICATION_COUNT,
  FETCH_NEXT_NOTIFICATIONS,
  FETCH_NEXT_NOTIFICATIONS_SUCCESS,
  MARK_NOTIFICATION_AS_READ,
  MARK_NOTIFICATION_AS_READ_FAILED,
  MARK_NOTIFICATION_AS_READ_SUCCESS,
  STOP_LAZY_LOAD,
  UPDATE_NOTIFICATION_MARK_AS_READ,
  FETCH_USER_SETTINGS,
  FETCH_USER_SETTINGS_SUCCESS,
  FETCH_USER_SETTINGS_FAILED,
  UPDATE_USER_SETTINGS,
  UPDATE_USER_SETTINGS_SUCCESS,
  UPDATE_USER_SETTINGS_FAILED,
  TRIM_NOTIFICATIONS,
  REQUEST_SEND_FEEDBACK,
  REQUEST_SEND_FEEDBACK_SUCCESS,
  REQUEST_SEND_FEEDBACK_FAILED,
  SHOW_FEEDBACK_SUCCESS_MODAL,
  SHOW_FEEDBACK_FAILED_MODAL,
  REQUEST_ZOHO_USERS,
  SUCCESS_REQUEST_ZOHO_USERS,
  FAILED_REQUEST_ZOHO_USERS,
  SYNC_CRM_XERO,
  SYNC_CRM_XERO_SUCCESS,
  SYNC_CRM_XERO_FAILED,
} from './constants';

export function toggleSidebar(payload) {
  return {
    type: TOGGLE_SIDEBAR,
    payload,
  };
}

export function fetchNotificationsNewSuccess(payload) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS_NEW,
    payload,
  };
}

export function fetchNotificationsEarlierSuccess(payload) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS_EARLIER,
    payload,
  };
}

export function fetchNewNotifications() {
  return {
    type: FETCH_NOTIFICATIONS_NEW,
  };
}

export function fetchEarlierNotifications() {
  return {
    type: FETCH_NOTIFICATIONS_EARLIER,
  };
}

export function handleFetchNotificationFailed(message) {
  return {
    type: FETCH_NOTIFICATIONS_FAILED,
    message,
  };
}

export function updateNotification(payload) {
  return {
    type: UPDATE_NOTIFICATION,
    payload,
  };
}

export function updateNotificationCount() {
  return {
    type: UPDATE_NOTIFICATION_COUNT,
  };
}

export function fetchNextNotifications(payload) {
  return {
    type: FETCH_NEXT_NOTIFICATIONS,
    payload,
  };
}

export function appendCurrentNotifications(payload) {
  return {
    type: FETCH_NEXT_NOTIFICATIONS_SUCCESS,
    payload,
  };
}

export function markNotificationAsRead(payload) {
  return {
    type: MARK_NOTIFICATION_AS_READ,
    payload,
  };
}

export function handleMarkAsReadFailed(payload) {
  return {
    type: MARK_NOTIFICATION_AS_READ_FAILED,
    payload,
  };
}

export function handleMarkAsReadSuccess(payload) {
  return {
    type: MARK_NOTIFICATION_AS_READ_SUCCESS,
    payload,
  };
}

export function stopLazyLoad() {
  return {
    type: STOP_LAZY_LOAD,
  };
}

export function updateNotificationMarkAsRead(payload) {
  return {
    type: UPDATE_NOTIFICATION_MARK_AS_READ,
    payload,
  };
}

export function fetchUserSettings() {
  return {
    type: FETCH_USER_SETTINGS,
  };
}

export function getUserSettingsSuccess(payload) {
  return {
    type: FETCH_USER_SETTINGS_SUCCESS,
    payload,
  };
}

export function getUserSettingsFailed(message) {
  return {
    type: FETCH_USER_SETTINGS_FAILED,
    message,
  };
}

export function updateUserSettings(payload) {
  return {
    type: UPDATE_USER_SETTINGS,
    payload,
  };
}

export function updateUserSettingsSuccess() {
  return {
    type: UPDATE_USER_SETTINGS_SUCCESS,
  };
}

export function updateUserSettingsFailed(message) {
  return {
    type: UPDATE_USER_SETTINGS_FAILED,
    message,
  };
}

export function trimNotifications(payload) {
  return {
    type: TRIM_NOTIFICATIONS,
    payload,
  };
}

export function requestSendFeedback(payload) {
  return {
    type: REQUEST_SEND_FEEDBACK,
    payload,
  };
}

export function requestSendFeedbackSuccess() {
  return {
    type: REQUEST_SEND_FEEDBACK_SUCCESS,
  };
}

export function requestSendFeedbackFailed() {
  return {
    type: REQUEST_SEND_FEEDBACK_FAILED,
  };
}

export function showFeedbackSuccessModal(payload) {
  return {
    type: SHOW_FEEDBACK_SUCCESS_MODAL,
    payload,
  };
}

export function showFeedbackFailedModal(payload) {
  return {
    type: SHOW_FEEDBACK_FAILED_MODAL,
    payload,
  };
}

export function requestZohoUsers() {
  return {
    type: REQUEST_ZOHO_USERS,
  }
}

export function successRequestZohoUsers(payload) {
  return {
    type: SUCCESS_REQUEST_ZOHO_USERS,
    payload
  }
}

export function failedRequestZohoUsers() {
  return {
    type: FAILED_REQUEST_ZOHO_USERS
  }
}

export function syncCrmToXeroAction() {
  return {
    type: SYNC_CRM_XERO
  }
}

export function successSyncCrmXero() {
  return {
    type: SYNC_CRM_XERO_SUCCESS
  }
}

export function failedSyncCrmXero() {
  return {
    type: SYNC_CRM_XERO_FAILED
  }
}