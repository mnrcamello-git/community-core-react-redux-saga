/**
 *
 * NotificationsPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ReactHtmlParser from 'react-html-parser';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { Card } from 'react-bootstrap';
import makeSelectNotificationsPage, {
  makeSelectNewNotifications,
  makeSelectEarlierNotifications,
  makeSelectIsLazyLoadFinished,
  makeSelectLazyLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  fetchNewNotifications,
  fetchNextNotifications,
  markNotificationAsRead,
} from './actions';
import { fetchNewNotifications as dashboardFetchNewNotifications } from '../../layouts/dashboard/actions';
import { isUrlCareersPage, formatISOtoLongYear } from '../App/globalHelpers';
import BackIcon from '../../assets/images/hub/back_icon.png';

export function NotificationsPage({
  dispatch,
  earlierNotifications,
  newNotifications,
  isLazyLoadFinished,
  lazyLoading,
}) {
  useInjectReducer({ key: 'notificationsPage', reducer });
  useInjectSaga({ key: 'notificationsPage', saga });

  useEffect(() => {
    dispatch(fetchNewNotifications());
  }, []);

  const [currentOffset, setCurrentOffset] = useState(10);
  const scrollRef = useBottomScrollListener(onNotificationBottom, 0, 3000);

  function onNotificationBottom() {
    if (isLazyLoadFinished) {
      return;
    }
    dispatch(
      fetchNextNotifications({
        offset: currentOffset,
      }),
    );
    setCurrentOffset(currentOffset + 10);
  }

  const handleMarkAsRead = (id, index, type) => {
    const notification_id = type == 'all' ? 0 : id;
    dispatch(
      markNotificationAsRead({
        notification_id,
        type,
      }),
    );
  };

  return (
    <>
      <div className="notification-page">
        <div className="menu-title">
          <div className="col-md-12 p-0 position-relative d-flex">
            <h2 className="header-fontcolor">Your Notifications</h2>
          </div>
        </div>

        <div className="col-md-12 px-0">
          <div className="col-md-12">
            <div className="mb-2">
              <Card>
                <Card.Title>
                  <div className="col-lg-12 py-4 px-4 card-title-head">
                    <div className="row">
                      <div className="col-lg-6">
                        <button
                          className="back-btn"
                          onClick={() => {
                            dispatch(dashboardFetchNewNotifications());
                            window.history.back();
                          }}
                        >
                          <img alt="back-icon" src={BackIcon} /> Back{' '}
                        </button>
                      </div>
                      <div className="col-lg-6 text-right align-self-center">
                        <div
                          onClick={() => {
                            handleMarkAsRead(0, 0, 'all');
                          }}
                          className="pt-2 pb-2 pr-0 text-primary d-inline-block font-regular font-size-12"
                          style={{ cursor: 'pointer' }}
                        >
                          {newNotifications.length !== 0 ||
                          earlierNotifications.length !== 0 ? (
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
                </Card.Title>
                <Card.Body>
                  <h5
                    className="default-color font-medium font-size-14 mx-4"
                    hidden={!newNotifications.length}
                  >
                    New
                  </h5>
                  {newNotifications.length
                    ? newNotifications.map((newDetails, key) => (
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
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleMarkAsRead(
                                            newDetails.notification_id,
                                            key,
                                            'new',
                                          )
                                        }
                                      >
                                        Mark as Read
                                      </button>
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
                    className="default-color font-size-14 font-medium mx-4"
                    hidden={!earlierNotifications.length}
                  >
                    Earlier
                  </h5>
                  {earlierNotifications.length
                    ? earlierNotifications.map((earlierDetails, key) => (
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
                                      <button type="button">
                                        Mark as Read
                                      </button>
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
                  {newNotifications.length == 0 &&
                  earlierNotifications.length == 0 ? (
                    <h5 className="text-center">No Notifications</h5>
                  ) : (
                    ''
                  )}
                  {lazyLoading == true ? (
                    <div className="px-4">LOADING...</div>
                  ) : (
                    <div className="px-4">No more Notifications to load</div>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

NotificationsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newNotifications: PropTypes.any,
  earlierNotifications: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  notificationsPage: makeSelectNotificationsPage(),
  newNotifications: makeSelectNewNotifications(),
  earlierNotifications: makeSelectEarlierNotifications(),
  isLazyLoadFinished: makeSelectIsLazyLoadFinished(),
  lazyLoading: makeSelectLazyLoading(),
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

export default compose(withConnect)(NotificationsPage);
