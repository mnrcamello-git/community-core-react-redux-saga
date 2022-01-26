/*
 * UserManagement Messages
 *
 * This contains all the text for the UserManagement container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserManagement';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the UserManagement container!',
  },
  unblockingLoading: {
    id: `${scope}.unblockingLoading`,
    defaultMessage: 'Unblocking Users In Progress...',
  },
});
