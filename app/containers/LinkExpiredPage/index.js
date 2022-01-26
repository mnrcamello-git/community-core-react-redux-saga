/**
 *
 * LinkExpiredPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import clock from '../../assets/images/clock.svg';

export function LinkExpiredPage() {
  return (
    <div className="session-expired-page">
      <div className="main-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12 text-center">
              <h1>Link Expired</h1>
              <a href="/">
                <button className="btn mt-5">Go Back</button>
              </a>
            </div>
            <div className="col-lg-6 col-sm-12 text-center">
              <img src={clock} alt="clock" title="clock" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LinkExpiredPage.propTypes = {
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

export default compose(withConnect)(LinkExpiredPage);
