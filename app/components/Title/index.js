/**
 *
 * Title
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

function Title(props) {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
    </Helmet>
  );
}

Title.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Title;
