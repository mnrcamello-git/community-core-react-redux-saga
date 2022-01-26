/**
 *
 * SetPasswordPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import { Modal, OverlayTrigger, Popover } from 'react-bootstrap';
import makeSelectSetPasswordPage, {
  makeSelectIsFormVisible,
  makeSelectLoading,
  makeSelectPasswordStatus,
  makeSelectResendSuccess,
  makeSelectResendFailed,
  makeSelectToggleIcon,
  makeSelectHandlePasswordSuccessMessage,
} from './selectors';
import {
  checkTokenAvailability,
  handlePasswordChange,
  handleResendLink,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import loadingIcon from '../../assets/images/loading.svg';
import { clearUserData } from '../App/globalHelpers';

import PBCoreLogo from '../../assets/images/PB-logo.png';
import SetPasswordBG from '../../assets/images/set-password-bg.svg';
import ExpiredIcon from '../../assets/images/expired-icon.svg';

import SuccessIcon from '../../assets/images/success_icon.svg';
const queryString = require('query-string');

export function SetPasswordPage({
  dispatch,
  isFormVisible,
  loading,
  isPasswordSet,
  resendSuccess,
  resendFailed,
  onTogglePasswordMask,
  onToggleIcon,
  passwordChangeSuccessMessage,
}) {
  useInjectReducer({ key: 'setPasswordPage', reducer });
  useInjectSaga({ key: 'setPasswordPage', saga });
  const token = window.location.search.replace('?token=', '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasErrors, setHasErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [formIsValid, setFormIsValid] = useState();
  const [formErrorMessage, setFormErrorMessage] = useState();
  const [confirmation, setConfirmation] = useState('false');

  const [newPasswordMask, setNewPasswordMask] = useState({
    type: 'password',
    className: 'fa fa-eye',
  });
  const [isToggledNewPasswordMask, setToggledNewPasswordMask] = useState(false);
  const [confirmPasswordMask, setConfirmPasswordMask] = useState({
    type: 'password',
    className: 'fa fa-eye',
  });
  const [
    isToggledConfirmPasswordMask,
    setToggledConfirmPasswordMask,
  ] = useState(false);

  useEffect(() => {
    const params = queryString.parse(location.search);
    if (params.confirmation === 'true') {
      setConfirmation('true');
    }
  });
  const handleSubmit = () => {
    const payload = {
      password,
      confirmPassword,
      confirmation,
    };

    if (password === confirmPassword) {
      setHasErrors(false);
      dispatch(handlePasswordChange(payload));
      return;
      // todo, action to submit to backend
    }
    setHasErrors(true);
  };

  const handleEnter = e => {
    if (e.key == 'Enter') {
      return validateForm() ? handleSubmit() : false;
    }
  };

  const validateForm = () => {
    if (password.length == 0 || confirmPassword.length == 0) {
      setErrorMessage('Please fill in the required fields');
      return false;
    }
    return true;
  };

  const resendLink = () => {
    dispatch(handleResendLink(token));
  };

  useEffect(() => {
    dispatch(checkTokenAvailability(token));
    clearUserData();
  }, []);

  const handleTogglePasswordMask = (type, isToggledInitial) => {
    if (type === 'newPassword') {
      if (!isToggledInitial) {
        setToggledNewPasswordMask(true);
        setNewPasswordMask({
          type: 'text',
          className: 'fa fa-eye-slash',
        });
      } else {
        setToggledNewPasswordMask(false);
        setNewPasswordMask({
          type: 'password',
          className: 'fa fa-eye',
        });
      }
    }

    if (type === 'confirmPassword') {
      if (!isToggledInitial) {
        setToggledConfirmPasswordMask(true);
        setConfirmPasswordMask({
          type: 'text',
          className: 'fa fa-eye-slash',
        });
      } else {
        setToggledConfirmPasswordMask(false);
        setConfirmPasswordMask({
          type: 'password',
          className: 'fa fa-eye',
        });
      }
    }
  };

  const handleChangePassword = e => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,}$/;
    setPassword(e.target.value);
    if (e.target.value.length < 7) {
      setFormErrorMessage('Password must be atleast 8 characters');
      setFormIsValid(false);
      return;
    }

    if (!e.target.value.match(regex)) {
      setFormErrorMessage(
        'please include numbers, alphanumeric and special characters.',
      );
      setFormIsValid(false);
      return;
    }
    setFormIsValid(true);
  };

  return (
    <div className="login-main set-password-main">
      <Helmet>
        <title>Set Your Password</title>
        <meta name="description" content="Description of SetPasswordPage" />
      </Helmet>
      <Modal show={resendSuccess} backdrop="static">
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          We have successfully resent your new link, please check your e-mail.
          <Link to="/"> Go back to Login </Link>
        </Modal.Body>
      </Modal>
      <Modal show={resendFailed} backdrop="static">
        <Modal.Header>
          <Modal.Title>Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          We detected that your access has been tampered, please contact your PB
          Administrator for assistance.
          <Link to="/"> Login </Link>
        </Modal.Body>
      </Modal>
      <Modal show={passwordChangeSuccessMessage != ''} backdrop="static">
        <Modal.Body className="p-0">
          <form className="login-form">
            <img
              className="mx-auto d-block mb-5"
              src={PBCoreLogo}
              alt="PBLogo"
            />
            <div className="form-title mb-4 font-medium text-center">
              <span className="password-set">Success!!</span>
            </div>
            <img
              className="mx-auto d-block mb-5"
              src={SuccessIcon}
              alt="Success Icon"
            />
            <div>
              <p className="response-message text-center m-0">
                <FormattedMessage {...messages.passwordSet} />
              </p>
            </div>

            <div className="col-md-12 form-group element-center mt-5 mb-0 px-4">
              <a href="/">
                <button
                  type="button"
                  className="button-text button-appearance btn-block brand-button-primary text-white"
                >
                  Proceed to Log-in Page
                </button>
              </a>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {loading === true ? (
        <img src={loadingIcon} alt="loading image" className="mx-auto" />
      ) : isFormVisible === true ? (
        isPasswordSet ? (
          <>
            <div className="container set-password-page">
              <div className="col-lg-10 offset-lg-1 align-self-center">
                <div className="offset-lg-2 col-lg-8 p-0 align-self-center">
                  <form className="login-form">
                    <img
                      className="mx-auto d-block mb-5 pb-logo"
                      src={PBCoreLogo}
                      alt="PBLogo"
                    />
                    <div className="form-title mb-4 font-medium text-center">
                      <span className="password-set">Success!!</span>
                    </div>
                    <img
                      className="mx-auto d-block mb-4"
                      src={SuccessIcon}
                      alt="Success Icon"
                    />
                    <div>
                      <p className="response-message text-center m-0">
                        <FormattedMessage {...messages.passwordSet} />
                      </p>
                    </div>

                    <div className="col-md-12 form-group element-center mt-5 mb-0 px-4">
                      <a href="/">
                        <button
                          type="button"
                          className="button-text button-appearance btn-block brand-button-primary text-white"
                        >
                          Proceed to Log-in Page
                        </button>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="container set-password-page">
            <div className="col-lg-10 offset-lg-1 align-self-center">
              <div className="offset-lg-2 col-lg-8 p-0 align-self-center">
                <form className="login-form">
                  <img
                    className="mx-auto d-block mb-5 pb-logo"
                    src={PBCoreLogo}
                    alt="PBLogo"
                  />
                  <div className="form-title mb-4">
                    <FormattedMessage {...messages.header} />
                  </div>
                  {hasErrors && (
                    <div className="container alert alert-danger" role="alert">
                      Password Doesn't match
                    </div>
                  )}

                  <div className="col-md-12 form-group px-4">
                    <label>New Password</label>
                    <div className="inputWithIcon">
                      <OverlayTrigger
                        trigger="focus"
                        placement="left"
                        overlay={
                          <Popover id="popover-basic">
                            <Popover.Content>
                              <div>
                                Password must be:
                                <ul>
                                  <li> 8 Characters minimum </li>
                                </ul>
                                Includes:
                                <ul>
                                  <li>Numbers(0-9)</li>
                                  <li>Alphanumeric(ABC123)</li>
                                  <li>Special Characters (e.g.. !$#%) </li>
                                </ul>
                              </div>
                            </Popover.Content>
                          </Popover>
                        }
                      >
                        <input
                          placeholder="Enter your new password"
                          type={newPasswordMask.type}
                          onChange={handleChangePassword}
                          onKeyDown={handleEnter}
                        />
                      </OverlayTrigger>
                      <span className="icon-eye">
                        <i
                          className={newPasswordMask.className}
                          onClick={() => {
                            handleTogglePasswordMask(
                              'newPassword',
                              isToggledNewPasswordMask,
                            );
                          }}
                        />
                      </span>
                    </div>
                    {formIsValid == false ? (
                      <span className="error-message">{formErrorMessage}</span>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className="col-md-12 form-group px-4">
                    <label>Confirm New Password</label>
                    <div className="inputWithIcon">
                      <input
                        placeholder="Re-enter your new password"
                        type={confirmPasswordMask.type}
                        onKeyDown={handleEnter}
                        onChange={e => setConfirmPassword(e.target.value)}
                      />
                      <span className="icon-eye">
                        <i
                          className={confirmPasswordMask.className}
                          onClick={() => {
                            handleTogglePasswordMask(
                              'confirmPassword',
                              isToggledConfirmPasswordMask,
                            );
                          }}
                        />
                      </span>
                    </div>
                  </div>

                  <div className="col-md-12 form-group element-center mt-5 mb-0 px-4">
                    <button
                      disabled={!formIsValid}
                      type="button"
                      className="button-text button-appearance btn-block brand-button-primary text-white"
                      onClick={handleSubmit}
                    >
                      {' '}
                      Submit{' '}
                    </button>
                    <br />
                    <span style={{ color: 'red' }}> {errorMessage} </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      ) : isPasswordSet ? (
        <h1> You already configured your password </h1>
      ) : (
        <div className="container set-password-page">
          <div className="col-lg-10 offset-lg-1 align-self-center">
            <div className="offset-lg-2 col-lg-8 p-0 align-self-center">
              <form className="login-form">
                <img
                  className="mx-auto d-block mb-5 pb-logo"
                  src={PBCoreLogo}
                  alt="PBLogo"
                />
                <div className="form-title mb-4 font-medium text-center">
                  <span className="expired-token">OOPPPSSS!!</span>
                </div>
                <img
                  className="mx-auto d-block mb-4"
                  src={ExpiredIcon}
                  alt="Expired Icon"
                />
                <div>
                  <p className="response-message text-center m-0">
                    <span>We are sorry, but the link has already expired.</span>
                    <br />
                    <span>
                      To generate again, please click on the button below
                    </span>
                  </p>
                </div>

                <div className="col-md-12 form-group element-center mt-5 mb-0 px-4">
                  <button
                    onClick={resendLink}
                    className="button-text button-appearance btn-block brand-button-primary text-white"
                  >
                    Generate New Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

SetPasswordPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFormVisible: PropTypes.bool,
  loading: PropTypes.bool,
  isPasswordSet: PropTypes.bool,
  resendSuccess: PropTypes.bool,
  resendFailed: PropTypes.bool,
  passwordChangeSuccessMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  setPasswordPage: makeSelectSetPasswordPage(),
  isFormVisible: makeSelectIsFormVisible(),
  loading: makeSelectLoading(),
  isPasswordSet: makeSelectPasswordStatus(),
  resendSuccess: makeSelectResendSuccess(),
  resendFailed: makeSelectResendFailed(),
  onToggleIcon: makeSelectToggleIcon(),
  passwordChangeSuccessMessage: makeSelectHandlePasswordSuccessMessage(),
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

export default compose(withConnect)(SetPasswordPage);
