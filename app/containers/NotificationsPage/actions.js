/*
 *
 * NotificationsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_NOTIFICATIONS_NEW,
  FETCH_NOTIFICATIONS_SUCCESS_NEW,
  FETCH_NOTIFICATIONS_SUCCESS_EARLIER,
  FETCH_NOTIFICATIONS_FAILED,
  FETCH_NOTIFICATIONS_EARLIER,
  FETCH_NEXT_NOTIFICATIONS,
  STOP_LAZY_LOAD,
  FETCH_NEXT_NOTIFICATIONS_SUCCESS,
  MARK_NOTIFICATION_AS_READ,
  MARK_NOTIFICATION_AS_READ_FAILED,
  MARK_NOTIFICATION_AS_READ_SUCCESS,
  UPDATE_NOTIFICATION_MARK_AS_READ,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
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

export function fetchNotificationsNewSuccess(payload) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS_NEW,
    payload,
  };
}

export function handleFetchNotificationFailed(message) {
  return {
    type: FETCH_NOTIFICATIONS_FAILED,
    message,
  };
}

export function fetchNotificationsEarlierSuccess(payload) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS_EARLIER,
    payload,
  };
}

export function fetchNextNotifications(payload) {
  return {
    type: FETCH_NEXT_NOTIFICATIONS,
    payload,
  };
}

export function stopLazyLoad() {
  return {
    type: STOP_LAZY_LOAD,
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

export function updateNotificationMarkAsRead(payload) {
  return {
    type: UPDATE_NOTIFICATION_MARK_AS_READ,
    payload,
  };
}
