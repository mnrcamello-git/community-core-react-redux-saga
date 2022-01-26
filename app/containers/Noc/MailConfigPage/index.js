/**
 *
 * MailConfig
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeUserMailStatus,
  makeTestMessage,
  makeMailRequestStatus,
  makeMailSuccessStatistic,
  makeMailTotalStatistic,
  makeUploadError,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import MailConfigDataTable from '../../../components/MailConfigDataTable';
import MailConfigStatusComponent from '../../../components/MailConfigDataTable/MailConfigStatusComponent';

import { requestUsers, requestRoles } from './actions';
import Title from '../../../components/Title';

export function MailConfig({
  dispatch,
  users,
  csvAffectedUpdatedUsers,
  mailRequestStatus,
  mailSuccessStatistic,
  mailTotalStatistic,
  UploadError,
}) {
  useInjectReducer({ key: 'userManagement', reducer });
  useInjectSaga({ key: 'userManagement', saga });
  useEffect(() => {
    dispatch(requestUsers());
    dispatch(requestRoles());
  }, []);

  return (
    <div className="user-management">
      <Title title="User Management" description="User Management Page" />
      <div className="menu-title">
        <div className="col-md-12 p-0 position-relative d-flex">
          <h2 className="header-fontcolor">Mail Config</h2>
          <div className="create-user-btn" />
        </div>
      </div>

      <MailConfigStatusComponent
        mailSuccessStatistic={mailSuccessStatistic}
        mailTotalStatistic={mailTotalStatistic}
        UploadError={UploadError}
      />
      <div className="data-table">
        <MailConfigDataTable
          users={users}
          dispatch={dispatch}
          affectedUsers={csvAffectedUpdatedUsers}
          mailRequestStatus={mailRequestStatus}
        />
      </div>
    </div>
  );
}

MailConfig.propTypes = {
  dispatch: PropTypes.func.isRequired,
  csvAffectedUpdatedUsers: PropTypes.any,
  testMessage: PropTypes.any,
  mailRequestStatus: PropTypes.any,
  mailSuccessStatistic: PropTypes.any,
  mailTotalStatistic: PropTypes.any,
  UploadError: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  csvAffectedUpdatedUsers: makeUserMailStatus(),
  testMessage: makeTestMessage(),
  mailRequestStatus: makeMailRequestStatus(),
  mailSuccessStatistic: makeMailSuccessStatistic(),
  mailTotalStatistic: makeMailTotalStatistic(),
  UploadError: makeUploadError(),
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

export default compose(withConnect)(MailConfig);
