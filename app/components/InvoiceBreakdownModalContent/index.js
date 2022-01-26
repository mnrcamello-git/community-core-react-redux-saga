/**
 *
 * InvoiceBreakdownModalContent
 *
 */

import React from 'react';
import { Modal } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import PropTypes from 'prop-types';
import {
  formatISOtoLongYear,
  convertArrayOfObjectsToCSV,
  convertCSVToExcel,
} from '../../containers/App/globalHelpers';
import InvoiceBreakdownDatatable from '../InvoiceBreakdownDatatable';
import PBIcon from '../../assets/images/PB_Icon_White.svg';

function InvoiceBreakdownModalContent(props) {
  /**
   * Export Data to CSV
   */
  const handleExportCsv = () => {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(
      props.invoiceBreakdown.tracked_items,
      props.invoiceBreakdown.columns,
    );
    if (csv == null) return;

    const filename = `${props.invoiceBreakdown.client.name}-${
      props.invoiceBreakdown.invoice.invoice_number
    }.csv`;

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  };

  /**
   * Export to Excel
   */
  const handleExportExcel = () => {
    convertCSVToExcel(
      props.invoiceBreakdown.tracked_items,
      `${props.invoiceBreakdown.client.name}-${
        props.invoiceBreakdown.invoice.invoice_number
      }`,
      props.invoiceBreakdown.columns,
    );
  };

  return (
    <>
      <LoadingOverlay
        active={props.loading}
        spinner
        text="Loading Invoice Breakdown..."
      >
        <Modal.Header>
          <button className="close-btn" onClick={props.onHide}>
            <i className="fa fa-arrow-left" />
            Invoice #{' '}
            {props.invoiceBreakdown
              ? props.invoiceBreakdown.invoice.invoice_number
              : ''}
          </button>
          <Modal.Title>
            <img
              src={PBIcon}
              alt="Penbrothers Icon"
              title="Penbrothers"
              width="50"
              className="mr-3"
            />
            {props.invoiceBreakdown ? props.invoiceBreakdown.client.name : ''}{' '}
            Invoice Breakdown for{' '}
            {props.invoiceBreakdown
              ? props.invoiceBreakdown.invoice.invoice_number
              : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.errorMessage ? (
            <div className="alert alert-danger">
              {' '}
              Something went wrong, please try again later.
            </div>
          ) : (
            <>
              <div className="row py-4">
                <div className="col-md-7 align-self-center">
                  <h4 className="gray-color font-semibold mb-3">
                    Issue Date{' '}
                    {props.invoiceBreakdown
                      ? formatISOtoLongYear(
                          props.invoiceBreakdown.invoice.invoice_date,
                        )
                      : ''}{' '}
                  </h4>
                  <h4 className="gray-color font-semibold">
                    Due Date{' '}
                    {props.invoiceBreakdown
                      ? formatISOtoLongYear(
                          props.invoiceBreakdown.invoice.invoice_due_date,
                        )
                      : ''}{' '}
                  </h4>
                </div>
                <div className="col-md-5 text-left text-danger">
                  <div className="disclaimer font-weight-bold">
                    <p>Disclaimer: </p>
                    <p className="m-0">
                      1. Only invoices from January 2020 on will have an invoice
                      breakdown
                      <br />
                      2. All accounts with * are subject to VAT
                    </p>
                  </div>
                </div>
              </div>
              <div className="card">
                {props.invoiceBreakdown ? (
                  props.invoiceBreakdown.tracked_items.length > 0 ? (
                    <div className="text-right export-buttons">
                      <button
                        type="button"
                        className="btn btn-primary mr-1"
                        onClick={handleExportExcel}
                      >
                        <i className="fa fa-download mr-2" /> Export to Excel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleExportCsv}
                      >
                        <i className="fa fa-download mr-2" /> Export to CSV
                      </button>
                    </div>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
                <div className="card-body">
                  {props.invoiceBreakdown ? (
                    <InvoiceBreakdownDatatable
                      dispatch={props.dispatch}
                      invoices={props.invoiceBreakdown.invoice}
                      tracked_items={props.invoiceBreakdown.tracked_items}
                      client={props.invoiceBreakdown.client}
                      columns={props.invoiceBreakdown.columns}
                    />
                  ) : (
                    ' '
                  )}
                </div>
              </div>
            </>
          )}
        </Modal.Body>
      </LoadingOverlay>
    </>
  );
}

InvoiceBreakdownModalContent.propTypes = {
  invoiceBreakdown: PropTypes.any,
  dispatch: PropTypes.any,
  loading: PropTypes.any,
  errorMessage: PropTypes.any,
};

export default InvoiceBreakdownModalContent;
