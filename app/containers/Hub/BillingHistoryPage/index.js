/**
 *
 * BillingHistoryPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectInvoices, makeSelectLoading } from './selectors';
import {
  makeSelectInvoiceBreakdown,
  makeSelectInvoiceBreakdownModalLoading,
  makeSelectModalErrorMessage,
} from '../InvoicingPage/selectors';
import reducer from './reducer';
import saga from './saga';

import BillingHistoryDatatable from '../../../components/BillingHistoryDatatable/Loadable';
import Print from '../../../assets/images/hub/print_icon.svg';
import { fetchInvoice } from './actions';

import loadingIcon from '../../../assets/images/loading.svg';
import EmptyPaidInvoiceIcon from '../../../assets/images/hub/invoice/empty-paid-invoice-icon.svg';
import { getToken } from '../../App/globalHelpers';
import env from '../../../config/env';

export function BillingHistoryPage({
  invoices,
  dispatch,
  loading,
  invoiceBreakdown,
  isInvoiceBreakdownModalLoading,
  modalErrorMessage,
}) {
  useInjectReducer({ key: 'billingHistoryPage', reducer });
  useInjectSaga({ key: 'billingHistoryPage', saga });

  useEffect(() => {
    dispatch(fetchInvoice());
  }, []);

  const token = getToken();

  return (
    <div className="billing-history">
      <div className="billing-history-buttons">
        {invoices.length > 0 ? (
          <a
            href={`${env.API_SERVER()}/invoices/paid/pdf?token=${token}`}
            target="_blank"
            className="btn btn-light btn-outline rounded-3 px-4 ml-2 py-2 border"
          >
            Print
            <img src={Print} alt="Print Icon" title="Print Icon" />
          </a>
        ) : (
          ''
        )}
      </div>
      {invoices.length > 0 ? (
        <BillingHistoryDatatable
          invoices={invoices}
          dispatch={dispatch}
          invoiceBreakdown={invoiceBreakdown}
          isInvoiceBreakdownModalLoading={isInvoiceBreakdownModalLoading}
          errorMessage={modalErrorMessage}
        />
        ) : (
          <div className="no-balance d-flex">
            <div className="align-self-center w-100 text-center">
              <img src={EmptyPaidInvoiceIcon} />
              <h3 className="font-semibold mt-3">Empty.</h3>
              <p className="m-0">
                There are no records to display.
              </p>
            </div>
          </div>
        )}
    </div>
  );
}

BillingHistoryPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  invoices: PropTypes.any,
  loading: PropTypes.bool,
  invoiceBreakdown: PropTypes.any,
  isInvoiceBreakdownModalLoading: PropTypes.bool,
  modalErrorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  invoices: makeSelectInvoices(),
  loading: makeSelectLoading(),
  invoiceBreakdown: makeSelectInvoiceBreakdown(),
  isInvoiceBreakdownModalLoading: makeSelectInvoiceBreakdownModalLoading(),
  modalErrorMessage: makeSelectModalErrorMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BillingHistoryPage);
