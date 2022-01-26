/**
 *
 * UserManagementDataTable
 *
 */

import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  selectUser,
  updateDropdownAction,
  requestConfigureUser,
  failedConfigureUsers,
} from '../../containers/Noc/UserManagement/actions';
import { toTitleCase } from '../../containers/App/globalHelpers';
import ViewDetailIcon from '../../assets/images/hub/recruitment/view-detail_icon.png';

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <form className="form-inline search-box">
    <div className="form-group">
      <i className="fa fa-search search-icon" />
      <input
        id="search"
        className="form-control"
        type="text"
        placeholder="Search job title…"
        value={filterText}
        onChange={onFilter}
      />
      <i className="fa fa-times-circle close-btn" onClick={onClear} />
    </div>
  </form>
);

function UserManagementDataTable(props) {
  const columns = [
    {
      name: 'Client',
      selector: 'client',
      sortable: true,
      grow: 3,
      wrap: 1,
    },
    {
      name: 'E-mail',
      selector: 'email',
      sortable: true,
      grow: 4,
      wrap: 1,
    },
    {
      name: 'First Name',
      selector: 'firstname',
      sortable: true,
      grow: 2,
      wrap: 1,
    },

    {
      name: 'Last Name',
      selector: 'lastname',
      sortable: true,
      grow: 2,
    },
    {
      name: 'User Role',
      selector: 'role',
      sortable: true,
      grow: 3,
      wrap: 1,
    },
    {
      name: 'Status',
      selector: 'active',
      conditionalCellStyles: [
        {
          when: row => row.active === 'Inactive',
          style: {
            color: '#d9534f',
          },
        },
        {
          when: row => row.active === 'Active',
          style: {
            color: '#5cb85c',
          },
        },
        {
          when: row => row.active === 'Blocked',
          style: {
            color: '#f0ad4e',
          },
        },
      ],
    },
    {
      cell: row => (
        <div className="text-right">
          <Dropdown drop="right">
            <Dropdown.Toggle className="gear-btn">
              <i className="fa fa-cog" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <DetailsModal data={row} />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
    },
  ];

  const handleSelect = allSelected => {
    props.dispatch(selectUser(allSelected.selectedRows));
  };

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false,
  );

  const filteredItems = props.users.filter(
    user =>
      user.client.includes(filterText.toUpperCase()) ||
      user.firstname.includes(filterText.toUpperCase()) ||
      user.lastname.includes(filterText.toUpperCase()) ||
      user.active.includes(toTitleCase(filterText)) ||
      user.email.includes(filterText),
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <ActionComponent
        dispatch={props.dispatch}
        dropdown_action={props.dropdown_action}
        selected_users={props.selected_users}
      />
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        selectableRows
        highlightOnHover
        selectableRowsHighlight
        noHeader
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        onSelectedRowsChange={handleSelect}
        clearSelectedRows={props.clear_rows}
        persistTableHead
        sortIcon={<span className="icon-table icon-arrow-down" />}
      />
    </>
  );
}

function ActionComponent(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const actions = ['unblock', 'block', 'deactivate', 'invite'];

  const handleShow = () => {
    if (props.dropdown_action === '') {
      props.dispatch(failedConfigureUsers('Please select an action'));
      return false;
    }

    if (!actions.includes(props.dropdown_action)) {
      props.dispatch(failedConfigureUsers('Action not supported'));
    }

    if (props.selected_users.length <= 0) {
      props.dispatch(failedConfigureUsers('Please select users'));
      return false;
    }
    setShow(true);
  };

  const handleSubmit = () => {
    const action = props.dropdown_action;
    const selectedUsers = props.selected_users;

    if (action === '') {
      handleClose();
      return false;
    }

    props.dispatch(
      requestConfigureUser({
        users: selectedUsers,
        message: `Processing, please wait...`,
        action,
      }),
    );

    handleClose();
    return true;
  };

  const handleChangeAction = e => {
    props.dispatch(updateDropdownAction(e.target.value));
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="action-btn-section">
          <div className="form-group mb-0">
            <select
              className="form-control"
              onChange={handleChangeAction}
              value={props.dropdown_action}
            >
              <option value="">Actions</option>
              <option value="unblock">Unblock/Activate</option>
              <option value="block">Block</option>
              <option value="deactivate">Deactivate</option>
              <option value="invite">Send Invite</option>
            </select>
            <button
              type="button"
              className="primary-button"
              onClick={handleShow}
            >
              <span>Apply</span>
            </button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
          <button type="button" onClick={handleSubmit}>
            Go
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function DetailsModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Dropdown.Item onClick={handleShow}>
        <img src={ViewDetailIcon} title="" alt="view" />
        Preview
      </Dropdown.Item>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Details for {toTitleCase(props.data.firstname)}{' '}
            {toTitleCase(props.data.lastname)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <tbody>
              <tr>
                <td>Position: {props.data.position}</td>
              </tr>
              <tr>
                <td>Mobile: {props.data.mobile}</td>
              </tr>
              <tr>
                <td>Landline: {props.data.landline}</td>
              </tr>
              <tr>
                <td>Last Login IP: {props.data.lost_login_ip}</td>
              </tr>
              <tr>
                <td>Last Login Date: {props.data.last_login_date}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ActionComponent.propTypes = {
  dispatch: PropTypes.func,
  dropdown_action: PropTypes.string,
  selected_users: PropTypes.array,
};

UserManagementDataTable.propTypes = {
  dispatch: PropTypes.func,
  users: PropTypes.array,
  dropdown_action: PropTypes.string,
  selected_users: PropTypes.array,
  clear_rows: PropTypes.bool,
};

export default UserManagementDataTable;
