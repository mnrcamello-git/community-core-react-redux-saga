/**
 *
 * Table
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  useTable,
  useBlockLayout,
  usePagination,
  useSortBy,
} from 'react-table';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { useSticky } from 'react-table-sticky';

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useBlockLayout,
    useSticky,
    useSortBy,
    usePagination,
  );
  const footerGroups = headerGroups.slice().reverse();
  return (
    <>
      <div {...getTableProps()} className="table sticky">
        <div className={columns.length < 7 ? 'thead tfull' : 'thead'}>
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map(column => (
                <div
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`${column.className} td font-weight-bold`}
                >
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <div>
                    {column.tooltip ? (
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip
                            id="tooltip-bottom"
                            className="tooltip-content"
                          >
                            {column.tooltip}
                          </Tooltip>
                        }
                      >
                        <span
                          variant="secondary"
                          className="icon-table icon-tooltip"
                        />
                      </OverlayTrigger>
                    ) : (
                      ''
                    )}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <div className="">
                          <span className="icon-table icon-arrow-down" />
                        </div>
                      ) : (
                        <div className="asc">
                          <span className="icon-table icon-arrow-down" />
                        </div>
                      )
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          className={columns.length < 7 ? 'tbody tbfull' : 'tbody'}
          {...getTableBodyProps()}
        >
          {page.map(row => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map(cell => (
                  <div
                    {...cell.getCellProps([
                      {
                        className: `td ${cell.column.className}`,
                      },
                    ])}
                  >
                    {cell.render('Cell')}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div className={columns.length < 7 ? 'footer footerfull' : 'footer'}>
          {footerGroups.map(footerGroup => (
            <div {...footerGroup.getHeaderGroupProps()} className="tr">
              {footerGroup.headers.map(column => (
                <div
                  {...column.getHeaderProps()}
                  className={` ${column.className} td font-weight-bold`}
                >
                  {column.render('Footer')}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination goes here... */}
      <div className="pagination text-right d-block mb-3">
        <span>Rows per page: </span>
        <select
          value={pageSize}
          className="custom-select w-auto mr-4"
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(sizeOfPage => (
            <option key={sizeOfPage} value={sizeOfPage}>
              {sizeOfPage}
            </option>
          ))}
        </select>
        <span className="mr-4">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button
          type="button"
          className="page-link d-inline"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>{' '}
        <button
          type="button"
          className="page-link d-inline"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>{' '}
        <button
          type="button"
          className="page-link d-inline"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>{' '}
        <button
          className="page-link d-inline"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          type="button"
        >
          {'>>'}
        </button>{' '}
      </div>
    </>
  );
}

Table.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.any,
};

export default memo(Table);
