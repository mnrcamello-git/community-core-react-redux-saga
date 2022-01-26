/**
 *
 * StatementOfAccountPage
 *
 */

import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  formatStringToCurrency,
  replaceZeroValues,
} from '../../App/globalHelpers';
import loadingIcon from '../../../assets/images/loading.svg';

import {
  makeSelectInvoices,
  makeSelectExportHide,
  makeSelectExportLoadingMessage,
  makeSelectExportSuccessMessage,
  makeSelectExportFailedMessage,
  makeSelectClientName,
  makeSelectClientAddress,
  makeSelectClientAttention,
  makeSelectClientCurrency,
  makeSelectInvoiceFrom,
  makeSelectInvoiceTo,
  makeSelectClientGrandTotalBalance,
  makeSelectLoading,
  makeSelectSoaFailedMessage,
} from './selectors';

import {
  makeSelectInvoiceBreakdown,
  makeSelectInvoiceBreakdownModalLoading,
  makeSelectModalErrorMessage,
} from '../InvoicingPage/selectors';

import { PB_WEBSITE, PB_INFO_MAIL } from './constants';

import { exportSoa, requestSOA } from './actions';
import SoaDatatable from '../../../components/SoaDatatable/Loadable';
import ExpireComponent from '../../../components/ExpireComponent';
import pb from '../../../assets/images/PB_logo.png';
import PBIcon from '../../../assets/images/PB_Icon.svg';
import PaidInvoiceIcon from '../../../assets/images/hub/invoice/paid-invoice-icon.svg';
export function StatementOfAccountPage({
  dispatch,
  invoices,
  isExportHide,
  exportLoadingMessage,
  exportSuccessMessage,
  exportFailedMessage,
  clientName,
  clientAddress,
  clientAttention,
  clientCurrency,
  invoiceFrom,
  invoiceTo,
  invoiceGrandTotal,
  loading,
  requestSoaFailedMessage,
  invoiceBreakdown,
  isInvoiceBreakdownModalLoading,
  modalErrorMessage,
}) {
  useInjectReducer({ key: 'statementOfAccountPage', reducer });
  useInjectSaga({ key: 'statementOfAccountPage', saga });

  useEffect(() => {
    // request for data
    dispatch(requestSOA());
  }, []);

  const handleClickExport = () => {
    dispatch(
      exportSoa({
        message: 'Exporting Statement of Account. Please wait.',
      }),
    );
  };

  return (
    <div className="statement-of-account">
      {exportLoadingMessage && (
        <div className="alert alert-warning"> {exportLoadingMessage} </div>
      )}
      {exportSuccessMessage && (
        <ExpireComponent>
          <div className="alert alert-success"> {exportSuccessMessage} </div>
        </ExpireComponent>
      )}
      {exportFailedMessage && (
        <ExpireComponent>
          <div className="alert alert-danger"> {exportFailedMessage} </div>
        </ExpireComponent>
      )}

      {requestSoaFailedMessage && (
        <ExpireComponent>
          <div className="alert alert-danger"> {requestSoaFailedMessage} </div>
        </ExpireComponent>
      )}

      {loading ? (
        <img
          src={loadingIcon}
          className="mx-auto d-flex align-self-center"
          alt="we are loading"
        />
      ) : invoices.length === 0 ? (
        <div className="no-invoice-balance d-flex">
          <div className="align-self-center w-100 text-center">
            <img src={PaidInvoiceIcon} className="mx-auto" />
            <h3 className="font-semibold mt-3">CONGRATS!:)</h3>
            <p className="m-0">
              You don’t have any outstanding authorised invoice balance
            </p>
          </div>
        </div>
      ) : (
        // ID is needed for the export functionality
        <div className="card" id="statement-of-account">
          <div className="card-body">
            <div className="p-4">
              <div className={isExportHide === false ? 'row p-0' : 'row p-0'}>
                <div className="col-lg-6">
                  <img
                    src={pb}
                    alt="Penbrothers Logo"
                    title="Penbrothers"
                    width="250"
                  />
                </div>
                <div className="col-lg-6 text-right">
                  <button
                    type="button"
                    className={
                      isExportHide === false
                        ? 'primary-button'
                        : 'primary-button d-none'
                    }
                    onClick={handleClickExport}
                  >
                    <i className="fa fa-download mr-2" />
                    Export
                  </button>
                </div>
              </div>
              <div className="row px-3 mb-3">
                <div className="col-lg-6 p-0 align-self-end">
                  <h4 className="font-medium m-0">
                    Balance Due in {clientCurrency}
                  </h4>
                </div>
                <div className="col-lg-6 p-0 mt-4 text-right">
                  <ul className="p-0 m-0">
                    <li className="d-inline-block ml-5 font-medium">
                      <span className="d-block mb-2">
                        <FormattedMessage {...messages.from_date} />
                      </span>
                      <span className="gray-color">{invoiceFrom}</span>
                    </li>
                    <li className="d-inline-block ml-5 font-medium">
                      <span className="d-block mb-2">
                        <FormattedMessage {...messages.to_date} />
                      </span>
                      <span className="gray-color">{invoiceTo}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 pt-3 pb-4 px-0">
                  <SoaDatatable
                    dispatch={dispatch}
                    invoices={invoices}
                    isExportHide={isExportHide}
                    invoiceBreakdown={invoiceBreakdown}
                    isInvoiceBreakdownModalLoading={
                      isInvoiceBreakdownModalLoading
                    }
                    errorMessage={modalErrorMessage}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 text-right">
                  <h4 className="font-semibold default-color mb-0">
                    Balance due {clientCurrency}{' '}
                    {replaceZeroValues(
                      formatStringToCurrency(invoiceGrandTotal),
                    )}
                  </h4>
                </div>
              </div>
            </div>
            <div className="middle-content py-4">
              <div className="row p-3 mx-3">
                <div className="col-lg-8">
                  <p className="m-0 text-uppercase">{clientName}</p>
                  <p className="m-0">{`Attention: ${clientAttention}`}</p>
                  <p className="m-0 pr-5">Client Address: {clientAddress}</p>
                </div>
                <div className="col-lg-4">
                  <p className="m-0">
                    <FormattedMessage {...messages.company_name} />
                  </p>
                  <p className="m-0">
                    <FormattedMessage {...messages.company_address} />
                  </p>
                </div>
              </div>
              <div className="col-lg-12">
                <hr />
              </div>
              <div className="row p-3 mx-3">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="m-0">
                        <FormattedMessage {...messages.bank_title} />
                      </p>
                    </div>
                    <div className="col-lg-8">
                      <p className="m-0">
                        <FormattedMessage {...messages.company_name} />
                      </p>
                      <p className="m-0">
                        <FormattedMessage {...messages.bank_name} />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-6">
                      {clientCurrency === 'USD' ? (
                        <p className="m-0">
                          <FormattedMessage {...messages.usd_account} />
                        </p>
                      ) : (
                        ''
                      )}
                      {clientCurrency === 'PHP' ? (
                        <p className="m-0">
                          <FormattedMessage {...messages.php_account} />
                        </p>
                      ) : (
                        ''
                      )}
                      {clientCurrency === 'AUD' ? (
                        <p className="m-0">
                          <FormattedMessage {...messages.aud_account} />
                        </p>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="col-lg-6">
                      <p className="m-0">
                        <FormattedMessage {...messages.swift_code} />
                      </p>
                      <p className="m-0">
                        <FormattedMessage {...messages.tax} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom-content py-4">
              <div className="row p-3 mx-3  d-flex">
                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-lg-12">
                      <ul className="brand-color font-medium m-0 p-0">
                        Landline No.
                        <li className="gray-color ml-3">
                          OPL - (63) 2 8541 5840
                        </li>
                        <li className="gray-color ml-3">
                          Sheridan - (63) 2 8404 0043
                        </li>
                      </ul>
                    </div>
                    {/* <div className="col-lg-6">
                      <ul className="brand-color font-medium m-0 p-0">
                        Mobile
                        <li className="gray-color ml-3">+63 945 378 9070</li>
                      </ul>
                    </div> */}
                  </div>
                </div>
                <div className="col-lg-8 text-right">
                  <div className="row">
                    <div className="col-lg-6">
                      <img
                        src={PBIcon}
                        alt="Penbrothers Icon"
                        title="Penbrothers"
                        width="50"
                      />
                      <a
                        href={PB_WEBSITE}
                        className="brand-color ml-2 font-medium"
                        target="_blank"
                      >
                        www.penbrothers.com
                      </a>
                    </div>
                    <div className="col-lg-6 align-self-center">
                      <a
                        href={PB_INFO_MAIL}
                        className="brand-color ml-2 font-medium"
                        target="_blank"
                      >
                        info@penbrothers.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

StatementOfAccountPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  invoices: PropTypes.any,
  isExportHide: PropTypes.bool,
  exportLoadingMessage: PropTypes.string,
  exportSuccessMessage: PropTypes.string,
  exportFailedMessage: PropTypes.string,
  invoiceBreakdown: PropTypes.any,
  isInvoiceBreakdownModalLoading: PropTypes.bool,
  modalErrorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  invoices: makeSelectInvoices(),
  isExportHide: makeSelectExportHide(),
  exportLoadingMessage: makeSelectExportLoadingMessage(),
  exportSuccessMessage: makeSelectExportSuccessMessage(),
  exportFailedMessage: makeSelectExportFailedMessage(),
  clientName: makeSelectClientName(),
  clientAddress: makeSelectClientAddress(),
  clientAttention: makeSelectClientAttention(),
  clientCurrency: makeSelectClientCurrency(),
  invoiceFrom: makeSelectInvoiceFrom(),
  invoiceTo: makeSelectInvoiceTo(),
  invoiceGrandTotal: makeSelectClientGrandTotalBalance(),
  loading: makeSelectLoading(),
  requestSoaFailedMessage: makeSelectSoaFailedMessage(),
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

export default compose(withConnect)(StatementOfAccountPage);
