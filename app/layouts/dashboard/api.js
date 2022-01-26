import axios from 'axios';
import env from '../../config/env';

/**
 * Get user's notifications
 * @param {*} config
 */
export const fetchUserNewNotifications = token =>
  axios.get(`${env.API_SERVER()}/notifications/my-notif/new?token=${token}`);

export const fetchUserEarlierNotifications = data =>
  axios.get(
    `${env.API_SERVER()}/notifications/my-notif/earlier?token=${
      data.token
    }&newNotifCount=${data.new_notification_count}`,
  );

export const updateUserNotifications = (config, data) =>
  axios.put(`${env.API_SERVER()}/notifications/toggle`, data, config);

export const getNextNotifications = (token, offset) =>
  axios.get(
    `${env.API_SERVER()}/notifications/my-notif/lazy-load?token=${token}&offset=${offset}`,
  );

export const markAsRead = (config, data) =>
  axios.put(`${env.API_SERVER()}/notifications/mark-read`, data, config);

export const getUserSettings = token =>
  axios.get(`${env.API_SERVER()}/settings/my-settings?token=${token}`);

export const updateUserSettings = (config, data) =>
  axios.put(`${env.API_SERVER()}/settings/update`, data, config);

export const sendFeedback = (config, data) =>
  axios.post(`${env.API_SERVER()}/feedbacks/`, data, config);

export const requestZohoUsers = config => axios.get(`${env.API_SERVER()}/zoho/users`, config);

export const syncCrmXeroAPI = config => axios.put(`${env.API_SERVER()}/settings/xero-sync`, {isManual: true},  config)