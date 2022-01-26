/**
 *
 * CommunityPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCommunityPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ComingSoon from '../../../components/ComingSoon/Loadable';

export function CommunityPage() {
  useInjectReducer({ key: 'communityPage', reducer });
  useInjectSaga({ key: 'communityPage', saga });

  return (
    <div>
      <ComingSoon title="Community" />
    </div>
  );
}

CommunityPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  communityPage: makeSelectCommunityPage(),
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

export default compose(withConnect)(CommunityPage);
