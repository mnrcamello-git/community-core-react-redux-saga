/**
 *
 * Hub
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHub from './selectors';
import reducer from './reducer';
import saga from './saga';
import WelcomeBG from '../../assets/images/welcome-bg.png';

import { defaultAction } from './actions';

export function Hub({ dispatch }) {
  useInjectReducer({ key: 'hub', reducer });
  useInjectSaga({ key: 'hub', saga });

  useEffect(() => {
    dispatch(defaultAction());
  }, []);
  return (
    <div>
      <div className="menu-title">
        <div className="col-md-12 p-0 welcome-section">
          <img src={WelcomeBG} />
          <h1>
            Hi!
            <br />
            Welcome
            <br /> to HUB
          </h1>
        </div>
      </div>
    </div>
  );
}

Hub.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  hub: makeSelectHub(),
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

export default compose(withConnect)(Hub);
