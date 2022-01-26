/**
 *
 * ClientsDataTable
 *
 */

import React from 'react';
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from 'react-table';

import { OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';
import moment from 'moment';

import {
  SortByAlphaAndFilterValue,
  SelectColumnFilterByDate,
  SelectColumnFilterByDropdownValues,
} from '../../containers/App/tableFilters';

import {
  formatISOtoLongYear,
  translateToHumanReadableFormat,
  translateToHumanReadableFormatClassName,
} from '../../containers/App/globalHelpers';
import ViewDetailIcon from '../../assets/images/hub/recruitment/view-detail_icon.png';
import {
  getDueDiligence,
  setShowModal,
} from '../../containers/Noc/SalesPage/actions';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ClientsDataTable(props) {
  const { data } = props;

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) =>
        rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        }),
      // multiple value filtering for example filter value = ["apple, banana"] includes "apple"
      multipleWithSort: (rows, id, filterValue) => {
        switch (filterValue.type) {
          case 'sort':
            if (filterValue.sortOrder == 'ascending') {
              rows.sort(function(a, b) {
                if (a.values[id] < b.values[id]) {
                  return -1;
                }
                if (a.values[id] > b.values[id]) {
                  return 1;
                }
                return 0;
              });
            } else {
              rows.sort(function(a, b) {
                if (a.values[id] > b.values[id]) {
                  return -1;
                }
                if (a.values[id] < b.values[id]) {
                  return 1;
                }
                return 0;
              });
            }
            if (!filterValue.array.length) {
              return rows.filter(row => true);
            }
            return rows.filter(row => {
              const rowValue = row.values[id]; // values of an id
              return rowValue !== undefined
                ? filterValue.array.includes(rowValue)
                : true;
            });
          case 'filter':
            const filteredRows = rows.filter(row => {
              const rowValue = row.values[id]; // values of an id
              return rowValue !== undefined
                ? filterValue.array.includes(rowValue)
                : true;
            });
            return filteredRows;
        }
      },
      // multiple array filtering for example filter value = ["apple", "banana"] includes ["apple", "banana", "saging"]
      multipleCategories: (rows, id, filterValue) => {
        switch (filterValue.type) {
          case 'filter':
            const finalData = rows.filter(row => {
              const categoryValue = row.values.categories;
              return categoryValue !== []
                ? anyMatchInArray(categoryValue, filterValue.array)
                : true;
            });
            return finalData;
          case 'sort':
            if (filterValue.value == 'ascending') {
              rows.sort(function(a, b) {
                if (
                  a.values.job_title.toLowerCase() <
                  b.values.job_title.toLowerCase()
                ) {
                  return -1;
                }
                if (
                  a.values.job_title.toLowerCase() >
                  b.values.job_title.toLowerCase()
                ) {
                  return 1;
                }
                return 0;
              });
            } else {
              rows.sort(function(a, b) {
                if (
                  a.values.job_title.toLowerCase() >
                  b.values.job_title.toLowerCase()
                ) {
                  return -1;
                }
                if (
                  a.values.job_title.toLowerCase() <
                  b.values.job_title.toLowerCase()
                ) {
                  return 1;
                }
                return 0;
              });
            }
            if (!filterValue.array.length) {
              return rows.filter(row => true);
            }
            return rows.filter(row => {
              const categoryValue = row.values.categories;
              return categoryValue !== []
                ? anyMatchInArray(categoryValue, filterValue.array)
                : true;
            });
        }
      },
      filterByDateRange: (rows, id, filterValue) => {
        if (filterValue.type == 'filter') {
          return rows.filter(row => {
            const date = moment(row.values[id]);
            if (filterValue.startDate.isSame(filterValue.endDate)) {
              return date.isSame(filterValue.startDate, 'date');
            }
            return date.isBetween(filterValue.startDate, filterValue.endDate);
          });
        }
        if (filterValue.value == 'ascending') {
          rows.sort((a, b) => {
            const aValue = new Date(a.values[id]);
            const bValue = new Date(b.values[id]);
            return aValue - bValue;
          });
          // rows.sort((a, b) => moment(a.values[id]) - moment.utc(b.values[id]));
        } else {
          rows.sort((a, b) => {
            const aValue = new Date(a.values[id]);
            const bValue = new Date(b.values[id]);
            return bValue - aValue;
          });
        }
        if (
          filterValue.startDate == undefined ||
          filterValue.endDate == undefined
        ) {
          return rows.filter(row => true);
        }
        return rows.filter(row => {
          const date = moment(row.values[id]);
          if (filterValue.startDate.isSame(filterValue.endDate)) {
            return date.isSame(filterValue.startDate, 'date');
          }
          return date.isBetween(filterValue.startDate, filterValue.endDate);
        });
      },
      // filterValue[0] - ascending, descending filterValue[1] - object name
      sortByValueCountedCandidates: (rows, id, filterValue) =>
        rows
          .sort((a, b) => {
            if (filterValue == 'ascending') {
              return (
                a.values.candidateAvailableCount -
                b.values.candidateAvailableCount
              );
            }
            return (
              b.values.candidateAvailableCount -
              a.values.candidateAvailableCount
            );
          })
          .filter(row => true),
      sortByAlphabet: (rows, id, filterValue) => {
        rows.sort((a, b) => {
          if (filterValue == 'ascending') {
            if (a.values[id].toLowerCase() < b.values[id].toLowerCase()) {
              return -1;
            }
            if (a.values[id].toLowerCase() > b.values[id].toLowerCase()) {
              return 1;
            }
            return 0;
          }
          if (a.values[id].toLowerCase() > b.values[id].toLowerCase()) {
            return -1;
          }
          if (a.values[id].toLowerCase() < b.values[id].toLowerCase()) {
            return 1;
          }
          return 0;
        });
        return rows.filter(row => true);
      },
      filterByValueWithSort: (rows, id, filterValue) => {
        if (filterValue.type == 'filter') {
          return rows.filter(row => row.values[id] == filterValue.value);
        }
        rows.sort((a, b) => {
          if (filterValue.sortOrder == 'ascending') {
            return a.values[id] - b.values[id];
          }
          return b.values[id] - a.values[id];
        });
        if (filterValue.value == '' || filterValue.value == undefined) {
          return rows.filter(row => true);
        }
        return rows.filter(row => row.values[id] == filterValue.value);
      },
      filterTextWithSort: (rows, id, filterValue) => {
        switch (filterValue.type) {
          case 'sort':
            if (filterValue.sortOrder === 'ascending') {
              rows.sort(function(a, b) {
                if (a.values[id] < b.values[id]) {
                  return -1;
                }
                if (a.values[id] > b.values[id]) {
                  return 1;
                }
                return 0;
              });
            } else {
              rows.sort(function(a, b) {
                if (a.values[id] > b.values[id]) {
                  return -1;
                }
                if (a.values[id] < b.values[id]) {
                  return 1;
                }
                return 0;
              });
            }
            if (!filterValue.text) {
              return rows.filter(row => true);
            }
            return rows.filter(row => {
              const rowValue = row.values[id];
              return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue.text).toLowerCase())
                : true;
            });
          case 'filter':
            const filteredRows = rows.filter(row => {
              const rowValue = row.values[id];
              return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue.text).toLowerCase())
                : true;
            });
            return filteredRows;
          default:
            break;
        }
      },
    }),
    [],
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Client Name',
        accessor: 'client_name',
        Filter: SortByAlphaAndFilterValue,
        filter: 'filterTextWithSort',
      },
      {
        Header: 'Point of Contact',
        accessor: originalRow =>
          `${originalRow.primary_contact} ${
            originalRow.primary_contact_last_name
          }`,
        Cell: props => (
          <div>{`${props.row.original.primary_contact} ${
            props.row.original.primary_contact_last_name
          }`}</div>
        ),
        Filter: SortByAlphaAndFilterValue,
        filter: 'filterTextWithSort',
      },
      {
        Header: 'Expire Date',
        accessor: 'end_billing_date',
        Filter: SelectColumnFilterByDate,
        filter: 'filterByDateRange',
        Cell: tableData => (
          <div className="text-left">
            <span>{formatISOtoLongYear(tableData.cell.value)}</span>
          </div>
        ),
      },
      {
        Header: 'Client Type',
        accessor: 'dom_int',
        Filter: SelectColumnFilterByDropdownValues,
        filter: 'multipleWithSort',
      },
      {
        Header: 'Contract Type',
        accessor: 'contract_type',
        Filter: SelectColumnFilterByDropdownValues,
        filter: 'multipleWithSort',
      },
      {
        Header: 'Status',
        accessor: 'status',
        className: 'status-name',
        Filter: SelectColumnFilterByDropdownValues,
        filter: 'multipleWithSort',
        Cell: tableData => (
          <div className="text-center status-name">
            <span
              className={translateToHumanReadableFormatClassName(
                tableData.cell.value,
              )}
            >
              {translateToHumanReadableFormat(tableData.cell.value)}
            </span>
          </div>
        ),
      },
      {
        Header: '',
        accessor: 'client_id',
        right: true,
        disableFilters: true,
        Cell: rowData => (
          <div>
            <Dropdown drop="down" className="text-right">
              <Dropdown.Toggle className="gear-btn">
                <i className="fa fa-cog" />
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="view"
                    onClick={() => {
                      props.dispatch(getDueDiligence(rowData.row.original));
                    }}
                  >
                    <img src={ViewDetailIcon} title="" alt="view" /> View Due
                    Diligence
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Toggle>
            </Dropdown>
          </div>
        ),
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    // pagination
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setAllFilters,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
      },
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination,
  );

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps()} className="job-requisition" border="1px">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className={column.className}>
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="job-requisition" {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className={
                      cell.column.className ? `td-${cell.column.className}` : ''
                    }
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div className="pagination text-right d-block mb-4 px-4">
        <span>Rows per page: </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <span className="mx-4">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {<i className="fa fa-angle-double-left" />}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {<i className="fa fa-angle-left" />}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {<i className="fa fa-angle-right" />}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {<i className="fa fa-angle-double-right" />}
        </button>{' '}
      </div>
    </>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isLabel,
  isClosedJobs,
  isCandidateList,
  toExport,
  setAllFilters,
  dispatch,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const [isHidden, setIsHidden] = React.useState(true);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
    if (value !== '') {
      setIsHidden(false);
      return true;
    }
    setIsHidden(true);
    return true;
  }, 200);

  const generateImageToDataUrl = async () => {
    const x = await loadImage(PB_LOGO).then(image => {
      const canvas = createCanvas(333, 72);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      return canvas.toDataURL();
    });
    return x;
  };

  return (
    <div className="col-md-12 my-3 px-4">
      <div className="row d-flex">
        <div className="col-md-7 align-self-center">
          <div className="form-group m-0">
            <form className="search-box" onSubmit={e => e.preventDefault()}>
              <div className="position-relative d-flex">
                <input
                  className="form-control w-100 search"
                  value={value || ''}
                  onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                  }}
                  placeholder={`Find keywords in ${count} records...`}
                />
                <i
                  className="fa fa-times-circle"
                  hidden={isHidden}
                  onClick={() => {
                    setValue();
                    setGlobalFilter();
                  }}
                />
              </div>
            </form>
          </div>
          {isLabel ? (
            <div className="overlay-tooltip">
              <i className="fa fa-lock gray-color" />
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-right" className="tooltip-content">
                    Cannot be modified, only the recruitment team can modify or
                    reprocess through core.
                  </Tooltip>
                }
              >
                <span
                  variant="secondary"
                  className="icon-table icon-tooltip align-self-center"
                />
              </OverlayTrigger>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

ClientsDataTable.propTypes = {};

export default ClientsDataTable;
