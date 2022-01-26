import axios from 'axios';
import env from '../../../config/env';

export const getLatestInvoice = config =>
  axios.get(`${env.API_SERVER()}/invoices/latest`, config);

export const getInvoiceBreakdown = (invoiceNumber, config) =>
  axios.get(
    `${env.API_SERVER()}/invoices/invoice-breakdown?invoice_number=${invoiceNumber}`,
    config,
  );
