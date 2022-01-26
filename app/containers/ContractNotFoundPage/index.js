/**
 *
 * ContractNotFoundPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import computer from '../../assets/images/computer-contract.svg';

export function ContractNotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="main-content">
        <div className="col-lg-10 offset-lg-1">
          <div className="row">
            <div className="col-lg-6 col-sm-12 text-center">
              <img
                src={computer}
                alt="laptop"
                title="laptop"
                className="w-100"
              />
            </div>
            <div className="col-lg-6 col-sm-12 text-center align-self-center">
              <div className="message">
                <h2>Contract Unavailable</h2>
                <h5 className="not-available">
                  Contract link may not be available or broken
                </h5>
                <button
                  onClick={() => window.close()}
                  type="button"
                  className="cancel w-25 mt-5"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ContractNotFoundPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ContractNotFoundPage);
