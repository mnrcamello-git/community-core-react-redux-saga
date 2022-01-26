/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import laptop from '../../assets/images/laptop.svg';

export default function NotAvailablePage() {
  const handleBackButton = () => {
    if (history.length === 1) {
      window.location = '/';
    } else {
      history.back();
    }
  };
  return (
    <div className="not-found-page">
      <div className="main-content">
        <div className="col-lg-10 offset-lg-1">
          <div className="row">
            <div className="col-lg-6 col-sm-12 text-center">
              <img src={laptop} alt="laptop" title="laptop" className="w-100" />
            </div>
            <div className="col-lg-6 col-sm-12 text-center align-self-center">
              <div className="message">
                <h1 className="not-available">
                  <FormattedMessage {...messages.header} />
                </h1>
                <h2>
                  <FormattedMessage {...messages.body} />
                </h2>
                <button
                  onClick={handleBackButton}
                  type="button"
                  className="cancel w-25 mt-5"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
