/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the LoginPage container!',
  },
  forgot: {
    id: `${scope}.forgot`,
    defaultMessage: 'Forgot Password?',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  welcome: {
    id: `${scope}.welcome`,
    defaultMessage: 'Welcome Back!',
  },
  hello: {
    id: `${scope}.hello`,
    defaultMessage: 'Hello, ',
  },
});
