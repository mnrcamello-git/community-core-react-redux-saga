/*
 *
 * BillingHistoryPage actions
 *
 */

import {
  FETCH_INVOICE,
  FETCH_INVOICE_SUCCESS,
  FETCH_INVOICE_FAILED,
  VIEW_INVOICE,
  VIEW_INVOICE_SUCCESS,
  VIEW_INVOICE_FAILED,
} from './constants';

export function fetchInvoice() {
  return {
    type: FETCH_INVOICE,
  };
}

export function fetchInvoiceSuccess(payload) {
  return {
    type: FETCH_INVOICE_SUCCESS,
    payload,
  };
}

export function fetchInvoiceFailed(payload) {
  return {
    type: FETCH_INVOICE_FAILED,
    payload,
  };
}

export function viewInvoice(payload) {
  return {
    type: VIEW_INVOICE,
    payload,
  };
}

export function viewInvoiceSuccess(payload) {
  return {
    type: VIEW_INVOICE_SUCCESS,
    payload,
  };
}

export function viewInvoiceFailed(payload) {
  return {
    type: VIEW_INVOICE_FAILED,
    payload,
  };
}
