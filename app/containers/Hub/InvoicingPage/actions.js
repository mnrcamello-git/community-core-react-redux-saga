/*
 *
 * InvoicingPage actions
 *
 */

import {
  FETCH_LATEST_INVOICE,
  FETCH_LATEST_INVOICE_SUCCESS,
  FETCH_LATEST_INVOICE_FAILED,
  FETCH_INVOICE_BREAKDOWN,
  FETCH_INVOICE_BREAKDOWN_SUCCESS,
  FETCH_INVOICE_BREAKDOWN_FAILED,
} from './constants';

export function fetchLatestInvoice() {
  return {
    type: FETCH_LATEST_INVOICE,
  };
}

export function fetchLatestInvoiceSuccess(payload) {
  return {
    type: FETCH_LATEST_INVOICE_SUCCESS,
    payload,
  };
}

export function fetchLatestInvoiceFailed(payload) {
  return {
    type: FETCH_LATEST_INVOICE_FAILED,
    payload,
  };
}

export function fetchInvoiceBreakdown(payload) {
  return {
    type: FETCH_INVOICE_BREAKDOWN,
    payload,
  };
}

export function fetchInvoiceBreakdownSuccess(payload) {
  return {
    type: FETCH_INVOICE_BREAKDOWN_SUCCESS,
    payload,
  };
}

export function fetchInvoiceBreakdownFailed(payload) {
  return {
    type: FETCH_INVOICE_BREAKDOWN_FAILED,
    payload,
  };
}
