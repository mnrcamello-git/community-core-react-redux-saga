/**
 *
 * Noc
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNoc from './selectors';
import reducer from './reducer';
import saga from './saga';
import WelcomeBG from '../../assets/images/welcome-bg.png';

export function Noc() {
  useInjectReducer({ key: 'noc', reducer });
  useInjectSaga({ key: 'noc', saga });

  return (
    <div>
      <div className="menu-title">
        <div className="col-md-12 p-0 welcome-section">
          <img src={WelcomeBG} />
          <h1>
            Hi!
            <br />
            Welcome
            <br /> to NOC
          </h1>
        </div>
      </div>
    </div>
  );
}

Noc.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  noc: makeSelectNoc(),
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

export default compose(withConnect)(Noc);
