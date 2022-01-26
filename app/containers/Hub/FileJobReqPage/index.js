/**
 *
 * FileJobReqPage
 *
 */

import React, { useEffect, useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';

import { useInjectReducer } from 'utils/injectReducer';
import {
  Tabs,
  Tab,
  Modal,
  Dropdown,
  Form,
  OverlayTrigger,
  Popover,
  Button,
} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import makeSelectFileJobReqPage, {
  makeSelectAllJobRequisitons,
  makeSelectClosedJobRequisitions,
  makeSelectErrorMessage,
  makeSelectLoading,
  makeSelectTableActionLoading,
  makeSelectTableActions,
  makeSelectTableActionMessage,
  makeSelectTableActionHasErrors,
  makeSelectTitle,
  makeSelectContractType,
  makeSelectStartDate,
  makeSelectImmediateSupervisor,
  makeSelectSupervisorTitle,
  makeSelectSupervisorEmail,
  makeSelectNumberRequest,
  makeSelectTitleError,
  makeSelectContractTypeError,
  makeSelectStartDateError,
  makeSelectImmediateSupervisorError,
  makeSelectSupervisorTitleError,
  makeSelectSupervisorEmailError,
  makeSelectNumberRequestError,
  makeSelectYearsOfExperience,
  makeSelectMaxSalary,
  makeSelectSkills,
  makeSelectJobCategories,
  makeSelectPreamble,
  makeSelectResponsibilities,
  makeSelectQualifications,
  makeSelectYearsOfExperienceError,
  makeSelectMaxSalaryError,
  makeSelectSkillsError,
  makeSelectJobCategoriesError,
  makeSelectPreambleError,
  makeSelectResponsibilitiesError,
  makeSelectQualificationsError,
  makeSelectCategories,
  makeSelectKeywords,
  makeSelectTemplates,
  makeSelectExam,
  makeSelectExamType,
  makeSelectExamFile,
  makeSelectExamPath,
  makeSelectExamLink,
  makeSelectRemarks,
  makeSelectExamLinkError,
  makeSelectExamFileError,
  makeSelectShowJobModal,
  makeSelectJobFormModalLoading,
  makeSelectJobFormSuccessModal,
  makeSelectJobFormSuccessMessage,
  makeSelectJobFormError,
  makeSelectJobTemplateId,
  makeSelectUserAction,
  makeSelectPreviewModal,
  makeSelectNumberOfDuplicate,
  makeSelectBlindCvs,
  makeSelectShowBlindCvModal,
  makeSelectBlindCv,
  makeSelectAllJobLoading,
  makeSelectCloseJobLoading,
  makeSelectSampleCvLoading,
} from './selectors';
import {
  makeSelectInterviewNotes,
  makeSelectInterviewerName,
  makeSelectInterviewerPosition,
  makeSelectInterviewerEmail,
  makeSelectInterviewDate,
  makeSelectInterviewRate,
  makeSelectInterviewRemarks,
  makeSelectInterviewStatus,
  makeSelectInterviewNoteId,
  makeSelectResume,
  makeSelectApplicationDetails,
  makeSelectCandidate,
  makeSelectCandidateId,
  makeSelectModalLoading,
  makeSelectShowModal,
  makeSelectCandidateSkills,
  makeSelectOfferedSalary,
  makeSelectOfficialStartDate,
  makeSelectHmoEffectivity,
  makeSelectUsersVacantSchedule,
  makeSelectCandidateName,
  makeSelectMyVacantSchedule,
  makeSelectVacantSchedule,
} from '../../CandidateListSubPage/selectors';
import JobOrdersDataTable from '../../../components/JobOrdersDataTable';
import CandidateModal from '../../../components/CandidateModal/Loadable';
import SampleCvDropdown from '../../../components/SampleCvDropdown/Loadable';
import {
  formatISOtoLongYear,
  translateToHumanReadableFormat,
  formatStringToCurrency,
  countedShortlists,
  getToken,
} from '../../App/globalHelpers';
import {
  SelectColumnFilterByDate,
  SelectColumnFilterByDropdownValues,
  SelectColumnFilterByJobCategories,
  SortAndFilterByValue,
  SortByAlphaAndFilterValue,
  FilterByValue,
  SortByCandidateCount,
} from '../../App/tableFilters';

import reducer from './reducer';
import candidateReducer from '../../CandidateListSubPage/reducer';
import saga from './saga';
import candidateSaga from '../../CandidateListSubPage/saga';
import {
  fetchAllJobRequisitions,
  fetchClosedJobRequisitions,
  modifyJobOrder,
  requestFetchKeywords,
  requestFetchJobCategories,
  requestFetchJobTemplates,
  showJobModal,
  requestFetchJob,
  requestFilterJobTemplate,
  showJobPreviewModal,
  changeUserAction,
  changeNumberDuplicate,
  requestJobDuplicate,
  fetchBlindCv,
  setBlindCv,
  showBlindCvModal,
  fetchLatestNotificationLink,
} from './actions';
import {
  setShowMessageModal,
  setCandidateId,
  setColumnsAndData,
  requestCandidate,
  showModal,
} from '../../CandidateListSubPage/actions';
import loadingIcon from '../../../assets/images/loading.svg';
import ViewDetailIcon from '../../../assets/images/hub/recruitment/view-detail_icon.png';
import CancellationIcon from '../../../assets/images/hub/recruitment/cancellation_icon.png';
import DuplicateIcon from '../../../assets/images/hub/recruitment/duplicate_icon.png';
import BlueDuplicateIcon from '../../../assets/images/hub/recruitment/blue_duplicate_icon.png';
import EditIcon from '../../../assets/images/hub/recruitment/edit_icon.png';
import OnHoldIcon from '../../../assets/images/hub/recruitment/on-hold_icon.png';
import PauseIcon from '../../../assets/images/hub/recruitment/pause_icon.svg';
import BigDuplicateIcon from '../../../assets/images/hub/recruitment/big-duplicate-icon.svg';
import QuestionMarkIcon from '../../../assets/images/hub/recruitment/question-icon.svg';
import CancelIcon from '../../../assets/images/hub/recruitment/cancel-icon.svg';
import ExpireComponent from '../../../components/ExpireComponent';
import RequestedIcon from '../../../assets/images/requested.png';
import ComingSoon from '../../../components/ComingSoon/Loadable';
import JobOpeningModal from '../../../components/JobOpeningModal/Loadable';
import PreviewJobOpeningModal from '../../../components/PreviewJobOpeningModal/Loadable';
import SampleCvDatatable from '../../../components/SampleCvDatatable/Loadable';
import SampleCvModal from '../../../components/SampleCvModal/Loadable';
import HandIcon from '../../../assets/images/hub/recruitment/hand_icon.svg';
import NoDataJobOpeningIcon from '../../../assets/images/hub/recruitment/no-data-job-opening-icon.svg';
import NoDataClosedJobOpeningIcon from '../../../assets/images/hub/recruitment/no-data-closed-job-opening-icon.png';
import env from '../../../config/env';
const queryString = require('query-string');

export function FileJobReqPage({
  dispatch,
  allJobRequisitions,
  allJobLoading,
  closedJobRequsitions,
  closeJobLoading,
  errorMessage,
  loading,
  tableActionLoading,
  tableActions,
  tableActionMessage,
  tableActionHasErrors,
  keywords,
  templates,
  categories,
  title,
  contractType,
  startDate,
  immediateSupervisor,
  supervisorTitle,
  supervisorEmail,
  numberOfRequest,
  titleError,
  contractTypeError,
  startDateError,
  immediateSupervisorError,
  supervisorTitleError,
  supervisorEmailError,
  numberOfRequestError,
  yearsOfExperience,
  maxSalary,
  skills,
  jobCategories,
  preamble,
  jobTemplateId,
  responsibilities,
  qualifications,
  yearsOfExperienceError,
  maxSalaryError,
  skillsError,
  jobCategoriesError,
  preambleError,
  responsibilitiesError,
  qualificationsError,
  exam,
  examType,
  examFile,
  examLink,
  examPb,
  examPath,
  remarks,
  examFileError,
  examLinkError,
  isShowJobModal,
  jobFormModalLoading,
  jobFormSuccessModal,
  jobFormSuccessMessage,
  jobFormError,
  userAction,
  isShowJobPreviewModal,
  allClosedExport,
  interviewNotes,
  interviewerName,
  interviewerPosition,
  interviewerEmail,
  interviewDate,
  interviewRate,
  interviewRemarks,
  interviewStatus,
  interviewNoteId,
  candidate,
  hiredCandidateId,
  applicationDetails,
  resume,
  isCandidateModalLoading,
  candidateModalShow,
  candidateSkills,
  blindCvs,
  sampleCvLoading,
  setShowBlindCvModal,
  blindCv,
  offeredSalary,
  officialStartDate,
  hmoEffectivity,
  usersVacantSchedule,
  candidateName,
  myVacantSched,
  vacantSched,
}) {
  useInjectReducer({ key: 'fileJobReqPage', reducer });
  useInjectSaga({ key: 'fileJobReqPage', saga });
  useInjectReducer({ key: 'candidateListSubPage', reducer: candidateReducer });
  useInjectSaga({ key: 'candidateListSubPage', saga: candidateSaga });

  const [defaultActiveTab, setDefaultActiveTab] = useState('job-requesitions');

  useEffect(() => {
    dispatch(fetchAllJobRequisitions());
    dispatch(fetchClosedJobRequisitions());
    dispatch(fetchBlindCv());
    // Fetch Categories and Keywords
    dispatch(requestFetchJobCategories());
    dispatch(requestFetchKeywords());
    dispatch(requestFetchJobTemplates());

    // handle notif routes
    const query = queryString.parse(location.search);
    if (Object.keys(query).length) {
      if (query.notif == 'jobOrder') {
        handleClickShowJobOpeningModal('edit', query.job_order_id);
      } else if (query.notif == 'jobOrderCandidate') {
        handleOnClickHiredCandidate(query.job_order_id, query.candidate_id);
      }
      setDefaultActiveTab(query.active_tab);
    }
  }, []);

  const jobDetails = {
    title,
    contract_type: contractType,
    start_date: startDate,
    immediate_supervisor: immediateSupervisor,
    supervisor_title: supervisorTitle,
    supervisor_email: supervisorEmail,
    number_of_request: numberOfRequest,
    title_error: titleError,
    contract_type_error: contractTypeError,
    start_date_error: startDateError,
    immediate_supervisor_error: immediateSupervisorError,
    supervisor_title_error: supervisorTitleError,
    supervisor_email_error: supervisorEmailError,
    number_of_request_error: numberOfRequestError,
    years_of_experience: yearsOfExperience,
    max_salary: maxSalary,
    skills,
    job_category: jobCategories,
    preamble,
    responsibilities,
    qualifications,
    years_of_experience_error: yearsOfExperienceError,
    max_salary_error: maxSalaryError,
    skills_error: skillsError,
    job_category_error: jobCategoriesError,
    preamble_error: preambleError,
    responsibilities_error: responsibilitiesError,
    qualifications_error: qualificationsError,
    exam,
    exam_type: examType,
    exam_file: examFile,
    exam_link: examLink,
    exam_pb: examPb,
    exam_path: examPath,
    remarks,
    exam_link_error: examLinkError,
    exam_file_error: examFileError,
    job_template_id: jobTemplateId,
  };

  // hidden columns
  const hidden = ['categories'];

  const handleClickShowJobOpeningModal = (modalAction, jobOrderId) => {
    setSelectedJobOpeningId(jobOrderId);
    dispatch(
      changeUserAction({
        user_action: modalAction,
      }),
    );
    if (modalAction === 'create') {
      dispatch(
        showJobModal({
          job_form_modal: true,
        }),
      );
      return true;
    }
    dispatch(
      requestFetchJob({
        job_id: jobOrderId,
      }),
    );
  };

  const [selectJobOrder, setSelectJobOrder] = useState(0);
  const [selectJobTitle, setSelectJobTitle] = useState('');
  const [selectedJobOpeningId, setSelectedJobOpeningId] = useState();
  const [isRedirectDataExpired, setIsRedirectDataExpired] = useState(false);
  const [isNotificationExpiredModalShown, setIsNotificationExpiredModalShown] = useState(true);

  const handleOnClickHiredCandidate = (jobOrderId, candidateId) => {
    dispatch(
      setCandidateId({
        candidate_id: candidateId,
      }),
    );
    dispatch(
      setColumnsAndData({
        jobOrderId,
        columns: [],
        data: [],
        jobTitle: '',
      }),
    );
    dispatch(
      requestCandidate({
        is_modal_loading: true,
        candidate_id: candidateId,
      }),
    );
  };

  const allJobReqColumns = useMemo(() => [
    {
      columns: [
        {
          Header: '',
          accessor: 'visibility_order',
          className: 'visibility-order',
          disableFilters: true,
          Cell: props => (
            <div>
              {props.cell.value === 1 ? (
                <OverlayTrigger
                  trigger="click"
                  rootClose
                  placement="right"
                  overlay={
                    <Popover id="popover-basic">
                      <Popover.Content>
                        <p>
                          This is already available on Penbrothers Careers Page
                        </p>
                        <div className="text-right">
                          <a
                            href={`${env.PENBROTHERS_URL()}/job_orders/jobs/?jo_code=${
                              props.row.original.job_order_code
                            }`}
                            target="_blank"
                            className="btn"
                          >
                            Go to Careers Page
                          </a>
                        </div>
                      </Popover.Content>
                    </Popover>
                  }
                >
                  <span>
                    <i className="text-success fa fa-check-circle" />
                  </span>
                </OverlayTrigger>
              ) : (
                <i className="fa fa-circle text-secondary" />
              )}
            </div>
          ),
        },
        {
          Header: 'Job Title',
          accessor: 'job_title',
          Filter: SelectColumnFilterByJobCategories,
          filter: 'multipleCategories',
          className: 'all-job-title',
          Cell: props => (
            <span
              onClick={() =>
                handleClickShowJobOpeningModal(
                  'edit',
                  props.row.original.job_order_id,
                )
              }
              className="default-color font-medium pointer hover-underline"
            >
              {translateToHumanReadableFormat(props.cell.value)}
            </span>
          ),
        },
        {
          Header: 'Experience Level',
          accessor: 'experience_level',
          Filter: SelectColumnFilterByDropdownValues,
          filter: 'multipleWithSort',
          className: 'experience-level',
          Cell: props => (
            <div className="text-left">
              <span>{translateToHumanReadableFormat(props.cell.value)}</span>
            </div>
          ),
        },
        {
          Header: 'Date Opened',
          accessor: 'createdAt',
          Filter: SelectColumnFilterByDate,
          filter: 'filterByDateRange',
          Cell: props => (
            <div className="text-left">
              <span>{formatISOtoLongYear(props.cell.value)}</span>
            </div>
          ),
        },
        {
          Header: 'Max Salary',
          accessor: 'max_salary',
          className: 'max-salary',
          Filter: SortAndFilterByValue,
          filter: 'filterByValueWithSort',
          Cell: props => (
            <div className="max-salary text-right">
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
          Header: 'Candidates',
          accessor: 'candidateShortlistsCount',
          Filter: SortByCandidateCount,
          filter: 'sortByValueCountedCandidates',
          sortable: false,
          className: 'candidates',
          Cell: tableInfo => {
            const rowValue = tableInfo.row.original.job_order_shortlists.length;
            const countedStatuses = countedShortlists();
            const [isNotif, setIsNotif] = useState(false);
            const [redirectData, setRedirectData] = useState();
        
            let candidateCount = 0;
            for (let i = 0; i < rowValue; i++) {
              const str = tableInfo.row.original.job_order_shortlists[
                i
              ].status.toUpperCase();
              if (countedStatuses.includes(str)) {
                candidateCount++;
              }
            }
            useEffect(() => {
              const queryObj = queryString.parse(location.search);
              if (Object.keys(queryObj).length) {
                switch (queryObj.notif) {
                  case 'candidate':
                    setIsNotif(true);
                    tableInfo.data.map(info => {
                      if (queryObj.job_order_id == info.job_order_id) {
                        setRedirectData({
                          pathname: `/hub/candidates`,
                          state: {
                            candidates: info.job_order_shortlists,
                            candidates_available: candidateCount,
                            job_title: info.job_title,
                            job_order_id: queryObj.job_order_id,
                            query: {
                              candidate_id: queryObj.candidate_id,
                              is_notif: true,
                            },
                          },
                        });
                      }
                    });
                    break;
                }
              }
            }, []);
            if (isNotif) {
              if(!redirectData) { setIsRedirectDataExpired(true); return null; }
              return <Redirect to={redirectData} />;
            }
            return (
              <div className="text-center">
                {rowValue ? (
                  <Link
                    className="candidate-cell"
                    to={{
                      pathname: '/hub/candidates',
                      state: {
                        candidates: tableInfo.row.original.job_order_shortlists,
                        candidates_available: candidateCount,
                        job_title: tableInfo.row.original.job_title,
                        job_order_id: tableInfo.row.original.job_order_id,
                      },
                    }}
                  >
                    {' '}
                    {candidateCount}
                  </Link>
                ) : (
                  '-'
                )}
              </div>
            );
          },
        },
        {
          Header: 'Status',
          accessor: originalRow =>
            `${originalRow.job_order_status
              .charAt(0)
              .toUpperCase()}${originalRow.job_order_status
              .slice(1)
              .toLowerCase()}`,
          Filter: SelectColumnFilterByDropdownValues,
          filter: 'multipleWithSort',
          className: 'status',
          Cell: props => {
            let statusName;
            if (props.row.original.job_order_status == 'REQUESTED') {
              statusName = 'requested';
            } else if (props.row.original.job_order_status == 'ACTIVE') {
              statusName = 'active';
            } else if (
              props.row.original.job_order_status == 'FOR-CANCELLATION' ||
              props.row.original.job_order_status == 'For-cancellation'
            ) {
              statusName = 'for-cancellation';
            } else if (props.row.original.job_order_status == 'CANCELLED') {
              statusName = 'cancelled';
            } else {
              statusName = 'on-hold';
            }
            return (
              <div className="text-center status-name">
                <span className={statusName}>
                  {props.row.original.job_order_status.charAt(0).toUpperCase()}
                  {props.row.original.job_order_status.slice(1).toLowerCase()}
                </span>
              </div>
            );
          },
        },
        {
          id: 'action',
          className: 'action-btn',
          accessor: originalRow => (
            <>
              <ActiveJobRequisitonTransactions
                dispatch={dispatch}
                jobOrderId={originalRow.job_order_id}
                jobOrderStatus={originalRow.job_order_status}
                job_opening={jobDetails}
                onView={() => {
                  handleClickShowJobOpeningModal(
                    'view',
                    originalRow.job_order_id,
                  );
                }}
                onEdit={() => {
                  handleClickShowJobOpeningModal(
                    'edit',
                    originalRow.job_order_id,
                  );
                }}
                onDuplicate={() => {
                  handleOnClickDuplicate(
                    originalRow.job_order_id,
                    originalRow.job_title,
                  );
                }}
              />
            </>
          ),

          Cell: props => (
            <div className="text-center">
              <span>{props.cell.value}</span>
            </div>
          ),
          disableFilters: true,
        },
        {
          id: 'categories',
          Header: 'cats',
          accessor: originalRow => {
            const value = Object.values(originalRow.jobCategories);
            return value;
          },
        },
      ],
    },
  ]);

  const closedJobReqColumns = useMemo(() => [
    {
      columns: [
        {
          Header: 'Job Title',
          accessor: 'job_title',
          className: 'job-title',
          Filter: SelectColumnFilterByJobCategories,
          filter: 'multipleCategories',
          Cell: props => (
            <span
              onClick={() =>
                handleClickShowJobOpeningModal(
                  'close',
                  props.row.original.job_order_id,
                )
              }
              className="default-color font-medium pointer hover-underline"
            >
              {translateToHumanReadableFormat(props.cell.value)}
            </span>
          ),
        },
        {
          Header: 'Experience Level',
          accessor: 'experience_level',
          className: 'experience-level',
          Filter: SelectColumnFilterByDropdownValues,
          filter: 'multipleWithSort',
          Cell: props => (
            <div className="text-left">
              <span>
                {props.cell.value
                  ? translateToHumanReadableFormat(props.cell.value)
                  : '-'}
              </span>
            </div>
          ),
        },
        {
          Header: 'Date Opened',
          className: 'date-opened',
          accessor: 'createdAt',
          Filter: SelectColumnFilterByDate,
          filter: 'filterByDateRange',
          Cell: props => <span> {formatISOtoLongYear(props.cell.value)}</span>,
        },
        {
          Header: 'Actual Salary',
          className: 'actual-salary',
          accessor: originalRow => {
            const candidates = originalRow.job_order_shortlists[0].candidate;
            const employees =
              originalRow.job_order_shortlists[0].candidate.employee;
            if (candidates == null || employees == null) {
              return '-';
            }
            return originalRow.job_order_shortlists[0].candidate.employee
              .current_salary;
          },
          Filter: SortAndFilterByValue,
          filter: 'filterByValueWithSort',
          Cell: props => (
            <div className="text-right">
              <span>
                {props.cell.value > 0 ? (
                  <span className="pr-1">
                    PHP {formatStringToCurrency(props.cell.value)}
                  </span>
                ) : (
                  '-'
                )}
              </span>
            </div>
          ),
        },
        {
          Header: 'Candidate',
          className: 'hired-candidate',
          accessor: originalRow => `${
            originalRow.job_order_shortlists[0].candidate.first_name
          } 
            ${originalRow.job_order_shortlists[0].candidate.middle_name} ${
            originalRow.job_order_shortlists[0].candidate.last_name
          }`,
          disableFilters: true,
          Cell: props => (
            <span
              className="default-color font-medium pointer hover-underline"
              onClick={() => {
                handleOnClickHiredCandidate(
                  props.row.original.job_order_id,
                  props.row.original.job_order_shortlists[0].candidate_id,
                );
              }}
            >
              {translateToHumanReadableFormat(props.cell.value)}
            </span>
          ),
        },
        {
          Header: 'Status',
          className: 'status',
          accessor: originalRow =>
            `${originalRow.job_order_shortlists[0].status
              .charAt(0)
              .toUpperCase()}${originalRow.job_order_shortlists[0].status
              .slice(1)
              .toLowerCase()}`,
          Filter: SelectColumnFilterByDropdownValues,
          filter: 'multipleWithSort',
          Cell: props => (
            <span className="default-color font-medium">
              {props.row.original.job_order_shortlists[0].status === 'HIRED' ? (
                <div className="text-center status-name">
                  <span className="hired default-color">Hired</span>
                </div>
              ) : (
                <div className="text-center status-name">
                  <span className="on-hold">Rescinded</span>
                </div>
              )}
            </span>
          ),
        },
        {
          Header: '',
          className: '',
          accessor: 'job_order_id',
          Cell: props => (
            <div className="text-right">
              <button
                type="button"
                className="gear-btn btn btn-primary duplicate-icon"
                title="Duplicate Job Requisition"
                onClick={() => {
                  handleOnClickDuplicate(
                    props.cell.value,
                    props.row.original.job_title,
                  );
                }}
              >
                <img
                  src={BlueDuplicateIcon}
                  title="Blue Duplicate Icon"
                  alt="duplicate"
                  className="blue-duplicate-icon"
                />{' '}
              </button>
            </div>
          ),
          disableFilters: true,
        },
        {
          id: 'categories',
          Header: 'cats',
          accessor: originalRow => {
            const value = Object.values(originalRow.jobCategories);
            return value;
          },
        },
      ],
    },
  ]);

  const handleOnClickViewSampleCv = sampleCv => {
    dispatch(setBlindCv(sampleCv));
    dispatch(
      showBlindCvModal({
        blind_cv_modal: true,
      }),
    );
  };

  const blindCvColumn = useMemo(() => [
    {
      columns: [
        {
          Header: 'CV Code',
          accessor: 'cv_code',
          className: 'cv-code',
          Cell: props => (
            <span
              onClick={() => handleOnClickViewSampleCv(props.cell.row.original)}
              className="default-color font-medium pointer hover-underline"
            >
              {props.cell.value}
            </span>
          ),
        },
        {
          Header: 'Job Title',
          accessor: 'job_title',
          Filter: SortByAlphaAndFilterValue,
          filter: 'filterTextWithSort',
          className: 'cv-job-title',
          Cell: props => (
            <span
              onClick={() => handleOnClickViewSampleCv(props.cell.row.original)}
              className="default-color font-medium pointer hover-underline"
            >
              {props.cell.value}
            </span>
          ),
        },
        {
          Header: 'Experience Level',
          accessor: 'experience_level',
          className: 'cv-experience-level',
          Filter: SelectColumnFilterByDropdownValues,
          filter: 'multipleWithSort',
          Cell: props => (
            <div className="text-left">
              <span>
                {props.cell.value
                  ? translateToHumanReadableFormat(props.cell.value)
                  : '-'}
              </span>
            </div>
          ),
        },
        {
          Header: 'Skills',
          id: 'skills',
          accessor: originalRow => {
            const { keywords } = originalRow;
            let finalKeywords = '';
            for (const [key, value] of Object.entries(keywords)) {
              finalKeywords += `${value}, `;
            }
            // remove last 2 chars before sending
            return finalKeywords.substring(0, finalKeywords.length - 2);
          },
          Filter: FilterByValue,
          filter: 'filterTexCommaSeparated',
        },
        {
          Header: '',
          className: 'action',
          accessor: 'blind_cv_id',
          right: true,
          Cell: props => (
            <SampleCvDropdown
              dispatch={dispatch}
              sample_cv={props.cell.row.original}
            />
          ),
          disableFilters: true,
        },
      ],
    },
  ]);

  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

  const handleOnClickDuplicate = (jobOrderId, jobTitle) => {
    setSelectJobOrder(jobOrderId);
    setSelectJobTitle(jobTitle);
    setShowDuplicateModal(true);
  };

  const [successModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleConfirmDuplicate = () => {
    setShowDuplicateModal(false);
    dispatch(
      requestJobDuplicate({
        job_id: selectJobOrder,
      }),
    );
    setSuccessMessage(`You’ve successfully duplicated ${selectJobTitle} Job`);
    setShowSuccessModal(true);
  };

  return (
    <>
      <div className="job-requisition">
        <div className="menu-title">
          <div className="col-md-12 p-0 d-inline-block">
            <h2 className="header-fontcolor">Job Openings</h2>
            <div className="create-job-btn">
              <button
                type="button"
                className="brand-button-primary font-regular"
                onClick={() => {
                  handleClickShowJobOpeningModal('create', null);
                }}
              >
                <i className="fa fa-plus" /> Create job opening
              </button>
            </div>
          </div>
        </div>
        {errorMessage === '' || errorMessage === undefined ? (
          ''
        ) : (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        {tableActionLoading && (
          <ExpireComponent>
            <div className="alert alert-warning">Please Wait...</div>
          </ExpireComponent>
        )}

        {tableActionMessage == '' ? (
          ''
        ) : tableActionHasErrors ? (
          <ExpireComponent>
            <div className="alert alert-danger"> {tableActionMessage} </div>{' '}
          </ExpireComponent>
        ) : (
          <ExpireComponent>
            <div className="alert alert-success">{tableActionMessage}</div>
          </ExpireComponent>
        )}

        <div className="data-table p-0">
          <Tabs
            activeKey={defaultActiveTab}
            id="uncontrolled-tab-example"
            onSelect={selectedTab => setDefaultActiveTab(selectedTab)}
          >
            <Tab eventKey="job-requesitions" title="All Job Openings">
              <span className="hr-border-default" />
              {allJobLoading ? (
                <div>
                  <img
                    src={loadingIcon}
                    alt="We are loading"
                    className="mx-auto d-flex align-self-center"
                  />
                </div>
              ) : (
                <div>
                  {allJobRequisitions.length == 0 ? (
                    <div className="no-data d-flex">
                      <div className="align-self-center w-100 text-center">
                        <img
                          src={NoDataJobOpeningIcon}
                          className="mx-auto"
                          alt="No Job Opening"
                        />
                        <h3 className="font-semibold mt-3">No Data</h3>
                      </div>
                    </div>
                  ) : (
                    <JobOrdersDataTable
                      hidden={hidden}
                      columns={allJobReqColumns}
                      data={allJobRequisitions}
                      dispatch={dispatch}
                    />
                  )}
                </div>
              )}
            </Tab>
            <Tab eventKey="close-job-requisition" title="Closed Job Openings">
              {closeJobLoading ? (
                <div>
                  <img
                    src={loadingIcon}
                    alt="We are loading"
                    className="mx-auto d-flex align-self-center"
                  />
                </div>
              ) : (
                <div>
                  {closedJobRequsitions.length == 0 ? (
                    <div className="no-data d-flex">
                      <div className="align-self-center w-100 text-center">
                        <img
                          src={NoDataClosedJobOpeningIcon}
                          className="mx-auto"
                        />
                        <h3 className="font-semibold mt-3">No Data</h3>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <JobOrdersDataTable
                        hidden={hidden}
                        columns={closedJobReqColumns}
                        data={closedJobRequsitions}
                        to_export={allClosedExport}
                        is_label
                        is_closed_jobs
                        dispatch={dispatch}
                      />
                    </div>
                  )}
                </div>
              )}
            </Tab>
            <Tab eventKey="sample-cv" title="Sample CV's" className="p-0">
              <span className="hr-border-default" />
              {sampleCvLoading ? (
                <div>
                  <img
                    src={loadingIcon}
                    alt="We are loading"
                    className="mx-auto d-flex align-self-center"
                  />
                </div>
              ) : (
                <div>
                  {blindCvs.length === 0 ? (
                    <div className="no-data d-flex">
                      <div className="align-self-center w-100 text-center">
                        <img src={NoDataJobOpeningIcon} className="mx-auto" />
                        <h3 className="font-semibold mt-3">No Data</h3>
                      </div>
                    </div>
                  ) : (
                    <SampleCvDatatable
                      columns={blindCvColumn}
                      data={blindCvs}
                      dispatch={dispatch}
                    />
                  )}
                </div>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
      <Modal
        show={isShowJobModal}
        onHide={() => {
          dispatch(
            showJobModal({
              job_form_modal: false,
            }),
          );
        }}
        dialogClassName="modal-90w create-job-requisition-modal"
        backdrop="static"
      >
        <JobOpeningModal
          show_modal_preview={isShowJobPreviewModal}
          method={userAction}
          dispatch={dispatch}
          onHide={() => {
            dispatch(
              showJobModal({
                job_form_modal: false,
              }),
            );
          }}
          job_details={jobDetails}
          job_order_id={selectedJobOpeningId}
          categories={categories}
          keywords={keywords}
          templates={templates}
          loading={jobFormModalLoading}
          success_modal={jobFormSuccessModal}
          success_message={jobFormSuccessMessage}
          job_form_error={jobFormError}
        />
      </Modal>
      <Modal
        show={isShowJobPreviewModal}
        onHide={() => {
          dispatch(
            showJobPreviewModal({
              job_preview_modal: false,
            }),
          );
        }}
        dialogClassName="preview-job-container-modal"
        backdrop="static"
      >
        <PreviewJobOpeningModal
          dispatch={dispatch}
          onHide={() => {
            dispatch(
              showJobPreviewModal({
                job_preview_modal: false,
              }),
            );
          }}
          job_details={jobDetails}
        />
      </Modal>
      {/* Duplicate Modal */}
      <Modal
        size="md"
        centered
        className="duplicate-job-modal"
        show={showDuplicateModal}
        onHide={() => {
          setShowDuplicateModal(false);
        }}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body className="duplicate-modal">
          <img
            src={BigDuplicateIcon}
            title="Big Duplicate Icon"
            className="d-block mx-auto mb-4"
            alt=""
          />
          <h6 className="default-color font-medium mb-3">
            Are you sure you want to duplicate your Job Requisition?
          </h6>
          <p className="default-color">
            If <span className="font-bold">YES</span>, please select the number of requests and
            click <span className="font-bold">Yes</span> button.
            <br />
            If <span className="font-bold">NO</span>, click the button “<span className="font-bold">No</span>” if
            you do not wish to proceed with duplicating.
          </p>
          <select
            className="input form-control mx-auto"
            onChange={evt => {
              dispatch(
                changeNumberDuplicate({
                  num_of_duplicate: evt.target.value,
                }),
              );
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <div className="modal-btn pt-3">
            <button
              variant="secondary"
              className="no"
              onClick={() => {
                setShowDuplicateModal(false);
              }}
            >
              No
            </button>
            <button
              variant="primary"
              className="yes"
              onClick={handleConfirmDuplicate}
            >
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Hired/Rescinded Candidate Modal */}
      <Modal
        show={candidateModalShow}
        onHide={() => {
          dispatch(showModal({ modal_show: false }));
        }}
        dialogClassName="candidate-modal"
        backdrop="static"
      >
        <CandidateModal
          loading={isCandidateModalLoading}
          dispatch={dispatch}
          onHide={() => {
            dispatch(showModal({ modal_show: false }));
          }}
          skills={candidateSkills}
          error_message=""
          application_details={applicationDetails}
          resume={resume}
          candidate={candidate}
          candidate_id={hiredCandidateId}
          interview_notes={interviewNotes}
          interviewer_name={interviewerName}
          interviewer_position={interviewerPosition}
          interviewer_email={interviewerEmail}
          interview_date={interviewDate}
          interview_rate={interviewRate}
          interview_remarks={interviewRemarks}
          interview_status={interviewStatus}
          interview_note_id={interviewNoteId}
          offered_salary={offeredSalary}
          official_start_date={officialStartDate}
          hmo_effectivity={hmoEffectivity}
          users_vacant_sched={usersVacantSchedule}
          candidate_name={candidateName}
          my_vacant_sched={myVacantSched}
          vacant_schedule={vacantSched}
        />
      </Modal>
      {/* Sample Cv Modal */}
      <Modal
        show={setShowBlindCvModal}
        onHide={() => {
          dispatch(showModal({ blind_cv_modal: false }));
        }}
        dialogClassName="sample-cv-modal"
        backdrop="static"
      >
        <SampleCvModal
          dispatch={dispatch}
          onHide={() => {
            dispatch(showModal({ modal_show: false }));
          }}
          blind_cv={blindCv}
        />
      </Modal>
      {/* Success Modal */}
      <Modal
        show={successModal}
        onHide={() => {
          setShowSuccessModal(false);
        }}
        className="save-modal"
        size="md"
        centered
      >
        <Modal.Body>
          <img
            src={HandIcon}
            title="Check Icon"
            className="d-block mx-aut mb-4"
            alt=""
          />
          <h4>{successMessage}</h4>
          <div className="modal-btn pt-5">
            <Button
              variant="primary"
              onClick={() => {
                setShowSuccessModal(false);
              }}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* modal for expired notif */}
      {isRedirectDataExpired && <Modal show={isNotificationExpiredModalShown} onHide={ () => setIsNotificationExpiredModalShown(false) }>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>The notification is expired or updated</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={ () => setIsNotificationExpiredModalShown(false) }>
            Dismiss
          </Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}

function ActiveJobRequisitonTransactions(props) {
  const [confirmationModalShow, setConfirmationModalShow] = useState(false);
  const [action, setAction] = useState();
  const [reason, setReason] = useState();
  const [isHidden, setIsHidden] = useState(false);
  const [isRequired, setIsRequired] = useState(false);

  const handleActions = () => {
    setIsRequired(false);
    switch (action) {
      case 'cancel':
        if (reason == '' || reason == undefined) {
          setIsRequired(true);
          return;
        }
        props.dispatch(
          modifyJobOrder({
            job_order_status: 'CANCELLED',
            jobOrderId: props.jobOrderId,
            reason,
          }),
        );
        break;
      case 'on-hold':
        if (reason == '' || reason == undefined) {
          setIsRequired(true);
          return;
        }
        props.dispatch(
          modifyJobOrder({
            job_order_status: 'ON-HOLD',
            jobOrderId: props.jobOrderId,
            reason,
          }),
        );
        break;
      case 'requested':
        props.dispatch(
          modifyJobOrder({
            job_order_status: 'REQUESTED',
            jobOrderId: props.jobOrderId,
            reason,
          }),
        );
        break;
      default:
        alert('coming soon');
    }
    setConfirmationModalShow(false);
  };

  /**
   * Will removed once all of the actions are now in place
   */
  const handleChange = val => {
    setAction(val);
    switch (val) {
      case 'cancel':
        setIsHidden(false);
        setConfirmationModalShow(true);
        break;
      case 'on-hold':
        setIsHidden(false);
        setConfirmationModalShow(true);
        break;
      case 'edit':
        break;
      case 'duplicate':
        break;
      case 'requested':
        setIsHidden(true);
        setConfirmationModalShow(true);
        break;
      default:
        break;
    }
  };

  const handleClassNames = action => {
    switch (action) {
      case 'on-hold': 
        return 'on-hold-modal';
      case 'cancel':
        return 'on-hold-modal cancel-modal';
      case 'requested':
        return 'requested-modal';
    }
  }

  const handleImageByClassName = action => {
    switch (action) {
      case 'on-hold': 
        return PauseIcon;
      case 'cancel':
        return CancelIcon;
      case 'requested':
        return QuestionMarkIcon;
    }
  }

  return (
    <>
      <Modal
        centered
        className={handleClassNames(action)}
        show={confirmationModalShow}
        onHide={() => setConfirmationModalShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body>
          <img
            src={handleImageByClassName(action)}
            title="Pause Icon"
            className="d-block mx-auto mb-4" 
          />
          <h6>
            {`Are you sure you want to ${action} your Job Requisition?`}{' '}
          </h6>
          <p hidden={isHidden}>
            If <span className="font-bold">YES</span>, please state the reason for on holding and click <span className="font-bold">Yes</span> button <br/>,
            If <span className="font-bold">NO</span>, click the button "<span className="font-bold">No</span>" if you do not wish to proceed <br/> with the on holding. 
          </p>
          <Form.Group
            hidden={isHidden}
            controlId="exampleForm.ControlTextarea1"
            className="mb-0"
          >
            <Form.Control
              onChange={e => setReason(e.target.value)}
              as="textarea"
              rows="4"
              style={isRequired ? { borderColor: 'red' } : {}}
              placeholder="State your reason for job requisition status change."
            />
          </Form.Group>
          <div className="modal-btn pt-4">
            <button
              variant="secondary"
              className="no"
              onClick={() => setConfirmationModalShow(false)}
            >
              No
            </button>
            <button variant="primary" onClick={handleActions} className="yes">
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <div>
        <Dropdown onSelect={handleChange} drop="right">
          <Dropdown.Toggle className="gear-btn">
            <i className="fa fa-cog" />
            <Dropdown.Menu>
              <Dropdown.Item eventKey="view" onClick={props.onView}>
                <img src={ViewDetailIcon} title="" alt="view" />Preview
              </Dropdown.Item>
              <Dropdown.Item eventKey="edit" onClick={props.onEdit}>
                <img 
                  src={EditIcon} 
                  title="Edit Icon" 
                  alt="view" />
                Edit
              </Dropdown.Item>
              <Dropdown.Divider />
              {props.jobOrderStatus === 'CANCELLED' ? (
                ''
              ) : (
                <Dropdown.Item eventKey="cancel">
                  <img
                    src={CancellationIcon}
                    title="Cancellation Icon"
                    alt="cancel"
                  />
                  Cancel
                </Dropdown.Item>
              )}
              {props.jobOrderStatus === 'ON-HOLD' ? (
                ''
              ) : (
                <Dropdown.Item eventKey="on-hold">
                  <img 
                    src={OnHoldIcon} 
                    title="On Hold Icon" 
                    alt="on-hold" /> 
                    On hold
                </Dropdown.Item>
              )}
              <Dropdown.Item eventKey="duplicate" onClick={props.onDuplicate}>
                <img
                  src={DuplicateIcon}
                  title="Duplicate Icon"
                  alt="duplicate"
                />
                Duplicate
              </Dropdown.Item>
              {props.jobOrderStatus === 'REQUESTED' ? (
                ''
              ) : (
                <Dropdown.Item eventKey="requested">
                  <img src={RequestedIcon} title="Requested" alt="requested" />
                  Requested
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown.Toggle>
        </Dropdown>
      </div>
    </>
  );
}
FileJobReqPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  activeJobRequisitions: PropTypes.any,
  closedJobRequsitions: PropTypes.any,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  tableActionLoading: PropTypes.bool,
  tableActions: PropTypes.any,
  tableActionMessage: PropTypes.string,
  tableActionHasErrors: PropTypes.bool,
  categories: PropTypes.any,
  keywords: PropTypes.any,
  templates: PropTypes.any,
  title: PropTypes.any,
  contractType: PropTypes.any,
  startDate: PropTypes.any,
  immediateSupervisor: PropTypes.any,
  supervisorTitle: PropTypes.any,
  supervisorEmail: PropTypes.any,
  numberOfRequest: PropTypes.any,
  titleError: PropTypes.any,
  contractTypeError: PropTypes.any,
  startDateError: PropTypes.any,
  immediateSupervisorError: PropTypes.any,
  supervisorTitleError: PropTypes.any,
  supervisorEmailError: PropTypes.any,
  numberOfRequestError: PropTypes.any,
  yearsOfExperience: PropTypes.any,
  maxSalary: PropTypes.any,
  skills: PropTypes.any,
  jobCategories: PropTypes.any,
  jobTemplateId: PropTypes.any,
  preamble: PropTypes.any,
  responsibilities: PropTypes.any,
  qualifications: PropTypes.any,
  yearsOfExperienceError: PropTypes.string,
  maxSalaryError: PropTypes.string,
  skillsError: PropTypes.string,
  jobCategoriesError: PropTypes.string,
  preambleError: PropTypes.string,
  responsibilitiesError: PropTypes.string,
  qualificationsError: PropTypes.string,
  exam: PropTypes.any,
  examType: PropTypes.any,
  examFile: PropTypes.any,
  examLink: PropTypes.any,
  examPb: PropTypes.any,
  examPath: PropTypes.any,
  remarks: PropTypes.any,
  examFileError: PropTypes.string,
  examLinkError: PropTypes.string,
  isShowJobModal: PropTypes.any,
  jobFormModalLoading: PropTypes.any,
  jobFormSuccessModal: PropTypes.any,
  jobFormSuccessMessage: PropTypes.string,
  jobFormError: PropTypes.any,
  userAction: PropTypes.string,
  isShowJobPreviewModal: PropTypes.bool,
  numOfDuplicate: PropTypes.any,
  interviewNotes: PropTypes.any,
  interviewerName: PropTypes.any,
  interviewerPosition: PropTypes.any,
  interviewerEmail: PropTypes.any,
  interviewDate: PropTypes.any,
  interviewRate: PropTypes.any,
  interviewRemarks: PropTypes.any,
  interviewStatus: PropTypes.any,
  interviewNoteId: PropTypes.any,
  candidateId: PropTypes.any,
  resume: PropTypes.any,
  applicationDetails: PropTypes.any,
  candidate: PropTypes.any,
  hiredCandidateId: PropTypes.any,
  isCandidateModalLoading: PropTypes.any,
  candidateModalShow: PropTypes.any,
  candidateSkills: PropTypes.any,
  blindCvs: PropTypes.any,
  setShowBlindCvModal: PropTypes.any,
  blindCv: PropTypes.any,
  allJobLoading: PropTypes.bool,
  closeJobLoading: PropTypes.bool,
  sampleCvLoading: PropTypes.bool,
  offeredSalary: PropTypes.any,
  officialStartDate: PropTypes.any,
  hmoEffectivity: PropTypes.any,
  usersVacantSchedule: PropTypes.any,
  candidateName: PropTypes.any,
  myVacantSched: PropTypes.any,
  vacantSched: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  fileJobReqPage: makeSelectFileJobReqPage(),
  allJobRequisitions: makeSelectAllJobRequisitons(),
  closedJobRequsitions: makeSelectClosedJobRequisitions(),
  errorMessage: makeSelectErrorMessage(),
  loading: makeSelectLoading(),
  tableActionLoading: makeSelectTableActionLoading(),
  tableActions: makeSelectTableActions(),
  tableActionMessage: makeSelectTableActionMessage(),
  tableActionHasErrors: makeSelectTableActionHasErrors(),
  categories: makeSelectCategories(),
  keywords: makeSelectKeywords(),
  templates: makeSelectTemplates(),
  title: makeSelectTitle(),
  contractType: makeSelectContractType(),
  startDate: makeSelectStartDate(),
  immediateSupervisor: makeSelectImmediateSupervisor(),
  supervisorTitle: makeSelectSupervisorTitle(),
  supervisorEmail: makeSelectSupervisorEmail(),
  numberOfRequest: makeSelectNumberRequest(),
  titleError: makeSelectTitleError(),
  contractTypeError: makeSelectContractTypeError(),
  startDateError: makeSelectStartDateError(),
  immediateSupervisorError: makeSelectImmediateSupervisorError(),
  supervisorTitleError: makeSelectSupervisorTitleError(),
  supervisorEmailError: makeSelectSupervisorEmailError(),
  numberOfRequestError: makeSelectNumberRequestError(),
  yearsOfExperience: makeSelectYearsOfExperience(),
  maxSalary: makeSelectMaxSalary(),
  skills: makeSelectSkills(),
  jobCategories: makeSelectJobCategories(),
  jobTemplateId: makeSelectJobTemplateId(),
  preamble: makeSelectPreamble(),
  responsibilities: makeSelectResponsibilities(),
  qualifications: makeSelectQualifications(),
  yearsOfExperienceError: makeSelectYearsOfExperienceError(),
  maxSalaryError: makeSelectMaxSalaryError(),
  skillsError: makeSelectSkillsError(),
  jobCategoriesError: makeSelectJobCategoriesError(),
  preambleError: makeSelectPreambleError(),
  responsibilitiesError: makeSelectResponsibilitiesError(),
  qualificationsError: makeSelectQualificationsError(),
  exam: makeSelectExam(),
  examType: makeSelectExamType(),
  examFile: makeSelectExamFile(),
  examLink: makeSelectExamLink(),
  examPb: makeSelectTemplates(),
  examPath: makeSelectExamPath(),
  remarks: makeSelectRemarks(),
  examFileError: makeSelectExamFileError(),
  examLinkError: makeSelectExamLinkError(),
  isShowJobModal: makeSelectShowJobModal(),
  jobFormModalLoading: makeSelectJobFormModalLoading(),
  jobFormSuccessModal: makeSelectJobFormSuccessModal(),
  jobFormSuccessMessage: makeSelectJobFormSuccessMessage(),
  jobFormError: makeSelectJobFormError(),
  userAction: makeSelectUserAction(),
  isShowJobPreviewModal: makeSelectPreviewModal(),
  numOfDuplicate: makeSelectNumberOfDuplicate(),
  interviewNotes: makeSelectInterviewNotes(),
  interviewerName: makeSelectInterviewerName(),
  interviewerPosition: makeSelectInterviewerPosition(),
  interviewerEmail: makeSelectInterviewerEmail(),
  interviewDate: makeSelectInterviewDate(),
  interviewRate: makeSelectInterviewRate(),
  interviewRemarks: makeSelectInterviewRemarks(),
  interviewStatus: makeSelectInterviewStatus(),
  interviewNoteId: makeSelectInterviewNoteId(),
  applicationDetails: makeSelectApplicationDetails(),
  hiredCandidateId: makeSelectCandidateId(),
  resume: makeSelectResume(),
  candidate: makeSelectCandidate(),
  isCandidateModalLoading: makeSelectModalLoading(),
  candidateModalShow: makeSelectShowModal(),
  candidateSkills: makeSelectCandidateSkills(),
  blindCvs: makeSelectBlindCvs(),
  setShowBlindCvModal: makeSelectShowBlindCvModal(),
  blindCv: makeSelectBlindCv(),
  allJobLoading: makeSelectAllJobLoading(),
  closeJobLoading: makeSelectCloseJobLoading(),
  sampleCvLoading: makeSelectSampleCvLoading(),
  offeredSalary: makeSelectOfferedSalary(),
  officialStartDate: makeSelectOfficialStartDate(),
  hmoEffectivity: makeSelectHmoEffectivity(),
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

export default compose(withConnect)(FileJobReqPage);
