/**
 *
 * UserCreationModal
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import LoadingOverlay from 'react-loading-overlay';

import { userGroups } from '../../containers/Noc/UserManagement/constants';

import BackIcon from '../../assets/images/hub/back_icon.png';
import PBLogo from '../../assets/images/PB_logo.png';
import CancelIcon from '../../assets/images/hub/recruitment/cancel_icon.svg';
import ErrorIcon from '../../assets/images/hub/recruitment/error_icon.svg';
import HandIcon from '../../assets/images/hub/recruitment/hand_icon.svg';

import { validateEmail } from '../../containers/App/globalHelpers';

import {
  changeFirstName,
  changeLastName,
  changeEmail,
  changePosition,
  changeLandline,
  changeMobile,
  changeClient,
  changeAccess,
  changeGroup,
  changeSkype,
  changeActive,
  changeShowUserModal,
  clearUserForm,
  requestSaveUser,
  changeShowUserSuccessModal,
  requestUsers,
  changeShowUserErrorModal,
} from '../../containers/Noc/UserManagement/actions';

function UserCreationModal(props) {
  const [isShowCancelModal, setShowCancelModal] = useState(false);
  const [isShowSaveModal, setShowSaveModal] = useState(false);
  const [isShowErrorModal, setShowErrorModal] = useState(false);

  const handleCancelConfirmed = () => {
    setShowCancelModal(false);
    props.dispatch(clearUserForm());
    props.dispatch(
      changeShowUserModal({
        show_user_modal: false,
      }),
    );
  };

  const handleOnChangeFirstName = evt => {
    if (evt.target.value !== '') {
      props.dispatch(
        changeFirstName({
          first_name: evt.target.value,
          first_name_error: '',
        }),
      );
      return true;
    }

    props.dispatch(
      changeFirstName({
        first_name: evt.target.value,
        first_name_error: 'First name is required.',
      }),
    );
  };

  const handleOnClickBack = () => {
    props.dispatch(clearUserForm());
    props.dispatch(
      changeShowUserModal({
        show_user_modal: false,
      }),
    );
  };

  const handleOnChangeLastName = evt => {
    if (evt.target.value !== '') {
      props.dispatch(
        changeLastName({
          last_name: evt.target.value,
          last_name_error: '',
        }),
      );
      return true;
    }
    props.dispatch(
      changeLastName({
        last_name: evt.target.value,
        last_name_error: 'Last name is required.',
      }),
    );
  };

  const handleOnChangeEmail = evt => {
    if (evt.target.value === '') {
      props.dispatch(
        changeEmail({
          email: evt.target.value,
          email_error: 'Email is required.',
        }),
      );
      return true;
    }

    if (validateEmail(evt.target.value) === false) {
      props.dispatch(
        changeEmail({
          email: evt.target.value,
          email_error: 'Email is invalid.',
        }),
      );
      return true;
    }

    props.dispatch(
      changeEmail({
        email: evt.target.value,
        email_error: '',
      }),
    );
  };

  const handleOnChangePosition = evt => {
    if (evt.target.value !== '') {
      props.dispatch(
        changePosition({
          position: evt.target.value,
          position_error: '',
        }),
      );
      return true;
    }
    props.dispatch(
      changePosition({
        position: evt.target.value,
        position_error: 'Position is required',
      }),
    );
  };

  const handleOnChangeLandline = evt => {
    props.dispatch(
      changeLandline({
        landline_nbr: evt.target.value,
      }),
    );
  };

  const handleOnChangeMobile = evt => {
    props.dispatch(
      changeMobile({
        mobile_nbr: evt.target.value,
      }),
    );
  };

  const handleOnChangeClient = selected => {
    if (selected === null || selected.length < 1) {
      props.dispatch(
        changeClient({
          client: selected,
          client_error: 'Client is required.',
        }),
      );
      return true;
    }
    props.dispatch(
      changeClient({
        client: selected,
        client_error: '',
      }),
    );
  };

  const handleOnchangeRole = selected => {
    if (selected === null || selected.length < 1) {
      props.dispatch(
        changeAccess({
          role: selected,
          role_error: 'Access right is required.',
        }),
      );
      return true;
    }
    props.dispatch(
      changeAccess({
        role: selected,
        role_error: '',
      }),
    );
  };

  const handleOnchangeGroup = selected => {
    if (selected === null || selected.length < 1) {
      props.dispatch(
        changeGroup({
          groups: selected,
          groups_error: 'User groups is required.',
        }),
      );
      return true;
    }
    props.dispatch(
      changeGroup({
        groups: selected,
        groups_error: '',
      }),
    );
  };

  const handleOnChangeSkype = evt => {
    props.dispatch(
      changeSkype({
        skype: evt.target.value,
      }),
    );
  };

  const handleOnChangeActive = evt => {
    props.dispatch(
      changeActive({
        active: evt.target.checked,
      }),
    );
  };

  const onValidate = () => {
    let errorCount = 1;

    if (props.user.first_name === '') {
      props.dispatch(
        changeFirstName({
          first_name: props.user.first_name,
          first_name_error: 'First name is required.',
        }),
      );
      errorCount += 1;
    }

    if (props.user.last_name === '' || props.user.last_name === null) {
      props.dispatch(
        changeLastName({
          last_name: props.user.last_name,
          last_name_error: 'Last name is required.',
        }),
      );
      errorCount += 1;
    }

    if (props.user.email === '') {
      props.dispatch(
        changeEmail({
          email: props.user.email,
          email_error: 'Email is required.',
        }),
      );
      errorCount += 1;
    }

    if (validateEmail(props.user.email) === false) {
      props.dispatch(
        changeEmail({
          email: props.user.email,
          email_error: 'Email is invalid.',
        }),
      );
      errorCount += 1;
    }

    if (props.user.position === '') {
      props.dispatch(
        changePosition({
          position: props.user.position,
          position_error: 'Position is required.',
        }),
      );
      errorCount += 1;
    }

    if (props.user.client === null || props.user.client.length < 1) {
      props.dispatch(
        changeClient({
          client: props.user.client,
          client_error: 'Client is required.',
        }),
      );
      errorCount += 1;
    }

    if (props.user.role === null || props.user.role.length < 1) {
      props.dispatch(
        changeAccess({
          role: props.user.role,
          role_error: 'Access right is required.',
        }),
      );
      errorCount += 1;
    }

    if (props.user.groups === null || props.user.groups.length < 1) {
      props.dispatch(
        changeGroup({
          groups: props.user.groups,
          groups_error: 'User groups is required.',
        }),
      );
      errorCount += 1;
    }

    if (errorCount === 1) {
      setShowSaveModal(false);
      props.dispatch(
        requestSaveUser({
          user_saving: true,
        }),
      );
      return true;
    }

    setShowErrorModal(true);
    setShowSaveModal(false);
  };

  const handleOnClickOk = () => {
    props.dispatch(
      changeShowUserSuccessModal({ show_user_save_success_modal: false }),
    );
    props.dispatch(clearUserForm());
    props.dispatch(requestUsers());
    props.dispatch(
      changeShowUserModal({
        show_user_modal: false,
      }),
    );
  };

  return (
    <div>
      <LoadingOverlay active={props.user_saving} spinner text="Saving...">
        <button type="button" className="back-btn" onClick={handleOnClickBack}>
          <img alt="back-icon" src={BackIcon} />
          Back
        </button>
        <Modal.Header>
          <img
            src={PBLogo}
            alt="Penbrothers Logo"
            title="Penbrothers"
            className="logo"
          />
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group row">
                  <div className="col-sm-12">
                    <label htmlFor="create-job-title-client">
                      Client <span className="text-danger">*</span>
                    </label>
                    <Select
                      name="client"
                      isClearable="true"
                      options={props.clients}
                      value={props.user.client}
                      onChange={handleOnChangeClient}
                      classNamePrefix={
                        props.form_errors.role_error
                          ? 'is-invalid input '
                          : 'input '
                      }
                    />
                    {props.form_errors.client_error ? (
                      <div className="text-danger">
                        {props.form_errors.client_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <label htmlFor="create-job-title-fname">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={
                        props.form_errors.first_name_error
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      placeholder="Enter first name"
                      id="create-job-title-fname"
                      value={props.user.first_name}
                      onChange={handleOnChangeFirstName}
                      onBlur={handleOnChangeFirstName}
                    />
                    {props.form_errors.first_name_error ? (
                      <div className="text-danger">
                        {props.form_errors.first_name_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="create-job-title-lname">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={
                        props.form_errors.last_name_error
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      placeholder="Enter last name"
                      id="create-job-title-lname"
                      value={props.user.last_name}
                      onChange={handleOnChangeLastName}
                      onBlur={handleOnChangeLastName}
                    />
                    {props.form_errors.last_name_error ? (
                      <div className="text-danger">
                        {props.form_errors.last_name_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <label htmlFor="create-job-title-email">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      value={props.user.email}
                      className={
                        props.form_errors.email_error
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      placeholder="Enter email"
                      id="create-job-title-email"
                      onChange={handleOnChangeEmail}
                      onBlur={handleOnChangeEmail}
                    />
                    {props.form_errors.email_error ? (
                      <div className="text-danger">
                        {props.form_errors.email_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="create-job-title-position">
                      Position <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={props.user.position}
                      className={
                        props.form_errors.position_error
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      placeholder="Enter position"
                      id="create-job-title-position"
                      onChange={handleOnChangePosition}
                      onBlur={handleOnChangePosition}
                    />
                    {props.form_errors.position_error ? (
                      <div className="text-danger">
                        {props.form_errors.position_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <label htmlFor="create-job-title-lnbr">
                      Landline Number
                    </label>
                    <input
                      type="text"
                      className="input form-control"
                      placeholder="Enter landline number"
                      id="create-job-title-lnbr"
                      value={props.user.landline_nbr}
                      onChange={handleOnChangeLandline}
                      onBlur={handleOnChangeLandline}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="create-job-title-mnbr">Mobile Number</label>
                    <input
                      type="text"
                      className="input form-control"
                      placeholder="Enter mobile number"
                      id="create-job-title-mnbr"
                      value={props.user.mobile_nbr}
                      onChange={handleOnChangeMobile}
                      onBlur={handleOnChangeMobile}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <label htmlFor="create-job-title">
                      Access Right <span className="text-danger">*</span>
                    </label>
                    <Select
                      name="accessrights"
                      isClearable="true"
                      value={props.user.role}
                      options={props.roles}
                      onChange={handleOnchangeRole}
                      classNamePrefix={
                        props.form_errors.role_error
                          ? 'is-invalid input '
                          : 'input '
                      }
                    />
                    {props.form_errors.role_error ? (
                      <div className="text-danger">
                        {props.form_errors.role_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="create-job-title">
                      User Groups <span className="text-danger">*</span>
                    </label>
                    <Select
                      name="usergroups"
                      isClearable="true"
                      value={props.user.groups}
                      options={userGroups}
                      classNamePrefix={
                        props.form_errors.groups_error
                          ? 'is-invalid input '
                          : 'input '
                      }
                      onChange={handleOnchangeGroup}
                    />
                    {props.form_errors.groups_error ? (
                      <div className="text-danger">
                        {props.form_errors.groups_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <label htmlFor="create-job-title-skype">Skype</label>
                    <input
                      type="text"
                      className="input form-control"
                      placeholder="Enter skype"
                      id="create-job-title-skype"
                      value={props.user.skype}
                      onChange={handleOnChangeSkype}
                      onBlur={handleOnChangeSkype}
                    />
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={props.user.active}
                          onChange={handleOnChangeActive}
                        />
                        <label htmlFor="create-job-years-of-exp">Active</label>
                        <span className="slider round" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="action-buttons text-right">
                  <button
                    type="button"
                    className="cancel-btn mr-3"
                    onClick={() => setShowCancelModal(true)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="default-btn"
                    onClick={() => setShowSaveModal(true)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </LoadingOverlay>
      <Modal
        show={isShowCancelModal}
        onHide={() => {
          setShowCancelModal(false);
        }}
        className="cancel-modal"
        centered
      >
        <Modal.Body>
          <img
            src={CancelIcon}
            title="Cancel Icon"
            alt=""
            className="d-block mx-auto w-25 mb-4"
          />
          <h4>Are you sure you want to cancel?</h4>
          <div className="modal-btn pt-5">
            <Button
              variant="primary"
              className="yes"
              onClick={handleCancelConfirmed}
            >
              Yes
            </Button>
            <Button
              variant="secondary"
              className="no"
              onClick={() => {
                setShowCancelModal(false);
              }}
            >
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={isShowSaveModal}
        onHide={() => {
          setShowSaveModal(false);
        }}
        className="cancel-modal"
        size="md"
        centered
      >
        <Modal.Body>
          <img
            src={CancelIcon}
            title="Cancel Icon"
            alt=""
            className="d-block mx-auto w-25 mb-4"
          />
          <h4>Are you sure you want to save your creation</h4>
          <div className="modal-btn pt-5">
            <Button variant="primary" className="yes" onClick={onValidate}>
              Yes
            </Button>
            <Button
              variant="secondary"
              className="no"
              onClick={() => setShowSaveModal(false)}
            >
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={isShowErrorModal}
        onHide={() => setShowErrorModal(false)}
        className="cancel-modal error"
        size="md"
        centered
      >
        <Modal.Body>
          <img
            src={ErrorIcon}
            title="Error Icon"
            alt=""
            size="lg"
            className="d-block mx-auto w-25 mb-4"
          />
          <h4>Please complete the required fields.</h4>
          <div className="modal-btn pt-5">
            <Button
              variant="primary"
              onClick={() => {
                setShowErrorModal(false);
              }}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Success Modal */}
      <Modal
        show={props.success_modal}
        onHide={() => {
          props.dispatch(
            changeShowUserSuccessModal({ show_user_save_success_modal: false }),
          );
        }}
        className="save-modal success"
        centered
      >
        <Modal.Body>
          <img
            src={HandIcon}
            title="Check Icon"
            className="d-block mx-auto mb-4"
            alt=""
          />
          <h4 className="pt-2">Applied Changes!</h4>
          <div className="modal-btn pt-3 mt-3">
            <Button variant="primary" onClick={handleOnClickOk}>
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Error Modal */}
      <Modal
        show={props.error_modal}
        onHide={() => {
          props.dispatch(
            changeShowUserErrorModal({ show_user_save_error_modal: false }),
          );
        }}
        className="cancel-modal error"
        size="md"
        centered
      >
        <Modal.Body>
          <img
            src={ErrorIcon}
            title="Error Icon"
            alt=""
            size="lg"
            className="d-block mx-auto w-25 mb-4"
          />
          <h4>Failed to create user. Please contact PB Administrator.</h4>
          <div className="modal-btn pt-5">
            <Button
              variant="primary"
              onClick={() => {
                props.dispatch(
                  changeShowUserErrorModal({
                    show_user_save_error_modal: false,
                  }),
                );
              }}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

UserCreationModal.propTypes = {
  onHide: PropTypes.any,
  dispatch: PropTypes.any,
  clients: PropTypes.any,
  user: PropTypes.any,
  roles: PropTypes.any,
  form_errors: PropTypes.any,
  success_modal: PropTypes.bool,
  error_modal: PropTypes.bool,
  user_saving: PropTypes.bool,
};

export default UserCreationModal;
