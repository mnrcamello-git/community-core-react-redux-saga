/**
 *
 * CustomerServicePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCustomerServicePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ComingSoon from '../../../components/ComingSoon/Loadable';

export function CustomerServicePage() {
  useInjectReducer({ key: 'customerServicePage', reducer });
  useInjectSaga({ key: 'customerServicePage', saga });

  return (
    <div>
      <ComingSoon title="Customer Service" />
    </div>
  );
}

CustomerServicePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  customerServicePage: makeSelectCustomerServicePage(),
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

export default compose(withConnect)(CustomerServicePage);
