/*
 * ComingSoon Messages
 *
 * This contains all the text for the ComingSoon component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ComingSoon';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ComingSoon component!',
  },
  code: {
    id: `${scope}.code`,
    defaultMessage: '</>',
  },
});
