import axios from 'axios';
import env from '../../../config/env';

export const getInvoices = config =>
  axios.get(`${env.API_SERVER()}/invoices`, config);
