/**
 *
 * FaqPage
 *
 */

import React, { memo, useState } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import ReactHtmlParser from 'react-html-parser';

import messages from './messages';

export function FaqPage() {
  const faqData = [
    {
      number: '01',
      title: `What are Penbrothers' modes of payment?`,
      body:
        '<p class="gray-color">We accept payments in cash, check, wire transfers, and through Flywire (USD only). For cash payments, clients can directly approach the Accounting and Finance department of Penbrothers through invoices@penbrothers.com. For check payments, clients should indicate the check payable to “THE PENBROTHERS INTERNATIONAL, INC.” on the space provided for the payee’s name. For wire transfers, clients can transfer into the following accounts:</p><br><p class="mb-0 gray-color">Bank: SECURITY BANK OF THE PHILIPPINES</p><p class="mb-0 gray-color">Account Name: THE PENBROTHERS INTERNATIONAL, INC.</p><p class="mb-0 gray-color">Account Numbers:</p><p class="mb-0 gray-color">PHP Account: 0000028806822</p><p class="mb-0 gray-color">USD Account: 0000030568802</p><p class="mb-0 gray-color">AUD Account: 0000031507554</p><p class="mb-0 gray-color">Swift Code: SETCPHMM</p>',
    },
    {
      number: '02',
      title:
        'Why do clients have to pay a deposit for the salary and office fee?',
      body:
        'Salary and office deposit are used as a security backup either to the company or the employee in case of a late payment from the client.',
    },
    {
      number: '03',
      title: 'Can Penbrothers waive the (office and salary) deposit charges?',
      body:
        'Waiving of the (office and salary) deposit charges is upon the discretion of the management apart from the 13th month deposit as it is government-mandated.',
    },
    {
      number: '04',
      title: 'Are the deposits refundable?',
      body:
        'Deposits are either refundable or consumable, depending on what is stated in the contract, to pay for the last invoice/s should the client decide to terminate the contract.',
    },
    {
      number: '05',
      title: 'What is a 13th month?',
      body:
        '13th month pay is a government-mandated bonus that is equivalent to one twelfth (1/12) of the basic annual salary given to employees not later than December 24 of every year or as part of the employee’s separation pay.',
    },
    {
      number: '06',
      title: 'Is it possible to remove/waive the 13th month deposit? ',
      body:
        'Unfortunately, the 13th month is government-mandated and required by the Philippine Labor Law and Department of Labor and Employment. Another option is to split the billing of the 13th month deposit into 12 months.',
    },
    {
      number: '07',
      title: 'Why do we have to pay the 13th month deposit upfront?',
      body:
        'Once an employee is successfully hired, the government mandates that they are already entitled to a 13th month pay. Paying the 13th month upfront will ensure that should the employee decide to leave after a month or in the middle of the year, the prorated amount of the 13th month pay will be compensated. The rest will be returned to the client.',
    },
    {
      number: '08',
      title: 'Can an international client pay in PHP?',
      body:
        'Penbrothers has USD, AUD, and PHP bank accounts. Philippine-registered clients are billed in PHP. Unless the international client has a Philippine-registered entity, they are invoiced in either USD or AUD to avoid confusion with Philippine-registered companies and audit from BIR.',
    },
    {
      number: '09',
      title: 'What is the Reimbursement Invoice?',
      body:
        'Reimbursement invoice includes costs related to the salary of the employee/s and are non-VATable. The charges reflected in the reimbursement invoice will be returned to the employee through the payroll.',
    },
    {
      number: '10',
      title:
        'What is the difference between the Reimbursement Invoice and Service Invoice?',
      body:
        'Reimbursement Invoice is a non-VATable, salary-related invoice wherein the amount billed will be returned to the employee/s, while the service invoice pertains to the billings/amount due to Penbrothers for the services provided.',
    },
    {
      number: '11',
      title: 'What are statutory tax and municipal tax?',
      body:
        'Statutory taxes are a government-mandated payroll deductions that employees can eventually enjoy as benefits when deemed necessary, while municipality tax is an amount paid to the local government/municipality of Makati.',
    },
    {
      number: '12',
      title: 'What is a one-time setup fee and can Penbrothers waive it?',
      body:
        'The one-time setup fee is the cost of the employee’s onboarding, contract, ID, and payroll setup. It is part of the standard charges as it also serves as the recruitment fee for every successful hire.',
    },
    {
      number: '13',
      title: 'What is the basis for the FOREX rate?',
      body:
        'The FOREX rate is based on BPI/Security Bank’s exchange rate. Finance team downloads the rates from the official website as a guide reference when invoicing.',
    },
    {
      number: '14',
      title: 'Why should the client shoulder the bank charges?',
      body:
        'When the additional bank charge is not settled together with the full amount of the invoice, Penbrothers’ books will not reflect full payment of the said invoice and the balance will be carried over to the next billing cycle.',
    },
    {
      number: '15',
      title: 'Why does Penbrothers do advance billing? ',
      body:
        'Advanced billing is the company’s standard process. It is done to ensure the security of its employee’s monthly compensation.',
    },
    {
      number: '16',
      title: 'Why is Penbrothers charging two (2) months in advance?',
      body:
        'In the original invoicing process, the invoice is sent a month in advance to give leeway to the clients to review their invoices and raise any concerns if necessary.',
    },
    {
      number: '17',
      title: 'Why do you only charged VAT on the service invoice?',
      body:
        'We only charge VAT to service invoice simply because it contains the primary service that the company provides.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState('');
  const handleFaqToggle = toggledIndex => {
    if (activeIndex === toggledIndex) {
      setActiveIndex('');
      return true;
    }
    setActiveIndex(toggledIndex);
  };

  return (
    <div className="faq mt-4">
      <div className="page-header">
        <h1 className="py-5 text-center white-color">
          <FormattedMessage {...messages.header} />
        </h1>
      </div>
      <div className="content my-5">
        <div className="col-md-10 offset-md-1">
          <Accordion>
            {faqData.map((faq, index) => (
              <Card key={index}>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={faq.number}
                    onClick={() => handleFaqToggle(index)}
                  >
                    <i
                      className={
                        activeIndex === index ? 'fa fa-minus' : 'fa fa-plus'
                      }
                    />
                  </Accordion.Toggle>
                  <div className="head-question">
                    <h1>{faq.number}</h1>
                    <span>{faq.title}</span>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey={faq.number}>
                  <Card.Body>{ReactHtmlParser(faq.body)}</Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

FaqPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FaqPage);
