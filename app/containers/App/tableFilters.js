import React, { useState, useRef, forwardRef } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { Dropdown, Form } from 'react-bootstrap';
import moment from 'moment';
import {
  removeItemFromArray,
  translateToHumanReadableFormat,
  countedShortlists,
} from './globalHelpers';

/**
 * Filter table by date
 */
export function SelectColumnFilterByDate({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState(null);
  const [sort, setSort] = useState();

  const handleFilterValues = (startDate, endDate) => {
    if (startDate && endDate) {
      // store into an array 0 - startdate, 1 - endDate
      const startDateEndDate = {
        startDate,
        endDate,
        type: 'filter',
      };
      setFilter(startDateEndDate);
      return true;
    }

    return false;
  };

  const handleDateSort = e => {
    const filter = {
      type: 'sort',
      value: e.target.value,
      startDate,
      endDate,
    };
    setFilter(filter);
    setSort(e.target.value);
  };

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <button
      href=""
      className="filter-btn"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <i className="fa fa-caret-down" />
    </button>
  ));

  const yearRange = () => {
    const yearRange = 15;

    const yearContainerDescending = [];
    const yearContainerAscending = [];
    for (let i = 0; i < yearRange; i++) {
      yearContainerDescending.push(moment().year() - (yearRange - i));
      yearContainerAscending.push(moment().year() + i);
    }
    return {
      yearContainerAscending,
      yearContainerDescending,
    };
  };

  const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <select
          value={month.month()}
          onChange={e => onMonthSelect(month, e.target.value)}
        >
          {moment.months().map((label, value) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={month.year()}
          onChange={e => onYearSelect(month, e.target.value)}
        >
          {yearRange().yearContainerDescending.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
          {yearRange().yearContainerAscending.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  // Render a multi-select box
  return (
    <>
      <Dropdown className="d-inline-block">
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu className="date-window">
          <Dropdown.Header> Sort By:</Dropdown.Header>
          <Dropdown.Item
            as={() => {
              const ascending = sort == 'ascending';
              const descending = sort == 'descending';
              return (
                <Form.Group className="sort-by" controlId="sort-by">
                  <Form.Check
                    checked={ascending && filterValue ? ascending : ''}
                    name="sort"
                    type="radio"
                    label="Oldest - Newest"
                    value="ascending"
                    onChange={handleDateSort}
                  />
                  <Form.Check
                    checked={descending && filterValue ? descending : ''}
                    name="sort"
                    type="radio"
                    label="Newest - Oldest"
                    value="descending"
                    onChange={handleDateSort}
                  />
                </Form.Group>
              );
            }}
          />
          <Dropdown.Divider />
          <Dropdown.Header className="mt-3"> Filter By:</Dropdown.Header>
          <Dropdown.Item
            as={() => (
              <div>
                <DateRangePicker
                  startDate={startDate} // momentPropTypes.momentObj or null,
                  startDateId="start-date" // PropTypes.string.isRequired,
                  endDate={endDate} // momentPropTypes.momentObj or null,
                  endDateId="end-date" // PropTypes.string.isRequired,
                  onDatesChange={({ startDate, endDate }) => {
                    setStartDate(startDate);
                    setEndDate(endDate);
                    handleFilterValues(startDate, endDate);
                  }} // PropTypes.func.isRequired,
                  focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={focusedInput => {
                    setFocusedInput(focusedInput);
                  }} // PropTypes.func.isRequired,
                  renderMonthElement={renderMonthElement}
                  isOutsideRange={() => false}
                  customCloseIcon={
                    <i onClick={() => setFilter()} className="fa fa-close" />
                  }
                  showClearDates
                  minimumNights={0}
                />
              </div>
            )}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

/**
 * Filter table column by value
 */
export function FilterByValue({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const count = preFilteredRows.length;
  const [value, setValue] = useState();

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <button
      href=""
      className="filter-btn"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <i className="fa fa-caret-down" />
    </button>
  ));

  const clearFilters = () => {
    setFilter('');
    setValue('');
  };

  // Render a multi-select box
  return (
    <>
      <Dropdown onSelect={evt => handleSort(evt)}>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu className="skills-window">
          <Dropdown.Header> Filter By</Dropdown.Header>
          <Dropdown.Item
            as={() => (
              <Form.Control
                autoFocus
                type="text"
                value={value && filterValue ? value : ''}
                onChange={e => {
                  setFilter(e.target.value || undefined);
                  setValue(e.target.value);
                }}
              />
            )}
          />
          <br />
          <Dropdown.Item
            as={() => (
              <button
                type="button"
                onClick={clearFilters}
                className="unstyled-button text-decoration-none default-color"
              >
                <i className="fa fa-times-circle pr-1" />
                <span className="default-color">Clear All</span>
              </button>
            )}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

/**
 * Filter by select dropwdown (global)
 */
export function SelectColumnFilterByDropdownValues({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const [filterValues, setFilterValues] = useState([]);
  const [originalFilterValue, setFilterOriginalValue] = useState(filterValue);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  const sortAlphabetically = e => {
    setFilter({
      array: filterValues,
      type: 'sort',
      sortOrder: e.target.value,
    });

    setSortOrder(e.target.value);
  };

  const handleFilterValues = e => {
    setIsAllSelected(false);
    const { value } = e.target;
    const finalArray = [...new Set(filterValues)]; // remove duplicates

    if (finalArray.includes(value)) {
      removeItemFromArray(finalArray, value);
    } else {
      finalArray.push(value);
    }
    setFilterValues(finalArray);

    if (finalArray && finalArray.length) {
      setFilter({ array: finalArray, type: 'filter' });
      return;
    }
    setFilter();
    // // //final array is not empty ? filter, else no filter
    // setFilter(finalArray && finalArray.length ? finalArray : undefined);
  };

  const selectAllHandler = () => {
    setIsAllSelected(!isAllSelected);

    if (!isAllSelected) {
      const container = [];
      preFilteredRows.forEach(row => {
        container.push(row.values[id]);
      });
      setFilter({
        array: container,
        type: 'filter',
      });
      setFilterValues(container);
      setIsAllSelected(true);
      return;
    }

    setFilter();
    setFilterValues([]);
  };

  // Render a multi-select box
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className="filter-btn" />
        <Dropdown.Menu className="small-window">
          <Dropdown.Header>Sort By:</Dropdown.Header>
          {/* sort */}
          <Dropdown.Item
            as={() => {
              const ascending = sortOrder == 'ascending';
              const descending = sortOrder == 'descending';
              return (
                <Form.Group className="sort-by" controlId="sort-by">
                  <Form.Check
                    checked={ascending && filterValue ? ascending : ''}
                    name="sort"
                    type="radio"
                    label="A - Z"
                    value="ascending"
                    onChange={sortAlphabetically}
                  />
                  <Form.Check
                    checked={descending && filterValue ? descending : ''}
                    name="sort"
                    type="radio"
                    label="Z - A"
                    value="descending"
                    onChange={sortAlphabetically}
                  />
                </Form.Group>
              );
            }}
          />
          <Dropdown.Divider />
          <Dropdown.Header className="mt-3">Filter By:</Dropdown.Header>
          <Dropdown.Item
            as={() => (
              <Form.Group controlId="select-all">
                <Form.Check
                  checked={isAllSelected && filterValue ? isAllSelected : ''}
                  type="checkbox"
                  onChange={selectAllHandler}
                  label="Select All"
                />
              </Form.Group>
            )}
          >
            {' '}
          </Dropdown.Item>
          {options.map((option, i) => (
            <Dropdown.Item
              key={i}
              eventKey={option}
              // checkbox options
              as={() => {
                // because setFilter rerenders the UI
                const checked = !!filterValues.includes(option);
                return (
                  <Form.Group controlId={i}>
                    <Form.Check
                      type="checkbox"
                      checked={checked && filterValue ? checked : ''}
                      onChange={handleFilterValues}
                      label={translateToHumanReadableFormat(option)}
                      value={option}
                    />
                  </Form.Group>
                );
              }}
            />
          ))}
          <Dropdown.Item
            as={() => (
              <button
                type="button"
                onClick={() => {
                  setIsAllSelected(false);
                  setFilter();
                  setFilterValues([]);
                }}
                className="unstyled-button text-decoration-none default-color"
              >
                <i className="fa fa-times-circle pr-1" />
                <span className="default-color">Clear All</span>
              </button>
            )}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

/**
 * Filter by job categories of job orders
 */
export function SelectColumnFilterByJobCategories({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const [filterValues, setFilterValues] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [sort, setSort] = useState();

  const options = [
    'Accounting and Finance',
    'Administration and Coordination',
    'Architecture and Engineering',
    'Customer Service',
    'Human Resources',
    'IT and Software',
    'Legal',
    'Media and Creatives',
    'Sales and Marketing',
    'Supply Chain',
    'Writing and Content',
  ]; // TODO, put to localtorage from server

  const handleFilterValues = e => {
    setIsAllSelected(false);
    const { value } = e.target;
    const finalArray = filterValues;

    if (finalArray.includes(value)) {
      removeItemFromArray(finalArray, value);
    } else {
      finalArray.push(value);
    }
    setFilterValues(finalArray);

    if (finalArray && finalArray.length) {
      setFilter({ array: finalArray, type: 'filter' });
      return;
    }
    setFilter();
  };

  const selectAllHandler = () => {
    setIsAllSelected(!isAllSelected);

    if (!isAllSelected) {
      setFilter({
        array: options,
        type: 'filter',
      });
      setFilterValues(options);
      setIsAllSelected(true);
      return;
    }

    setFilter();
    setFilterValues([]);
  };

  const handleSort = e => {
    const filter = {
      type: 'sort',
      value: e.target.value,
      array: filterValues,
    };
    setFilter(filter);
    setSort(e.target.value);
  };

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <button
      href=""
      className="filter-btn"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <i className="fa fa-caret-down" />
    </button>
  ));

  // Render a multi-select box
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu>
          <Dropdown.Header>SORT BY: </Dropdown.Header>
          <Dropdown.Item
            as={() => {
              const ascending = sort == 'ascending';
              const descending = sort == 'descending';
              return (
                <Form.Group className="sort-by" controlId="sort-by">
                  <Form.Check
                    checked={ascending && filterValue ? ascending : ''}
                    name="sort"
                    type="radio"
                    label="A - Z"
                    value="ascending"
                    onChange={handleSort}
                  />
                  <Form.Check
                    checked={descending && filterValue ? descending : ''}
                    name="sort"
                    type="radio"
                    label="Z - A"
                    value="descending"
                    onChange={handleSort}
                  />
                </Form.Group>
              );
            }}
          />
          <Dropdown.Divider />
          <Dropdown.Header className="mt-3">
            FILTER BY: (job category)
          </Dropdown.Header>
          <Dropdown.Item
            as={() => (
              <Form.Group className="col-sm-4 p-0" controlId="select-all">
                <Form.Check
                  checked={isAllSelected && filterValue ? isAllSelected : ''}
                  type="checkbox"
                  onChange={selectAllHandler}
                  label="Select All"
                />
              </Form.Group>
            )}
          />
          {options.map((option, i) => (
            <Dropdown.Item
              key={i}
              eventKey={option}
              // checkbox options
              as={() => {
                // because setFilter rerenders the UI
                const checked = !!filterValues.includes(option);
                return (
                  <Form.Group className="col-sm-4 p-0" controlId={i}>
                    <Form.Check
                      type="checkbox"
                      checked={checked && filterValue ? checked : ''}
                      onChange={handleFilterValues}
                      label={option}
                      value={option}
                    />
                  </Form.Group>
                );
              }}
            />
          ))}
          <Dropdown.Item
            as={() => (
              <button
                type="button"
                onClick={() => {
                  setIsAllSelected(false);
                  setFilter();
                  setFilterValues([]);
                }}
                className="unstyled-button text-decoration-none default-color"
              >
                <i className="fa fa-times-circle pr-1" />
                <span className="default-color">Clear All</span>
              </button>
            )}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

/**
 * Sort candidate (Ex Lowest to Highest, Highest to Lowest)
 * @param {*} param
 */
export function SortByCandidateCount({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const [sort, setSort] = useState();
  const allValues = React.useMemo(() => {
    const allValues = new Set();
    preFilteredRows.forEach(row => {
      const rowValue = row.original.job_order_shortlists.length;
      const countedStatuses = countedShortlists();
      let candidateCount = 0;
      for (let i = 0; i < rowValue; i++) {
        const str = row.original.job_order_shortlists[i].status.toUpperCase();
        if (countedStatuses.includes(str)) {
          candidateCount++;
        }
      }
      row.values.candidateAvailableCount = candidateCount;
      allValues.add(row.values[id]);
    });
    return [...allValues.values()];
  }, [id, preFilteredRows]);

  const handleSort = e => {
    setFilter(e.target.value);
    setSort(e.target.value && filterValue ? e.target.value : '');
  };

  // Render a multi-select box
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className="filter-btn">
          <Dropdown.Menu className="small-window">
            <Dropdown.Header>Sort By:</Dropdown.Header>
            <Dropdown.Item
              as={() => {
                const ascending = sort == 'ascending';
                const descending = sort == 'descending';
                return (
                  <Form.Group className="sort-by" controlId="sort-by">
                    <Form.Check
                      checked={ascending && filterValue ? ascending : ''}
                      name="sort"
                      type="radio"
                      label="Lowest - Highest"
                      value="ascending"
                      onChange={handleSort}
                      className="d-block"
                    />
                    <Form.Check
                      checked={descending && filterValue ? descending : ''}
                      name="sort"
                      type="radio"
                      label="Highest - Lowest"
                      value="descending"
                      onChange={handleSort}
                      className="d-block"
                    />
                  </Form.Group>
                );
              }}
            />
          </Dropdown.Menu>
        </Dropdown.Toggle>
      </Dropdown>
    </>
  );
}

/**
 * Sort
 * @param {*} param0
 */
export function SortByAlphabet({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const [sort, setSort] = useState();
  const allValues = React.useMemo(() => {
    const allValues = new Set();
    preFilteredRows.forEach(row => {
      allValues.add(row.values[id]);
    });
    return [...allValues.values()];
  }, [id, preFilteredRows]);

  const handleSort = e => {
    setFilter(e.target.value);
    setSort(e.target.value);
  };

  // Render a multi-select box
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className="filter-btn">
          <Dropdown.Menu className="small-window">
            <Dropdown.Header>Sort By</Dropdown.Header>
            <Dropdown.Item
              as={() => {
                const ascending = sort == 'ascending';
                const descending = sort == 'descending';
                return (
                  <Form.Group className="sort-by" controlId="sort-by">
                    <Form.Check
                      checked={ascending}
                      name="sort"
                      type="radio"
                      label="A - Z"
                      value="ascending"
                      onChange={handleSort}
                    />
                    <Form.Check
                      checked={descending}
                      name="sort"
                      type="radio"
                      label="Z - A"
                      value="descending"
                      onChange={handleSort}
                    />
                  </Form.Group>
                );
              }}
            />
          </Dropdown.Menu>
        </Dropdown.Toggle>
      </Dropdown>
    </>
  );
}

/**
 * Sort and Filter By Amount (Ex. Maximum Salary)
 * @param {*} param
 */
export function SortAndFilterByValue({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const [value, setValue] = useState('');
  const [sort, setSort] = useState('');

  const allValues = React.useMemo(() => {
    const allValues = new Set();
    preFilteredRows.forEach(row => {
      allValues.add(row.values[id]);
    });
    return [...allValues.values()];
  }, [id, preFilteredRows]);

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <button
      href=""
      className="filter-btn"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <i className="fa fa-caret-down" />
    </button>
  ));

  const handleFilter = e => {
    if (e.target.value == '') {
      setValue();
      setFilter();
      return;
    }
    setValue(e.target.value);
    const filter = {
      type: 'filter',
      value: e.target.value,
    };
    setFilter(filter);
  };

  const handleSort = e => {
    const filter = {
      type: 'sort',
      sort: e.target.value,
      value,
    };
    setFilter(filter);
    setSort(e.target.value);
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu className="small-window">
          <Dropdown.Header> Sort By:</Dropdown.Header>
          <Dropdown.Item
            as={() => {
              const ascending = sort == 'ascending';
              const descending = sort == 'descending';
              return (
                <Form.Group className="sort-by" controlId="sort-by">
                  <Form.Check
                    checked={ascending && filterValue ? ascending : ''}
                    name="sort"
                    type="radio"
                    label="Lowest - Highest"
                    value="ascending"
                    onChange={handleSort}
                  />
                  <Form.Check
                    checked={descending && filterValue ? descending : ''}
                    name="sort"
                    type="radio"
                    label="Highest - Lowest"
                    value="descending"
                    onChange={handleSort}
                  />
                </Form.Group>
              );
            }}
          />
          <Dropdown.Divider />
          <Dropdown.Header>Filter By:</Dropdown.Header>
          <span className="white-color default-bgcolor php">PHP</span>
          <Dropdown.Item
            as={() => (
              <Form.Control
                autoFocus
                type="text"
                className="salary-sort"
                value={value && filterValue ? value : ''}
                onChange={handleFilter}
              />
            )}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

/**
 * Sort by alphabet and filter text value
 */
export function SortByAlphaAndFilterValue({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const [sortOrder, setSortOrder] = useState('');
  const [filterTextValue, setFilterTextValue] = useState(undefined);

  const sortAlphabetically = evt => {
    setFilter({
      text: filterTextValue,
      type: 'sort',
      sortOrder: evt.target.value,
    });

    setSortOrder(evt.target.value);
  };

  const clearFilters = () => {
    setFilter({
      text: '',
      type: 'filter',
      sortOrder: '',
    });

    setFilterTextValue('');
    setSortOrder('');
  };

  const filterByValue = evt => {
    setFilter({
      text: filterTextValue,
      type: 'filter',
      sortOrder,
    });

    setFilterTextValue(evt.target.value);
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className="filter-btn" />
        <Dropdown.Menu className="small-window">
          <Dropdown.Header>Sort By:</Dropdown.Header>
          {/* sort */}
          <Dropdown.Item
            as={() => {
              const ascending = sortOrder === 'ascending';
              const descending = sortOrder === 'descending';
              return (
                <Form.Group className="sort-by" controlId="sort-by">
                  <Form.Check
                    checked={ascending && filterValue ? ascending : ''}
                    name="sort"
                    type="radio"
                    label="A - Z"
                    value="ascending"
                    onChange={sortAlphabetically}
                  />
                  <Form.Check
                    checked={descending && filterValue ? descending : ''}
                    name="sort"
                    type="radio"
                    label="Z - A"
                    value="descending"
                    onChange={sortAlphabetically}
                  />
                </Form.Group>
              );
            }}
          />
          <Dropdown.Divider />
          <Dropdown.Header className="mt-3">Filter By:</Dropdown.Header>
          <Dropdown.Item
            as={() => (
              <Form.Control
                autoFocus
                type="text"
                value={filterTextValue && filterValue ? filterTextValue : ''}
                onChange={filterByValue}
              />
            )}
          />
          <br />
          <Dropdown.Item
            as={() => (
              <button
                type="button"
                onClick={clearFilters}
                className="unstyled-button text-decoration-none default-color"
              >
                <i className="fa fa-times-circle pr-1" />
                <span className="default-color">Clear All</span>
              </button>
            )}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

/**
 * Sort and Filter By Amount (Ex. Verion Number)
 * @param {*} param
 */
export function NumberSortAndFilterByValue({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const [value, setValue] = useState('');
  const [sort, setSort] = useState('');

  const allValues = React.useMemo(() => {
    const allValues = new Set();
    preFilteredRows.forEach(row => {
      allValues.add(row.values[id]);
    });
    return [...allValues.values()];
  }, [id, preFilteredRows]);

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <button
      href=""
      className="filter-btn"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <i className="fa fa-caret-down" />
    </button>
  ));

  const handleFilter = e => {
    if (e.target.value == '') {
      setValue();
      setFilter();
      return;
    }
    setValue(e.target.value);
    const filter = {
      type: 'filter',
      value: e.target.value,
    };
    setFilter(filter);
  };

  const handleSort = e => {
    const filter = {
      type: 'sort',
      sort: e.target.value,
      value,
    };
    setFilter(filter);
    setSort(e.target.value);
  };

  const clearFilters = () => {
    setFilter();
    setValue();
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu className="small-window">
          <Dropdown.Header> Sort By:</Dropdown.Header>
          <Dropdown.Item
            as={() => {
              const ascending = sort == 'ascending';
              const descending = sort == 'descending';
              return (
                <Form.Group className="sort-by" controlId="sort-by">
                  <Form.Check
                    checked={ascending && filterValue ? ascending : ''}
                    name="sort"
                    type="radio"
                    label="Oldest - Newest"
                    value="ascending"
                    onChange={handleSort}
                  />
                  <Form.Check
                    checked={descending && filterValue ? descending : ''}
                    name="sort"
                    type="radio"
                    label="Newest - Oldest"
                    value="descending"
                    onChange={handleSort}
                  />
                </Form.Group>
              );
            }}
          />
          <Dropdown.Divider />
          <Dropdown.Header>Filter By:</Dropdown.Header>
          <Dropdown.Item
            as={() => (
              <Form.Control
                autoFocus
                type="text"
                className="salary-sort"
                value={value && filterValue ? value : ''}
                onChange={handleFilter}
              />
            )}
          />
          <br />
          <Dropdown.Item
            as={() => (
              <button
                type="button"
                onClick={clearFilters}
                className="unstyled-button text-decoration-none default-color"
              >
                <i className="fa fa-times-circle pr-1" />
                <span className="default-color">Clear All</span>
              </button>
            )}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
