/**
 *
 * UnavailableInvoice
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import laptop from '../../assets/images/laptop.svg';

import messages from './messages';

export function UnavailableInvoice() {
  const handleBackButton = () => {
    // If the page is open directly to the browser window.close will not worked.
    if (window.close()) {
      window.close();
    } else {
      window.location = '/';
    }
  };

  return (
    <div className="not-found-page">
      <div className="main-content">
        <div className="col-lg-10 offset-lg-1">
          <div className="row">
            <div className="col-lg-6 col-sm-12 text-center">
              <img src={laptop} alt="laptop" title="laptop" className="w-100" />
            </div>
            <div className="col-lg-6 col-sm-12 text-center align-self-center">
              <div className="message">
                <h2 className="not-available">
                  <FormattedMessage {...messages.header} />
                </h2>
                <h4>
                  <FormattedMessage {...messages.content} />
                </h4>
                <h4>
                  <FormattedMessage {...messages.sub_content} />
                </h4>
                <h4>
                  <FormattedMessage {...messages.footer} />
                </h4>
                <button
                  onClick={handleBackButton}
                  type="button"
                  className="cancel w-25 mt-5"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UnavailableInvoice.propTypes = {
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

export default compose(withConnect)(UnavailableInvoice);
