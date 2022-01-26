/**
 *
 * IdleTimer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import IdleTimer from 'react-idle-timer';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearUserData } from '../../containers/App/globalHelpers';
import { loginFailed } from '../../containers/LoginPage/actions';

function IdleTimerComponent({
  timer,
  _onIdle,
  _onAction,
  _onActive,
  dispatch,
}) {
  /**
   * Timer in millisecond that counts when user is idle, not doing anything 1200000ms = 20 minutes
   */
  const timeTillConsideredIdle = 1200000;

  _onAction = e => {
    /**
     * Listener when user creates an action (mousevent etc);
     */
  };

  _onActive = e => {
    /**
     * Listener when user is active, can get remaining time etc, see reference in docs
     */
  };

  _onIdle = e => {
    /**
     * push to login page then clear data
     */
    clearUserData();
    dispatch(push('/'));
    dispatch(
      loginFailed(`You've been logged out due to idling, please login again`),
    );
  };

  return (
    <div>
      <IdleTimer
        ref={ref => {
          timer = ref;
        }}
        element={document}
        onActive={_onActive}
        onIdle={_onIdle}
        onAction={_onAction}
        debounce={250}
        timeout={timeTillConsideredIdle}
      />
    </div>
  );
}

IdleTimerComponent.propTypes = {
  timer: PropTypes.any,
  _onAction: PropTypes.func,
  _onActive: PropTypes.func,
  _onIdle: PropTypes.func,
  dispatch: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapDispatchToProps);

export default compose(withConnect)(IdleTimerComponent);
