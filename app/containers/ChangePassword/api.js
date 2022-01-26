import axios from 'axios';
import env from '../../config/env';

export const passwordChange = (data, config) =>
  axios.post(`${env.API_SERVER()}/password/change-password`, data, config);
