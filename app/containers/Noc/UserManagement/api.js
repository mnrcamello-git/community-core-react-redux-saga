import axios from 'axios';
import env from '../../../config/env';

export const users = config =>
  axios.post(`${env.API_SERVER()}/users/all-users`, {}, config);

export const configureUsers = config =>
  axios.post(
    `${env.API_SERVER()}/users/configure-users`,
    {
      users: config.data,
      action: config.action,
    },
    config,
  );

export const saveUser = (config, data) =>
  axios.post(`${env.API_SERVER()}/users/create-user`, data, config);
