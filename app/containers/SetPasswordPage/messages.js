/*
 * SetPasswordPage Messages
 *
 * This contains all the text for the SetPasswordPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SetPasswordPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Set Password',
  },
  passwordSet: {
    id: `${scope}.passwordSet`,
    defaultMessage:
      "You're all set up, please click on the button to give your new password a test.",
  },
});
