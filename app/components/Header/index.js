/**
 *
 * Header
 *
 */

import React, { useState, useEffect } from 'react';
import { Dropdown, Toast, Card, Badge, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  clearUserData,
  formatISOtoLongYear,
  isUrlCareersPage,
} from '../../containers/App/globalHelpers';

import 'font-awesome/css/font-awesome.min.css';
import pbWhite from '../../assets/images/PB_White.svg';
import burgerIcon from '../../assets/images/burger_icon.svg';
import {
  toggleSidebar,
  updateNotificationCount,
  fetchNextNotifications,
  markNotificationAsRead,
  updateUserSettings,
  trimNotifications,
  requestZohoUsers,
  syncCrmToXeroAction,
} from '../../layouts/dashboard/actions';

import OutsideClickHandler from 'react-outside-click-handler';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

import SettingsModal from '../SettingsModal';

function Header(props) {
  const [showNotif, setShowNotif] = useState(false);
  const [notifZindex, setNotifZindex] = useState('-9999');
  const [currentOffset, setCurrentOffset] = useState(10);
  const [isSettingsModalShown, setIsSettingsModalShown] = useState(false);
  const scrollRef = useBottomScrollListener(onNotificationBottom, 0, 3000);

  const newNotif = props.newNotifications;
  const earlierNotif = props.earlierNotifications;

  function onNotificationBottom() {
    const totalNotifications =
      props.newNotifications.length + props.earlierNotifications.length;
    // dont fetch set of items of no more notifs
    if (props.isLazyLoadFinished) {
      return;
    }
    // limit notifs based on settings
    if (totalNotifications >= props.userSettings.maximum_notifications) {
      const notifDiff =
        totalNotifications - props.userSettings.maximum_notifications;
      if (props.earlierNotifications.length == 0) {
        for (let i = 0; i < notifDiff; i++) {
          newNotif.pop();
        }
        props.dispatch(
          trimNotifications({
            new: newNotif,
            earlier: [],
          }),
        );
        return;
      }

      for (let i = 0; i < notifDiff; i++) {
        earlierNotif.pop();
      }

      props.dispatch(
        trimNotifications({
          new: newNotif,
          earlier: earlierNotif,
        }),
      );

      return;
    }

    props.dispatch(
      fetchNextNotifications({
        offset: currentOffset,
      }),
    );
    setCurrentOffset(currentOffset + 10);
  }

  const handleLogout = () => {
    clearUserData();
    window.location.replace('/');
  };

  const handleToggle = () => {
    props.dispatch(
      toggleSidebar({
        toggle_status: !props.toggleStatus,
      }),
    );
  };

  const syncCRMToXero = () => {
    props.dispatch(
      syncCrmToXeroAction(),
    )
  }

  const toggleNotification = () => {
    if (props.notifCount > 0) {
      props.dispatch(updateNotificationCount());
    }
    if (showNotif) {
      setNotifZindex('-9999');
      setShowNotif(false);
      return;
    }
    setNotifZindex(9999);
    setShowNotif(true);
  };

  const handleMarkAsRead = (id, index, type) => {
    const notification_id = type == 'all' ? 0 : id;
    props.dispatch(
      markNotificationAsRead({
        notification_id,
        type,
      }),
    );
  };

  const handleSettingsModal = () => {
    setIsSettingsModalShown(!isSettingsModalShown);
  };

  const handleCloseSettingsModal = () => {
    setIsSettingsModalShown(false);
  };

  const handleUpdateUserSettings = payload => {
    props.dispatch(updateUserSettings(payload));
  };

  const requestZohoUsersDispatch = () => {
    props.dispatch(requestZohoUsers());
  };

  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() => {
          setShowNotif(false);
          setNotifZindex('-9999');
        }}
      >
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'relative',
          }}
        >
          <Toast
            show={showNotif}
            onClose={() => {
              setShowNotif(false);
              setNotifZindex('-9999');
            }}
            style={{
              zIndex: notifZindex,
            }}
            id="notif-area"
          >
            <Toast.Header>
              <h4 className="header-fontcolor font-semibold m-0">
                Notifications
              </h4>
            </Toast.Header>
            <div className="col-lg-12">
              <div className="row head-button py-2">
                <div className="col-lg-6 text-left">
                  <Link to="/notifications" onClick={toggleNotification}>
                    <div className="text-center pointer">See All</div>
                  </Link>
                </div>
                <div className="col-lg-6 text-right">
                  <div
                    onClick={() => {
                      handleMarkAsRead(0, 0, 'all');
                    }}
                    className="pt-2 pb-2 text-primary px-3 d-inline-block font-regular font-size-12"
                    style={{ cursor: 'pointer' }}
                  >
                    {props.newNotifications.length !== 0 ||
                    props.earlierNotifications.length !== 0 ? (
                      <i className="fa fa-check" aria-hidden="true">
                        <div className="font-regular float-right ml-2">
                          Mark all as read
                        </div>
                      </i>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Toast.Body ref={scrollRef}>
              <div className="mb-2">
                <h5
                  className="default-color font-medium font-size-14"
                  hidden={!props.newNotifications.length}
                >
                  New
                </h5>
                {props.newNotifications.length
                  ? props.newNotifications.map((newDetails, key) => (
                      <Card key={key} text="white">
                        <Card.Body>
                          <span className="card-text">
                            <a
                              className="pointer"
                              key={key}
                              onClick={() =>
                                handleMarkAsRead(
                                  newDetails.notification_id,
                                  key,
                                  'link',
                                )
                              }
                              href={newDetails.url}
                            >
                              <span className="text-secondary">
                                {ReactHtmlParser(newDetails.message)}
                              </span>{' '}
                              <br />
                              <span className="default-color font-size-12 d-block">
                                {formatISOtoLongYear(
                                  newDetails.dateGenerated,
                                  true,
                                )}
                              </span>
                            </a>
                            {newDetails.isRead == 1 ? (
                              ''
                            ) : (
                              <ul className="text-right p-0 m-0">
                                <li className="unread-icon" />
                                <li className="list-unstyled">
                                  <div className="mark-as-read">
                                    <i
                                      onClick={() =>
                                        handleMarkAsRead(
                                          newDetails.notification_id,
                                          key,
                                          'new',
                                        )
                                      }
                                      className="pointer fa fa-check text-primary"
                                      aria-hidden="true"
                                    />
                                    <button type="button">Mark as Read</button>
                                    <span className="caret-triangle" />
                                  </div>
                                </li>
                              </ul>
                            )}
                          </span>
                        </Card.Body>
                      </Card>
                    ))
                  : ''}
                <h5
                  className="default-color font-size-14 font-medium"
                  hidden={!props.earlierNotifications.length}
                >
                  Earlier
                </h5>
                {props.earlierNotifications.length
                  ? props.earlierNotifications.map((earlierDetails, key) => (
                      <Card key={key} text="white">
                        <Card.Body>
                          <span className="card-text">
                            <a
                              className="pointer"
                              key={key}
                              onClick={() =>
                                handleMarkAsRead(
                                  earlierDetails.notification_id,
                                  key,
                                  'link',
                                )
                              }
                              href={earlierDetails.url}
                            >
                              <span className="text-secondary">
                                {ReactHtmlParser(earlierDetails.message)}
                              </span>
                              <br />
                              <span className="default-color font-size-12 d-block">
                                {formatISOtoLongYear(
                                  earlierDetails.dateGenerated,
                                  true,
                                )}
                              </span>
                            </a>
                            {earlierDetails.isRead == 1 ? (
                              ''
                            ) : (
                              <ul className="text-right p-0 m-0">
                                <li className="unread-icon" />
                                <li className="list-unstyled">
                                  <div className="mark-as-read">
                                    <i
                                      onClick={() =>
                                        handleMarkAsRead(
                                          earlierDetails.notification_id,
                                          key,
                                          'earlier',
                                        )
                                      }
                                      className="pointer fa fa-check text-primary"
                                      aria-hidden="true"
                                    />
                                    <button type="button">Mark as Read</button>
                                    <span className="caret-triangle" />
                                  </div>
                                </li>
                              </ul>
                            )}
                          </span>
                        </Card.Body>
                      </Card>
                    ))
                  : ''}
                {props.newNotifications.length == 0 &&
                props.earlierNotifications.length == 0 ? (
                  <h5 className="text-center">No Notifications</h5>
                ) : (
                  ''
                )}
                {props.lazyLoading == true ? 'LOADING...' : ''}
              </div>
            </Toast.Body>
          </Toast>
        </div>
        <div className={props.toggleStatus ? 'header active' : 'header'}>
          <div className="row">
            <div className="col-lg-4 col-6 d-flex">
              <img
                src={pbWhite}
                alt="Penbrothers Logo White"
                title="Penbrothers"
                className="d-none d-lg-block"
              />
              <div className="burger-icon d-none d-sm-block d-md-none">
                <img
                  alt="burger-icon"
                  title="burger-icon"
                  className="burger-icon align-self-center"
                  src={burgerIcon}
                  onClick={handleToggle}
                />
              </div>
            </div>
            <div className="col-lg-8 col-6">
              <div className="account-menu">
                <div className="text-right">
                  <ul className="notification">
                    <li>
                      <button onClick={toggleNotification}>
                        <i className="fa fa-bell">
                          <span
                            className={props.notifCount == 0 ? '' : 'active'}
                          >
                            {props.notifCount ? props.notifCount : ''}
                          </span>
                        </i>
                      </button>
                    </li>
                  </ul>
                  <Dropdown alignRight className="user-name">
                    <Dropdown.Toggle>
                      {localStorage.getItem('user_name')}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="/change-password">
                        Change Password
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSettingsModal}>
                        Settings
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Log Off
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OutsideClickHandler>
      <SettingsModal
        close={handleCloseSettingsModal}
        isShown={isSettingsModalShown}
        showSettings={handleSettingsModal}
        settings={props.userSettings}
        updateUserSettings={handleUpdateUserSettings}
        loading={props.isUserSettingsLoading}
        hasErrors={props.userSettingsHasErrors}
        isSaved={props.userSettingsIsSaved}
        globalSettings={props.globalSettings}
        crmUsers={props.crmUsers}
        requestZohoUsers={requestZohoUsersDispatch}
        crmRequestIsLoading={props.crmRequestIsLoading}
        crmRequestFailed={props.crmRequestFailed}
        xeroState={props.xeroState}
      />
    </>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func,
  toggleStatus: PropTypes.any,
  notifications: PropTypes.any,
};

export default Header;
