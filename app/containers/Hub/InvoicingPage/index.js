/**
 *
 * InvoicingPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Tabs, Tab, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { makeSelectLastUpdate } from './selectors';
import reducer from './reducer';
import saga from './saga';

import StatementOfAccountPage from '../StatementOfAccountPage/Loadable';
import BillingHistoryPage from '../BillingHistoryPage/Loadable';
import FaqPage from '../FaqPage/Loadable';
import { fetchLatestInvoice } from './actions';

export function InvoicingPage({ dispatch, lastUpdate }) {
  useInjectReducer({ key: 'invoicingPage', reducer });
  useInjectSaga({ key: 'invoicingPage', saga });

  useEffect(() => {
    dispatch(fetchLatestInvoice());
  }, []);

  return (
    <div className="invoicing">
      <div className="menu-title">
        <div className="col-md-12 p-0">
          <h2 className="header-fontcolor">Invoice</h2>
        </div>
      </div>
      <div className="data-table p-0">
        <Tabs
          defaultActiveKey="statement-of-account"
          id="uncontrolled-tab-example"
        >
          <Tab
            eventKey="statement-of-account"
            title={
              <div>
                <span>Statement of Account</span>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-right" className="tooltip-content">
                      This shows your current Statment of Account summarizing
                      all your open or partially open invoices.
                    </Tooltip>
                  }
                >
                  <span
                    variant="secondary"
                    className="icon-table icon-tooltip align-self-center ml-2"
                  />
                </OverlayTrigger>
              </div>
            }
          >
            <div className="statement-account-page">
              <StatementOfAccountPage />
              <div className="text-right pt-3 px-2 d-flex">
                <div className="w-100 text-left">
                  <p className="text-danger mb-0">
                    Only shows last 12 months worth of invoices
                  </p>
                </div>
                <div className="w-100 text-right">
                  <p className="text-danger mb-0">
                    Updated Invoice as of {lastUpdate}
                  </p>
                </div>
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="billing-history"
            title={
              <div>
                <span>Paid Invoices</span>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-right" className="tooltip-content">
                      This shows a detailed list of all your fully paid invoices
                    </Tooltip>
                  }
                >
                  <span
                    variant="secondary"
                    className="icon-table icon-tooltip align-self-center ml-2"
                  />
                </OverlayTrigger>
              </div>
            }
          >
            <div className="pt-1">
              <BillingHistoryPage />
              <div className="text-right py-3 px-2 d-flex">
                <div className="w-100 text-left">
                  <p className="text-danger mb-0">
                    Only shows last 12 months worth of invoices
                  </p>
                </div>
                <div className="w-100 text-right">
                  <p className="text-danger mb-3">
                    Updated Invoice as of {lastUpdate}
                  </p>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="faq" title="Invoice FAQ">
            <FaqPage />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

InvoicingPage.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
  lastUpdate: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  lastUpdate: makeSelectLastUpdate(),
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

export default compose(withConnect)(InvoicingPage);
