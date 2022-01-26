/**
 *
 * SampleCvDatatable
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useTable,
  useFilters,
  usePagination,
  useAsyncDebounce,
  useGlobalFilter,
} from 'react-table';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import PDFIcon from '../../assets/images/hub/recruitment/pdf-white_icon.png';
import PB_LOGO from '../../assets/images/pblogo-dark.png';
import {
  formatDateToDayMonthNameYear,
  getClientName,
  generateImageToDataUrl,
  translateToHumanReadableFormat,
} from '../../containers/App/globalHelpers';
import { fetchBlindCv } from '../../containers/Hub/FileJobReqPage/actions';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function SampleCvDatatable(props) {
  const { columns } = props.columns[0];
  const { data } = props;

  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
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

  const [dataExport, setDataExport] = useState();

  useEffect(() => {
    setDataExport(rows);
  }, [rows]);

  return (
    <div>
      <SearchAndExportComponent
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
        toExport={dataExport}
        setAllFilters={setAllFilters}
        dispatch={props.dispatch}
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
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
  toExport,
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

  const handleOnClickExport = async () => {
    if (toExport.length === 0) {
      return true;
    }
    const fileName = `${getClientName()} Sample CV's ${formatDateToDayMonthNameYear(
      new Date(),
    )}.pdf`;

    const tableRowData = [];

    toExport.map(data => {
      tableRowData.push([
        {
          text: data.values.cv_code,
          lineHeight: 1.5,
          alignment: 'left',
        },
        {
          text: data.values.job_title,
          lineHeight: 1.5,
          alignment: 'left',
        },
        {
          text:
            data.values.experience_level === ''
              ? '-'
              : translateToHumanReadableFormat(data.values.experience_level),
          lineHeight: 1.5,
          alignment: 'left',
        },
        {
          text: data.values.skills === '' ? '-' : data.values.skills,
          lineHeight: 1.5,
          alignment: 'left',
        },
      ]);
    });
    const pbLogo = await generateImageToDataUrl(PB_LOGO);
    const doc = {
      info: {
        title: fileName,
      },
      styles: {
        table: {
          fontSize: 9,
        },
      },
      footer: {
        columns: [
          {
            text: [
              {
                text:
                  'Registered Office: Unit 5K, OPL Building, 100 C. Palanca St. Legaspi Village, Makati City, Metro Manila, Philippines.\n',
                alignment: 'left',
                fontSize: 8,
                lineHeight: 1.5,
              },
            ],
          },
        ],
        margin: [40, 0, 10, 40],
      },
      pageMargins: [40, 40, 40, 30],
      content: [
        {
          image: pbLogo,
          width: 215,
          height: 50,
        },
        {
          text: `SAMPLE CV'S\n`,
          margin: [5, 30, 0, 20],
          fontSize: 20,
          lineHeight: 1.75,
          bold: true,
        },
        {
          style: 'table',
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 0],
          table: {
            headerRows: 1,
            dontBreakRows: true,
            margin: [5, 0, 0, 0],
            widths: [70, 120, 100, '*'],
            body: [
              [
                {
                  text: 'Cv Code',
                  lineHeight: 1,
                  bold: true,
                  alignment: 'left',
                },
                {
                  text: 'Job Title',
                  lineHeight: 1,
                  bold: true,
                  alignment: 'left',
                },
                {
                  text: 'Experience Level',
                  lineHeight: 1,
                  bold: true,
                  alignment: 'left',
                },
                {
                  text: 'Skills',
                  lineHeight: 1,
                  bold: true,
                  alignment: 'left',
                },
              ],
              ...tableRowData,
            ],
          },
        },
      ],
    };

    pdfMake.createPdf(doc).download(fileName);
  };

  const handleOnClickClearAll = async () => {
    setAllFilters([]);
    setValue('');
    setGlobalFilter(undefined);
    dispatch(fetchBlindCv());
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
            className="export-btn btn btn-primary float-right"
            onClick={handleOnClickExport}
          >
            <img src={PDFIcon} alt="PDF Icon" />
            Export PDF
          </button>
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

SampleCvDatatable.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.any,
  dispatch: PropTypes.any,
};

export default SampleCvDatatable;
