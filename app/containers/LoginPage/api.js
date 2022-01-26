import axios from 'axios';
import env from '../../config/env';

/**
 * authenticate - calls the API server for authentication
 *
 * @param {object} data the post data to authenticate. (email, password)
 */
export const authenticate = data =>
  axios.post(`${env.API_SERVER()}/auth/authenticate`, data);

/**
 * getUserDetails - calls the API server for user details
 *
 * @param {object} data the post token
 */
export const userDetails = data =>
  axios.post(`${env.API_SERVER()}/users/me`, {}, data);

/**
 * Get user's access
 * @param {*} config
 */
export const fetchUsersAccessData = config =>
  axios.get(`${env.API_SERVER()}/users/rcba`, config);
