/**
 *
 * FinancePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFinancePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ComingSoon from '../../../components/ComingSoon/Loadable';

export function FinancePage() {
  useInjectReducer({ key: 'financePage', reducer });
  useInjectSaga({ key: 'financePage', saga });

  return (
    <div>
      <ComingSoon title="Finance" />
    </div>
  );
}

FinancePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  financePage: makeSelectFinancePage(),
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

export default compose(withConnect)(FinancePage);
