import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  getToken,
  checkIfResponseIsSuccess,
  isResponse401,
  clearUserData,
} from '../../containers/App/globalHelpers';
import {
  FETCH_NOTIFICATIONS_NEW,
  FETCH_NOTIFICATIONS_EARLIER,
  UPDATE_NOTIFICATION_COUNT,
  FETCH_NEXT_NOTIFICATIONS,
  MARK_NOTIFICATION_AS_READ,
  FETCH_USER_SETTINGS,
  UPDATE_USER_SETTINGS,
  REQUEST_SEND_FEEDBACK,
  REQUEST_ZOHO_USERS,
  SYNC_CRM_XERO,
} from './constants';
import {
  fetchNotificationsNewSuccess,
  fetchNotificationsEarlierSuccess,
  handleFetchNotificationFailed,
  appendCurrentNotifications,
  handleMarkAsReadSuccess,
  handleMarkAsReadFailed,
  stopLazyLoad,
  updateNotification,
  updateNotificationMarkAsRead,
  getUserSettingsSuccess,
  getUserSettingsFailed,
  updateUserSettingsSuccess,
  updateUserSettingsFailed,
  fetchEarlierNotifications,
  requestSendFeedbackSuccess,
  requestSendFeedbackFailed,
  successRequestZohoUsers,
  failedRequestZohoUsers,
  successSyncCrmXero,
  failedSyncCrmXero,
} from './actions';

import {
  fetchUserNewNotifications,
  fetchUserEarlierNotifications,
  updateUserNotifications,
  getNextNotifications,
  markAsRead,
  getUserSettings,
  updateUserSettings,
  sendFeedback,
  requestZohoUsers,
  syncCrmXeroAPI
} from './api';

import {
  makeSelectNotificationOffset,
  makeSelectMarkAsRead,
  makeSelectToMarkAsReadType,
  makeSelectNewNotifications,
  makeSelectEarlierNotifications,
  makeSelectNewUserSettings,
  makeSelectFeedbackComment,
  makeSelectFeedbackRating,
} from './selectors';

export function* attemptFetchNewNotification() {
  try {
    const token = getToken();
    const response = yield call(fetchUserNewNotifications, token);
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(handleFetchNotificationFailed('Failed to fetch notifications'));
    }

    yield put(fetchNotificationsNewSuccess(response.data.data));

    yield put(fetchEarlierNotifications());
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(handleFetchNotificationFailed('Server Error'));
  }
}

export function* attemptFetchEarlierNotification() {
  try {
    const token = getToken();
    const newNotifications = yield select(makeSelectNewNotifications());
    const data = {
      token: getToken(),
      new_notification_count: newNotifications.length,
    };

    const response = yield call(fetchUserEarlierNotifications, data);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(handleFetchNotificationFailed('Failed to fetch notifications'));
    }

    yield put(fetchNotificationsEarlierSuccess(response.data.data));
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(handleFetchNotificationFailed('Server Error'));
  }
}

export function* attemptUpdateNotification() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const response = yield call(updateUserNotifications, config);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        handleFetchNotificationFailed(
          'Failed to fetch and update notifications',
        ),
      );
    }
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(handleFetchNotificationFailed('Server Failed'));
  }
}

export function* attemptFetchNextNotification() {
  try {
    const token = getToken();
    const offset = yield select(makeSelectNotificationOffset());
    const response = yield call(getNextNotifications, token, offset);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        handleFetchNotificationFailed(
          'Failed to fetch and update notifications',
        ),
      );
    }

    if (response.data.data.notif.length > 0) {
      yield put(
        appendCurrentNotifications({
          newEarlierNotifications: response.data.data,
        }),
      );
    } else {
      yield put(stopLazyLoad());
    }
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(handleFetchNotificationFailed('Server Error'));
  }
}

export function* attemptMarkAsRead() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const toRead = yield select(makeSelectMarkAsRead());
    const notificationType = yield select(makeSelectToMarkAsReadType());
    const newNotifications = yield select(makeSelectNewNotifications());
    const earlierNotifications = yield select(makeSelectEarlierNotifications());
    const response = yield call(markAsRead, config, {
      notification_id: toRead,
    });
    let newNotif = [];
    let earlierNotif = [];
    let linkRedirect = '#';
    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(handleMarkAsReadFailed('Failed to mark as read'));
    }

    yield put(handleMarkAsReadSuccess(true));

    if (notificationType == 'new') {
      newNotif = newNotifications.map((data, key) => {
        if (data.notification_id == toRead) {
          data.isRead = 1;
          linkRedirect = data.url;
        }
        return newNotifications[key];
      });
      earlierNotif = earlierNotifications;
    } else if (notificationType == 'earlier') {
      earlierNotif = earlierNotifications.map((data, key) => {
        if (data.notification_id == toRead) {
          data.isRead = 1;
          linkRedirect = data.url;
        }
        return earlierNotifications[key];
      });
      newNotif = newNotifications;
    } else {
      newNotif = newNotifications.map((data, key) => {
        if (data.notification_id == toRead) {
          data.isRead = 1;
          linkRedirect = data.url;
        }
        if (notificationType == 'all') {
          data.isRead = 1;
        }
        return newNotifications[key];
      });
      earlierNotif = earlierNotifications.map((data, key) => {
        if (data.notification_id == toRead) {
          data.isRead = 1;
          linkRedirect = data.url;
        }

        if (notificationType == 'all') {
          data.isRead = 1;
        }

        return earlierNotifications[key];
      });
    }

    yield put(
      updateNotificationMarkAsRead({
        newNotifications: newNotif,
        earlierNotifications: earlierNotif,
      }),
    );
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(handleMarkAsReadFailed('Server Error, please try again'));
  }
}

function* attemptFetchUserSettings() {
  try {
    const response = yield call(getUserSettings, getToken());

    if (!checkIfResponseIsSuccess(response.data.status)) {
      yield put(
        getUserSettingsFailed('Failed to fetch and update notifications'),
      );
    }

    yield put(getUserSettingsSuccess(response.data.data));
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(getUserSettingsFailed('Server Error, please try again'));
  }
}

function* attemptUpdateUserSettings() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    const data = yield select(makeSelectNewUserSettings());
    yield call(updateUserSettings, config, data);

    yield put(updateUserSettingsSuccess());
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(updateUserSettingsFailed('Server Error, please try again'));
  }
}

function* attemptSendFeedback() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    const data = {
      message: yield select(makeSelectFeedbackComment()),
      rate: yield select(makeSelectFeedbackRating()),
    };
    const response = yield call(sendFeedback, config, data);

    if (!checkIfResponseIsSuccess(response.data.status)) {
      requestSendFeedbackFailed();
    }

    yield put(requestSendFeedbackSuccess());
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(requestSendFeedbackFailed());
  }
}

function* requestZohoUsersSaga() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const response = yield call(requestZohoUsers, config);
    yield put(successRequestZohoUsers(response.data.data));

  } catch(error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(failedRequestZohoUsers());
  }
}

function* syncCRMXeroSaga() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const response = yield call(syncCrmXeroAPI, config);
    yield put(successSyncCrmXero());
  } catch (error) {
    if (isResponse401(error)) {
      clearUserData();
      yield put(push('/token-expired'));
    }
    yield put(failedSyncCrmXero());
  }
}

export default function* watchDashboardSaga() {
  yield takeLatest(FETCH_NOTIFICATIONS_NEW, attemptFetchNewNotification);
  yield takeLatest(
    FETCH_NOTIFICATIONS_EARLIER,
    attemptFetchEarlierNotification,
  );
  yield takeLatest(UPDATE_NOTIFICATION_COUNT, attemptUpdateNotification);
  yield takeLatest(FETCH_NEXT_NOTIFICATIONS, attemptFetchNextNotification);
  yield takeLatest(MARK_NOTIFICATION_AS_READ, attemptMarkAsRead);
  yield takeLatest(FETCH_USER_SETTINGS, attemptFetchUserSettings);
  yield takeLatest(UPDATE_USER_SETTINGS, attemptUpdateUserSettings);
  yield takeLatest(REQUEST_SEND_FEEDBACK, attemptSendFeedback);
  yield takeLatest(REQUEST_ZOHO_USERS, requestZohoUsersSaga);
  yield takeLatest(SYNC_CRM_XERO, syncCRMXeroSaga);
}