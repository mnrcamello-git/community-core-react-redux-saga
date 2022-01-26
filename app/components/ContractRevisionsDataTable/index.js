/**
 *
 * ContractRevisionDataTable
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  useTable,
  useFilters,
  usePagination,
  useGlobalFilter,
} from 'react-table';
import { requestContractDrafts } from '../../containers/Hub/AgreementPage/actions';

function ContractRevisionDataTable(props) {
  const { columns } = props.columns[0];
  const { data } = props;

  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
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
          rows.sort((a, b) => moment(a.values[id]) - moment.utc(b.values[id]));
        } else {
          rows.sort((a, b) => moment(b.values[id]) - moment.utc(a.values[id]));
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
          default:
            break;
        }
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
      filterByValueWithSort: (rows, id, filterValue) => {
        if (filterValue.type == 'filter') {
          return rows.filter(row => row.values[id] == filterValue.value);
        }
        rows.sort((a, b) => {
          if (filterValue.sort == 'ascending') {
            return a.values[id] - b.values[id];
          }
          return b.values[id] - a.values[id];
        });
        if (filterValue.value == '' || filterValue.value == undefined) {
          return rows.filter(row => true);
        }
        return rows.filter(row => row.values[id] == filterValue.value);
      },
      filterTexCommaSeparated: (rows, id, filterValue) => {
        if (filterValue === '') {
          return rows.filter(row => true);
        }

        let arrayValues = [];
        if (filterValue !== '') {
          if (filterValue.includes(',')) {
            arrayValues = filterValue.split(',');
          } else {
            arrayValues.push(filterValue);
          }
        }
        const filteredRows = [];
        rows.filter(row => {
          const rowValue = row.values[id];
          let foundedCount = 0;
          arrayValues.map(searchValue => {
            if (rowValue) {
              if (
                !String(rowValue)
                  .toLocaleLowerCase()
                  .includes(searchValue.toLowerCase())
              ) {
                foundedCount += 1;
              }
            } else {
              foundedCount += 1;
            }
          });
          if (foundedCount === 0) {
            filteredRows.push(row);
          }
        });
        return filteredRows;
      },
    }),
    [],
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: '',
    }),
    [],
  );

  const [sorted, setSorted] = useState([{}]);
  const {
    getTableProps,
    getTableBodyProps,
    preGlobalFilteredRows,
    setGlobalFilter,
    headerGroups,
    rows,
    state,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setAllFilters,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
  );

  const firstPageRows = rows.slice(0, 10);

  return (
    <div>
      <table {...getTableProps()} className="job-requisition" border="1px">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className={column.className}>
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
                  {column.canFilter ? (
                    <div>{column.render('Filter')}</div>
                  ) : null}
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
          {[10, 20, 30, 40, 50].map(pageSizeList => (
            <option key={pageSizeList} value={pageSizeList}>
              {pageSizeList}
            </option>
          ))}
        </select>
        <span className="mx-4">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button
          type="button"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {<i className="fa fa-angle-double-left" />}
        </button>{' '}
        <button
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {<i className="fa fa-angle-left" />}
        </button>{' '}
        <button
          type="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {<i className="fa fa-angle-right" />}
        </button>{' '}
        <button
          type="button"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {<i className="fa fa-angle-double-right" />}
        </button>{' '}
      </div>
    </div>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
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

function SearchAndExportComponent({
  globalFilter,
  preGlobalFilteredRows,
  setGlobalFilter,
  setAllFilters,
  dispatch,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const [isHidden, setIsHidden] = React.useState(true);

  const onChangeSearchValue = evt => {
    setValue(evt.target.value);
    setGlobalFilter(evt.target.value || undefined);
    if (evt.target.value !== '') {
      setIsHidden(false);
      return true;
    }
    setIsHidden(true);
    return true;
  };

  const handleOnClickClearAll = async () => {
    setAllFilters([]);
    setValue('');
    setGlobalFilter(undefined);
    dispatch(requestContractDrafts());
  };

  return (
    <div className="col-md-12 my-4 px-4">
      <div className="row d-flex">
        <div className="col-md-7 align-self-center">
          <div className="form-group m-0">
            <form className="search-box">
              <div className="position-relative d-flex">
                <input
                  className="form-control w-100 search"
                  value={value || ''}
                  onChange={onChangeSearchValue}
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
        </div>
        <div className="col-md-5 flex">
          <button
            type="button"
            className="clear-filters-btn btn btn-secondary float-right mr-3"
            onClick={handleOnClickClearAll}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}

ContractRevisionDataTable.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.any,
  dispatch: PropTypes.any,
};

export default ContractRevisionDataTable;
