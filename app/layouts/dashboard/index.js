import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import LoadingOverlay from 'react-loading-overlay';
import saga from './saga';
import reducer from './reducers';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import {
  makeSelectToggleStatus,
  makeSelectNotifications,
  makeSelectNewNotifications,
  makeSelectEarlierNotifications,
  makeSelectNotificationCount,
  makeSelectLazyLoading,
  makeSelectMarkAsReadLoading,
  makeSelectMarkAsReadSuccess,
  makeSelectIsLazyLoadFinished,
  makeSelectUserSettings,
  makeSelectUserSettingsIsLoading,
  makeSelectUserSettingsHasErrors,
  makeSelectUserSettingsIsSaved,
  makeSelectIsSendFeedbackSuccess,
  makeSelectIsSendFeedbackFailed,
  makeSelectIsSendFeedbackLoading,
  makeSelectGlobalSettings,
  makeSelectCrmUsers,
  makeSelectCrmRequestIsLoading,
  makeSelectCrmRequestFailed,
  makeSelectXeroFailed,
  makeSelectXeroLoading,
  makeSelectXeroSuccess,
} from './selectors';
import {
  fetchNewNotifications,
  fetchEarlierNotifications,
  fetchUserSettings,
  syncCrmToXeroAction,
} from './actions';
import NotificationSocketComponent from '../../components/NotificationSocketComponent';

export function DashboardLayout({
  children,
  toggleStatus,
  dispatch,
  notifications,
  newNotifications,
  notifCount,
  earlierNotifications,
  lazyLoading,
  markAsReadLoading,
  markAsReadSuccess,
  isLazyLoadFinished,
  userSettings,
  isUserSettingsLoading,
  userSettingsHasErrors,
  isUserSettingsSaved,
  isSendFeedbackSuccess,
  isSendFeedbackFailed,
  isSendFeedbackLoading,
  globalSettings,
  crmUsers,
  crmRequestIsLoading,
  crmRequestFailed,
  xeroFailed,
  xeroLoading,
  xeroSuccess,
}) {
  useInjectReducer({ key: 'dashboardPage', reducer });
  useInjectSaga({ key: 'dashboardPage', saga });
  useEffect(() => {
    dispatch(fetchNewNotifications());
    dispatch(fetchUserSettings());
  }, []);

  const syncCrmToXeroFxn = () => {
    dispatch(syncCrmToXeroAction());
  }

  return (
    <>
      <LoadingOverlay
        active={isSendFeedbackLoading}
        spinner
        text="Sending feedback..."
      >
        <div className="container-fluid w-100 h-100">
          <div className="row">
            <div className={toggleStatus ? 'sidebar active' : 'sidebar'}>
              <Sidebar
                module="hub"
                link="/hub"
                toggleStatus={toggleStatus}
                dispatch={dispatch}
                isSendFeedbackSuccess={isSendFeedbackSuccess}
                isSendFeedbackFailed={isSendFeedbackFailed}
              />
            </div>
            <div className={toggleStatus ? 'dashboard active' : 'dashboard'}>
              <Header
                toggleStatus={toggleStatus}
                dispatch={dispatch}
                notifications={notifications}
                newNotifications={newNotifications}
                earlierNotifications={earlierNotifications}
                notifCount={notifCount}
                lazyLoading={lazyLoading}
                markAsReadLoading={markAsReadLoading}
                markAsReadSuccess={markAsReadSuccess}
                isLazyLoadFinished={isLazyLoadFinished}
                userSettings={userSettings}
                isUserSettingsLoading={isUserSettingsLoading}
                userSettingsHasErrors={userSettingsHasErrors}
                userSettingsIsSaved={isUserSettingsSaved}
                globalSettings={globalSettings}
                crmUsers={crmUsers}
                crmRequestIsLoading={crmRequestIsLoading}
                xeroState={{
                  xeroFailed,
                  xeroLoading,
                  xeroSuccess,
                  syncCrmToXeroFxn,
                }}
              />
              <NotificationSocketComponent dispatch={dispatch} />
              <div className="overlay" />
              <div className="ml-4 mr-4 h-100 main-content">{children}</div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </>
  );
}

DashboardLayout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  toggleStatus: PropTypes.any,
  notifications: PropTypes.any,
  newNotifications: PropTypes.any,
  earlierNotifications: PropTypes.any,
  notifCount: PropTypes.any,
  lazyLoading: PropTypes.bool,
  markAsReadLoading: PropTypes.bool,
  markAsReadSuccess: PropTypes.bool,
  userSettings: PropTypes.any,
  isUserSettingsLoading: PropTypes.bool,
  userSettingsHasErrors: PropTypes.bool,
  isUserSettingsSaved: PropTypes.bool,
  isSendFeedbackSuccess: PropTypes.bool,
  isSendFeedbackFailed: PropTypes.bool,
  isSendFeedbackLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  toggleStatus: makeSelectToggleStatus(),
  notifications: makeSelectNotifications(),
  newNotifications: makeSelectNewNotifications(),
  earlierNotifications: makeSelectEarlierNotifications(),
  notifCount: makeSelectNotificationCount(),
  lazyLoading: makeSelectLazyLoading(),
  markAsReadLoading: makeSelectMarkAsReadLoading(),
  markAsReadSuccess: makeSelectMarkAsReadSuccess(),
  isLazyLoadFinished: makeSelectIsLazyLoadFinished(),
  userSettings: makeSelectUserSettings(),
  isUserSettingsLoading: makeSelectUserSettingsIsLoading(),
  userSettingsHasErrors: makeSelectUserSettingsHasErrors(),
  isUserSettingsSaved: makeSelectUserSettingsIsSaved(),
  isSendFeedbackSuccess: makeSelectIsSendFeedbackSuccess(),
  isSendFeedbackFailed: makeSelectIsSendFeedbackFailed(),
  isSendFeedbackLoading: makeSelectIsSendFeedbackLoading(),
  globalSettings: makeSelectGlobalSettings(),
  crmUsers: makeSelectCrmUsers(),
  crmRequestIsLoading: makeSelectCrmRequestIsLoading(),
  crmRequestFailed: makeSelectCrmRequestFailed(),
  xeroFailed: makeSelectXeroFailed(),
  xeroLoading: makeSelectXeroLoading(),
  xeroSuccess: makeSelectXeroSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DashboardLayout);
