/**
 *
 * Forgot Password Page
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import loadingImg from '../../assets/images/loading.svg';
import pbcoreLogo from '../../assets/images/PB-logo.png';
import 'bootstrap-scss/bootstrap.scss';
import '../../assets/scss/main.scss';
import 'font-awesome/css/font-awesome.min.css';

import Title from '../../components/Title';

import { changeEmail, validateEmail, forgotPasswordRequested } from './actions';
import {
  makeSelectErrorMessage,
  makeSelectButtonDisabled,
  makeSelectEmail,
  makeSelectLoading,
} from './selectors';

import { clearUserData } from '../App/globalHelpers';

export function ForgotPasswordPage({
  onChangeEmail,
  onBlurEmail,
  loading,
  handleSubmit,
  buttonDisabled,
  errorMessage,
  email,
}) {
  useInjectReducer({ key: 'forgotPasswordPage', reducer });
  useInjectSaga({ key: 'forgotPasswordPage', saga });

  useEffect(() => {
    clearUserData();
  }, []);

  const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = submit => {
    if (email.length === 0) {
      onBlurEmail(email, 'Email is required.', true);
      return;
    }

    if (!regexp.test(email)) {
      onBlurEmail(email, 'Email is invalid', true);
      return;
    }

    onBlurEmail(email, '', false);
    if (submit === true) {
      handleSubmit();
    }
  };

  const onEnterEmail = evt => {
    if (evt.key === 'Enter') {
      validateForm(true);
    }
  };

  return (
    <div className="information-page">
      <Title title="Forgot Password" description="Core Forgot Password Page" />
      <div className="content">
        <div className="container p-0">
          <div className="col-lg-6 offset-lg-3 col-sm-8 offset-md-2">
            <div className="white-form-login">
              <div className="text-center">
                <img
                  alt="pbcore-logo"
                  title="pbcore-logo"
                  className="pbcore-logo mb-5"
                  src={pbcoreLogo}
                  width="200"
                />
              </div>
              <h1 className="form-title">
                <FormattedMessage {...messages.forgot} />
              </h1>
              <div className="col-md-12 form-group margin-top-10 p-0">
                <label>Email Address</label>
                <div className="inputWithIcon">
                  <input
                    id="email"
                    type="email"
                    onChange={onChangeEmail}
                    onBlur={validateForm}
                    onKeyDown={onEnterEmail}
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="text-center mt-3">
                  <span className="error-message">{errorMessage}</span>
                  {loading ? (
                    <img
                      className="loading-img"
                      alt="Loading"
                      src={loadingImg}
                    />
                  ) : (
                    ''
                  )}{' '}
                </div>
              </div>
              <button
                className="brand-button-primary btn-block"
                type="button"
                title="Submit"
                onClick={handleSubmit}
                disabled={buttonDisabled}
              >
                <FormattedMessage {...messages.submit} />
              </button>
              <a href="/">
                <button type="button" className="cancel w-100 mt-4">
                  Cancel
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ForgotPasswordPage.propTypes = {
  email: PropTypes.string,
  buttonDisabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onBlurEmail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  errorMessage: makeSelectErrorMessage(),
  loading: makeSelectLoading(),
  buttonDisabled: makeSelectButtonDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onBlurEmail: (email, message, buttonDisabled) =>
      dispatch(validateEmail(email, message, buttonDisabled)),
    handleSubmit: () => dispatch(forgotPasswordRequested('')),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ForgotPasswordPage);
