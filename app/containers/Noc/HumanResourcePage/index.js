/**
 *
 * HumanResourcePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHumanResourcePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ComingSoon from '../../../components/ComingSoon/Loadable';

export function HumanResourcePage() {
  useInjectReducer({ key: 'humanResourcePage', reducer });
  useInjectSaga({ key: 'humanResourcePage', saga });

  return (
    <div>
      <ComingSoon title="Human Resource" />
    </div>
  );
}

HumanResourcePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  humanResourcePage: makeSelectHumanResourcePage(),
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

export default compose(withConnect)(HumanResourcePage);
