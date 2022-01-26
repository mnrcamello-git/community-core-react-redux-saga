import axios from 'axios';
import env from '../../config/env';

export const forgotPassword = data =>
  axios.post(`${env.API_SERVER()}/password/forgot`, data);
