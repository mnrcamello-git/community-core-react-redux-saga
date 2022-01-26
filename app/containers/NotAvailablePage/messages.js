/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NotAvailablePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'OOPSS!',
  },
  body: {
    id: `${scope}.body`,
    defaultMessage: 'Page Not Available',
  },
});
