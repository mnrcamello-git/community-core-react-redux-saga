/**
 *
 * ChangePassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectChangePassword,
  makeSelectOldPassword,
  makeSelectNewPassword,
  makeSelectConfirmPassword,
  makeSelectHasErrors,
  makeSelectErrorMessage,
  makeSelectSuccessMessage,
  makeSelectLoading,
  makeSelectOldInputType,
  makeSelectOldEyeIcon,
  makeSelectNewEyeIcon,
  makeSelectNewInputType,
  makeSelectConfirmEyeIcon,
  makeSelectConfirmInputType,
} from './selectors';
import {
  onChangeConfirmPassword,
  onChangeNewPassword,
  onChangeOldPassword,
  passwordChangeFailed,
  passwordChangeRequest,
  toggleOldPasswordMask,
  toggleNewPasswordMask,
  toggleConfirmPasswordMask,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { onEnter } from '../App/globalHelpers';
import loadingImg from '../../assets/images/loading.svg';
import pbcoreLogo from '../../assets/images/PB-logo.png';

export function ChangePassword({
  oldPassword,
  newPassword,
  confirmPassword,
  hasErrors,
  errorMessage,
  dispatch,
  successMessage,
  loading,
  inputOldType,
  oldEyeIcon,
  inputNewType,
  newEyeIcon,
  inputConfirmType,
  confirmEyeIcon,
  onChangeOldPassword,
  onChangeNewPassword,
  onChangeConfirmPassword,
}) {
  useInjectReducer({ key: 'changePassword', reducer });
  useInjectSaga({ key: 'changePassword', saga });

  const handleChangePassword = () => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (
      confirmPassword.length <= 0 ||
      newPassword.length <= 0 ||
      oldPassword.length <= 0
    ) {
      dispatch(passwordChangeFailed('Fields are required'));
      return false;
    }
    if (confirmPassword !== newPassword) {
      dispatch(
        passwordChangeFailed('Password does not match, please try again'),
      );
      return false;
    }

    if (!newPassword.match(regex)) {
      dispatch(
        passwordChangeFailed(
          'Password must be have 8 characters and contains alphanumeric and special characters',
        ),
      );
      return false;
    }

    dispatch(passwordChangeRequest());
    return true;
  };

  const handleToggleOldPasswordMask = () => {
    let payload;

    if (inputOldType === 'password') {
      payload = {
        input_type: 'text',
        eye_icon: 'fa fa-eye-slash',
      };
      dispatch(toggleOldPasswordMask(payload));
      return true;
    }

    payload = {
      input_type: 'password',
      eye_icon: 'fa fa-eye',
    };

    dispatch(toggleOldPasswordMask(payload));
    return true;
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
    <div className="information-page change-password">
      <div className="content">
        <div className="container p-0">
          <div className="col-md-6 offset-md-3">
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
                <FormattedMessage {...messages.changePw} />
              </h1>
              <div className="col-md-12 form-group margin-top-10 p-0">
                <label>Old Password</label>
                <div className="inputWithIcon">
                  <input
                    onKeyDown={event => onEnter(event, handleChangePassword)}
                    onChange={onChangeOldPassword}
                    type={inputOldType}
                    placeholder="Enter your old password"
                  />
                  <span
                    className="icon-eye"
                    onClick={handleToggleOldPasswordMask}
                  >
                    <i className={oldEyeIcon} />
                  </span>
                </div>
              </div>
              <label>New Password</label>
              <div className="col-md-12 form-group p-0">
                <div className="inputWithIcon">
                  <input
                    onKeyDown={event => onEnter(event, handleChangePassword)}
                    onChange={onChangeNewPassword}
                    type={inputNewType}
                    placeholder="New Password"
                  />
                  <span
                    className="icon-eye"
                    onClick={handleToggleNewPasswordMask}
                  >
                    <i className={newEyeIcon} />
                  </span>
                </div>
              </div>
              <label>Confirm New Password</label>
              <div className="col-md-12 form-group p-0">
                <div className="inputWithIcon">
                  <input
                    onKeyDown={event => onEnter(event, handleChangePassword)}
                    onChange={onChangeConfirmPassword}
                    type={inputConfirmType}
                    placeholder="Confirm Password"
                  />
                  <span
                    className="icon-eye"
                    onClick={handleToggleConfirmPasswordMask}
                  >
                    <i className={confirmEyeIcon} />
                  </span>
                </div>
              </div>
              <div className="text-center">
                {loading && (
                  <img src={loadingImg} alt="requesting change password" />
                )}
                {hasErrors && (
                  <p className="error-message pt-3"> {errorMessage} </p>
                )}
                {!hasErrors && (
                  <p className="error-message text-success pt-3">
                    {' '}
                    {successMessage}{' '}
                  </p>
                )}
              </div>
              <button
                onClick={handleChangePassword}
                type="button"
                className="brand-button-primary btn-block"
              >
                {' '}
                Continue{' '}
              </button>{' '}
              <button
                onClick={() => history.back()}
                className="cancel w-100 mt-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ChangePassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  hasErrors: PropTypes.bool,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  loading: PropTypes.bool,
  oldPassword: PropTypes.string,
  newPassword: PropTypes.string,
  confirmPassword: PropTypes.string,
  onChangeConfirmPassword: PropTypes.func,
  onChangeNewPassword: PropTypes.func,
  onChangeOldPassword: PropTypes.func,
  inputOldType: PropTypes.string,
  oldEyeIcon: PropTypes.string,
  inputNewType: PropTypes.string,
  newEyeIcon: PropTypes.string,
  inputConfirmType: PropTypes.string,
  confirmEyeIcon: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  changePassword: makeSelectChangePassword(),
  oldPassword: makeSelectOldPassword(),
  newPassword: makeSelectNewPassword(),
  confirmPassword: makeSelectConfirmPassword(),
  hasErrors: makeSelectHasErrors(),
  errorMessage: makeSelectErrorMessage(),
  successMessage: makeSelectSuccessMessage(),
  loading: makeSelectLoading(),
  inputOldType: makeSelectOldInputType(),
  oldEyeIcon: makeSelectOldEyeIcon(),
  inputConfirmType: makeSelectConfirmInputType(),
  confirmEyeIcon: makeSelectConfirmEyeIcon(),
  inputNewType: makeSelectNewInputType(),
  newEyeIcon: makeSelectNewEyeIcon(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeOldPassword: evt => dispatch(onChangeOldPassword(evt.target.value)),
    onChangeNewPassword: evt => dispatch(onChangeNewPassword(evt.target.value)),
    onChangeConfirmPassword: evt =>
      dispatch(onChangeConfirmPassword(evt.target.value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ChangePassword);
