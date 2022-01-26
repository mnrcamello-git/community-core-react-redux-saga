/*
 * Hub Messages
 *
 * This contains all the text for the Hub container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Hub';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Hub container!',
  },
  hub: {
    id: `${scope}.noc`,
    defaultMessage: 'Hello Hub',
  },
});
