/**
 *
 * Menu
 *
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Accordion, Button } from 'react-bootstrap';
import community from '../../assets/images/hub/community_icon.svg';
import fileJobRequisition from '../../assets/images/hub/file_job_requisition_icon.svg';
import agreements from '../../assets/images/hub/agreements_icon.svg';
import requestsTickets from '../../assets/images/hub/requests_tickets_icon.svg';
import meetingRoom from '../../assets/images/hub/meeting_room_icon.svg';
import invoicing from '../../assets/images/hub/invoicing_icon.svg';

import marketing from '../../assets/images/noc/marketing_icon.svg';
import userManagement from '../../assets/images/noc/user_management_icon.svg';
import sales from '../../assets/images/noc/sales_icon.svg';
import recruitment from '../../assets/images/noc/recruitment_icon.svg';
import customerService from '../../assets/images/noc/customer_service_icon.svg';
import humanResource from '../../assets/images/noc/human_resource_icon.svg';
import operations from '../../assets/images/noc/operations_icon.svg';
import finance from '../../assets/images/noc/finance_icon.svg';
import settings from '../../assets/images/noc/settings_icon.svg';

import env from '../../config/env';

function Menu({ portal }) {
  let menus = [];

  // @Note: Make sure that the module code is equal to icons name
  const icons = [
    // Hub Menu
    {
      name: 'community',
      image: community,
    },
    {
      name: 'file-job-requisition',
      image: fileJobRequisition,
    },
    {
      name: 'agreements',
      image: agreements,
    },
    {
      name: 'request-and-tickets',
      image: requestsTickets,
    },
    {
      name: 'meeting-room',
      image: meetingRoom,
    },
    {
      name: 'invoicing',
      image: invoicing,
    },
    {
      name: 'soa',
    },

    // NOC Menu
    {
      name: 'user-management',
      image: userManagement,
    },
    {
      name: 'marketing',
      image: marketing,
    },
    {
      name: 'sales',
      image: sales,
    },
    {
      name: 'recruitment',
      image: recruitment,
    },
    {
      name: 'customer-service',
      image: customerService,
    },
    {
      name: 'human-resource',
      image: humanResource,
    },
    {
      name: 'operations',
      image: operations,
    },
    {
      name: 'finance',
      image: finance,
    },
    {
      name: 'settings',
      image: settings,
    },
    {
      name: 'mail-config',
      image: operations,
    },
  ];

  if (localStorage.getItem('menus')) {
    menus = JSON.parse(localStorage.getItem('menus'));

    menus.map(menu => {
      const sidebarIcon = icons.find(icon => icon.name === menu.code);
      if (sidebarIcon) {
        menu.icon = sidebarIcon.image;
      } else {
        menu.icon = '';
      }
    });
  }
  const selectedDashboard = portal;

  const menuElement = (sub, index) => (
    <li
      key={`unique${index}`}
      className={location.pathname == sub.path ? 'active' : ''}
    >
      {sub.path === env.ZOHO_URI() ? (
        <Link to={sub.path} target="_blank" className="icon">
          <img src={sub.icon} />
        </Link>
      ) : (
        <Link to={sub.path} className="icon">
          <img src={sub.icon} />
        </Link>
      )}
      {sub.is_blank ? (
        <a href={sub.path} target="_blank">
          {sub.name}
        </a>
      ) : (
        <Link to={sub.path ? sub.path : '/404'}> {sub.name}</Link>
      )}
    </li>
  );

  return (
    <>
      {menus.map((module, index) =>
        module.category.includes(selectedDashboard) === true ? (
          module.sub_menu ? (
            <Accordion
              key={Math.random()
                .toString(36)
                .substring(7)}
            >
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                <img src={module.icon} />
                <span>{module.name}</span>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <ul>
                  {module.sub_menu.map((sub, subIndex) => (
                    <div
                      key={Math.random()
                        .toString(36)
                        .substring(7)}
                    >
                      {menuElement(sub, subIndex)}
                    </div>
                  ))}
                </ul>
              </Accordion.Collapse>
            </Accordion>
          ) : (
            menuElement(module, index)
          )
        ) : (
          ''
        ),
      )}
    </>
  );
}

Menu.propTypes = {
  portal: PropTypes.any,
};

export default Menu;
