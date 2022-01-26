/**
 *
 * CandidateModal
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import LoadingOverlay from 'react-loading-overlay';
import {
  Modal,
  Accordion,
  Card,
  Dropdown,
  Button,
  Form,
} from 'react-bootstrap';
import Slider from 'rc-slider';
import ReactHtmlParser from 'react-html-parser';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { set } from 'js-cookie';
import { delay } from 'lodash';
import {
  toTitleCase,
  getToken,
  formatISOtoLongYear,
  formatStringToCurrency,
  translateToHumanReadableFormat,
  formatDateToDayMonthNameYear,
  getUserInformation,
  translateHmoToReadableFormat,
  formatCompleteTimestamp,
  formatHtmlToEditorState,
} from '../../containers/App/globalHelpers';
import {
  showModal,
  changeCommunication,
  changeAdaptibility,
  changeDecisionMaking,
  changeOrientation,
  changeRiskTaker,
  changePlanning,
  changeProblem,
  changeDelegation,
  changeDetail,
  changeTolerance,
  changeStress,
  changeInitiative,
  changeMinimal,
  changeTeamwork,
  changeCreativity,
  changeInterpersonal,
  changeConfidence,
  changeExamStatus,
  updateCandidateRequest,
  updateApplicationStatusRequest,
  setCandidateId,
  setShowJobOfferModal,
  requestInterviewNotes,
  changeHmoEffectivity,
  changeOfferedSalary,
  changeOfficialStartDate,
  requestInterviewVacantScheds,
  setShowForInterviewModal,
  setCandidateName,
  setMyVacantSched,
  setVacantSched,
} from '../../containers/CandidateListSubPage/actions';
import CheckIcon from '../../assets/images/hub/recruitment/check_icon.svg';
import CancelIcon from '../../assets/images/hub/recruitment/cancel_icon.svg';
import ParkSign from '../../assets/images/hub/recruitment/park_hand_sign.png';
import InterviewSign from '../../assets/images/hub/recruitment/interview_sign.png';
import ForHireSign from '../../assets/images/hub/recruitment/for_hire_sign.png';
import RejectSign from '../../assets/images/hub/recruitment/reject_sign.png';
import CVIcon from '../../assets/images/hub/recruitment/cv_icon.png';
import ViewIcon from '../../assets/images/hub/recruitment/view_icon.png';
import DownloadIcon from '../../assets/images/hub/recruitment/download_icon.png';
import BackIcon from '../../assets/images/hub/back_icon.png';
import PBLogo from '../../assets/images/PB_logo.png';
import ResumeIcon from '../../assets/images/hub/recruitment/resume_icon.png';
import InterviewNotesIcon from '../../assets/images/hub/recruitment/interview_notes_icon.png';
import ExamIcon from '../../assets/images/hub/recruitment/exam_icon.png';
import ArrowSaveIcon from '../../assets/images/hub/recruitment/arrow_save_icon.svg';
import env from '../../config/env';

import InterviewNotesModal from '../InterviewNotesModal/Loadable';
import {
  checkValidScheduleRange,
  isScheduleValid,
} from '../../containers/App/dateHelper';

function CandidateModal(props) {
  const [displayOfferedSalary, setDisplayOfferedSalary] = useState('');
  const [displayOfficialStartDate, setDisplayOfficialStartDate] = useState('');
  const [displayHmoEffectivity, setDisplayHmoEffectivity] = useState('');
  const [currentVacantSched, setCurrentVacantSched] = useState([]);
  const initialEndorsementNotes = formatHtmlToEditorState(
    props.application_details.endorsement_notes !== '' &&
      props.application_details.endorsement_notes !== null
      ? props.application_details.endorsement_notes
      : '<p>-</p>',
  );
  const [endorsementNotes, setEndorsementNotes] = useState(
    initialEndorsementNotes,
  );
  const toolbarOptions = {
    options: ['inline', 'list', 'textAlign', 'remove', 'history'],
  };
  useEffect(() => {
    const userInfo = getUserInformation();
    props.dispatch(requestInterviewNotes(userInfo));
    setDisplayOfferedSalary(props.application_details.offered_salary);
    setDisplayHmoEffectivity(props.application_details.hmo_effectivity);
    if (
      props.application_details.official_start_date === null ||
      props.application_details.official_start_date === '' ||
      new Date(props.application_details.official_start_date) == 'Invalid Date'
    ) {
      setDisplayOfficialStartDate('');
    } else {
      setDisplayOfficialStartDate(
        new Date(props.application_details.official_start_date),
      );
    }
    setCurrentVacantSched(props.vacant_schedule);
  }, []);

  const token = getToken();
  const [isToggle, setIsToggle] = useState(true);
  const [isVacantToggle, setIsVacantToggle] = useState(true);
  const [isShowCancelModal, setShowCancelModal] = useState(false);
  const [isShowSaveModal, setShowSaveModal] = useState(false);
  let initialEditState = false;
  if (
    props.application_details.status === 'WITHDRAWN' ||
    props.application_details.status === 'HIRED' ||
    props.application_details.status === 'DECLINED OFFER' ||
    props.application_details.status === 'RESCINDED'
  ) {
    initialEditState = true;
  }
  const [isEditDisabled, setEditDisable] = useState(initialEditState);

  const marks = {
    0: <strong>N/A</strong>,
    20: <strong>Beginner</strong>,
    40: <strong>Trained</strong>,
    60: <strong>Competent</strong>,
    80: <strong>Proficient</strong>,
    100: {
      label: <strong>Expert</strong>,
    },
  };

  const handleClickEditJobOffer = () => {
    props.dispatch(
      changeOfferedSalary({
        offered_salary: props.application_details.offered_salary,
      }),
    );
    props.dispatch(
      changeHmoEffectivity({
        hmo_effectivity: props.application_details.hmo_effectivity,
      }),
    );
    if (
      props.application_details.official_start_date !== null &&
      props.application_details.official_start_date !== '' &&
      props.application_details.official_start_date !== undefined &&
      new Date(props.application_details.official_start_date) != 'Invalid Date'
    ) {
      props.dispatch(
        changeOfficialStartDate({
          official_start_date: new Date(
            props.application_details.official_start_date,
          ),
        }),
      );
    } else {
      props.dispatch(
        changeOfficialStartDate({
          official_start_date: '',
        }),
      );
    }
    setIsShowJobOfferDetails(true);
  };

  const handleSoftSkillToggle = () => {
    setIsToggle(!isToggle);
  };

  const handleVacantSched = () => {
    setIsVacantToggle(!isVacantToggle);
  };

  const handleOnChangeCommunication = rating => {
    props.dispatch(
      changeCommunication({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeAdaptibility = rating => {
    props.dispatch(
      changeAdaptibility({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeDecisionMaking = rating => {
    props.dispatch(
      changeDecisionMaking({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeOrientation = rating => {
    props.dispatch(
      changeOrientation({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeRisk = rating => {
    props.dispatch(
      changeRiskTaker({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangePlanning = rating => {
    props.dispatch(
      changePlanning({
        value: Number(rating),
      }),
    );
  };

  const handleOnchangeProblemSolving = rating => {
    props.dispatch(
      changeProblem({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeDelegation = rating => {
    props.dispatch(
      changeDelegation({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeDetail = rating => {
    props.dispatch(
      changeDetail({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeAmbiguity = rating => {
    props.dispatch(
      changeTolerance({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeStress = rating => {
    props.dispatch(
      changeStress({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeInitiative = rating => {
    props.dispatch(
      changeInitiative({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeMinimal = rating => {
    props.dispatch(
      changeMinimal({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeTeamwork = rating => {
    props.dispatch(
      changeTeamwork({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeCreativity = rating => {
    props.dispatch(
      changeCreativity({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeInterpersonal = rating => {
    props.dispatch(
      changeInterpersonal({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeConfidence = rating => {
    props.dispatch(
      changeConfidence({
        value: Number(rating),
      }),
    );
  };

  const handleOnChangeApplicationStatus = status => {
    props.dispatch(
      updateApplicationStatusRequest({
        is_modal_loading: true,
        status,
        candidate_id: props.candidate_id,
      }),
    );
  };

  const handleCancelConfirmed = () => {
    setShowCancelModal(false);
    props.dispatch(
      showModal({
        modal_show: false,
      }),
    );
  };

  const handleConfirmedSave = () => {
    setShowSaveModal(false);
    props.dispatch(
      updateCandidateRequest({
        is_modal_loading: true,
      }),
    );
  };

  const statusComponent = status => {
    if (status === 'FOR INTERVIEW') {
      return <div className="for-interview">For Interview</div>;
    }
    if (status === 'PARKED') {
      return <div className="parked">Parked</div>;
    }
    if (status === 'REJECTED') {
      return <div className="rejected">Rejected</div>;
    }
    if (status === 'JOB-OFFER') {
      return <div className="job-offer">Job Offer</div>;
    }
    if (status === 'HIRED') {
      return <div className="hired">Hired</div>;
    }
    if (status === 'SHORTLISTED') {
      return <div className="shortlisted">Shortlisted</div>;
    }
    if (status === 'RESCINDED') {
      return <div className="rescinded">Rescinded</div>;
    }
    if (status === 'WITHDRAWN') {
      return <div className="withdrawn">Withdrawn</div>;
    }
    if (status === 'DECLINED OFFER') {
      return <div className="declined">Declined Offer</div>;
    }
  };

  const ratingsComponent = ratings => {
    const NUM_RATINGS = 5;
    const ratingsHtml = [];
    for (let index = 0; index < NUM_RATINGS; index++) {
      ratingsHtml.push(
        <span key={`ratings-${index}`}>
          <i className={ratings > 0 ? 'fa fa-star' : 'fa fa-star-o'} />
        </span>,
      );
      ratings -= 1;
    }
    return ratingsHtml;
  };

  const handleClickForInterview = () => {
    props.dispatch(
      requestInterviewVacantScheds({
        list_id: props.application_details.list_id,
      }),
    );

    props.dispatch(
      setCandidateId({
        candidate_id: props.candidate_id,
      }),
    );
    props.dispatch(
      setShowForInterviewModal({
        for_interview_modal: true,
      }),
    );
  };

  const handleOnClickForInterview = () => {
    props.dispatch(
      requestInterviewVacantScheds({
        list_id: props.application_details.list_id,
      }),
    );
    props.dispatch(
      setCandidateName({
        candidate_name: props.candidate_name,
      }),
    );
    props.dispatch(
      setCandidateId({
        candidate_id: props.candidate_id,
      }),
    );
    props.dispatch(
      setShowForInterviewModal({
        for_interview_modal: true,
      }),
    );
  };

  const showStatusAction = status => {
    if (
      status === 'WITHDRAWN' ||
      status === 'HIRED' ||
      status === 'DECLINED OFFER' ||
      status === 'RESCINDED'
    ) {
      return '';
    }
    return (
      <Dropdown className="action-dropdown" hidden={props.error_message !== ''}>
        <Dropdown.Toggle className="gear-btn">
          <i className="fa fa-cog" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {status === 'REJECTED' ? (
            ''
          ) : (
            <Dropdown.Item
              onClick={() => {
                handleOnChangeApplicationStatus('REJECTED');
              }}
            >
              <img src={RejectSign} className="reject-sign" alt="Reject Sign" />
              Reject
            </Dropdown.Item>
          )}
          {status === 'PARKED' ? (
            ''
          ) : (
            <Dropdown.Item
              onClick={() => {
                handleOnChangeApplicationStatus('PARKED');
              }}
            >
              <img src={ParkSign} className="park-sign" alt="Park Sign" />
              Park
            </Dropdown.Item>
          )}
          {status === 'JOB-OFFER' ? (
            ''
          ) : (
            <Dropdown.Item onClick={handleClickForHire}>
              <img
                src={ForHireSign}
                className="for-hire-sign"
                alt="Job Offer Sign"
              />
              Job Offer
            </Dropdown.Item>
          )}
          {status === 'FOR INTERVIEW' ? (
            ''
          ) : (
            <Dropdown.Item onClick={handleOnClickForInterview}>
              <img
                src={InterviewSign}
                className="interview-sign"
                alt="Interview Sign"
              />
              For Interview
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
        Actions
      </Dropdown>
    );
  };

  const handleonClickResume = () => {
    if (props.resume !== '') {
      window.open(props.resume);
    }
  };

  const handleonClickExamResult = () => {
    if (
      props.application_details.exam_answer_medialink !== '' ||
      props.application_details.exam_answer_medialink === null
    ) {
      window.open(props.application_details.exam_answer_medialink);
    }
  };

  const handleClickForHire = () => {
    props.dispatch(
      setCandidateId({
        candidate_id: props.candidate_id,
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

  const [showInterviewNotesModal, setShowInterviewNotesModal] = useState(false);
  const [isShowJobOfferDetails, setIsShowJobOfferDetails] = useState(false);
  const [offeredSalaryError, setOfferedSalaryError] = useState('');
  const [officialStartDateError, setOfficialStartDateError] = useState('');
  const [hmoEffectivityError, setHmoEffectivityError] = useState('');

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

  const handleForJobOffer = () => {
    let errorCount = 0;

    const numberOnlyRegexp = /^\d+$/;
    if (!numberOnlyRegexp.test(props.offered_salary)) {
      setOfferedSalaryError('Offered salary is invalid. (Whole Number Only)');
      errorCount += 1;
    }

    if (props.offered_salary <= 0) {
      setOfferedSalaryError('Offered salary must be greater than 0.');
      errorCount += 1;
    }

    if (props.offered_salary === null || props.offered_salary === '') {
      setOfferedSalaryError('Offered salary is required.');
      errorCount += 1;
    }

    if (
      props.official_start_date === null ||
      props.official_start_date === ''
    ) {
      setOfficialStartDateError('Official start date is required.');
      errorCount += 1;
    }

    if (props.hmo_effectivity === null || props.hmo_effectivity === '') {
      setHmoEffectivityError('HMO Effectivity is required.');
      errorCount += 1;
    }

    if (errorCount === 0) {
      setOfferedSalaryError('');
      setOfficialStartDateError('');
      setIsShowJobOfferDetails(false);
      setDisplayHmoEffectivity(props.hmo_effectivity);
      setDisplayOfferedSalary(props.offered_salary);
      setDisplayOfficialStartDate(props.official_start_date);
    }
  };

  /**
   * Vacant Schedule Functions
   */
  const [isShowEditVacantSchedModal, setIsShowEditVacantSchedModal] = useState(
    false,
  );

  const handleOnEditVacantSched = () => {
    const vacantSchedule = props.my_vacant_sched.map(sched => ({
      start: sched.start === 'Skipped' || sched.start === 'Invalid date' ? new Date() : sched.start,
      end: sched.end === 'Skipped' || sched.start === 'Invalid date' ? new Date() : sched.end,
    }));

    setCurrentVacantSched(vacantSchedule);
    props.dispatch(setVacantSched({ vacant_sched: vacantSchedule }));
    setIsShowEditVacantSchedModal(true);
  };

  const [newStartDate, setNewStartDate] = useState('');
  const [newStartDateError, setNewStartDateError] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newEndDateError, setNewEndDateError] = useState('');

  const handleOnChangeNewStartDate = date => {
    setNewStartDate(date);
    const setOfScheds = props.my_vacant_sched.map(sched => ({
      start_date: sched.start,
      end_date: sched.end,
    }));

    const isStartDateValid = checkValidScheduleRange(
      date,
      newEndDate,
      setOfScheds,
    );
    setNewStartDateError(isStartDateValid.start);
    setNewEndDateError(isStartDateValid.end);
  };

  const handleOnChangeNewEndDate = date => {
    setNewEndDate(date);
    const setOfScheds = props.my_vacant_sched.map(sched => ({
      start_date: sched.start,
      end_date: sched.end,
    }));

    const isEndDateValid = checkValidScheduleRange(
      newStartDate,
      date,
      setOfScheds,
    );
    setNewStartDateError(isEndDateValid.start);
    setNewEndDateError(isEndDateValid.end);
  };

  const handleOnAddVacantSched = () => {
    const setOfScheds = props.my_vacant_sched.map(sched => ({
      start_date: sched.start,
      end_date: sched.end,
    }));

    const isNewSchedValid = checkValidScheduleRange(
      newStartDate,
      newEndDate,
      setOfScheds,
    );

    let errorCount = 0;

    if (isNewSchedValid.start !== '') {
      errorCount += 1;
      setNewStartDateError(isNewSchedValid.start);
    }

    if (isNewSchedValid.end !== '') {
      errorCount += 1;
      setNewEndDateError(isNewSchedValid.end);
    }

    if (errorCount === 0) {
      props.dispatch(
        setMyVacantSched({
          my_vacant_sched: [
            ...props.my_vacant_sched,
            {
              start: newStartDate.toString(),
              end: newEndDate.toString(),
              start_error: '',
              end_error: '',
            },
          ],
        }),
      );
      setCurrentVacantSched([
        ...currentVacantSched,
        {
          start: newStartDate.toString(),
          end: newEndDate.toString(),
          start_error: '',
          end_error: '',
        },
      ]);
      props.dispatch(
        setVacantSched({
          vacant_sched: [
            ...props.vacant_schedule,
            {
              start: newStartDate.toString(),
              end: newEndDate.toString(),
              start_error: '',
              end_error: '',
            },
          ],
        }),
      );
      setNewStartDateError('');
      setNewEndDateError('');
      setNewStartDate('');
      setNewEndDate('');
    }
  };

  const [oldValue, setOldValue] = useState('');
  const handleOnChangeCurrentStartDate = (date, keyIndex) => {
    const setOfSchedules = [];
    currentVacantSched.filter((item, index) => {
      if (keyIndex !== index) {
        setOfSchedules.push({
          start_date: item.start,
          end_date: item.end,
        });
      }
    });

    const changeSched = currentVacantSched;
    changeSched[keyIndex].start = date.toString();

    const isValidStartDate = checkValidScheduleRange(
      changeSched[keyIndex].start,
      changeSched[keyIndex].end,
      currentVacantSched,
    );
    setOldValue(currentVacantSched[keyIndex].start);
    setCurrentVacantSched(changeSched);
    changeSched[keyIndex].start_error = isValidStartDate.start;
    changeSched[keyIndex].end_error = isValidStartDate.end;
    setCurrentVacantSched(changeSched);
    props.dispatch(
      setVacantSched({
        vacant_sched: changeSched,
      }),
    );
  };

  const handleOnChangeCurrentEndDate = (date, keyIndex) => {
    const setOfSchedules = [];
    currentVacantSched.filter((item, index) => {
      if (keyIndex !== index) {
        setOfSchedules.push({
          start_date: item.start,
          end_date: item.end,
        });
      }
    });

    const changeSched = currentVacantSched;
    changeSched[keyIndex].end = date.toString();

    const isValidEndDate = checkValidScheduleRange(
      changeSched[keyIndex].start,
      changeSched[keyIndex].end,
      currentVacantSched,
    );

    setOldValue(currentVacantSched[keyIndex].end);
    setCurrentVacantSched(changeSched);
    changeSched[keyIndex].end_error = isValidEndDate.end;
    changeSched[keyIndex].start_error = isValidEndDate.start;
    setCurrentVacantSched(changeSched);
    props.dispatch(
      setVacantSched({
        vacant_sched: changeSched,
      }),
    );
  };

  const handleOnClickRemove = index => {
    const schedule = currentVacantSched.filter(
      (item, keyIndex) => keyIndex !== index,
    );
    setCurrentVacantSched(schedule);
    props.dispatch(
      setVacantSched({
        vacant_sched: schedule,
      }),
    );
  };

  const handleOnClickCancelEditVacantSched = () => {
    let isSkipped = false;

    const vacantSchedule = props.my_vacant_sched.map(sched => {

      if (sched.start === 'Skipped' || sched.end === 'Skipped') {
        isSkipped = true;
      }

      return {
        start: sched.start,
        end: sched.end,
      }
    });

    console.log(isSkipped);

    if (isSkipped) {
      return;
    }
    
    setCurrentVacantSched(vacantSchedule);
    props.dispatch(
      setVacantSched({
        vacant_sched: vacantSchedule,
      }),
    );
  };

  const handleOnClickProceed = () => {
    let errorCount = 0;
    const changeSched = currentVacantSched;
    currentVacantSched.map((schedule, keyIndex) => {
      const setOfSchedules = [];
      currentVacantSched.filter((item, index) => {
        if (keyIndex !== index) {
          setOfSchedules.push({
            start_date: item.start,
            end_date: item.end,
          });
        }
      });
      // Check if date range is valid
      const isSetSchedValid = checkValidScheduleRange(
        schedule.start,
        schedule.end,
        setOfSchedules,
      );

      if (isSetSchedValid.start !== '') {
        errorCount += 1;
      }
      if (isSetSchedValid.end !== '') {
        errorCount += 1;
      }

      setCurrentVacantSched(changeSched);
      setOldValue(currentVacantSched[keyIndex].start);
      changeSched[keyIndex].end_error = isSetSchedValid.end;
      changeSched[keyIndex].start_error = isSetSchedValid.start;
      setCurrentVacantSched(changeSched);
      props.dispatch(
        setVacantSched({
          vacant_sched: changeSched,
        }),
      );
    });

    // If there are no error proceed on saving
    if (errorCount === 0) {
      setIsShowEditVacantSchedModal(false);
      props.dispatch(
        setMyVacantSched({
          my_vacant_sched: props.vacant_schedule,
        }),
      );
    }
  };

  return (
    <>
      <LoadingOverlay
        active={props.loading}
        spinner
        text="Loading Candidate..."
      >
        <div className="dropdown-button">
          {showStatusAction(props.application_details.status)}
          <Dropdown
            className="resume-dropdown"
            hidden={props.error_message !== ''}
          >
            <Dropdown.Toggle
              className={props.resume === '' ? 'gear-btn disabled' : 'gear-btn'}
              disabled={props.resume === ''}
              onClick={handleonClickResume}
            >
              <img src={ResumeIcon} alt="Resume Icon" />
            </Dropdown.Toggle>
            CV/Resume
          </Dropdown>
          <Dropdown
            className={
              showInterviewNotesModal
                ? 'interview-dropdown active'
                : 'interview-dropdown'
            }
            hidden={props.error_message !== ''}
          >
            <Dropdown.Toggle
              className={
                showInterviewNotesModal ? 'gear-btn active' : 'gear-btn'
              }
              onClick={() => {
                setShowInterviewNotesModal(true);
              }}
            >
              <img src={InterviewNotesIcon} alt="Interview Notes Icon" />
            </Dropdown.Toggle>
            Interview Notes
          </Dropdown>
          <Dropdown
            className="exam-dropdown"
            hidden={props.error_message !== ''}
          >
            <Dropdown.Toggle
              className={
                props.application_details.exam_answer_medialink === '' ||
                props.application_details.exam_answer_medialink === null
                  ? 'gear-btn disabled'
                  : 'gear-btn'
              }
              disabled={
                props.application_details.exam_answer_medialink === '' ||
                props.application_details.exam_answer_medialink === null
              }
              onClick={handleonClickExamResult}
            >
              <img src={ExamIcon} alt="Resume Icon" />
            </Dropdown.Toggle>
            Exam
          </Dropdown>
        </div>
        <Modal.Header>
          <button
            type="button"
            className="back-btn"
            onClick={() =>
              props.dispatch(
                showModal({
                  modal_show: false,
                }),
              )
            }
          >
            <img alt="back-icon" src={BackIcon} />
            Back
          </button>
          <div className="col-sm-12 p-0">
            <img
              src={PBLogo}
              alt="Penbrothers Logo"
              title="Penbrothers"
              className="logo"
            />
            <Modal.Title className="d-inline float-right">
              {statusComponent(props.application_details.status)}
              <p className="text-center">
                {ratingsComponent(props.candidate.ratings)}
              </p>
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div
            className="pt-5 pb-3 text-center text-danger"
            hidden={props.error_message === ''}
          >
            {props.error_message}
          </div>
          {/* ==== FORMS ==== */}
          <div className="container-fluid" hidden={props.error_message !== ''}>
            <div className="px-5">
              <div className="row">
                <div className="col-sm-12">
                  <label>Hello I'm</label>
                  <p className="name">
                    {toTitleCase(`${props.candidate.first_name} 
                    ${props.candidate.middle_name} 
                    ${props.candidate.last_name}`)}
                  </p>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <label>Email Address</label>
                  <p>{props.candidate.email}</p>
                </div>
                <div className="col-sm-4">
                  <label>Mobile No. &amp; Landline No.</label>
                  <p>
                    {props.candidate.mobile_nbr === ''
                      ? 'None'
                      : props.candidate.mobile_nbr}{' '}
                    -{' '}
                    {props.candidate.landline_nbr === ''
                      ? 'None'
                      : props.candidate.landline_nbr}
                  </p>
                </div>
                <div className="col-sm-3">
                  <label>Date of Application</label>
                  <p>
                    {props.candidate.apply_date &&
                    isNaN(new Date(props.candidate.apply_date)) === false
                      ? formatDateToDayMonthNameYear(props.candidate.apply_date)
                      : '-'}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <label>Experience Level</label>
                  <p>
                    {props.candidate.experience_level
                      ? translateToHumanReadableFormat(
                          props.candidate.experience_level,
                        )
                      : '-'}
                  </p>
                </div>
                <div className="col-sm-3">
                  <label>Current Salary</label>
                  <p>
                    {props.candidate.last_salary > 0
                      ? `PHP ${formatStringToCurrency(
                          props.candidate.last_salary,
                        )}`
                      : 'Not Available'}
                  </p>
                </div>
                <div className="col-sm-3">
                  <label>Expected Salary</label>
                  <p>
                    {props.candidate.expected_salary > 0
                      ? `PHP ${formatStringToCurrency(
                          props.candidate.expected_salary,
                        )}`
                      : '-'}
                  </p>
                </div>
                <div className="col-sm-3">
                  <label>Earliest Start Date</label>
                  <p>
                    {props.candidate.earliest_start_date &&
                    isNaN(new Date(props.candidate.earliest_start_date)) ===
                      false
                      ? formatDateToDayMonthNameYear(
                          props.candidate.earliest_start_date,
                        )
                      : '-'}
                  </p>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-sm-12">
                  <label>Skills</label>
                  <ul className="d-block skills-section">
                    {props.skills.length > 0
                      ? props.skills.map(skill => (
                          <li className="mb-2" key={skill.value}>
                            <span>{skill.label}</span>
                          </li>
                        ))
                      : 'None'}
                  </ul>
                </div>
              </div>
            </div>
            <hr />
            <div className="px-5">
              <div className="form-row mb-3">
                <div className="col-sm-12">
                  <label htmlFor="view-candidate-exam-result">
                    Work Experience
                  </label>
                  <br />
                  {props.candidate.last_employer ||
                  props.candidate.last_job_role ? (
                    <div>
                      <p className="pt-3 name">
                        {props.candidate.last_employer !== ''
                          ? props.candidate.last_employer
                          : '-'}
                      </p>
                      <span className="font-weight-normal gray-color">
                        {props.candidate.last_job_role !== ''
                          ? ReactHtmlParser(
                              props.candidate.last_job_role.replace(
                                /\n/g,
                                '<br />',
                              ),
                            )
                          : '-'}
                      </span>
                    </div>
                  ) : (
                    '-'
                  )}
                </div>
              </div>
            </div>
            <hr />
            {/* ========= Vacant Schedule ======== */}
            <div className="px-5">
              <div className="row">
                <div className="col-sm-12 p-0 vacant-schedule">
                  <Accordion>
                    <Card>
                      <Card.Header>
                        <label
                          className="mb-0"
                          htmlFor="view-candidate-exam-result"
                        >
                          Vacant Schedules
                        </label>
                        <Accordion.Toggle
                          eventKey="vacant-schedule"
                          onClick={handleVacantSched}
                        >
                          <div className="head-question">
                            <span>
                              <i
                                className={
                                  isVacantToggle === true
                                    ? 'fa fa-plus'
                                    : 'fa fa-minus'
                                }
                              />
                            </span>
                          </div>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="vacant-schedule">
                        <Card.Body>
                          {/* My Vacant Sched */}
                          {(props.my_vacant_sched === undefined &&
                            props.users_vacant_sched === undefined) ||
                          (props.my_vacant_sched.length === 0 &&
                            props.users_vacant_sched.length === 0)
                            ? '-'
                            : ''}
                          {props.my_vacant_sched &&
                          props.my_vacant_sched.length > 0 ? (
                            <div>
                              <div className="users-schedule-container mb-3">
                                {props.my_vacant_sched.map(
                                  (mySchedule, keyIndex) => (
                                    <div
                                      className="schedule-container"
                                      key={keyIndex}
                                    >
                                      <p>
                                        Interview Date Option {keyIndex + 1}
                                      </p>
                                      <p>
                                        {formatCompleteTimestamp(
                                          new Date(mySchedule.start),
                                        )}{' '}
                                        to{' '}
                                        {formatCompleteTimestamp(
                                          new Date(mySchedule.end),
                                        )}
                                      </p>
                                    </div>
                                  ),
                                )}
                                <div className="users-schedule-footer d-flex">
                                  <p className="w-50 float-left align-self-center">
                                    My Vacant Schedule
                                  </p>
                                  {props.application_details.status ===
                                  'FOR INTERVIEW' ? (
                                    <div className="w-50 text-right">
                                      <button
                                        type="button"
                                        className="btn p-0 default-color"
                                        onClick={handleOnEditVacantSched}
                                      >
                                        <i className="fa fa-pencil-square-o" />
                                      </button>
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            ''
                          )}
                          {/* Other User Vacant Sched */}
                          {props.users_vacant_sched &&
                          props.users_vacant_sched.length > 0 ? (
                            <ClientVacantSchedule
                              users_vacant_sched={props.users_vacant_sched}
                              status={props.application_details.status}
                              is_owner={false}
                            />
                          ) : (
                            ''
                          )}
                          {props.application_details.status ===
                          'FOR INTERVIEW' ? (
                            <div className="vacant-schedule-date">
                              <label className="font-regular mb-3">
                                Add Vacant Schedule
                              </label>
                              <Form.Group className="flex">
                                <label className="d-block mb-0 font-medium text-left font-size-14 default-black">
                                  Interview Date
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="d-flex">
                                  <div className="inline first-date">
                                    <DatePicker
                                      selected={newStartDate}
                                      className="input form-control w-100"
                                      minDate={new Date()}
                                      showTimeSelect
                                      todayButton="Today"
                                      timeIntervals={15}
                                      selectsStart
                                      startDate={newStartDate}
                                      endDate={newEndDate}
                                      dateFormat="dd-MMM-yyyy h:mm aa"
                                      onChange={handleOnChangeNewStartDate}
                                    />
                                    <p className="text-danger">
                                      {newStartDateError}
                                    </p>
                                  </div>
                                  <span className="to">to</span>
                                  <div className="inline first-date">
                                    <DatePicker
                                      selected={newEndDate}
                                      className="input form-control w-100"
                                      minDate={new Date()}
                                      showTimeSelect
                                      todayButton="Today"
                                      timeIntervals={15}
                                      selectsStart
                                      startDate={newStartDate}
                                      endDate={newEndDate}
                                      dateFormat="dd-MMM-yyyy h:mm aa"
                                      onChange={handleOnChangeNewEndDate}
                                    />
                                    <p className="text-danger">
                                      {newEndDateError}
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn default-color shadow-none"
                                    onClick={handleOnAddVacantSched}
                                  >
                                    <i className="fa fa-plus mx-1" />
                                    Add Schedule Date
                                  </button>
                                </div>
                              </Form.Group>
                            </div>
                          ) : (
                            ''
                          )}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
            <hr />
            {/* ========= Job Offer Section ========== */}
            <div className="px-5">
              <div className="form-row mb-3">
                <div className="col-sm-12 job-offer-section">
                  <label htmlFor="view-candidate-exam-result">Job Offer</label>
                  {/* @TODO Design Implementation */}
                  <div className="d-flex">
                    <div className="pr-5">
                      <p className="font-semibold">Official Start Date</p>
                      <p className="font-regular">
                        {displayOfficialStartDate !== null &&
                        displayOfficialStartDate !== ''
                          ? formatDateToDayMonthNameYear(
                              displayOfficialStartDate,
                            )
                          : '-'}
                      </p>
                    </div>
                    <div className="pr-5">
                      <p className="font-semibold">Offered Salary</p>
                      <p className="font-regular">
                        {displayOfferedSalary !== '' &&
                        displayOfferedSalary !== undefined &&
                        displayOfferedSalary > 0
                          ? `PHP ${formatStringToCurrency(
                              displayOfferedSalary,
                            )}`
                          : '-'}
                      </p>
                    </div>
                    <div className="">
                      <p className="font-semibold">Effectivity of HMO</p>
                      <p>
                        {displayHmoEffectivity !== '' &&
                        displayHmoEffectivity !== undefined &&
                        displayHmoEffectivity !== null
                          ? translateHmoToReadableFormat(displayHmoEffectivity)
                          : '-'}
                      </p>
                    </div>
                  </div>
                  {props.application_details.status === 'JOB-OFFER' ? (
                    <div className="users-schedule-footer">
                      <button
                        type="button"
                        className="btn default-color"
                        onClick={handleClickEditJobOffer}
                      >
                        <i className="fa fa-pencil-square-o" />
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <hr />
            <div className="px-5">
              <div className="row">
                <div className="col-sm-12 p-0">
                  <Accordion defaultActiveKey="">
                    <Card>
                      <Card.Header>
                        <label>Soft Skill Assestment</label>
                        <Accordion.Toggle
                          eventKey="soft-skill"
                          onClick={handleSoftSkillToggle}
                        >
                          <div className="head-question">
                            <span>
                              <i
                                className={
                                  isToggle === true
                                    ? 'fa fa-plus'
                                    : 'fa fa-minus'
                                }
                              />
                            </span>
                          </div>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="soft-skill">
                        <Card.Body>
                          <div className="form-row">
                            <div className="col-sm-4">Communication</div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                marks={marks}
                                step={20}
                                disabled={isEditDisabled}
                                defaultValue={props.candidate.ba_communication}
                                onChange={handleOnChangeCommunication}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">Adaptability</div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                marks={marks}
                                step={20}
                                disabled={isEditDisabled}
                                defaultValue={props.candidate.ba_adaptability}
                                onChange={handleOnChangeAdaptibility}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">Decision Making</div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                marks={marks}
                                step={20}
                                disabled={isEditDisabled}
                                defaultValue={
                                  props.candidate.ba_decision_making
                                }
                                onChange={handleOnChangeDecisionMaking}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">
                              Customer/Client Orientation
                            </div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                marks={marks}
                                step={20}
                                disabled={isEditDisabled}
                                onChange={handleOnChangeOrientation}
                                defaultValue={props.candidate.ba_orientation}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">Risk Taker</div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                marks={marks}
                                step={20}
                                disabled={isEditDisabled}
                                defaultValue={props.candidate.ba_risk_taker}
                                onChange={handleOnChangeRisk}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">Planning</div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                marks={marks}
                                step={20}
                                disabled={isEditDisabled}
                                onChange={handleOnChangePlanning}
                                defaultValue={props.candidate.ba_planning}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">Problem Solving</div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                marks={marks}
                                step={20}
                                disabled={isEditDisabled}
                                onChange={handleOnchangeProblemSolving}
                                defaultValue={
                                  props.candidate.ba_problem_solving
                                }
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">Delegation</div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                marks={marks}
                                step={20}
                                disabled={isEditDisabled}
                                onChange={handleOnChangeDelegation}
                                defaultValue={props.candidate.ba_delegation}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">Attention to detail</div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                marks={marks}
                                step={20}
                                disabled={isEditDisabled}
                                onChange={handleOnChangeDetail}
                                defaultValue={props.candidate.ba_detail}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">
                              Tolerance to Ambuigity
                            </div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                marks={marks}
                                step={20}
                                disabled={isEditDisabled}
                                onChange={handleOnChangeAmbiguity}
                                defaultValue={
                                  props.candidate.ba_tolerance_ambiguity
                                }
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">
                              Ability to handle stress
                            </div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                disabled={isEditDisabled}
                                marks={marks}
                                step={20}
                                onChange={handleOnChangeStress}
                                defaultValue={props.candidate.ba_stress_mgt}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">Initiative Taker</div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                marks={marks}
                                step={20}
                                disabled={isEditDisabled}
                                onChange={handleOnChangeInitiative}
                                defaultValue={
                                  props.candidate.ba_initiative_taker
                                }
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">Autonomous</div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                marks={marks}
                                disabled={isEditDisabled}
                                step={20}
                                onChange={handleOnChangeMinimal}
                                defaultValue={
                                  props.candidate.ba_minimal_supervision
                                }
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">Team Work</div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                disabled={isEditDisabled}
                                marks={marks}
                                step={20}
                                onChange={handleOnChangeTeamwork}
                                defaultValue={props.candidate.ba_team_work}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">Creativity</div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                disabled={isEditDisabled}
                                marks={marks}
                                step={20}
                                onChange={handleOnChangeCreativity}
                                defaultValue={props.candidate.ba_creativity}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">Interpersonal Skills</div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                min={0}
                                disabled={isEditDisabled}
                                marks={marks}
                                step={20}
                                onChange={handleOnChangeInterpersonal}
                                defaultValue={
                                  props.candidate.ba_interpersonal_skills
                                }
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-4">Confidence</div>
                            <div className="col-sm-8">
                              <Slider
                                dots
                                disabled={isEditDisabled}
                                min={0}
                                marks={marks}
                                step={20}
                                onChange={handleOnChangeConfidence}
                                defaultValue={props.candidate.ba_confidence}
                              />
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
            <hr />
            <div className="px-5">
              <div className="form-row mb-3">
                <div className="col-sm-12">
                  <label htmlFor="view-candidate-exam-result">
                    Endorsement Notes
                  </label>
                  <br />
                  <Editor
                    toolbar={toolbarOptions}
                    defaultEditorState={endorsementNotes}
                    wrapperClassName="editor-disabled"
                    stripPastedStyles
                    readOnly
                    editorClassName="input form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="action-buttons">
            {props.error_message !== '' || isEditDisabled === true ? (
              <button
                type="button"
                className={
                  props.application_details.status === 'HIRED'
                    ? 'default-btn'
                    : 'cancel-btn'
                }
                onClick={() =>
                  props.dispatch(
                    showModal({
                      modal_show: false,
                    }),
                  )
                }
              >
                {props.application_details.status === 'HIRED' ? 'OK' : 'Close'}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="cancel-btn mr-3"
                  hidden={isEditDisabled}
                  onClick={() => {
                    setShowCancelModal(true);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="default-btn"
                  hidden={isEditDisabled}
                  onClick={() => {
                    setShowSaveModal(true);
                  }}
                >
                  Save
                </button>
              </>
            )}
          </div>
        </Modal.Footer>
      </LoadingOverlay>
      <Modal
        show={isShowCancelModal}
        onHide={() => {
          setShowCancelModal(false);
        }}
        className="cancel-modal"
        size="md"
        centered
      >
        <Modal.Body>
          <img
            src={CancelIcon}
            title="Cancel Icon"
            alt=""
            className="d-block mx-auto w-25 mb-4"
          />
          <h4>Do you wish to discard unsaved changes?</h4>
          <p className="mb-0 mt-2 text-danger">
            All changes made will not be saved.
          </p>
          <div className="modal-btn pt-4">
            <Button
              variant="secondary"
              className="no"
              onClick={() => {
                setShowCancelModal(false);
              }}
            >
              No
            </Button>
            <Button
              variant="primary"
              className="yes"
              onClick={handleCancelConfirmed}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={isShowSaveModal}
        onHide={() => {
          setShowSaveModal(false);
        }}
        className="confirm-save-modal"
        centered
      >
        <Modal.Body>
          <img
            src={ArrowSaveIcon}
            title="Arrow Save Icon"
            alt="Arrow Save Icon"
            className="d-block mx-auto w-25 mb-4"
          />
          <h4>Are you sure you want to save your edited Candidate info?</h4>
          <div className="modal-btn pt-3 mt-3">
            <Button
              variant="secondary"
              className="no"
              onClick={() => {
                setShowSaveModal(false);
              }}
            >
              No
            </Button>
            <Button
              variant="primary"
              className="yes"
              onClick={handleConfirmedSave}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showInterviewNotesModal}
        onHide={() => {
          setShowInterviewNotesModal(false);
        }}
        dialogClassName={
          props.application_details.status === 'HIRED'
            ? 'interview-modal hired'
            : 'interview-modal'
        }
        bsPrefix="modal modal-interview"
        backdrop="static"
      >
        <InterviewNotesModal
          onHide={() => {
            setShowInterviewNotesModal(false);
          }}
          dispatch={props.dispatch}
          candidate_id={props.candidate_id}
          interview_notes={props.interview_notes}
          interviewer_name={props.interviewer_name}
          interviewer_position={props.interviewer_position}
          interviewer_email={props.interviewer_email}
          interview_date={props.interview_date}
          interview_rate={props.interview_rate}
          interview_remarks={props.interview_remarks}
          interview_status={props.interview_status}
          application_details={props.application_details}
          btn_save_disable={props.btn_save_disable}
          interview_notes_loading={props.interview_notes_loading}
          interview_method={props.interview_method}
        />
      </Modal>
      <Modal
        show={isShowJobOfferDetails}
        backdrop="static"
        className="job-offer-modal"
        size="md"
        centered
        onHide={() => {
          setIsShowJobOfferDetails(false);
        }}
      >
        <Modal.Body>
          <div>
            <p className="font-medium mb-4">Edit Job Offer Details</p>
          </div>
          <div className="px-3">
            <Form.Group className="px-3">
              <label className="d-block font-medium text-left font-size-14 default-black">
                Official Start Date <span className="text-danger">*</span>
              </label>
              <DatePicker
                selected={new Date(props.official_start_date)}
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
              <label className="d-block font-medium text-left font-size-14 default-black ">
                Offered Salary <span className="text-danger">*</span>
              </label>
              <div className="col-sm-12">
                <div className="row">
                  <span className="white-color default-bgcolor php">PHP</span>
                  <Form.Control
                    type="number"
                    rows="4"
                    placeholder="Offered Salary"
                    value={props.offered_salary}
                    onChange={handleOnChangeSalary}
                  />
                </div>
              </div>
              <p className="text-danger">{offeredSalaryError}</p>
            </Form.Group>
            <Form.Group className="px-3">
              <label className="d-block font-medium text-left font-size-14 default-black">
                Effectivity of HMO <span className="text-danger">*</span>
              </label>
              <select
                value={props.hmo_effectivity}
                className="form-control"
                onChange={handleOnChangeHmoEffectivity}
              >
                <option value="IMMEDIATE">Immediately</option>
                <option value="3-MONTHS">3 Months after</option>
                <option value="6-MONTHS">6 Months after</option>
                <option value="NOT-APPLICABLE">Not Applicable</option>
              </select>
              <p className="text-danger">{hmoEffectivityError}</p>
            </Form.Group>
          </div>
          <div className="modal-btn mt-4 float-right">
            <Button
              variant="secondary"
              className="no mr-3"
              onClick={() => {
                setIsShowJobOfferDetails(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="yes"
              onClick={handleForJobOffer}
            >
              Proceed
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={isShowEditVacantSchedModal}
        backdrop="static"
        className="p-4 edit-vacant-schedule-modal"
        centered
        onHide={() => {
          setIsShowEditVacantSchedModal(false);
        }}
      >
        <Modal.Body>
          <div className="modal-title py-3 px-4">
            <label className="mb-0">Edit Vacant Schedules</label>
          </div>
          <div className="px-4 pt-4">
            {currentVacantSched === undefined
              ? ''
              : currentVacantSched.map((vacantSched, keyIndex) => (
                  <Form.Group className="flex" key={keyIndex}>
                    <label className="d-block mb-0 font-medium text-left font-size-14 default-black">
                      Interview Date Option {keyIndex + 1}{' '}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex">
                      <div className="inline first-date">
                        <DatePicker
                          selected={new Date(vacantSched.start)}
                          className="input form-control"
                          showTimeSelect
                          minDate={new Date()}
                          timeFormat="h:mm aa"
                          timeIntervals={15}
                          id={`start_datetime_${keyIndex}`}
                          timeCaption="time"
                          dateFormat="dd-MMM-yyyy h:mm aa"
                          onChange={date => {
                            handleOnChangeCurrentStartDate(date, keyIndex);
                          }}
                        />
                      </div>
                      <span className="to">to</span>
                      <div className="inline first-date">
                        <DatePicker
                          selected={new Date(vacantSched.end)}
                          className="input form-control w-100"
                          minDate={new Date(vacantSched.start)}
                          showTimeSelect
                          todayButton="Today"
                          timeIntervals={15}
                          selectsStart
                          dateFormat="dd-MMM-yyyy h:mm aa"
                          id={`end_calendar${keyIndex}`}
                          onChange={date => {
                            handleOnChangeCurrentEndDate(date, keyIndex);
                          }}
                        />
                      </div>
                      {keyIndex >= 3 ? (
                        <button
                          type="button"
                          className="remove-btn btn"
                          onClick={() => {
                            handleOnClickRemove(keyIndex);
                          }}
                        >
                          <i className="fa fa-trash default-color" />
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                    {vacantSched.start_error !== '' ||
                    vacantSched.end_error !== '' ? (
                      <div className="w-100">
                        <div>
                          <span className="text-danger">
                            {vacantSched.start_error}
                          </span>
                        </div>
                        <div>
                          <span className="text-danger">
                            {vacantSched.end_error}
                          </span>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </Form.Group>
                ))}
          </div>
          <div className="modal-footer">
            <div className="text-right float-right">
              <button
                type="button"
                className="cancel-btn mr-3"
                onClick={() => {
                  setIsShowEditVacantSchedModal(false);
                  handleOnClickCancelEditVacantSched();
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="default-btn"
                onClick={handleOnClickProceed}
              >
                Proceed
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

function ClientVacantSchedule(props) {
  return (
    <div>
      {props.users_vacant_sched.length > 0
        ? props.users_vacant_sched.map((user, keyIndex) => (
            <div className="users-schedule-container" key={keyIndex}>
              {user.interview_vacant_schedules.map((schedule, key) => (
                <div className="schedule-container" key={key}>
                  <p>Interview Date Option {key + 1}</p>
                  <p>
                    {formatCompleteTimestamp(new Date(schedule.start))} to{' '}
                    {formatCompleteTimestamp(new Date(schedule.end))}
                  </p>
                </div>
              ))}
              <div className="users-schedule-footer">
                <p>
                  Created By: {toTitleCase(user.first_name)}{' '}
                  {toTitleCase(user.last_name)}
                </p>
              </div>
            </div>
          ))
        : ''}
    </div>
  );
}

CandidateModal.propTypes = {
  dispatch: PropTypes.any,
  loading: PropTypes.bool,
  modal_message_show: PropTypes.any,
  onHide: PropTypes.any,
  saving_message: PropTypes.any,
  candidate: PropTypes.any,
  candidate_id: PropTypes.any,
  skills: PropTypes.any,
  application_details: PropTypes.any,
  error_message: PropTypes.string,
  resume: PropTypes.any,
  interview_notes: PropTypes.any,
  interviewer_name: PropTypes.any,
  interviewer_position: PropTypes.any,
  interviewer_email: PropTypes.any,
  interview_date: PropTypes.any,
  interview_rate: PropTypes.any,
  interview_remarks: PropTypes.any,
  interview_status: PropTypes.any,
  btn_save_disable: PropTypes.any,
  interview_notes_loading: PropTypes.any,
  interview_method: PropTypes.any,
  offered_salary: PropTypes.any,
  official_start_date: PropTypes.any,
  hmo_effectivity: PropTypes.any,
  users_vacant_sched: PropTypes.any,
  candidate_name: PropTypes.any,
  my_vacant_sched: PropTypes.any,
  vacant_schedule: PropTypes.any,
};

export default CandidateModal;
