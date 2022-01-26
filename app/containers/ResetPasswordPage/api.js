import axios from 'axios';
import env from '../../config/env';

export const resetPassword = (data, config) =>
  axios.post(`${env.API_SERVER()}/password/reset`, data, config);
