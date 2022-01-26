/**
 *
 * CandidateListSubPage
 *
 */

import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import LoadingOverlay from 'react-loading-overlay';
import DatePicker from 'react-datepicker';

import { Link } from 'react-router-dom';
import {
  Dropdown,
  Modal,
  Button,
  Tooltip,
  OverlayTrigger,
  Form,
} from 'react-bootstrap';

import makeSelectCandidateListSubPage, {
  makeSelectTableColumn,
  makeSelectTableData,
  makeSelectJobTitle,
  makeSelectModalLoading,
  makeSelectErrorMessage,
  makeSelectCandidate,
  makeSelectJobOrderId,
  makeSelectApplicationDetails,
  makeSelectCandidateSkills,
  makeSelectShowModal,
  makeSelectSavingMessage,
  makeSelectMessageModal,
  makeSelectResume,
  makeSelectCandidateId,
  makeSelectApplicationStatus,
  makeSelectOfferedSalary,
  makeSelectOfficialStartDate,
  makeSelectJobOfferModal,
  makeSelectInterviewNotes,
  makeSelectInterviewerName,
  makeSelectInterviewerPosition,
  makeSelectInterviewerEmail,
  makeSelectInterviewDate,
  makeSelectInterviewRate,
  makeSelectInterviewRemarks,
  makeSelectInterviewStatus,
  makeSelectInterviewNoteId,
  makeSelectButtonSaveInterviewNotes,
  makeSelectInterviewNotesLoading,
  makeSelectInterviewMethodRequest,
  makeSelectHmoEffectivity,
  makeSelectForInterviewModal,
  makeSelectFirstStartDate,
  makeSelectFirstEndDate,
  makeSelectSecondStartDate,
  makeSelectSecondEndDate,
  makeSelectThirdStartDate,
  makeSelectThirdEndDate,
  makeSelectForInterviewLoading,
  makeSelectUsersVacantSchedule,
  makeSelectCandidateName,
  makeSelectMyVacantSchedule,
  makeSelectVacantSchedule,
} from './selectors';

import reducer from './reducer';
import saga from './saga';

import {
  setColumnsAndData,
  requestCandidate,
  showModal,
  updateApplicationStatusRequest,
  setShowMessageModal,
  changeOfferedSalary,
  changeOfficialStartDate,
  setCandidateId,
  setShowJobOfferModal,
  requestFetchCandidates,
  changeHmoEffectivity,
  setShowForInterviewModal,
  setFirstStartDate,
  setFirstEndDate,
  setSecondStartDate,
  setSecondEndDate,
  setThirdStartDate,
  setThirdEndDate,
  clearDates,
  requestInterviewVacantScheds,
  setCandidateName,
} from './actions';
import {
  toTitleCase,
  formatISOtoLongYear,
  translateToHumanReadableFormat,
  formatStringToCurrency,
  countedShortlists,
  getToken,
} from '../App/globalHelpers';
import JobOrdersDataTable from '../../components/JobOrdersDataTable';
import CandidateModal from '../../components/CandidateModal/Loadable';
import {
  SelectColumnFilterByDate,
  SelectColumnFilterByDropdownValues,
  SortAndFilterByValue,
  FilterByValue,
  SortByAlphabet,
} from '../App/tableFilters';
import BackIcon from '../../assets/images/hub/back_icon.png';
import ViewDetailIcon from '../../assets/images/hub/recruitment/view-detail_icon.png';
import CheckIcon from '../../assets/images/hub/recruitment/check_icon.svg';
import JobOfferIcon from '../../assets/images/hub/recruitment/job_offer_icon.svg';
import ParkSign from '../../assets/images/hub/recruitment/parked_gray_sign.png';
import InterviewSign from '../../assets/images/hub/recruitment/for_interview_gray_sign.png';
import ForHireSign from '../../assets/images/hub/recruitment/for_hire_gray_sign.png';
import ForInterviewIcon from '../../assets/images/hub/recruitment/for_interview_icon.svg';
import RejectSign from '../../assets/images/hub/recruitment/reject_gray_sign.png';
import { checkValidScheduleRange, isScheduleValid } from '../App/dateHelper';
import loadingIcon from '../../assets/images/loading.svg';
const queryString = require('query-string');
export function CandidateListSubPage(props) {
  useInjectReducer({ key: 'candidateListSubPage', reducer });
  useInjectSaga({ key: 'candidateListSubPage', saga });
  /**
   *
   * if path name is for hub, use passed state, set column and data via use effect.
   * else use effect to request data to server, dispatch candidate data
   *
   */
  if (location.pathname === '/hub/candidates') {
    let data = [];
    let jobTitle = '';
    let jobOrderId = '';

    if (props.location.state) {
      data = props.location.state.candidates;
      jobTitle = props.location.state.job_title;
      jobOrderId = props.location.state.job_order_id;
    }

    const disabledStatus = [
      'HIRED',
      'RESCINDED',
      'WITHDRAWN',
      'DECLINED OFFER',
    ];

    const columns = useMemo(() => [
      {
        columns: [
          {
            Header: 'Full Name',
            accessor: originalRow =>
              toTitleCase(`${originalRow.candidate.first_name} 
            ${originalRow.candidate.middle_name} 
            ${originalRow.candidate.last_name}`),
            Filter: SortByAlphabet,
            filter: 'sortByAlphabet',
            Cell: props => (
              <span
                onClick={() =>
                  handleViewCandidateModal(props.row.original.candidate_id)
                }
                className="default-color font-medium pointer hover-underline"
              >
                {translateToHumanReadableFormat(props.cell.value)}
              </span>
            ),
          },
          {
            Header: 'Experience Level',
            accessor: originalRow =>
              translateToHumanReadableFormat(
                originalRow.candidate.experience_level,
              ),
            Filter: SelectColumnFilterByDropdownValues,
            filter: 'multipleWithSort',
            Cell: props => (
              <span>{props.cell.value ? props.cell.value : '-'}</span>
            ),
          },
          {
            Header: 'Skills',
            id: 'skills',
            accessor: originalRow => {
              const { keywordNames } = originalRow.candidate;
              let finalKeywords = '';
              for (const [key, value] of Object.entries(keywordNames)) {
                finalKeywords += `${value}, `;
              }
              // remove last 2 chars before sending
              return finalKeywords.substring(0, finalKeywords.length - 2);
            },
            Filter: FilterByValue,
          },
          {
            Header: 'Start Date',
            accessor: originalRow => originalRow.candidate.earliest_start_date,
            Cell: cell => {
              if (cell.row.original.candidate.earliest_start_date == null) {
                return '-';
              }
              return formatISOtoLongYear(
                cell.row.original.candidate.earliest_start_date,
              );
            },
            Filter: SelectColumnFilterByDate,
            filter: 'filterByDateRange',
          },
          {
            Header: 'Expected Salary',
            accessor: originalRow => originalRow.candidate.expected_salary,
            Filter: SortAndFilterByValue,
            className: 'text-right',
            filter: 'filterByValueWithSort',
            Cell: props => (
              <div className="text-right">
                <span>
                  {props.cell.value > 0 ? (
                    <span>PHP {formatStringToCurrency(props.cell.value)}</span>
                  ) : (
                    '-'
                  )}
                </span>
              </div>
            ),
          },
          {
            Header: 'Status',
            accessor: originalRow => toTitleCase(originalRow.status),
            Filter: SelectColumnFilterByDropdownValues,
            filter: 'multipleWithSort',
            Cell: props => {
              let statusName;
              if (
                props.cell.value == 'For Interview' ||
                props.cell.value == 'For-interview'
              ) {
                statusName = 'for-interview';
              } else if (props.cell.value == 'Shortlisted') {
                statusName = 'shortlisted';
              } else if (
                props.cell.value == 'Job Offer' ||
                props.cell.value == 'Job-offer'
              ) {
                statusName = 'job-offer';
              } else if (props.cell.value == 'Rejected') {
                statusName = 'rejected';
              } else if (
                props.cell.value == 'Rescind' ||
                props.cell.value == 'Rescinded'
              ) {
                statusName = 'rescinded';
              } else if (props.cell.value == 'Withdrawn') {
                statusName = 'withdrawn';
              } else if (props.cell.value == 'Declined Offer') {
                statusName = 'declined';
              } else if (props.cell.value == 'Parked') {
                statusName = 'parked';
              } else if (props.cell.value == 'Hired') {
                statusName = 'hired';
              } else if (props.cell.value == 'Active') {
                statusName = 'active';
              } else if (props.cell.value == 'Requested') {
                statusName = 'requested';
              } else if (
                props.cell.value == 'On Hold' ||
                props.cell.value == 'On-hold'
              ) {
                statusName = 'on-hold';
              } else {
                statusName = 'for-cancellation';
              }
              return (
                <div className="text-center status-name">
                  <span className={statusName}>{props.cell.value}</span>
                </div>
              );
            },
          },
          {
            id: 'action',
            Cell: cell => (
              <div className="text-right">
                <Dropdown drop="right">
                  <Dropdown.Toggle className="gear-btn">
                    <i className="fa fa-cog" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        handleViewCandidateModal(
                          cell.row.original.candidate.candidate_id,
                        )
                      }
                    >
                      <img src={ViewDetailIcon} title="" alt="view" /> View
                      Candidate
                    </Dropdown.Item>
                    <Dropdown.Divider
                      hidden={disabledStatus.includes(cell.row.original.status)}
                    />
                    {}
                    {cell.row.original.status === 'FOR INTERVIEW' ? (
                      ''
                    ) : (
                      <Dropdown.Item
                        hidden={disabledStatus.includes(
                          cell.row.original.status,
                        )}
                        onClick={() => {
                          handleClickForInterview(
                            cell.row.original.list_id,
                            cell.row.original.candidate.candidate_id,
                            `${cell.row.original.candidate.first_name} ${
                              cell.row.original.candidate.last_name
                            }`,
                          );
                        }}
                      >
                        <img
                          src={InterviewSign}
                          className="candidate-action-icon interview-sign"
                          alt="Interview Sign"
                        />
                        For Interview
                      </Dropdown.Item>
                    )}
                    {cell.row.original.status === 'PARKED' ? (
                      ''
                    ) : (
                      <Dropdown.Item
                        hidden={disabledStatus.includes(
                          cell.row.original.status,
                        )}
                        onClick={() => {
                          handleChangeCandidateStatus(
                            'PARKED',
                            cell.row.original.candidate.candidate_id,
                          );
                        }}
                      >
                        <img
                          src={ParkSign}
                          className="candidate-action-icon park-sign"
                          alt="Park Sign"
                        />
                        Park
                      </Dropdown.Item>
                    )}
                    {cell.row.original.status === 'REJECTED' ? (
                      ''
                    ) : (
                      <Dropdown.Item
                        hidden={disabledStatus.includes(
                          cell.row.original.status,
                        )}
                        onClick={() => {
                          handleChangeCandidateStatus(
                            'REJECTED',
                            cell.row.original.candidate.candidate_id,
                          );
                        }}
                      >
                        <img
                          src={RejectSign}
                          className="candidate-action-icon reject-sign"
                          alt="Reject Sign"
                        />
                        Reject
                      </Dropdown.Item>
                    )}
                    {cell.row.original.status === 'JOB-OFFER' ? (
                      ''
                    ) : (
                      <Dropdown.Item
                        hidden={disabledStatus.includes(
                          cell.row.original.status,
                        )}
                        onClick={() => {
                          handleClickForHire(
                            cell.row.original.candidate.candidate_id,
                          );
                        }}
                      >
                        <img
                          src={ForHireSign}
                          className="candidate-action-icon for-hire-sign"
                          alt="Job Offer Sign"
                        />
                        Job Offer
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ),
          },
        ],
      },
    ]);

    useEffect(() => {
      const query = props.location.state
        ? props.location.state.query
        : queryString.parse(location.search);
      if (data.length === 0 && query.job_order_id !== '') {
        props.dispatch(
          requestFetchCandidates({
            columns,
            jobOrderId: query.job_order_id,
          }),
        );
      } else {
        props.dispatch(
          setColumnsAndData({
            columns,
            data,
            jobTitle,
            jobOrderId,
          }),
        );
      }
      if (query) {
        handleViewCandidateModal(query.candidate_id);
      }
    }, []);
  }

  const handleViewCandidateModal = candidateId => {
    props.dispatch(
      requestCandidate({
        is_modal_loading: true,
        candidate_id: candidateId,
      }),
    );
  };

  const handleChangeCandidateStatus = (status, candidateId) => {
    props.dispatch(
      updateApplicationStatusRequest({
        candidate_id: candidateId,
        is_modal_loading: true,
        status,
      }),
    );
  };

  const handleClickForHire = candidateId => {
    props.dispatch(
      setCandidateId({
        candidate_id: candidateId,
      }),
    );
    props.dispatch(
      setShowJobOfferModal({
        job_offer_modal: true,
      }),
    );
    props.dispatch(
      changeOfferedSalary({
        offered_salary: 0,
      }),
    );
    props.dispatch(
      changeOfficialStartDate({
        official_start_date: new Date(),
      }),
    );
    props.dispatch(
      changeHmoEffectivity({
        hmo_effectivity: '6-MONTHS',
      }),
    );
  };

  const handleClickForInterview = (listId, candidateId, candidateFullName) => {
    props.dispatch(
      requestInterviewVacantScheds({
        list_id: listId,
      }),
    );
    props.dispatch(
      setCandidateName({
        candidate_name: candidateFullName,
      }),
    );
    props.dispatch(
      setCandidateId({
        candidate_id: candidateId,
      }),
    );
    props.dispatch(
      setShowForInterviewModal({
        for_interview_modal: true,
      }),
    );
  };

  const [offeredSalaryError, setOfferedSalaryError] = useState('');
  const [officialStartDateError, setOfficialStartDateError] = useState('');
  const [hmoEffectivityError, setHmoEffectivityError] = useState('');

  const handleOnChangeSalary = evt => {
    props.dispatch(
      changeOfferedSalary({
        offered_salary: evt.target.value,
      }),
    );

    if (evt.target.value === null || evt.target.value === '') {
      setOfferedSalaryError('Offered salary is required.');
      return true;
    }

    if (evt.target.value <= 0) {
      setOfferedSalaryError('Offered salary must be greater than 0.');
      return true;
    }

    const numberOnlyRegexp = /^\d+$/;
    if (!numberOnlyRegexp.test(evt.target.value)) {
      setOfferedSalaryError('Offered salary is invalid. (Whole Number Only)');
      return true;
    }

    setOfferedSalaryError('');
  };

  const handleOnChangeHmoEffectivity = evt => {
    props.dispatch(
      changeHmoEffectivity({
        hmo_effectivity: evt.target.value,
      }),
    );

    if (evt.target.value === null || evt.target.value === '') {
      setHmoEffectivityError('HMO Effectivity is required.');
      return true;
    }

    setHmoEffectivityError('');
  };

  const handleOnChangeStartDate = date => {
    props.dispatch(
      changeOfficialStartDate({
        official_start_date: date,
      }),
    );

    if (date === null || date === '') {
      setOfficialStartDateError('Official start date is required.');
      return true;
    }

    setOfficialStartDateError('');
  };

  const handleForJobOffer = () => {
    let errorCount = 0;

    const numberOnlyRegexp = /^\d+$/;
    if (!numberOnlyRegexp.test(props.offeredSalary)) {
      setOfferedSalaryError('Offered salary is invalid. (Whole Number Only)');
      errorCount += 1;
    }

    if (props.offeredSalary <= 0) {
      setOfferedSalaryError('Offered salary must be greater than 0.');
      errorCount += 1;
    }

    if (props.offeredSalary === null || props.offeredSalary === '') {
      setOfferedSalaryError('Offered salary is required.');
      errorCount += 1;
    }

    if (props.officialStartDate === null || props.officialStartDate === '') {
      setOfficialStartDateError('Official start date is required.');
      errorCount += 1;
    }

    if (props.hmoEffectivity === null || props.hmoEffectivity === '') {
      setHmoEffectivityError('HMO Effectivity is required.');
      errorCount += 1;
    }

    if (errorCount === 0) {
      setOfferedSalaryError('');
      setOfficialStartDateError('');
      props.dispatch(
        setShowJobOfferModal({
          job_offer_modal: false,
        }),
      );
      props.dispatch(
        updateApplicationStatusRequest({
          candidate_id: props.candidateId,
          is_modal_loading: true,
          status: 'JOB-OFFER',
        }),
      );
    }
  };

  const handleOk = () => {
    props.dispatch(setShowMessageModal({ show_modal: false }));
    props.dispatch(showModal({ modal_show: false }));
    const tempCandidates = [];

    for (let i = 0; i < props.data.length; i++) {
      tempCandidates.push(props.data[i]);
      if (props.data[i].candidate.candidate_id == props.candidateId) {
        props.data[i].status = props.status;
      }
    }
    props.dispatch(
      setShowForInterviewModal({
        for_interview_modal: false,
      }),
    );
    props.dispatch(
      setColumnsAndData({
        columns: props.columns,
        data: tempCandidates,
        jobTitle: props.jobTitle,
        jobOrderId: props.jobOrderId,
      }),
    );
  };

  const candidateCount = () => {
    const rowValue = props.data.length;
    const countedStatuses = countedShortlists();
    let candidateCount = 0;
    for (let i = 0; i < rowValue; i++) {
      const str = props.data[i].status.toUpperCase();
      if (countedStatuses.includes(str)) {
        candidateCount++;
      }
    }
    return candidateCount;
  };

  const [firstStartDateError, setFirstStartDateError] = useState('');
  const [firstEndDateError, setFirstEndDateError] = useState('');
  const handleOnChangeFirstStartDate = date => {
    props.dispatch(
      setFirstStartDate({
        start_date: date,
      }),
    );
    const setOfSchedules = [
      { start_date: props.thirdStartDate, end_date: props.thirdEndDate },
      { start_date: props.secondStartDate, end_date: props.secondEndDate },
    ];
    const isValidDateRange = checkValidScheduleRange(
      date,
      props.firstEndDate,
      setOfSchedules,
    );
    setFirstStartDateError(isValidDateRange.start);
    setFirstEndDateError(isValidDateRange.end);
  };

  const handleOnChangeFirstEndDate = date => {
    props.dispatch(
      setFirstEndDate({
        end_date: date,
      }),
    );

    const setOfSchedules = [
      { start_date: props.thirdStartDate, end_date: props.thirdEndDate },
      { start_date: props.secondStartDate, end_date: props.secondEndDate },
    ];
    const isValidDateRange = checkValidScheduleRange(
      props.firstStartDate,
      date,
      setOfSchedules,
    );

    setFirstStartDateError(isValidDateRange.start);
    setFirstEndDateError(isValidDateRange.end);
  };

  // ========== Interview Sched Second Option ==========
  const [secondStartDateError, setSecondStartDateError] = useState('');
  const [secondEndDateError, setSecondEndDateError] = useState('');
  const handleOnChangeSecondStartDate = date => {
    props.dispatch(
      setSecondStartDate({
        start_date: date,
      }),
    );

    const setOfSchedules = [
      { start_date: props.thirdStartDate, end_date: props.thirdEndDate },
      { start_date: props.firstStartDate, end_date: props.firstEndDate },
    ];
    const isValidDateRange = checkValidScheduleRange(
      date,
      props.secondEndDate,
      setOfSchedules,
    );
    setSecondStartDateError(isValidDateRange.start);
    setSecondEndDateError(isValidDateRange.end);
  };

  const handleOnChangeSecondEndDate = date => {
    props.dispatch(
      setSecondEndDate({
        end_date: date,
      }),
    );
    const setOfSchedules = [
      { start_date: props.thirdStartDate, end_date: props.thirdEndDate },
      { start_date: props.firstStartDate, end_date: props.firstEndDate },
    ];
    const isValidDateRange = checkValidScheduleRange(
      props.secondStartDate,
      date,
      setOfSchedules,
    );
    setSecondStartDateError(isValidDateRange.start);
    setSecondEndDateError(isValidDateRange.end);
  };

  // Third Interview Option
  const [thirdStartDateError, setThirdStartDateError] = useState('');
  const [thirdEndDateError, setThirdEndDateError] = useState('');

  const handleOnChangeThirdStartDate = date => {
    props.dispatch(
      setThirdStartDate({
        start_date: date,
      }),
    );
    const setOfSchedules = [
      { start_date: props.secondStartDate, end_date: props.secondEndDate },
      { start_date: props.firstStartDate, end_date: props.firstEndDate },
    ];
    const isValidDateRange = checkValidScheduleRange(
      date,
      props.thirdEndDate,
      setOfSchedules,
    );
    setThirdStartDateError(isValidDateRange.start);
    setThirdEndDateError(isValidDateRange.end);
  };

  const handleOnChangeThirdEndDate = date => {
    props.dispatch(
      setThirdEndDate({
        end_date: date,
      }),
    );
    const setOfSchedules = [
      { start_date: props.secondStartDate, end_date: props.secondEndDate },
      { start_date: props.firstStartDate, end_date: props.firstEndDate },
    ];
    const isValidDateRange = checkValidScheduleRange(
      props.thirdStartDate,
      date,
      setOfSchedules,
    );
    setThirdStartDateError(isValidDateRange.start);
    setThirdEndDateError(isValidDateRange.end);
  };

  const onValidateForInterview = isSkipped => {
    if (!isSkipped) {
      let errorCount = 0;
      const isFirstSetSchedValid = checkValidScheduleRange(
        props.firstStartDate,
        props.firstEndDate,
        [
          { start_date: props.thirdStartDate, end_date: props.thirdEndDate },
          { start_date: props.secondStartDate, end_date: props.secondEndDate },
        ],
      );
  
      const isSecondSetSchedValid = checkValidScheduleRange(
        props.secondStartDate,
        props.secondEndDate,
        [
          { start_date: props.thirdStartDate, end_date: props.thirdEndDate },
          { start_date: props.firstStartDate, end_date: props.firstEndDate },
        ],
      );
  
      const isThirdSetSchedValid = checkValidScheduleRange(
        props.thirdStartDate,
        props.thirdEndDate,
        [
          { start_date: props.secondStartDate, end_date: props.secondEndDate },
          { start_date: props.firstStartDate, end_date: props.firstEndDate },
        ],
      );
  
      if (isFirstSetSchedValid.start !== '') {
        errorCount += 1;
        setFirstStartDateError(isFirstSetSchedValid.start);
      }
      if (isFirstSetSchedValid.end !== '') {
        errorCount += 1;
        setFirstEndDateError(isFirstSetSchedValid.end);
      }
      if (isSecondSetSchedValid.start !== '') {
        errorCount += 1;
        setSecondStartDateError(isSecondSetSchedValid.start);
      }
      if (isSecondSetSchedValid.end !== '') {
        errorCount += 1;
        setSecondEndDateError(isSecondSetSchedValid.end);
      }
      if (isThirdSetSchedValid.start !== '') {
        errorCount += 1;
        setThirdStartDateError(isThirdSetSchedValid.start);
      }
      if (isThirdSetSchedValid.end !== '') {
        errorCount += 1;
        setThirdEndDateError(isThirdSetSchedValid.end);
      }
  
      if (errorCount === 0) {
        props.dispatch(
          setShowForInterviewModal({
            for_interview_modal: false,
          }),
        );
        props.dispatch(
          updateApplicationStatusRequest({
            candidate_id: props.candidateId,
            is_modal_loading: true,
            status: 'FOR INTERVIEW',
          }),
        );
        setFirstStartDateError('');
        setFirstEndDateError('');
        setSecondStartDateError('');
        setSecondEndDateError('');
        setThirdStartDateError('');
        setThirdEndDateError('');
      } else {
        props.dispatch(
          setShowForInterviewModal({
            for_interview_modal: true,
          }),
        );
      }
      return;
    }
    props.dispatch(
      updateApplicationStatusRequest({
        candidate_id: props.candidateId,
        is_modal_loading: true,
        status: 'FOR INTERVIEW',
      }),
    );
    setFirstStartDateError('');
    setFirstEndDateError('');
    setSecondStartDateError('');
    setSecondEndDateError('');
    setThirdStartDateError('');
    setThirdEndDateError('');
  };

  const handleNoForInterview = () => {
    props.dispatch(
      setShowForInterviewModal({
        for_interview_modal: false,
      }),
    );
    setFirstStartDateError('');
    setFirstEndDateError('');
    setSecondStartDateError('');
    setSecondEndDateError('');
    setThirdStartDateError('');
    setThirdEndDateError('');
    props.dispatch(clearDates());
  };

  return (
    <LoadingOverlay
      active={props.isModalLoading}
      spinner
      text="Loading Candidate..."
    >
      <div className="job-requisition">
        <div className="menu-title">
          <div className="col-md-12 p-0">
            {location.pathname == '/hub/candidates' ? (
              <button className="back-btn" type="button">
                {' '}
                <Link to="/hub/job-opening">
                  <img alt="back-icon" src={BackIcon} /> Back to list of job
                  opening
                </Link>{' '}
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
        {/* @TODO optional render */}

        {/* @TODO optional render  */}
        <div className="data-table p-0">
          <div className="candidate-header p-4 d-flex">
            <span className="no-of-candidates font-semibold default-bgcolor white-color">
              {candidateCount()}
            </span>
            <span className="default-black font-medium align-self-center">
              {' '}
              {props.jobTitle
                ? `List of Available Candidates for ${props.jobTitle}`
                : 'No available candidates'}
            </span>
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="tooltip-right" className="tooltip-content">
                  We only count the{' '}
                  <strong>Shortlisted, For Interview, Parked</strong> and{' '}
                  <strong>Job Offer</strong>.
                </Tooltip>
              }
            >
              <span
                variant="secondary"
                className="icon-table icon-tooltip align-self-center ml-2"
              />
            </OverlayTrigger>
          </div>
          <div className="candidate-table">
            {props.columns.length && props.data.length ? (
              <JobOrdersDataTable
                columns={props.columns}
                data={props.data}
                is_candidate_list
              />
            ) : (
              <div className="py-5 text-center"> No available candidates.</div>
            )}
          </div>
        </div>
        <Modal
          show={props.modalShow}
          onHide={() => showModal({ modal_show: false })}
          dialogClassName="candidate-modal"
          backdrop="static"
        >
          <CandidateModal
            loading={props.isModalLoading}
            error_message={props.errorMessage}
            onHide={() => showModal({ modal_show: false })}
            candidate={props.candidate}
            skills={props.skills}
            application_details={props.applicationDetails}
            dispatch={props.dispatch}
            saving_message={props.savingMessage}
            modal_message_show={props.modalMessageShow}
            resume={props.resume}
            candidate_id={props.candidateId}
            interview_notes={props.interviewNotes}
            interviewer_name={props.interviewerName}
            interviewer_position={props.interviewerPosition}
            interviewer_email={props.interviewerEmail}
            interview_date={props.interviewDate}
            interview_rate={props.interviewRate}
            interview_remarks={props.interviewRemarks}
            interview_status={props.interviewStatus}
            interview_note_id={props.interviewNoteId}
            btn_save_disable={props.isBtnDisableSaveInterviewNotes}
            interview_notes_loading={props.interviewNotesLoading}
            interview_method={props.interviewMethod}
            offered_salary={props.offeredSalary}
            official_start_date={props.officialStartDate}
            hmo_effectivity={props.hmoEffectivity}
            users_vacant_sched={props.usersVacantSchedule}
            candidate_name={props.candidateName}
            my_vacant_sched={props.myVacantSched}
            vacant_schedule={props.vacantSched}
            // refresh related props
            job_title={props.jobTitle}
            all_candidates={props.data}
            selected_candidate={props.candidateId}
            columns={props.columns}
          />
        </Modal>
      </div>
      <Modal
        show={props.modalMessageShow}
        backdrop="static"
        onHide={() => {
          props.dispatch(setShowMessageModal({ show_modal: false }));
        }}
        className="save-modal success"
        size="md"
        centered
      >
        <Modal.Body>
          <img
            src={CheckIcon}
            title="Check Icon"
            className="d-block mx-auto mb-4"
            alt=""
          />
          <h4>{props.savingMessage}</h4>
          <div className="modal-btn pt-3 mt-3">
            <Button variant="primary" className="yes" onClick={handleOk}>
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Job Offer Modal */}
      <Modal
        show={props.showJobOfferModal}
        backdrop="static"
        onHide={() => {
          props.dispatch(
            setShowJobOfferModal({
              job_offer_modal: false,
            }),
          );
        }}
        className="blue-scheme-modal job-offer-modal"
        size="md"
        centered
      >
        <Modal.Body className="p-3">
          <img
            src={JobOfferIcon}
            title="Job Offer Icon"
            className="d-block mx-aut mb-4"
            alt=""
          />
          <div className="px-4">
            <h6 className="default-color font-medium mb-3">
              Are you sure you want to offer the job position?
            </h6>
            <p className="default-color">
              If <span className="font-semibold">YES</span>, please fill up the
              required details and click{' '}
              <span className="font-semibold">Yes</span> button. If{' '}
              <span className="font-semibold">NO</span>, click the button “
              <span className="font-semibold">No</span>” if you do not wish to
              proceed with the job offer.
            </p>
          </div>
          <div className="col-md-10 offset-md-1">
            <Form.Group className="px-3">
              <label className="d-block font-medium text-left font-size-14">
                Official Start Date <span className="text-danger">*</span>
              </label>
              <DatePicker
                selected={props.officialStartDate}
                placeholderText="Select an official start date"
                dateFormat="dd-MMM-yyyy"
                className="input form-control w-100"
                minDate={new Date()}
                onChange={handleOnChangeStartDate}
              />
              <p className="text-danger">{officialStartDateError}</p>
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="mb-0 px-3"
            >
              <label className="d-block font-medium text-left font-size-14">
                Offered Salary <span className="text-danger">*</span>
              </label>
              <div className="col-sm-12">
                <div className="row">
                  <span className="white-color default-bgcolor php">PHP</span>
                  <Form.Control
                    className="w-75"
                    type="number"
                    rows="4"
                    placeholder="Offered Salary"
                    value={props.offeredSalary}
                    onChange={handleOnChangeSalary}
                    onBlur={handleOnChangeSalary}
                  />
                </div>
              </div>
              <p className="text-danger">{offeredSalaryError}</p>
            </Form.Group>
            <Form.Group className="px-3">
              <label className="d-block font-medium text-left font-size-14">
                Effectivity of HMO <span className="text-danger">*</span>
              </label>
              <select
                className="form-control"
                onChange={handleOnChangeHmoEffectivity}
                value={props.hmoEffectivity}
              >
                <option value="IMMEDIATE">Immediately</option>
                <option value="3-MONTHS">3 Months after</option>
                <option value="6-MONTHS">6 Months after</option>
                <option value="NOT-APPLICABLE">Not Applicable</option>
              </select>
              <p className="text-danger">{hmoEffectivityError}</p>
            </Form.Group>
          </div>
          <div className="modal-btn py-3">
            <Button
              variant="secondary"
              className="no"
              onClick={() => {
                props.dispatch(
                  setShowJobOfferModal({
                    job_offer_modal: false,
                  }),
                );
              }}
            >
              No
            </Button>
            <Button
              variant="primary"
              className="yes"
              onClick={handleForJobOffer}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* For Interview Modal */}
      <Modal
        show={props.forInterviewModal}
        backdrop="static"
        onHide={() => {
          props.dispatch(
            setShowForInterviewModal({
              for_interview_modal: false,
            }),
          );
        }}
        className="for-interview-modal"
        centered
      >
        <Modal.Body className="p-3">
          {props.forInterviewLoading ? (
            <div>
              <img
                src={loadingIcon}
                alt="We are loading"
                className="mx-auto d-flex align-self-center"
              />
            </div>
          ) : (
            <div className="col-lg-12">
              <div className="row">
                <div className="col-sm-5 text-center">
                  <div className="main-content">
                    <img
                      src={ForInterviewIcon}
                      title="For Interview Icon"
                      className="d-block mx-auto mb-4"
                      alt=""
                    />
                    <div className="px-4">
                      <p className="default-color font-size-14 font-medium mb-3 line-height-25 px-3">
                        You’ve set {props.candidateName} for an interview.
                      </p>
                      <p className="default-color mt-2 font-size-12 line-height-25">
                        Kindly provide the 3 required vacant schedule and click{' '}
                        <span className="font-semibold">“Yes”</span> button if
                        you want to proceed <br />
                        the scheduling.{' '}
                        <div className="d-block">
                          Click the button{' '}
                          <span className="font-semibold">“No”</span> if you do
                          not wish to proceed with the scheduling.
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7 text-left">
                  <h5 className="default-black font-medium mb-4">
                    Vacant Schedules
                  </h5>
                  <Form.Group className="flex">
                    <label className="d-block mb-0 font-medium text-left font-size-14 default-black">
                      Interview Date Option 1{' '}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="flex">
                      <div className="inline first-date">
                        <DatePicker
                          selected={props.firstStartDate}
                          onChange={date => {
                            handleOnChangeFirstStartDate(date);
                          }}
                          minDate={new Date()}
                          showTimeSelect
                          todayButton="Today"
                          timeIntervals={15}
                          selectsStart
                          startDate={props.firstStartDate}
                          endDate={props.firstEndDate}
                          dateFormat="dd-MMM-yyyy h:mm aa"
                        />
                      </div>
                      <span className="to">to</span>
                      <div className="inline">
                        <DatePicker
                          selected={props.firstEndDate}
                          onChange={date => {
                            handleOnChangeFirstEndDate(date);
                          }}
                          minDate={props.firstStartDate}
                          showTimeSelect
                          todayButton="Today"
                          timeIntervals={15}
                          selectsEnd
                          startDate={props.firstStartDate}
                          endDate={props.firstEndDate}
                          dateFormat="dd-MMM-yyyy h:mm aa"
                        />
                      </div>
                    </div>
                    <div className="d-flex position-absolute w-100">
                      <p className="text-danger w-50 font-size-12 mb-0">
                        {firstStartDateError}
                      </p>
                      <div className="error-message-spacer" />
                      <p className="text-danger w-50 font-size-12 mb-0">
                        {firstEndDateError}
                      </p>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <label className="d-block font-medium text-left font-size-14">
                      Interview Date Option 2{' '}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="inline first-date">
                      <DatePicker
                        selected={props.secondStartDate}
                        onChange={date => {
                          handleOnChangeSecondStartDate(date);
                        }}
                        minDate={new Date()}
                        showTimeSelect
                        todayButton="Today"
                        timeIntervals={15}
                        selectsStart
                        startDate={props.secondStartDate}
                        endDate={props.secondEndDate}
                        dateFormat="dd-MMM-yyyy h:mm aa"
                      />
                    </div>
                    <span className="to">to</span>
                    <div className="inline">
                      <DatePicker
                        selected={props.secondEndDate}
                        onChange={date => {
                          handleOnChangeSecondEndDate(date);
                        }}
                        minDate={props.secondStartDate}
                        showTimeSelect
                        todayButton="Today"
                        timeIntervals={15}
                        selectsEnd
                        startDate={props.secondStartDate}
                        endDate={props.secondEndDate}
                        dateFormat="dd-MMM-yyyy h:mm aa"
                      />
                    </div>
                    <div className="d-flex position-absolute w-100">
                      <p className="text-danger w-50 font-size-12 mb-0">
                        {secondStartDateError}
                      </p>
                      <div className="error-message-spacer" />
                      <p className="text-danger w-50 font-size-12 mb-0">
                        {secondEndDateError}
                      </p>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <label className="d-block font-medium text-left font-size-14">
                      Interview Date Option 3{' '}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="inline first-date">
                      <DatePicker
                        selected={props.thirdStartDate}
                        onChange={date => {
                          handleOnChangeThirdStartDate(date);
                        }}
                        minDate={new Date()}
                        showTimeSelect
                        todayButton="Today"
                        timeIntervals={15}
                        selectsStart
                        startDate={props.thirdStartDate}
                        endDate={props.thirdEndDate}
                        dateFormat="dd-MMM-yyyy h:mm aa"
                      />
                    </div>
                    <span className="to">to</span>
                    <div className="inline">
                      <DatePicker
                        selected={props.thirdEndDate}
                        onChange={date => {
                          handleOnChangeThirdEndDate(date);
                        }}
                        minDate={props.thirdStartDate}
                        showTimeSelect
                        todayButton="Today"
                        timeIntervals={15}
                        selectsEnd
                        startDate={props.thirdStartDate}
                        endDate={props.thirdEndDate}
                        dateFormat="dd-MMM-yyyy h:mm aa"
                      />
                    </div>
                    <div className="d-flex position-absolute w-100">
                      <p className="text-danger w-50 font-size-12 mb-0">
                        {thirdStartDateError}
                      </p>
                      <div className="error-message-spacer" />
                      <p className="text-danger w-50 font-size-12 mb-0">
                        {thirdEndDateError}
                      </p>
                    </div>
                  </Form.Group>
                  <div className="modal-btn float-right">
                    <Button
                      variant="secondary"
                      className="no"
                      onClick={handleNoForInterview}
                    >
                      No
                    </Button>
                    <Button
                      variant="primary"
                      className="yes mr-0"
                      onClick={() => onValidateForInterview(false)}
                    >
                      Yes
                    </Button>
                    <Button
                      variant="primary"
                      className="skip mr-0"
                      onClick={() => onValidateForInterview(true)}
                    >
                      Skip
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </LoadingOverlay>
  );
}

CandidateListSubPage.propTypes = {
  loading: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
  columns: PropTypes.any,
  data: PropTypes.any,
  jobTitle: PropTypes.string,
  isModalLoading: PropTypes.any,
  errorMessage: PropTypes.string,
  candidate: PropTypes.any,
  jobOrderId: PropTypes.any,
  candidateId: PropTypes.any,
  skills: PropTypes.any,
  applicationDetails: PropTypes.any,
  modalShow: PropTypes.any,
  savingMessage: PropTypes.any,
  modalMessageShow: PropTypes.any,
  candidateId: PropTypes.any,
  resume: PropTypes.any,
  status: PropTypes.any,
  offeredSalary: PropTypes.any,
  officialStartDate: PropTypes.any,
  showJobOfferModal: PropTypes.any,
  interviewNotes: PropTypes.any,
  interviewerName: PropTypes.any,
  interviewerPosition: PropTypes.any,
  interviewerEmail: PropTypes.any,
  interviewDate: PropTypes.any,
  interviewRate: PropTypes.any,
  interviewRemarks: PropTypes.any,
  interviewStatus: PropTypes.any,
  interviewNoteId: PropTypes.any,
  isBtnDisableSaveInterviewNotes: PropTypes.any,
  interviewNotesLoading: PropTypes.any,
  interviewMethod: PropTypes.any,
  hmoEffectivity: PropTypes.any,
  forInterviewModal: PropTypes.any,
  firstStartDate: PropTypes.any,
  firstEndDate: PropTypes.any,
  secondStartDate: PropTypes.any,
  secondEndDate: PropTypes.any,
  thirdStartDate: PropTypes.any,
  thirdEndDate: PropTypes.any,
  forInterviewLoading: PropTypes.any,
  usersVacantSchedule: PropTypes.any,
  candidateName: PropTypes.any,
  myVacantSched: PropTypes.any,
  vacantSched: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  candidateListSubPage: makeSelectCandidateListSubPage(),
  columns: makeSelectTableColumn(),
  data: makeSelectTableData(),
  jobTitle: makeSelectJobTitle(),
  isModalLoading: makeSelectModalLoading(),
  errorMessage: makeSelectErrorMessage(),
  candidate: makeSelectCandidate(),
  jobOrderId: makeSelectJobOrderId(),
  applicationDetails: makeSelectApplicationDetails(),
  skills: makeSelectCandidateSkills(),
  modalShow: makeSelectShowModal(),
  savingMessage: makeSelectSavingMessage(),
  modalMessageShow: makeSelectMessageModal(),
  resume: makeSelectResume(),
  candidateId: makeSelectCandidateId(),
  status: makeSelectApplicationStatus(),
  offeredSalary: makeSelectOfferedSalary(),
  officialStartDate: makeSelectOfficialStartDate(),
  showJobOfferModal: makeSelectJobOfferModal(),
  interviewNotes: makeSelectInterviewNotes(),
  interviewerName: makeSelectInterviewerName(),
  interviewerPosition: makeSelectInterviewerPosition(),
  interviewerEmail: makeSelectInterviewerEmail(),
  interviewDate: makeSelectInterviewDate(),
  interviewRate: makeSelectInterviewRate(),
  interviewRemarks: makeSelectInterviewRemarks(),
  interviewStatus: makeSelectInterviewStatus(),
  interviewNoteId: makeSelectInterviewNoteId(),
  isBtnDisableSaveInterviewNotes: makeSelectButtonSaveInterviewNotes(),
  interviewNotesLoading: makeSelectInterviewNotesLoading(),
  interviewMethod: makeSelectInterviewMethodRequest(),
  hmoEffectivity: makeSelectHmoEffectivity(),
  forInterviewModal: makeSelectForInterviewModal(),
  firstStartDate: makeSelectFirstStartDate(),
  firstEndDate: makeSelectFirstEndDate(),
  secondStartDate: makeSelectSecondStartDate(),
  secondEndDate: makeSelectSecondEndDate(),
  thirdStartDate: makeSelectThirdStartDate(),
  thirdEndDate: makeSelectThirdEndDate(),
  forInterviewLoading: makeSelectForInterviewLoading(),
  usersVacantSchedule: makeSelectUsersVacantSchedule(),
  candidateName: makeSelectCandidateName(),
  myVacantSched: makeSelectMyVacantSchedule(),
  vacantSched: makeSelectVacantSchedule(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CandidateListSubPage);
