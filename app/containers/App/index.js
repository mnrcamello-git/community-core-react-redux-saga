/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import Routes from '../../routes';

import 'bootstrap-scss/bootstrap.scss';
import '../../assets/scss/main.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'font-awesome/css/font-awesome.min.css';
import 'rc-slider/assets/index.css';
import Favicon from 'react-favicon';
import icon from '../../assets/images/pb-core-favicon.png';

export default function App() {
  return (
    <div>
      <Favicon url={icon} />
      <Routes />
    </div>
  );
}
