/*
 * StatementOfAccountPage Messages
 *
 * This contains all the text for the StatementOfAccountPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.StatementOfAccountPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the StatementAccountComponent component!',
  },
  to_date: {
    id: `${scope}.to_date`,
    defaultMessage: 'To Date',
  },
  from_date: {
    id: `${scope}.from_date`,
    defaultMessage: 'From Date',
  },
  company_name: {
    id: `${scope}.company_name`,
    defaultMessage: 'The Penbrothers International, Inc.',
  },
  company_address: {
    id: `${scope}.company_address`,
    defaultMessage:
      'Unit 5K OPL Building, 100 C. Palanca St. Legaspi Village Makati City, Metro Manila, Philippines',
  },
  bank_title: {
    id: `${scope}.bank_title`,
    defaultMessage: 'Bank Account Details:',
  },
  bank_name: {
    id: `${scope}.bank_name`,
    defaultMessage: 'Security Bank Corporation',
  },
  usd_account: {
    id: `${scope}.usd_account`,
    defaultMessage: 'USD Account: 0000-0305-68802',
  },
  php_account: {
    id: `${scope}.php_account`,
    defaultMessage: 'PHP Account: 0000-0288-06822',
  },
  aud_account: {
    id: `${scope}.aud_account`,
    defaultMessage: 'AUD Account: 0000-0315-07554',
  },
  swift_code: {
    id: `${scope}.swift_code`,
    defaultMessage: 'Swift Code: SETCPHMM',
  },
  tax: {
    id: `${scope}.tax`,
    defaultMessage: 'Tax ID Number: 008-818-262-000',
  },
  tax_number: {
    id: `${scope}.tax_number`,
    defaultMessage: '08-818-262-000',
  },
  pb_poc: {
    id: `${scope}.pb_poc`,
    defaultMessage: 'Attention: Gabrielle Pratte',
  },
});
