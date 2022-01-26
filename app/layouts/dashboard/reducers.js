import produce from 'immer';
import {
  TOGGLE_SIDEBAR,
  FETCH_NOTIFICATIONS_SUCCESS_NEW,
  FETCH_NOTIFICATIONS_SUCCESS_EARLIER,
  FETCH_NOTIFICATIONS_FAILED,
  UPDATE_NOTIFICATION,
  UPDATE_NOTIFICATION_COUNT,
  FETCH_NEXT_NOTIFICATIONS,
  FETCH_NEXT_NOTIFICATIONS_SUCCESS,
  MARK_NOTIFICATION_AS_READ,
  MARK_NOTIFICATION_AS_READ_SUCCESS,
  MARK_NOTIFICATION_AS_READ_FAILED,
  STOP_LAZY_LOAD,
  UPDATE_NOTIFICATION_MARK_AS_READ,
  FETCH_USER_SETTINGS_SUCCESS,
  UPDATE_USER_SETTINGS,
  UPDATE_USER_SETTINGS_SUCCESS,
  UPDATE_USER_SETTINGS_FAILED,
  TRIM_NOTIFICATIONS,
  REQUEST_SEND_FEEDBACK,
  REQUEST_SEND_FEEDBACK_SUCCESS,
  REQUEST_SEND_FEEDBACK_FAILED,
  SHOW_FEEDBACK_SUCCESS_MODAL,
  SHOW_FEEDBACK_FAILED_MODAL,
  SUCCESS_REQUEST_ZOHO_USERS,
  REQUEST_ZOHO_USERS,
  FAILED_REQUEST_ZOHO_USERS,
  SYNC_CRM_XERO,
  SYNC_CRM_XERO_FAILED,
  SYNC_CRM_XERO_SUCCESS
} from './constants';

export const initialState = {
  userData: {
    toggle_status: false,
    notifications: [],
    newNotifications: [],
    earlierNotifications: [],
    notifCount: 0,
    notificationOffset: 0,
    toMarkAsRead: null,
    toMarkAsReadType: '',
    settings: {},
    newSettings: {},
    globalSettings: [],
    crmUsers: [],
    rating: 0,
    comment: '',
  },
  ui: {
    message: '',
    lazyLoadingNotif: false,
    markAsReadLoading: false,
    markAsReadSuccess: false,
    isLazyLoadFinished: false,
    isUserSettingsLoading: false,
    userSettingsHasErrors: false,
    userSettingsIsSaved: false,
    isSendFeedBackLoading: false,
    isSendFeedbackSuccess: false,
    isSendFeedbackFailed: false,
    crmRequestIsLoading: false,
    failedRequestZohoUsers: false,
    syncXeroLoading: false,
    syncXeroSuccess: false,
    syncXeroFailed: false,
  },
};

const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_SIDEBAR:
        draft.userData.toggle_status = action.payload.toggle_status;
        break;
      case FETCH_NOTIFICATIONS_SUCCESS_NEW:
        draft.userData.newNotifications = action.payload.notif;
        draft.userData.notifCount = action.payload.notifCount;
        break;
      case FETCH_NOTIFICATIONS_SUCCESS_EARLIER:
        draft.userData.earlierNotifications = action.payload.notif;
        break;
      case FETCH_NOTIFICATIONS_FAILED:
        draft.ui.errorMessage = action.message;
        draft.ui.lazyLoadingNotif = false;
        break;
      case UPDATE_NOTIFICATION:
        draft.userData.newNotifications = action.payload.newNotifications.concat(
          draft.userData.newNotifications,
        );
        draft.userData.notifCount = draft.userData.notifCount + 1;
        break;
      case UPDATE_NOTIFICATION_COUNT:
        draft.userData.notifCount = 0;
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
      case STOP_LAZY_LOAD:
        draft.ui.lazyLoadingNotif = false;
        draft.ui.isLazyLoadFinished = true;
        break;
      case UPDATE_NOTIFICATION_MARK_AS_READ:
        draft.userData.newNotifications = action.payload.newNotifications;
        draft.userData.earlierNotifications =
          action.payload.earlierNotifications;
        break;
      case FETCH_USER_SETTINGS_SUCCESS:
        draft.userData.settings = action.payload.userSettings;
        draft.userData.globalSettings = action.payload.globalSettings
        break;
      case UPDATE_USER_SETTINGS:
        draft.userData.newSettings = action.payload;
        draft.ui.isUserSettingsLoading = true;
        draft.ui.userSettingsHasErrors = false;
        break;
      case UPDATE_USER_SETTINGS_SUCCESS:
        draft.ui.isUserSettingsLoading = false;
        draft.ui.userSettingsHasErrors = false;
        draft.ui.userSettingsIsSaved = true;
        break;
      case UPDATE_USER_SETTINGS_FAILED:
        draft.ui.userSettingsIsSaved = true;
        break;
      case TRIM_NOTIFICATIONS:
        draft.earlierNotifications = action.payload.earlier;
        draft.newNotifications = action.payload.new;
        break;
      case REQUEST_SEND_FEEDBACK:
        draft.userData.rating = action.payload.rating;
        draft.userData.comment = action.payload.comment;
        draft.ui.isSendFeedBackLoading = true;
        break;
      case REQUEST_SEND_FEEDBACK_SUCCESS:
        draft.userData.rating = 0;
        draft.userData.comment = '';
        draft.ui.isSendFeedbackSuccess = true;
        draft.ui.isSendFeedbackFailed = false;
        draft.ui.isSendFeedBackLoading = false;
        break;
      case REQUEST_SEND_FEEDBACK_FAILED:
        draft.ui.isSendFeedbackSuccess = false;
        draft.ui.isSendFeedbackFailed = true;
        draft.ui.isSendFeedBackLoading = false;
        break;
      case SHOW_FEEDBACK_SUCCESS_MODAL:
        draft.userData.rating = 0;
        draft.userData.comment = '';
        draft.ui.isSendFeedbackSuccess = action.payload.show_modal;
        break;
      case SHOW_FEEDBACK_FAILED_MODAL:
        draft.ui.isSendFeedbackFailed = action.payload.show_modal;
        break;
      case REQUEST_ZOHO_USERS:
        draft.ui.crmRequestIsLoading = true;
        draft.ui.failedRequestZohoUsers = false;
        break;
      case SUCCESS_REQUEST_ZOHO_USERS:
        draft.userData.crmUsers = action.payload;
        draft.ui.crmRequestIsLoading = false;
        draft.ui.failedRequestZohoUsers = false;
        break;
      case FAILED_REQUEST_ZOHO_USERS:
        draft.ui.failedRequestZohoUsers = true;
        break;
      case SYNC_CRM_XERO:
        draft.ui.syncXeroLoading = true;
        draft.ui.syncXeroSuccess = false;
        draft.ui.syncXeroFailed = false;
        break;
      case SYNC_CRM_XERO_FAILED:
        draft.ui.syncXeroSuccess = false;
        draft.ui.syncXeroFailed = true;
        draft.ui.syncXeroLoading = false;
        breal;
      case SYNC_CRM_XERO_SUCCESS:
        draft.ui.syncXeroSuccess = true;
        draft.ui.syncXeroFailed = false;
        draft.ui.syncXeroLoading = false;
        break
      default:
        break;
    }
  });

export default dashboardReducer;
