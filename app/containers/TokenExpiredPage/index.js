/**
 *
 * TokenExpiredPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { defaultAction } from '../Hub/actions';
import clock from '../../assets/images/clock.svg';

export function TokenExpiredPage({ dispatch }) {
  useEffect(() => {
    dispatch(defaultAction());
  }, []);

  return (
    <div className="session-expired-page">
      <div className="main-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12 text-center">
              <h1>Session Expired</h1>
              <h5 className="mt-5">
                To Log-in again, please click the button below
              </h5>
              <a href="/">
                <button className="btn mt-5">Login</button>
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

TokenExpiredPage.propTypes = {
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

export default compose(withConnect)(TokenExpiredPage);
