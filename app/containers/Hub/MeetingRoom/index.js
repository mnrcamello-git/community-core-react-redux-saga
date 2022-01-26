/**
 *
 * MeetingRoom
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
import makeSelectMeetingRoom from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Skedda from '../../../components/Skedda';

export function MeetingRoom() {
  useInjectReducer({ key: 'meetingRoom', reducer });
  useInjectSaga({ key: 'meetingRoom', saga });

  return (
    <div className="h-100 w-100">
      <div className="menu-title">
        <div className="col-md-12 p-0">
          <h2 className="header-fontcolor">
            <FormattedMessage {...messages.header} />
          </h2>
        </div>
      </div>
      <div className="h-100 w-100">
        <Skedda />
      </div>
    </div>
  );
}

MeetingRoom.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  meetingRoom: makeSelectMeetingRoom(),
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

export default compose(withConnect)(MeetingRoom);
