/**
 *
 * ResetPasswordPage
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
import pbcoreLogo from '../../assets/images/pbcore-logo.png';

import Title from '../../components/Title';

import {
  makeSelectErrorMessage,
  makeSelectButtonDisabled,
  makeSelectNewPassword,
  makeSelectConfirmPassword,
  makeSelectLoading,
  makeSelectConfirmEyeIcon,
  makeSelectConfirmInputType,
  makeSelectNewEyeIcon,
  makeSelectNewInputType,
  makeSelectIsTokenValidityLoading,
} from './selectors';
import {
  changeNewPassword,
  changeConfirmPassword,
  validateNewPassword,
  validateConfirmPassword,
  resetPasswordRequested,
  toggleConfirmPasswordMask,
  toggleNewPasswordMask,
  checkTokenAvailability,
} from './actions';
import { clearUserData } from '../App/globalHelpers';

const queryString = require('query-string');

export function ResetPasswordPage({
  buttonDisabled,
  errorMessage,
  onChangeNewPassword,
  onBlurNewPassword,
  onChangeConfirmPassword,
  onBlurConfirmPassword,
  handleSubmit,
  confirmPassword,
  newPassword,
  inputNewType,
  inputConfirmType,
  newIconEye,
  confirmIconEye,
  loading,
  dispatch,
  isTokenValidityLoading,
}) {
  useInjectReducer({ key: 'resetPasswordPage', reducer });
  useInjectSaga({ key: 'resetPasswordPage', saga });

  useEffect(() => {
    const query = queryString.parse(location.search);
    dispatch(checkTokenAvailability(query.token));
    // Clear localstorage for possible conflict in localstorage.
    clearUserData();
  }, []);

  const regexp = /^(?=.*[\d])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z])(?=.*[0-9])[\w!@#$%^&*(),.?":{}|<>]{8,}$/;

  /**
   * Validate Password
   */
  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      onBlurNewPassword('Password does not match.', newPassword, false);
      return;
    }

    if (!regexp.test(newPassword) || !newPassword.length) {
      onBlurNewPassword(
        'Password needs to be 8 characters min, with number and alphanumeric and special characters.',
        newPassword,
        true,
      );
      return;
    }

    if (!regexp.test(confirmPassword) || !confirmPassword.length) {
      onBlurConfirmPassword(
        'Password needs to be 8 characters min, with number and alphanumeric and special characters.',
        confirmPassword,
        true,
      );
      return;
    }

    onBlurNewPassword('', newPassword, false);
    onBlurConfirmPassword('', confirmPassword, true);
    handleSubmit();
  };

  /**
   * Validate function for new password
   * @param {string} evt password value
   */
  const onBlurValidateNewPassword = () => {
    if (!regexp.test(newPassword) || !newPassword.length) {
      onBlurNewPassword(
        'Password needs to be 8 characters min, with number and alphanumeric and special characters.',
        newPassword,
        true,
      );
      return;
    }
    onBlurNewPassword('', newPassword, false);
  };

  /**
   * Validate function for confirm password
   * @param {string} evt password value
   */
  const onBlurValidateConfirmPassword = () => {
    if (!regexp.test(confirmPassword) || !confirmPassword.length) {
      onBlurConfirmPassword(
        'Password needs to be 8 characters min, with number and alphanumeric and special characters.',
        confirmPassword,
        true,
      );
      return;
    }
    onBlurConfirmPassword('', confirmPassword, false);
  };

  const onEnterConfirmPassword = evt => {
    if (evt.key === 'Enter') {
      validatePasswords();
    }
  };

  const handleToggleNewPasswordMask = () => {
    let payload;

    if (inputNewType === 'password') {
      payload = {
        input_type: 'text',
        eye_icon: 'fa fa-eye-slash',
      };
      dispatch(toggleNewPasswordMask(payload));
      return true;
    }

    payload = {
      input_type: 'password',
      eye_icon: 'fa fa-eye',
    };

    dispatch(toggleNewPasswordMask(payload));
    return true;
  };

  const handleToggleConfirmPasswordMask = () => {
    let payload;

    if (inputConfirmType === 'password') {
      payload = {
        input_type: 'text',
        eye_icon: 'fa fa-eye-slash',
      };
      dispatch(toggleConfirmPasswordMask(payload));
      return true;
    }

    payload = {
      input_type: 'password',
      eye_icon: 'fa fa-eye',
    };

    dispatch(toggleConfirmPasswordMask(payload));
    return true;
  };
  return (
    <div className="information-page reset">
      <Title title="Reset Password" description="Core Reset Password Page" />
      <div className="content">
        <div className="container p-0">
          <div className="col-lg-6 offset-lg-3 col-sm-8 offset-md-2">
            <img className="pbcore_logo" src={pbcoreLogo} alt="PBLogo" />

            {isTokenValidityLoading ? (
              <h3
                className="font-semibold my-4 white"
                style={{ color: 'white', textAlign: 'center' }}
              >
                Please wait...
              </h3>
            ) : (
              <div className="white-form-login">
                <h1 className="form-title">
                  <FormattedMessage {...messages.reset} />
                </h1>
                <div className="col-md-12 form-group margin-top-10 p-0">
                  <div className="inputWithIcon">
                    <input
                      id="new_password"
                      type={inputNewType}
                      placeholder="New Password"
                      onChange={onChangeNewPassword}
                      onBlur={onBlurValidateNewPassword}
                    />
                    <span
                      className="icon-eye"
                      onClick={handleToggleNewPasswordMask}
                    >
                      <i className={newIconEye} />
                    </span>
                  </div>
                </div>
                <div className="col-md-12 form-group p-0">
                  <div className="inputWithIcon">
                    <input
                      id="confirm_password"
                      type={inputConfirmType}
                      placeholder="Confirm Password"
                      onChange={onChangeConfirmPassword}
                      onBlur={onBlurValidateConfirmPassword}
                      onKeyDown={onEnterConfirmPassword}
                    />
                    <span
                      className="icon-eye"
                      onClick={handleToggleConfirmPasswordMask}
                    >
                      <i className={confirmIconEye} />
                    </span>
                  </div>
                </div>
                <div className="text-center">
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
                <div>
                  <button
                    className="brand-button-primary btn-block"
                    type="button"
                    onClick={validatePasswords}
                    disabled={buttonDisabled}
                  >
                    <FormattedMessage {...messages.submit} />
                  </button>
                </div>
              </div> // form
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ResetPasswordPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newPassword: PropTypes.string,
  confirmPassword: PropTypes.string,
  buttonDisabled: PropTypes.bool,
  loading: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChangeNewPassword: PropTypes.func,
  onBlurNewPassword: PropTypes.func,
  onChangeConfirmPassword: PropTypes.func,
  onBlurConfirmPassword: PropTypes.func,
  handleSubmit: PropTypes.func,
  newIconEye: PropTypes.string,
  confirmIconEye: PropTypes.string,
  inputConfirmType: PropTypes.string,
  inputNewType: PropTypes.string,
  isTokenValidityLoading: PropTypes.bool,
};

const mapStateToProps = () =>
  createStructuredSelector({
    errorMessage: makeSelectErrorMessage(),
    buttonDisabled: makeSelectButtonDisabled(),
    confirmPassword: makeSelectConfirmPassword(),
    loading: makeSelectLoading(),
    newPassword: makeSelectNewPassword(),
    newIconEye: makeSelectNewEyeIcon(),
    confirmIconEye: makeSelectConfirmEyeIcon(),
    inputConfirmType: makeSelectConfirmInputType(),
    inputNewType: makeSelectNewInputType(),
    isTokenValidityLoading: makeSelectIsTokenValidityLoading(),
  });

function mapDispatchToProps(dispatch) {
  return {
    onChangeNewPassword: evt => dispatch(changeNewPassword(evt.target.value)),
    onChangeConfirmPassword: evt =>
      dispatch(changeConfirmPassword(evt.target.value)),
    onBlurNewPassword: (message, password, buttonDisabled) =>
      dispatch(validateNewPassword(message, password, buttonDisabled)),
    onBlurConfirmPassword: (message, password, buttonDisabled) =>
      dispatch(validateConfirmPassword(message, password, buttonDisabled)),
    handleSubmit: () => dispatch(resetPasswordRequested('')),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ResetPasswordPage);
