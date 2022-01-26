/**
 *
 * MarketingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMarketingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ComingSoon from '../../../components/ComingSoon/Loadable';

export function MarketingPage() {
  useInjectReducer({ key: 'marketingPage', reducer });
  useInjectSaga({ key: 'marketingPage', saga });

  return (
    <div>
      <ComingSoon title="Marketing" />
    </div>
  );
}

MarketingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  marketingPage: makeSelectMarketingPage(),
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

export default compose(withConnect)(MarketingPage);
