/**
 *
 * UserManagement
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Modal } from 'react-bootstrap';
import {
  makeSelectErrorMessage,
  makeSelectUsers,
  makeSelectDropdownAction,
  makeSelectSelectedUsers,
  makeSelectConfigureLoading,
  makeSelectConfigureLoadingMessage,
  makeSelectConfigureError,
  makeSelectConfigureErrorMessage,
  makeSelectConfigureSuccessMessage,
  makeSelectConfigureSuccess,
  makeSelectClearRows,
  makeSelectClients,
  makeSelectRoles,
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectEmail,
  makeSelectPosition,
  makeSelectGroups,
  makeSelectSkype,
  makeSelectLandline,
  makeSelectMobile,
  makeSelectActive,
  makeSelectClient,
  makeSelectRole,
  makeSelectFirstNameError,
  makeSelectLastNameError,
  makeSelectEmailError,
  makeSelectPositionError,
  makeSelectGroupsError,
  makeSelectClientError,
  makeSelectRoleError,
  makeSelectUserShowModal,
  makeSelectUserSuccessShowModal,
  makeSelectUserErrorShowModal,
  makeSelectUserSaving,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import UserManagementDataTable from '../../../components/UserManagementDataTable';
import ExpireComponent from '../../../components/ExpireComponent';
import {
  requestUsers,
  requestClients,
  requestRoles,
  changeShowUserModal,
} from './actions';
import Title from '../../../components/Title';
import UserCreationModal from '../../../components/UserCreationModal/Loadable';
import { setShowMessageModal } from '../../CandidateListSubPage/actions';
export function UserManagement({
  dispatch,
  users,
  clients,
  roles,
  firstName,
  lastName,
  email,
  position,
  groups,
  skype,
  landlineNbr,
  mobileNbr,
  active,
  role,
  client,
  firstNameError,
  lastNameError,
  emailError,
  positionError,
  groupsError,
  roleError,
  clientError,
  showUserModal,
  userSaving,
  dropdownAction,
  selectedUsers,
  showUserSuccessModal,
  showUserErrorModal,
  unblockingBlockingLoading,
  unblockingBlockingLoadingMessage,
  unblockingBlockingError,
  unblockingBlockingErrorMessage,
  unblockingBlockingSuccessMessage,
  unblockingBlockingSuccess,
  configureLoading,
  configureLoadingMessage,
  configureError,
  configureErrorMessage,
  configureSuccessMessage,
  configureSuccess,
  toggleClearSelectedRows,
}) {
  useInjectReducer({ key: 'userManagement', reducer });
  useInjectSaga({ key: 'userManagement', saga });
  useEffect(() => {
    dispatch(requestUsers());
    dispatch(requestClients());
    dispatch(requestRoles());
  }, []);

  const user = {
    first_name: firstName,
    last_name: lastName,
    email,
    position,
    groups,
    skype,
    landline_nbr: landlineNbr,
    mobile_nbr: mobileNbr,
    active,
    role,
    client,
  };

  const userCreationError = {
    first_name_error: firstNameError,
    last_name_error: lastNameError,
    email_error: emailError,
    position_error: positionError,
    groups_error: groupsError,
    role_error: roleError,
    client_error: clientError,
  };


  return (
    <div className="user-management">
      <Title title="User Management" description="User Management Page" />
      <div className="menu-title">
        <div className="col-md-12 p-0 position-relative d-flex">
          <h2 className="header-fontcolor">User Management</h2>
          <div className="create-user-btn">
            <button
              type="button"
              className="brand-button-primary font-regular"
              onClick={() => {
                dispatch(
                  changeShowUserModal({
                    show_user_modal: true,
                  }),
                );
              }}
            >
              <i className="fa fa-plus" /> Create user
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 px-0">
        {unblockingBlockingLoading && (
          <div className="alert alert-warning">
            {' '}
            {unblockingBlockingLoadingMessage}{' '}
          </div>
        )}
        {unblockingBlockingSuccess && (
          <ExpireComponent>
            <div className="alert alert-success">
              {' '}
              {unblockingBlockingSuccessMessage}{' '}
            </div>
          </ExpireComponent>
        )}
        {unblockingBlockingError && (
          <ExpireComponent>
            <div className="alert alert-danger">
              {unblockingBlockingErrorMessage}{' '}
            </div>
          </ExpireComponent>
        )}
        {configureLoading && (
          <div className="alert alert-warning"> {configureLoadingMessage} </div>
        )}
        {configureSuccess && (
          <ExpireComponent>
            <div className="alert alert-success">
              {' '}
              {configureSuccessMessage}{' '}
            </div>
          </ExpireComponent>
        )}
        {configureError && (
          <div className="alert alert-danger">{configureErrorMessage} </div>
        )}
      </div>
      <div className="data-table">
        <UserManagementDataTable
          users={users}
          dispatch={dispatch}
          dropdown_action={dropdownAction}
          selected_users={selectedUsers}
          clear_rows={toggleClearSelectedRows}
        />
      </div>
      <Modal
        show={showUserModal}
        onHide={() => {
          dispatch(
            changeShowUserModal({
              show_user_modal: false,
            }),
          );
        }}
        dialogClassName="modal-90w create-job-requisition-modal"
        backdrop="static"
      >
        <UserCreationModal
          onHide={() => {
            dispatch(
              changeShowUserModal({
                show_user_modal: false,
              }),
            );
          }}
          clients={clients}
          dispatch={dispatch}
          roles={roles}
          user={user}
          success_modal={showUserSuccessModal}
          error_modal={showUserErrorModal}
          form_errors={userCreationError}
          user_saving={userSaving}
        />
      </Modal>
    </div>
  );
}

UserManagement.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
  dropdownAction: PropTypes.string,
  configureLoading: PropTypes.bool,
  configureLoadingMessage: PropTypes.string,
  configureError: PropTypes.bool,
  configureErrorMessage: PropTypes.string,
  configureSuccessMessage: PropTypes.string,
  toggleClearSelectedRows: PropTypes.bool,
  clients: PropTypes.any,
  roles: PropTypes.any,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  position: PropTypes.string,
  groups: PropTypes.any,
  skype: PropTypes.string,
  landlineNbr: PropTypes.string,
  mobileNbr: PropTypes.string,
  active: PropTypes.any,
  role: PropTypes.any,
  client: PropTypes.any,
  firstNameError: PropTypes.string,
  lastNameError: PropTypes.string,
  emailError: PropTypes.string,
  positionError: PropTypes.string,
  groupsError: PropTypes.string,
  roleError: PropTypes.string,
  clientError: PropTypes.string,
  showUserModal: PropTypes.bool,
  showUserSuccessModal: PropTypes.bool,
  showUserErrorModal: PropTypes.bool,
  userSaving: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  errorMessage: makeSelectErrorMessage(),
  users: makeSelectUsers(),
  dropdownAction: makeSelectDropdownAction(),
  selectedUsers: makeSelectSelectedUsers(),
  configureLoading: makeSelectConfigureLoading(),
  configureLoadingMessage: makeSelectConfigureLoadingMessage(),
  configureError: makeSelectConfigureError(),
  configureErrorMessage: makeSelectConfigureErrorMessage(),
  configureSuccessMessage: makeSelectConfigureSuccessMessage(),
  configureSuccess: makeSelectConfigureSuccess(),
  toggleClearSelectedRows: makeSelectClearRows(),
  clients: makeSelectClients(),
  roles: makeSelectRoles(),
  firstName: makeSelectFirstName(),
  lastName: makeSelectLastName(),
  email: makeSelectEmail(),
  position: makeSelectPosition(),
  groups: makeSelectGroups(),
  skype: makeSelectSkype(),
  landlineNbr: makeSelectLandline(),
  mobileNbr: makeSelectMobile(),
  active: makeSelectActive(),
  role: makeSelectRole(),
  client: makeSelectClient(),
  firstNameError: makeSelectFirstNameError(),
  lastNameError: makeSelectLastNameError(),
  emailError: makeSelectEmailError(),
  positionError: makeSelectPositionError(),
  groupsError: makeSelectGroupsError(),
  roleError: makeSelectRoleError(),
  clientError: makeSelectClientError(),
  showUserModal: makeSelectUserShowModal(),
  showUserSuccessModal: makeSelectUserSuccessShowModal(),
  showUserErrorModal: makeSelectUserErrorShowModal(),
  userSaving: makeSelectUserSaving(),
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

export default compose(withConnect)(UserManagement);
