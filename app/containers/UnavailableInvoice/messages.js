/*
 * UnavailableInvoice Messages
 *
 * This contains all the text for the UnavailableInvoice container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UnavailableInvoice';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Thank you for using HUB.',
  },
  content: {
    id: `${scope}.content`,
    defaultMessage:
      'Unfortunately, we are unable to retrieve PDF copy of your invoice from our accounting system provider.',
  },
  sub_content: {
    id: `${scope}.sub_content`,
    defaultMessage: 'We sincerely apologize for this inconvenience.',
  },
  footer: {
    id: `${scope}.footer`,
    defaultMessage: 'Please try again later.',
  },
});
