import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import DashboardLayout from '../../layouts/dashboard';
import DefaultLayout from '../../layouts/main';
import IdleTimerComponent from '../../components/IdleTimerComponent';
import { clearUserData, getToken } from '../../containers/App/globalHelpers';
import env from '../../config/env';
const queryString = require('query-string');

export default function RouteWrapper({
  component: Component,
  isPrivate,
  isDashboard,
  ...rest
}) {

  const query = queryString.parse(location.search);

  const signed = getToken();

  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  if (isPrivate && !signed) {
    if(query.redirect == "true") {
      let url = query.url;
      url = url.replace('[', '').replace(']', '');
      location.href = url;
      return null;
    }
    return <Redirect to="/" />;
  }

  /**
   * Redirect user to maintenance page if maitenance mode is ON
   */
  if (env.MAINTENANCE_MODE() === 'ON') {
    return <Redirect to="/maintenance" />;
  }

  /**
   * Redirect user to Main page if he tries to access a non private route
   * (SignIn or SignUp) after being authenticated.
   */
  if (!isPrivate && signed) {
    if (localStorage.getItem('select-portal')) {
      if(query.redirect == "true") {
        let url = query.url;
        url = url.replace('[', '').replace(']', '');
        location.href = url;
        return null;
      }
      /**
       * for client prospects, redirect to onboarding since menus are not available
       */
      if (JSON.parse(localStorage.getItem('me')).role === 'CLIENT-PROSPECT') {
        return <Redirect to="/hub/onboarding" />
      }
      return <Redirect to={localStorage.getItem('select-portal')} />;
    }
    clearUserData();
    return <Redirect to="/token-expired" />;
  }

  /**
   * Redirect user to only specified route
   */
  if(localStorage.getItem('portals')){
    const dashboards = localStorage.getItem('portals').split(',');
    const navigatedTo = location.pathname.substring(1).split('/')[0];
    // change password has a special route private + no dashboard
    if (isPrivate && !dashboards.includes(navigatedTo) && navigatedTo !== 'change-password') {
      return <Redirect to={`/${localStorage.getItem('select-portal')}`} />;
    }
  }
  
  const Layout = isDashboard ? DashboardLayout : DefaultLayout;
  /**
   * If not included on both previous cases, redirect user to the desired route.
   */

  /**
   * If path is root, don't add the idle timer component
   */
  if(rest.path === '/') {
    return (
      <Route
        {...rest}
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    );
  }

  return (
    <Route
        {...rest}
        render={props => (
          <Layout>
            <Component {...props} />
            <IdleTimerComponent/>
          </Layout>
        )}
    />
  );
  
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  isDashboard: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  isDashboard: false,
};
