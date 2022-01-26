/**
 *
 * ComingSoon
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import messages from './messages';
import cone from '../../assets/images/cone-signage.svg';

function ComingSoon(props) {
  return (
    <div>
      <div className={props.className ? props.className : 'menu-title'}>
        {!props.title ? (
          ''
        ) : (
          <div className="col-md-12 mb-4 p-0">
            <h2 className="header-fontcolor">{props.title}</h2>
          </div>
        )}
        <div className="col-md-12 p-0 text-center">
          <div className="coming-soon">
            <div className="content">
              <h3>
                <FormattedMessage {...messages.code} />
              </h3>
              <h1 className="mt-5">
                COMING
                <br />
                SOON
              </h1>
              <img className="mt-5" src={cone} alt="Cone" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ComingSoon.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default ComingSoon;
