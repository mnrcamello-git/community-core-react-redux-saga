/**
 *
 * SocketComponent
 *
 */

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { extractToken } from '../../containers/App/globalHelpers';
import { updateNotification } from '../../layouts/dashboard/actions';
import { socket } from '../../containers/App/socket';

function NotificationSocketComponent({ dispatch }) {
  useEffect(() => {
    /**
     * Events for client_id->role
     */
    const events = [
      'modify-joborder-remote',
      'modify-candidate-status-remote',
      'modify-joborder-core2-remote',
      'modify-candidate-status-core2-remote',
      'add-joborder-core2-remote',
      'duplicate-joborder-remote',
      'duplicate-joborder-core2-remote',
      'modify-candidate-profile-remote',
      'modify-candidate-profile-core2-remote',
      'assign-to-prospect-core2-remote',
    ];

    if (!socket) {
      return;
    }
    let tempNotifContainer = [];

    /**
     * Role events
     */
    events.map(e => {
      extractToken().role_id.map(role => {
        socket.on(`${e}-${extractToken().client_id}-${role}`, remoteData => {
          remoteData.data.forEach(details => {
            if (details.user_id == extractToken().id) {
              tempNotifContainer.push({
                notification_id: details.notification_id,
                message: details.message,
                module: details.module,
                url: details.url,
                isRead: details.isRead,
                dateGenerated: details.dateGenerated,
              });
            }
          });
          if (!tempNotifContainer.length) {
            return;
          }
          dispatch(
            updateNotification({
              newNotifications: tempNotifContainer,
            }),
          );
          tempNotifContainer = [];
        });
      });
    });

    /**
     * individual events
     */
    socket.on(
      `client-prospect-new-contract-remote-${extractToken().client_id}-${
        extractToken().id
      }`,
      remoteData => {
        remoteData.data.forEach(details => {
          if (details.user_id == extractToken().id) {
            tempNotifContainer.push({
              notification_id: details.notification_id,
              message: details.message,
              module: details.module,
              url: details.url,
              isRead: details.isRead,
              dateGenerated: details.dateGenerated,
            });
          }
        });
        if (!tempNotifContainer.length) {
          return;
        }
        dispatch(
          updateNotification({
            newNotifications: tempNotifContainer,
          }),
        );
        tempNotifContainer = [];
      },
    );

    return () => {
      tempNotifContainer = [];
      socket.off();
    };
  }, [socket]);

  return null;
}

NotificationSocketComponent.propTypes = {
  dispatch: PropTypes.any,
  notifications: PropTypes.any,
  newNotifications: PropTypes.any,
  notifCount: PropTypes.any,
};

export default NotificationSocketComponent;
