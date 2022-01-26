import React from 'react';
import DataTable from 'react-data-table-component';

function ResultComponent(props) {
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
          autoFocus
        />
        <i className="fa fa-times-circle close-btn" onClick={onClear} />
      </div>
    </form>
  );

  const columns = [
    {
      name: 'Employee Number',
      selector: 'employee_nbr',
      sortable: true,
      grow: 2,
      wrap: 1,
    },
    {
      name: 'Client Name',
      selector: 'client_name',
      sortable: true,
      grow: 2,
      wrap: 1,
    },
    {
      name: 'First Name',
      selector: 'first_name',
      sortable: true,
      grow: 2,
      wrap: 1,
    },

    {
      name: 'Last Name',
      selector: 'last_name',
      sortable: true,
      grow: 2,
      wrap: 1,
    },
    {
      name: 'PB Email',
      selector: 'pb_email',
      sortable: true,
      grow: 4,
      wrap: 1,
    },
    {
      name: 'Status',
      selector: 'is_emailed',
      sortable: true,
      cell: row => (
        <div
          className={
            row.is_emailed === 'processed'
              ? 'mailconfig-status'
              : 'mailconfig-status-failed'
          }
        >
          <span>{row.is_emailed}</span>
        </div>
      ),
      grow: 2,
      wrap: 1,
    },
    {
      name: 'Quota',
      selector: 'pb_quota',
      sortable: true,
      grow: 1,
      wrap: 1,
    },
  ];

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false,
  );

  const data =
    typeof props.affectedUsers !== 'undefined'
      ? props.affectedUsers.filter(
        user =>
          (user.employee_nbr !== null &&
              user.employee_nbr.includes(filterText.toUpperCase())) ||
            (user.client_name !== null &&
              user.client_name.includes(filterText.toUpperCase())) ||
            (user.first_name !== null &&
              user.first_name.includes(filterText.toUpperCase())) ||
            (user.last_name !== null &&
              user.last_name.includes(filterText.toUpperCase())) ||
            (user.pb_email !== null && user.pb_email.includes(filterText)),
      )
      : '';

  const handleSelect = allSelected => {
    props.dispatch(selectUser(allSelected.selectedRows));
  };

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
      {typeof props.affectedUsers === 'undefined' ? (
        <DataTable
          pagination
          highlightOnHover
          selectableRowsHighlight
          noHeader
          persistTableHead
          sortIcon={<span className="icon-table icon-arrow-down" />}
        />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          selectableRowsHighlight
          noHeader
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          onSelectedRowsChange={handleSelect}
          persistTableHead
          sortIcon={<span className="icon-table icon-arrow-down" />}
        />
      )}
    </>
  );
}

export default ResultComponent;