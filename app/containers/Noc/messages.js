/*
 * Noc Messages
 *
 * This contains all the text for the Noc container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Noc';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Noc container!',
  },
  noc: {
    id: `${scope}.noc`,
    defaultMessage: 'Hello Noc',
  },
});
