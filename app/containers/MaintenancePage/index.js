/**
 *
 * MaintenancePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import env from '../../config/env';
import MaintenanceLaptop from '../../assets/images/maintenance-laptop.svg';
import StopSign from '../../assets/images/stop-sign.svg';

export function MaintenancePage() {
  useEffect(() => {
    if (env.MAINTENANCE_MODE() === 'OFF') {
      window.location = '/';
    }
  }, []);

  return (
    <div className="maintenance-page">
      <div className="main-content">
        <div className="col-lg-10 offset-lg-1 text-center">
          <div className="row">
            <div className="col-lg-6 col-sm-12 p-0">
              <img
                src={MaintenanceLaptop}
                alt="laptop"
                title="laptop"
                className="w-100"
              />
            </div>
            <div className="col-lg-6 col-sm-12 p-0 align-self-center right-content">
              <h1 className="font-bold text-uppercase">
                Under <br /> Maintenance
              </h1>
              <h4 className="font-bold mt-4">
                We are preparing to serve you better
              </h4>
            </div>
            <img
              src={StopSign}
              alt="Stop Sign"
              title="Stop Sign"
              className="w-25 mt-3 mx-auto d-none stop-sign"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

MaintenancePage.propTypes = {
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

export default compose(withConnect)(MaintenancePage);
