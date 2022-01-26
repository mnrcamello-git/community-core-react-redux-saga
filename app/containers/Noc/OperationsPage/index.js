/**
 *
 * OperationsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOperationsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ComingSoon from '../../../components/ComingSoon/Loadable';

export function OperationsPage() {
  useInjectReducer({ key: 'operationsPage', reducer });
  useInjectSaga({ key: 'operationsPage', saga });

  return (
    <div>
      <ComingSoon title="Operations" />
    </div>
  );
}

OperationsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  operationsPage: makeSelectOperationsPage(),
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

export default compose(withConnect)(OperationsPage);
