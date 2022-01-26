/**
 *
 * JobOrdersDataTable
 *
 */

import React, { useEffect, useState } from 'react';
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from 'react-table';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createCanvas, loadImage } from 'canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import {
  anyMatchInArray,
  formatStringToCurrency,
  formatISOtoLongYear,
  translateToHumanReadableFormat,
  countedShortlists,
  toTitleCase,
  getClientName,
} from '../../containers/App/globalHelpers';
import PDFIcon from '../../assets/images/hub/recruitment/pdf-white_icon.png';
import PB_LOGO from '../../assets/images/pblogo-dark.png';
import {
  fetchAllJobRequisitions,
  fetchClosedJobRequisitions,
} from '../../containers/Hub/FileJobReqPage/actions';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function JobOrdersDataTable(props) {
  const { columns } = props.columns[0];
  const { data } = props;
  const hiddenColumns = props.hidden || [];
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
        hiddenColumns,
        pageIndex: 0,
      },
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination,
  );

  const [dataExport, setDataExport] = useState();

  useEffect(() => {
    setDataExport(rows);
  }, [rows]);
  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10);
  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
        isLabel={props.is_label}
        isClosedJobs={props.is_closed_jobs}
        isCandidateList={props.is_candidate_list}
        dispatch={props.dispatch}
        toExport={dataExport}
        setAllFilters={setAllFilters}
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

  const handleExportPdf = async () => {
    if (!toExport.length) {
      return;
    }
    const date = new Date().toISOString();
    const url = await generateImageToDataUrl();
    const image = {
      image: url,
      width: 215,
      height: 50,
    };

    if (isClosedJobs) {
      let currentSalary;
      const columnData = toExport.map(data => {
        if (data.original.job_order_shortlists[0].candidate.employee == null) {
          currentSalary = '-';
        } else {
          currentSalary =
            data.original.job_order_shortlists[0].candidate.employee
              .current_salary;
          currentSalary =
            currentSalary > 0 ? formatStringToCurrency(currentSalary) : '-';
        }
        const name = `${
          data.original.job_order_shortlists[0].candidate.first_name
        } ${data.original.job_order_shortlists[0].candidate.middle_name} ${
          data.original.job_order_shortlists[0].candidate.last_name
        }`;
        return [
          {
            text: data.original.job_title,
            alignment: 'left',
            fontSize: 8,
            margin: [0, 2, 0, 2],
          },
          {
            text:
              data.original.experience_level == ''
                ? '-'
                : translateToHumanReadableFormat(
                    data.original.experience_level,
                  ),
            alignment: 'left',
            fontSize: 8,
            margin: [0, 2, 0, 2],
          },
          {
            text: formatISOtoLongYear(data.original.createdAt),
            alignment: 'left',
            fontSize: 8,
            margin: [0, 2, 0, 2],
          },
          {
            text: currentSalary,
            alignment: 'right',
            fontSize: 8,
            margin: [0, 2, 0, 2],
          },
          {
            text: toTitleCase(name),
            alignment: 'left',
            fontSize: 8,
            margin: [0, 2, 0, 2],
          },
        ];
      });
      const doc = {
        info: {
          title: `${getClientName()} Closed Job Requisition ${formatISOtoLongYear(
            date,
          )}.pdf`,
        },
        content: [
          image,
          {
            alignment: 'left',
            margin: [5, 20, 0, 30],
            style: 'table',
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              dontBreakRows: true,
              margin: [5, 0, 0, 20],
              widths: ['auto', 70, 50, 80, 'auto'],
              body: [
                [
                  {
                    text: 'Job Title',
                    lineHeight: 1,
                    fontSize: 8,
                    bold: true,
                    alignment: 'left',
                  },
                  {
                    text: 'Experience Level',
                    lineHeight: 1,
                    fontSize: 8,
                    bold: true,
                    alignment: 'left',
                  },
                  {
                    text: 'Date Opened',
                    lineHeight: 1,
                    fontSize: 8,
                    bold: true,
                    alignment: 'left',
                  },
                  {
                    text: 'Actual Salary (PHP)',
                    lineHeight: 1,
                    fontSize: 8,
                    bold: true,
                    alignment: 'right',
                  },
                  {
                    text: 'Hired Candidate',
                    lineHeight: 1,
                    fontSize: 8,
                    bold: true,
                    alignment: 'left',
                  },
                ],
                ...columnData,
              ],
            },
          },
        ],
      };
      const date = new Date().toISOString();
      pdfMake
        .createPdf(doc)
        .download(
          `${getClientName()} Closed Job Requisition ${formatISOtoLongYear(
            date,
          )}.pdf`,
        );
      return;
    }

    const columnData = toExport.map(data => {
      const rowValue = data.original.job_order_shortlists.length;
      const countedStatuses = countedShortlists();
      let candidateCount = 0;
      for (let i = 0; i < rowValue; i++) {
        const str = data.original.job_order_shortlists[i].status.toUpperCase();
        if (countedStatuses.includes(str)) {
          candidateCount++;
        }
      }
      return [
        {
          text: data.original.job_title,
          lineHeight: 1.5,
          alignment: 'left',
          fontSize: 8,
          margin: [0, 2, 0, 2],
        },
        {
          text:
            data.original.experience_level == ''
              ? '-'
              : translateToHumanReadableFormat(data.original.experience_level),
          lineHeight: 1.5,
          alignment: 'left',
          fontSize: 8,
          margin: [0, 2, 0, 2],
        },
        {
          text:
            data.original.max_salary > 0
              ? formatStringToCurrency(data.original.max_salary)
              : '-',
          lineHeight: 1.5,
          alignment: 'right',
          fontSize: 8,
          margin: [0, 2, 0, 2],
        },
        {
          text: formatISOtoLongYear(data.original.createdAt),
          lineHeight: 1.5,
          alignment: 'right',
          fontSize: 8,
          margin: [0, 2, 0, 2],
        },
        {
          text: candidateCount || '-',
          lineHeight: 1.5,
          alignment: 'center',
          fontSize: 8,
          margin: [0, 1, 0, 1],
        },
        {
          text: `${data.original.job_order_status
            .charAt(0)
            .toUpperCase()}${data.original.job_order_status
            .slice(1)
            .toLowerCase()}`,
          lineHeight: 1.5,
          alignment: 'left',
          fontSize: 8,
          margin: [0, 2, 0, 2],
        },
      ];
    });

    const doc = {
      info: {
        title: `${getClientName()} Requisition ${formatISOtoLongYear(
          date,
        )}.pdf`,
      },
      content: [
        image,
        {
          style: 'table',
          margin: [5, 30, 0, 40],
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            dontBreakRows: true,
            margin: [5, 20, 0, 30],
            widths: ['auto', 80, 70, 60, 60, 40],
            body: [
              [
                {
                  text: 'Job Title',
                  lineHeight: 1,
                  fontSize: 8,
                  bold: true,
                  width: 20,
                  alignment: 'left',
                },
                {
                  text: 'Experience Level',
                  lineHeight: 1,
                  fontSize: 8,
                  bold: true,
                  alignment: 'left',
                },
                {
                  text: 'Max Salary (PHP)',
                  lineHeight: 1,
                  fontSize: 8,
                  bold: true,
                  alignment: 'right',
                },
                {
                  text: 'Date Opened',
                  lineHeight: 1,
                  fontSize: 8,
                  bold: true,
                  alignment: 'right',
                },
                {
                  text: 'Candidates Available',
                  lineHeight: 1,
                  fontSize: 8,
                  bold: true,
                  alignment: 'center',
                },
                {
                  text: 'Status',
                  lineHeight: 1,
                  fontSize: 8,
                  bold: true,
                  alignment: 'left',
                },
              ],
              ...columnData,
            ],
          },
        },
      ],
    };

    pdfMake
      .createPdf(doc)
      .download(
        `${getClientName()} Job Requisition ${formatISOtoLongYear(date)}.pdf`,
      );
  };

  const handleOnClickClearAll = async () => {
    setAllFilters([]);
    setValue('');
    setGlobalFilter(undefined);
    if (isClosedJobs) {
      dispatch(fetchClosedJobRequisitions());
    } else {
      dispatch(fetchAllJobRequisitions());
    }
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
        <div className="col-md-5">
          {isCandidateList === true ? (
            ''
          ) : (
            <button
              type="button"
              onClick={handleExportPdf}
              className="export-btn btn btn-primary float-right"
            >
              <img src={PDFIcon} alt="PDF icon" />
              Export PDF
            </button>
          )}
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

JobOrdersDataTable.propTypes = {
  columns: PropTypes.any,
  is_label: PropTypes.any,
  dispatch: PropTypes.any,
};

export default JobOrdersDataTable;
