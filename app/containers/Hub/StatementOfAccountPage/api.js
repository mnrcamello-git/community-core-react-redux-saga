import axios from 'axios';
import env from '../../../config/env';

export const requestSoaAPI = config =>
  axios.post(`${env.API_SERVER()}/invoices/soa`, {}, config);
