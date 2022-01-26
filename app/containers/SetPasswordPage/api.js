import axios from 'axios';
import env from '../../config/env';

export const verifyToken = token =>
  axios.get(`${env.API_SERVER()}/auth/verify-token?token=${token}`);

export const setPassword = (data, config) =>
  axios.post(`${env.API_SERVER()}/password/set-password`, data, config);

export const resendLink = token =>
  axios.get(`${env.API_SERVER()}/auth/resend-link?token=${token}`);
