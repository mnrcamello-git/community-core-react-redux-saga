/**
 *
 * InterviewNotesModal
 *
 */

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import LoadingOverlay from 'react-loading-overlay';

import Rating from 'react-rating';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  formatCompleteTimestamp,
  validateEmail,
  formatDateToDayMonthNameYear,
  toTitleCase,
} from '../../containers/App/globalHelpers';
import {
  changeInterviewStatus,
  changeInterviewerName,
  changeInterviewerPosition,
  changeInterviewerEmail,
  changeInterviewDate,
  changeInterviewRemarks,
  changeInterviewRate,
  saveInterviewNotesRequest,
  viewInterviewNote,
  updateInterviewNotesRequest,
  deleteInterviewNotesRequest,
} from '../../containers/CandidateListSubPage/actions';
import CancelIcon from '../../assets/images/hub/recruitment/cancel_icon.svg';
import NotepadIcon from '../../assets/images/hub/recruitment/notepad.svg';
import loadingIcon from '../../assets/images/loading.svg';

function InterviewNotesModal(props) {
  const [errorName, setErrorName] = useState('');
  const [errorPosition, setErrorPosition] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorDate, setErrorDate] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [errorRemarks, setErrorRemarks] = useState('');

  const handleOnClickSave = () => {
    let errorCount = 0;

    if (props.interviewer_name === '') {
      errorCount += 1;
      setErrorName('Interviewer name is required.');
    }

    if (props.interviewer_position === '') {
      errorCount += 1;
      setErrorPosition('Interviewer position is required.');
    }

    if (props.interviewer_email === '') {
      errorCount += 1;
      setErrorEmail('Interviewer email is required.');
    }

    if (validateEmail(props.interviewer_email) === false) {
      errorCount += 1;
      setErrorEmail('Interviewer email is invalid.');
    }

    if (props.interview_date === '') {
      errorCount += 1;
      setErrorDate('Interview date is required.');
    }

    if (props.interview_status === '') {
      errorCount += 1;
      setErrorStatus('Interview status is required.');
    }

    if (props.interview_remarks === '') {
      errorCount += 1;
      setErrorRemarks('Interview remarks is required.');
    }

    if (errorCount === 0) {
      // Save
      setErrorName('');
      setErrorPosition('');
      setErrorEmail('');
      setErrorDate('');
      setErrorStatus('');
      setErrorRemarks('');
      if (props.interview_method === 'create') {
        props.dispatch(saveInterviewNotesRequest());
      } else {
        props.dispatch(updateInterviewNotesRequest());
      }
    }
  };

  const handleOnChangeInterviewName = evt => {
    props.dispatch(
      changeInterviewerName({
        interviewer_name: evt.target.value,
      }),
    );
    if (evt.target.value !== '') {
      setErrorName('');
      return true;
    }
    setErrorName('Interviewer name is required.');
  };

  const handleOnChangeInterviewPosition = evt => {
    props.dispatch(
      changeInterviewerPosition({
        interviewer_position: evt.target.value,
      }),
    );
    if (evt.target.value !== '') {
      setErrorPosition('');
      return true;
    }
    setErrorPosition('Interviewer position is required.');
  };

  const handleOnClickEditInterview = index => {
    props.dispatch(viewInterviewNote(props.interview_notes[index]));
  };

  const handleOnChangeInterviewEmail = evt => {
    props.dispatch(
      changeInterviewerEmail({
        interviewer_email: evt.target.value,
      }),
    );

    if (validateEmail(evt.target.value) === false) {
      setErrorEmail('Interviewer email is invalid.');
      return true;
    }
    if (evt.target.value !== '') {
      setErrorEmail('');
      return true;
    }
    setErrorEmail('Interviewer email is required.');
  };

  const handleOnChangeInterviewDate = date => {
    props.dispatch(
      changeInterviewDate({
        interview_date: date,
      }),
    );
    if (date === null) {
      setErrorDate('Interview date is required.');
      return true;
    }
    if (date !== '') {
      setErrorDate('');
      return true;
    }
    setErrorDate('Interview date is required.');
  };

  const handleOnChangeStatus = evt => {
    props.dispatch(
      changeInterviewStatus({
        status: evt.target.value,
      }),
    );
    if (evt.target.value !== '') {
      setErrorStatus('');
      return true;
    }
    setErrorStatus('Interview status is required.');
  };

  const handleOnChangeRemarks = evt => {
    props.dispatch(
      changeInterviewRemarks({
        remarks: evt.target.value,
      }),
    );
    if (evt.target.value !== '') {
      setErrorRemarks('');
      return true;
    }
    setErrorRemarks('Interviewer remarks is required.');
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInterviewNote, setSelectedInterviewNote] = useState('');
  const handleOnClickDeleteInterview = index => {
    setSelectedInterviewNote(props.interview_notes[index].interview_note_id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Dispatch
    props.dispatch(
      deleteInterviewNotesRequest({
        interview_note_id: selectedInterviewNote,
      }),
    );
    setShowDeleteModal(false);
  };

  const handleOnCancel = () => {
    const today = new Date();

    props.dispatch(
      viewInterviewNote({
        interviewer_name: '',
        interviewer_position: '',
        interviewer_email: '',
        interview_date: today.toString(),
        rate: 0,
        remarks: '',
        status: '',
      }),
    );
  };

  return (
    <>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col col-border"
              hidden={props.application_details.status === 'HIRED'}
            >
              <p className="modal-heading interview-notes-form-head">
                Interview Notes Form
              </p>
              <div className="mx-4">
                <div className="form-group">
                  <label htmlFor="create-job-title">
                    Interviewer Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="input form-control"
                    placeholder="Enter interviewer name"
                    value={toTitleCase(props.interviewer_name)}
                    maxLength="255"
                    onChange={handleOnChangeInterviewName}
                  />
                  <span className="text-danger">{errorName}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="create-job-title">
                    Interviewer Position <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="input form-control"
                    placeholder="Enter interviewer position"
                    value={props.interviewer_position}
                    maxLength="255"
                    onChange={handleOnChangeInterviewPosition}
                  />
                  <span className="text-danger">{errorPosition}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="create-job-title">
                    Interviewer Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="input form-control"
                    placeholder="Enter interviewer email"
                    maxLength="255"
                    value={props.interviewer_email}
                    onChange={handleOnChangeInterviewEmail}
                  />
                  <span className="text-danger">{errorEmail}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="create-job-title">
                    Interview Date <span className="text-danger">*</span>
                  </label>
                  <br />
                  <DatePicker
                    selected={props.interview_date}
                    placeholderText="Select an interview date"
                    dateFormat="dd-MMM-yyyy"
                    className="input form-control"
                    onChange={handleOnChangeInterviewDate}
                  />
                  <p className="text-danger">{errorDate}</p>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-sm-12">
                      <label htmlFor="view-candidate-exam-result">Status</label>
                      <br />
                      <input
                        type="radio"
                        className="passed"
                        name="result"
                        value="PASSED"
                        id="exam-pass"
                        checked={props.interview_status === 'PASSED'}
                        onChange={handleOnChangeStatus}
                      />
                      <label className="passed ml-2 mr-5" htmlFor="exam-pass">
                        Passed
                      </label>
                      <input
                        type="radio"
                        className="failed"
                        name="result"
                        value="FAILED"
                        id="exam-failed"
                        checked={props.interview_status === 'FAILED'}
                        onChange={handleOnChangeStatus}
                      />
                      <label className="failed ml-2" htmlFor="exam-failed">
                        Failed
                      </label>
                    </div>
                  </div>
                  <span className="text-danger">{errorStatus}</span>
                </div>
                <div className="form-group remark-section mb-0">
                  <label htmlFor="create-job-title">
                    Interview notes <span className="text-danger">*</span>
                  </label>
                  <Rating
                    initialRating={props.interview_rate}
                    emptySymbol="fa fa-star-o fa-x"
                    fullSymbol="fa fa-star fa-x"
                    stop="5"
                    onChange={rate => {
                      props.dispatch(
                        changeInterviewRate({
                          rate,
                        }),
                      );
                    }}
                  />
                  <textarea
                    className="form-control"
                    rows="5"
                    maxLength="1000"
                    value={props.interview_remarks}
                    onChange={handleOnChangeRemarks}
                    placeholder="Enter your interview notes"
                  />
                  <div className="text-right">
                    <p className="gray-color mb-0">
                      {props.interview_remarks.length}/1000 characters
                    </p>
                  </div>
                  <div className="d-block">
                    <span className="text-danger">{errorRemarks}</span>
                  </div>
                </div>
                {props.interview_notes.length < 10 ||
                props.interview_method === 'edit' ? (
                  <div className="form-group text-right mb-0 mt-3">
                    <button
                      type="button"
                      className={
                        props.btn_save_disable === false
                          ? 'default-btn'
                          : 'default-btn disabled'
                      }
                      onClick={handleOnClickSave}
                      disabled={props.btn_save_disable}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="cancel-btn ml-3"
                      onClick={handleOnCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            {props.interview_notes.length > 0 ? (
              <div className="col">
                <div className="close-heading position-relative">
                  <p className="modal-heading candidate-interview-notes-head">
                    Candidate's Interview Notes
                  </p>
                  <i className="fa fa-times" onClick={props.onHide} />
                </div>
                <div className="interview-list">
                  {props.interview_notes_loading ? (
                    <div>
                      <img
                        src={loadingIcon}
                        alt="We are loading"
                        className="mx-auto d-flex align-self-center"
                      />
                    </div>
                  ) : (
                    <div>
                      {props.interview_notes.map((interviewNotes, index) => (
                        <div
                          key={interviewNotes.interview_note_id}
                          className="interview-item mx-4 mb-3"
                        >
                          <div className="col-12">
                            <div className="interview-header row">
                              <div className="col p-0">
                                <p className="default-color mb-2 mt-1 font-semibold">
                                  {toTitleCase(interviewNotes.interviewer_name)}
                                </p>
                              </div>
                              <div className="col p-0 d-flex text-right">
                                <Rating
                                  initialRating={interviewNotes.rate}
                                  emptySymbol="fa fa-star-o fa-x"
                                  fullSymbol="fa fa-star fa-x"
                                  readonly
                                />
                                <p
                                  className={
                                    interviewNotes.status === 'PASSED'
                                      ? 'interview-passed'
                                      : 'interview-failed'
                                  }
                                >
                                  {interviewNotes.status === 'PASSED'
                                    ? 'Passed'
                                    : 'Failed'}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="interview-position d-flex w-100">
                            <p className="mb-0 w-50 default-black font-medium">
                              {interviewNotes.interviewer_position}
                            </p>
                            {interviewNotes.owner === 1 ? (
                              <div
                                className="interview-actions text-right w-50"
                                hidden={
                                  props.application_details.status === 'HIRED'
                                }
                              >
                                <button
                                  type="button"
                                  className="btn rounded"
                                  onClick={() => {
                                    handleOnClickEditInterview(index);
                                  }}
                                >
                                  <i className="fa fa-pencil-square-o" />
                                </button>
                                <button
                                  type="button"
                                  className="btn rounded"
                                  onClick={() => {
                                    handleOnClickDeleteInterview(index);
                                  }}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                          <p className="mb-1 font-size-12">
                            {interviewNotes.interviewer_email}
                          </p>
                          <p className="font-size-12">
                            {formatDateToDayMonthNameYear(
                              interviewNotes.interview_date,
                            )}
                          </p>
                          <LongText remarks={interviewNotes.remarks} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="col no-notes">
                <div className="close-heading position-relative">
                  <p className="modal-heading candidate-interview-notes-head">
                    Candidate's Interview Notes
                  </p>
                  <i className="fa fa-times" onClick={props.onHide} />
                </div>
                <div className="content text-center gray-color">
                  <img src={NotepadIcon} className="mx-auto d-block" />
                  <h4 className="font-semibold brand-color mt-3">Nada!!</h4>
                  <p>No interview notes yet</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>

      <Modal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
        }}
        className="cancel-modal error"
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
          <h4 className="pt-3">
            Are your sure you want to delete this interview note?
          </h4>
          <div className="modal-btn pt-5">
            <Button
              variant="secondary"
              className="no"
              onClick={() => {
                setShowDeleteModal(false);
              }}
            >
              No
            </Button>
            <Button
              variant="primary"
              className="yes"
              onClick={handleConfirmDelete}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

function LongText(props) {
  const LIMIT = 255;
  const [text, setText] = useState(props.remarks.substring(0, LIMIT));
  const [elipsesText, setElipsesText] = useState('Read More');

  const handleOnClickReadMore = () => {
    if (elipsesText === 'Read More') {
      setElipsesText('Read Less');
      setText(props.remarks);
    }

    if (elipsesText === 'Read Less') {
      setElipsesText('Read More');
      setText(props.remarks.substring(0, LIMIT));
    }
  };

  return (
    <div>
      <p>
        {text}
        {props.remarks.length > LIMIT ? (
          <span
            className="d-block default-color"
            onClick={handleOnClickReadMore}
          >
            {elipsesText}
          </span>
        ) : (
          ''
        )}
      </p>
    </div>
  );
}

InterviewNotesModal.propTypes = {
  onHide: PropTypes.any,
  interview_notes: PropTypes.any,
  application_details: PropTypes.any,
  dispatch: PropTypes.any,
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
};

export default InterviewNotesModal;
