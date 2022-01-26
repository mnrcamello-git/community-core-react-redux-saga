/**
 *
 * LoginPage
 *
 */

import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectLoading,
  makeSelectErrorMessage,
  makeSelectButtonDisabled,
  makeSelectTogglePasswordMask,
  makeSelectToggleIcon,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import loadingImg from '../../assets/images/loading.svg';
import PBCoreLogo from '../../assets/images/PB-logo.png';
import CarouselOne from '../../assets/images/carousel-image-1.svg';
import CarouselTwo from '../../assets/images/carousel-image-2.svg';
import CarouselThree from '../../assets/images/carousel-image-3.svg';

import PBCoreLogoWhite from '../../assets/images/PB_White.svg';
import {
  changeEmail,
  changePassword,
  loginRequested,
  loginFailed,
  togglePasswordMask,
} from './actions';
import { validateEmail, onEnter, clearUserData } from '../App/globalHelpers';

import Title from '../../components/Title';

export function LoginPage({
  errorMessage,
  loading,
  onChangeEmail,
  onChangePassword,
  email,
  password,
  dispatch,
  buttonDisabled,
  onTogglePasswordMask,
  onToggleIcon,
  successMessage,
}) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  useEffect(() => {
    clearUserData();
  }, []);

  function validateForms() {
    if (email.length === 0 || password.length === 0) {
      dispatch(loginFailed('Fields are Required'));
      return false;
    }

    if (!validateEmail(email)) {
      dispatch(loginFailed('Please type in a valid email address'));
      return false;
    }

    dispatch(loginRequested());
    return true;
  }

  function handleTogglePasswordMask() {
    let payload;
    if (onTogglePasswordMask === 'password') {
      payload = {
        mask: 'text',
        className: 'fa fa-eye-slash',
      };
    } else {
      payload = {
        mask: 'password',
        className: 'fa fa-eye',
      };
    }

    dispatch(togglePasswordMask(payload));
  }

  return (
    <div className="login-main">
      <Title title="Welcome to CoRe 2.0" description="Core Login Page" />
      <div className="content">
        <div className="col-lg-6 offset-lg-1 col-12 text-center carousel-bg">
          <img
            className=" d-block mb-5 position-relative pbcore-white"
            src={PBCoreLogoWhite}
            alt="PBLogo"
          />
          <div className="col-lg-12 p-0">
            <div className="carousel-content">
              <Carousel>
                <Carousel.Item>
                  <img
                    className=""
                    src={CarouselOne}
                    alt="Screenshot-1"
                    title="Screenshot-1"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className=""
                    src={CarouselTwo}
                    alt="Screenshot-2"
                    title="Screenshot-2"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className=""
                    src={CarouselThree}
                    alt="Screenshot-3"
                    title="Screenshot-3"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
        <div className="col-lg-4 offset-lg-7 col-12 form-section">
          <form className="login-form">
            <img
              className="mx-auto d-block mb-4"
              src={PBCoreLogo}
              alt="PBLogo"
            />
            <div className="form-title mb-4">
              <FormattedMessage {...messages.hello} />
              <br />
              <FormattedMessage {...messages.welcome} />
            </div>

            <div className="col-md-12 form-group px-4">
              <label>Email Address</label>
              <div className="inputWithIcon">
                <input
                  onKeyDown={event => onEnter(event, validateForms)}
                  onChange={onChangeEmail}
                  type="email"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="col-md-12 form-group px-4 mb-0">
              <label>Password</label>
              <div className="inputWithIcon">
                <input
                  onKeyDown={event => onEnter(event, validateForms)}
                  onChange={onChangePassword}
                  type={onTogglePasswordMask}
                  placeholder="Enter your password"
                />
                <span className="icon-eye">
                  <i
                    className={onToggleIcon}
                    onClick={handleTogglePasswordMask}
                  />
                </span>
              </div>
            </div>
            <div className="text-right col-md-12 mt-1 px-4">
              <span className="forgot-password">
                <Link to="/forgot-password">
                  <FormattedMessage {...messages.forgot} />
                </Link>
              </span>
            </div>
            <div className="text-center mt-3">
              <span className="error-message">{errorMessage}</span>
              {loading ? (
                <img className="loading-img" alt="Loading" src={loadingImg} />
              ) : (
                ''
              )}{' '}
              <br />
            </div>
            <div className="col-md-12 form-group element-center mb-0 px-4">
              <button
                className="button-text button-appearance btn-block brand-button-primary text-white"
                type="button"
                onClick={validateForms}
                disabled={buttonDisabled}
              >
                <FormattedMessage {...messages.login} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  loading: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChangePassword: PropTypes.func,
  onChangeEmail: PropTypes.func,
  buttonDisabled: PropTypes.bool,
  validateForms: PropTypes.func,
  onEnter: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  loading: makeSelectLoading(),
  errorMessage: makeSelectErrorMessage(),
  buttonDisabled: makeSelectButtonDisabled(),
  onTogglePasswordMask: makeSelectTogglePasswordMask(),
  onToggleIcon: makeSelectToggleIcon(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
