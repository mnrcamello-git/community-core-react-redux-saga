/**
 *
 * BillingHistoryDatatable
 *
 */
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';
import { Dropdown, Modal } from 'react-bootstrap';
import {
  getToken,
  formatDateToDayMonthNameYear,
  formatStringToCurrency,
  replaceZeroValues,
} from '../../containers/App/globalHelpers';
import InvoiceBreakdownModalContent from '../InvoiceBreakdownModalContent';
import { fetchInvoiceBreakdown } from '../../containers/Hub/InvoicingPage/actions';
import pdf from '../../assets/images/hub/pdf_icon.svg';
import env from '../../config/env';

function BillingHistoryDatatable(props) {
  const token = getToken();
  const [modalShow, setModalShow] = useState(false);

  const columns = [
    {
      name: 'Invoice Number',
      selector: 'invoice_number',
      sortable: true,
      minWidth: '160px',
      cell: row => (
        <div>
          <a
            href={`${env.API_SERVER()}/invoices/pdf?invoice_id=${
              row.invoice_xero_id
            }&invoice_number=${row.invoice_number}&token=${token}`}
            target="_blank"
          >
            <img src={pdf} alt="PDF Icon" title="PDF Icon" className="pdf" />
            <span>{row.invoice_number}</span>
          </a>
        </div>
      ),
    },
    {
      name: 'Issue Date',
      selector: 'issue_date',
      sortable: true,
      center: true,
      minWidth: '112px',
      cell: row => (
        <div>
          <p className="mb-0">{formatDateToDayMonthNameYear(row.issue_date)}</p>
        </div>
      ),
    },
    {
      name: 'Due Date',
      selector: 'due_date',
      center: true,
      sortable: true,
      minWidth: '105px',
      cell: row => (
        <div>
          <p className="mb-0">{formatDateToDayMonthNameYear(row.due_date)}</p>
        </div>
      ),
    },
    {
      name: `Amount (${
        props.invoices.length > 0 ? props.invoices[0].currency_code : ''
      })`,
      center: true,
      minWidth: '150px',
      maxWidth: '150px',
      selector: 'amount',
      sortable: true,
      cell: row => (
        <div className="text-right w-100">
          <p className="mb-0">
            {row.amount === 0 ? '0.00' : formatStringToCurrency(row.amount)}
          </p>
        </div>
      ),
    },
    {
      name: 'Amount Paid',
      center: true,
      minWidth: '125px',
      maxWidth: '125px',
      selector: 'amount_paid',
      sortable: true,
      cell: row => (
        <div className="text-right w-100">
          <p className="mb-0">
            {row.amount_paid === 0
              ? '0.00'
              : formatStringToCurrency(row.amount_paid)}
          </p>
        </div>
      ),
    },
    {
      name: 'Amount Credited',
      center: true,
      minWidth: '150px',
      maxWidth: '150px',
      selector: 'amount_credited',
      sortable: true,
      cell: row => (
        <div className="text-right w-100">
          <p className="mb-0">
            {row.amount_credited === 0
              ? '0.00'
              : formatStringToCurrency(row.amount_credited)}
          </p>
        </div>
      ),
    },
    {
      name: 'Balance',
      minWidth: '110px',
      maxWidth: '110px',
      selector: 'balance',
      sortable: true,
      cell: row => (
        <div className="text-right w-100">
          <p className="mb-0">
            {row.balance === 0 ? '0.00' : formatStringToCurrency(row.balance)}
          </p>
        </div>
      ),
    },
    {
      name: 'Action',
      center: true,
      allowOverflow: true,
      cell: row => (
        <Dropdown>
          <Dropdown.Toggle className="gear-btn">
            <i className="fa fa-cog" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* <Dropdown.Item
              onClick={() => handleModalInvoiceBreakdown(row.invoice_number)}
            >
              View Invoice Breakdown
            </Dropdown.Item>
            <Dropdown.Divider /> */}
            <Dropdown.Item
              target="_blank"
              href={`${env.API_SERVER()}/invoices/download-pdf?invoice_id=${
                row.invoice_xero_id
              }&invoice_number=${row.invoice_number}&token=${token}`}
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
        invoiceNumber,
        isLoading: true,
      }),
    );

    if (!props.isInvoiceBreakdownModalLoading) {
      setModalShow(true);
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={props.invoices}
        pagination
        highlightOnHover
        noHeader
        striped
        sortIcon={<span className="icon-table icon-arrow-down" />}
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
    </>
  );
}

BillingHistoryDatatable.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func,
  invoices: PropTypes.array,
  isInvoiceBreakdownModalLoading: PropTypes.bool,
  invoiceBreakdown: PropTypes.any,
  errorMessage: PropTypes.string,
};

export default BillingHistoryDatatable;
