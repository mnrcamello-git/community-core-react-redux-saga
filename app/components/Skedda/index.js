/**
 *
 * Skedda
 *
 */

import React from 'react';
import Iframe from 'react-iframe';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Skedda() {
  const skeddaURL =
    'https://penbrothersmeetingrooms.skedda.com/booking?embedded=true';

  return (
    <div className="h-100 w-100">
      <Iframe url={skeddaURL} className="h-70 w-100" />
    </div>
  );
}

Skedda.propTypes = {};

export default Skedda;
