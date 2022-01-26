import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  FETCH_NOTIFICATIONS_NEW,
  FETCH_NOTIFICATIONS_EARLIER,
  FETCH_NEXT_NOTIFICATIONS,
  MARK_NOTIFICATION_AS_READ,
} from './constants';
import {
  getToken,
  isResponse401,
  checkIfResponseIsSuccess,
  clearUserData,
} from '../App/globalHelpers';
import {
  fetchUserNewNotifications,
  fetchUserEarlierNotifications,
  getNextNotifications,
  markAsRead,
} from '../../layouts/dashboard/api';
import {
  fetchNotificationsNewSuccess,
  handleFetchNotificationFailed,
  fetchNotificationsEarlierSuccess,
  stopLazyLoad,
  appendCurrentNotifications,
  handleMarkAsReadSuccess,
  handleMarkAsReadFailed,
  updateNotificationMarkAsRead,
  fetchEarlierNotifications,
} from './actions';
import {
  makeSelectNotificationOffset,
  makeSelectMarkAsRead,
  makeSelectNewNotifications,
  makeSelectToMarkAsReadType,
  makeSelectEarlierNotifications,
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
    const newNotif = yield select(makeSelectNewNotifications());
    const data = {
      token: getToken(),
      new_notification_count: newNotif.length,
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

export default function* notificationsPageSaga() {
  yield takeLatest(FETCH_NOTIFICATIONS_NEW, attemptFetchNewNotification);
  yield takeLatest(
    FETCH_NOTIFICATIONS_EARLIER,
    attemptFetchEarlierNotification,
  );
  yield takeLatest(FETCH_NEXT_NOTIFICATIONS, attemptFetchNextNotification);
  yield takeLatest(MARK_NOTIFICATION_AS_READ, attemptMarkAsRead);
}
