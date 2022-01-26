/**
 *
 * SoaDatatable
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { Dropdown, Modal } from 'react-bootstrap';
import {
  formatStringToCurrency,
  replaceZeroValues,
  getToken,
  formatDateToDayMonthNameYear,
} from '../../containers/App/globalHelpers';
import { fetchInvoiceBreakdown } from '../../containers/Hub/InvoicingPage/actions';
import InvoiceBreakdownModalContent from '../InvoiceBreakdownModalContent/index';
import env from '../../config/env';
import pdf from '../../assets/images/hub/pdf_icon.svg';

function SoaDatatable(props) {
  const [modalShow, setModalShow] = useState(false);
  const columns = [
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      cell: row => <div>{formatDateToDayMonthNameYear(row.date)}</div>,
    },
    {
      name: 'Invoice Number',
      selector: 'activity',
      sortable: true,
      minWidth: '160px',
      cell: row => (
        <div>
          <a
            href={`${env.API_SERVER()}/invoices/pdf?invoice_id=${
              row.invoice_xero_id
            }
        &invoice_number=${row.activity}&token=${getToken()}`}
            target="_blank"
          >
            <img className="pdf" src={pdf} alt="PDF Icon" title="PDF Icon" />
            {row.activity}
          </a>
        </div>
      ),
    },
    {
      name: 'Due Date',
      selector: 'due_date',
      sortable: true,
      minWidth: '105px',
      cell: row => <div>{formatDateToDayMonthNameYear(row.due_date)}</div>,
    },
    {
      name: <div className="text-right">Invoice Amount</div>,
      selector: 'amount_due',
      sortable: true,
      minWidth: '145px',
      maxWidth: '145px',
      cell: row => (
        <div className="w-100 text-right">
          {row.amount === 0 ? '0.00' : formatStringToCurrency(row.amount)}
        </div>
      ),
    },
    {
      name: <div className="text-right">Amount Paid</div>,
      selector: 'amount_paid',
      sortable: true,
      minWidth: '130px',
      maxWidth: '130px',
      cell: row => (
        <div className="w-100 text-right">
          {row.amount_paid === 0
            ? '0.00'
            : formatStringToCurrency(row.amount_paid)}
        </div>
      ),
    },
    {
      name: <div className="text-right">Amount Credited</div>,
      selector: 'credited',
      sortable: true,
      minWidth: '150px',
      maxWidth: '150px',
      cell: row => (
        <div className="w-100 text-right">
          {row.amount_credited === 0
            ? '0.00'
            : formatStringToCurrency(row.amount_credited)}
        </div>
      ),
    },
    {
      name: <div className="text-right">Balance</div>,
      selector: 'balance',
      sortable: true,
      minWidth: '130px',
      maxWidth: '130px',
      cell: row => (
        <div className="w-100 text-right">
          {row.balance === 0 ? '0.00' : formatStringToCurrency(row.balance)}
        </div>
      ),
    },
    {
      name: 'Action',
      maxWidth: '100%',
      center: true,
      allowOverflow: true,
      omit: props.isExportHide,
      cell: row => (
        <Dropdown className={props.isExportHide === false ? '' : 'd-none'}>
          <Dropdown.Toggle className="gear-btn">
            <i className="fa fa-cog" />{' '}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* <Dropdown.Item
              onClick={() => handleModalInvoiceBreakdown(row.activity)}
            >
              View Invoice Breakdown
            </Dropdown.Item>
            <Dropdown.Divider /> */}
            <Dropdown.Item
              onClick={() =>
                window.open(
                  `${env.API_SERVER()}/invoices/download-pdf?invoice_id=${
                    row.invoice_xero_id
                  }
              &invoice_number=${row.activity}&token=${getToken()}`,
                  '_blank',
                )
              }
            >
              Download Invoice
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  /**
   * handles modal requests in data table invoice breakdown
   */
  const handleModalInvoiceBreakdown = invoiceNumber => {
    props.dispatch(
      fetchInvoiceBreakdown({
        invoiceNumber: invoiceNumber,
        isLoading: true,
      }),
    );

    if (!props.isInvoiceBreakdownModalLoading) {
      setModalShow(true);
    }
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={props.invoices}
        highlightOnHover
        noHeader
        striped
        sortIcon={
          props.isExportHide ? (
            <span />
          ) : (
            <span className="icon-table icon-arrow-down" />
          )
        }
      />
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        dialogClassName="modal-90w invoice-breakdown-modal"
        backdrop="static"
      >
        <InvoiceBreakdownModalContent
          invoiceBreakdown={props.invoiceBreakdown}
          loading={props.isInvoiceBreakdownModalLoading}
          dispatch={props.dispatch}
          errorMessage={props.errorMessage}
          onHide={() => setModalShow(false)}
        />
      </Modal>
    </div>
  );
}

SoaDatatable.propTypes = {
  invoices: PropTypes.array,
  isExportHide: PropTypes.bool,
  isInvoiceBreakdownModalLoading: PropTypes.bool,
  dispatch: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default memo(SoaDatatable);
