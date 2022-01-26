/**
 *
 * RecruitmentPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRecruitmentPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ComingSoon from '../../../components/ComingSoon/Loadable';

export function RecruitmentPage() {
  useInjectReducer({ key: 'recruitmentPage', reducer });
  useInjectSaga({ key: 'recruitmentPage', saga });

  return (
    <div>
      <ComingSoon title="Recruitment" />
    </div>
  );
}

RecruitmentPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  recruitmentPage: makeSelectRecruitmentPage(),
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

export default compose(withConnect)(RecruitmentPage);
