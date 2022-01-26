/**
 *
 * ExpireComponent
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ExpireComponent({ children }) {
  const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    setTimeout(() => setVisibility(false), 2500);
  }, []);

  return visibility && <div>{children}</div>;
}

ExpireComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExpireComponent;
