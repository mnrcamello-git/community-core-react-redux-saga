import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import NotAvailablePage from '../index';

describe('<NotAvailablePage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <NotAvailablePage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
