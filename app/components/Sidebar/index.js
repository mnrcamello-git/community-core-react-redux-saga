/**
 *
 * Sidebar
 *
 */

import React, { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Modal, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Rating from 'react-rating';
import messages from './messages';
import Menu from '../Menu';
import pbcoreLogo from '../../assets/images/PB-logo.png';
import pbcoreLogoCircle from '../../assets/images/pbcore_circle.svg';
import HubLogo from '../../assets/images/hub/hub_logo.svg';
import NocLogo from '../../assets/images/noc/noc_logo.svg';
import BurgerIcon from '../../assets/images/burger_icon.svg';
import ErrorIcon from '../../assets/images/hub/recruitment/error_icon.svg';
import CancelIcon from '../../assets/images/hub/recruitment/cancel_icon.svg';
import HandIcon from '../../assets/images/hub/recruitment/hand_icon.svg';
import CheckIcon from '../../assets/images/hub/recruitment/check_icon.svg';
import FeedBackIcon from '../../assets/images/send_feedback.png';
import '../../assets/scss/main.scss';
import 'bootstrap-scss/bootstrap.scss';
import {
  requestSendFeedback,
  showFeedbackFailedModal,
  showFeedbackSuccessModal,
  toggleSidebar,
} from '../../layouts/dashboard/actions';
function Sidebar(props) {
  let dashboards = [];

  const initialDashboard = localStorage.getItem('select-portal')
    ? localStorage.getItem('select-portal')
    : 'noc';

  /**
   * Default Options
   */
  const options = [
    {
      value: 'hub',
      label: <img src={HubLogo} className="hub" alt="logo" title="Hub" />,
    },
    {
      value: 'noc',
      label: <img src={NocLogo} className="noc" alt="logo" title="Noc" />,
    },
    {
      value: 'pod',
      label: <img src={NocLogo} alt="logo" title="Pod" />,
    },
  ];

  if (localStorage.getItem('portals')) {
    dashboards = localStorage.getItem('portals').split(',');
  }

  const setDashboardOptions = options.filter(obj =>
    dashboards.includes(obj.value),
  );

  const objIndex = setDashboardOptions.findIndex(
    obj => obj.value === initialDashboard,
  );

  const [selectedDashboard, setSelectedDashboard] = useState(
    setDashboardOptions[objIndex],
  );

  const handleOnSelect = portal => {
    setSelectedDashboard(portal);
    localStorage.setItem('select-portal', portal.value);
    window.location = `/${portal.value}`;
  };

  const handleToggle = () => {
    props.dispatch(
      toggleSidebar({
        toggle_status: !props.toggleStatus,
      }),
    );
  };

  /**
   * returns true if portal is multiple
   */
  const isPortalMultiple = () => {
    const portals = localStorage.getItem('portals');
    const filtered = portals.split(',');
    return filtered.length > 1;
  };

  const [isShowFeedbackModal, setIsShowFeedbackModal] = useState(false);
  const [isShowCancelFeedbackModal, setIsShowCancelFeedbackModal] = useState(
    false,
  );
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState('');
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');

  const handleClearFeedbackModal = closeModal => {
    setCommentError('');
    setComment('');
    setRating(0);
    setRatingError('');
    if (closeModal) {
      setIsShowFeedbackModal(false);
    }
  };

  const handleOnChangeComment = evt => {
    setComment(evt.target.value);
    if (evt.target.value === '') {
      setCommentError('Please provide a comment.');
      return true;
    }
    setCommentError('');
  };
  const handleOnChangeRatings = rate => {
    setRating(rate);
    if (rate === 0) {
      setRatingError('Please provide a rating.');
      return true;
    }
    setRatingError('');
  };

  const handleOnClickSubmit = () => {
    let errorCount = 0;
    if (comment === '') {
      setCommentError('Please provide a comment.');
      errorCount += 1;
    }
    if (rating === 0) {
      setRatingError('Please provide a rating.');
      errorCount += 1;
    }
    if (errorCount === 0) {
      setIsShowFeedbackModal(false);
      props.dispatch(
        requestSendFeedback({
          rating,
          comment,
        }),
      );
    }
  };

  return (
    <div>
      <div
        className={
          props.toggleStatus
            ? 'head-logo clearfix active'
            : 'head-logo clearfix'
        }
      >
        <img
          alt="pbcore-logo"
          title="pbcore-logo"
          className="pbcore-logo"
          align="left"
          src={pbcoreLogo}
        />
        <img
          alt="pbcore-logo-circle"
          title="pbcore-logo-circle"
          className="pbcore-logo-circle"
          align="left"
          src={pbcoreLogoCircle}
        />
        <img
          alt="Collapse"
          title="Collapse"
          className="burger-icon"
          src={BurgerIcon}
          onClick={handleToggle}
        />
      </div>
      <div className="portal">
        <Select
          value={selectedDashboard}
          className="select_container mt-3"
          defaultValue={options[objIndex]}
          classNamePrefix="select"
          options={setDashboardOptions}
          onChange={handleOnSelect}
          isSearchable={false}
          isDisabled={!isPortalMultiple()}
        />
      </div>
      {JSON.parse(localStorage.getItem('me')).role !== 'CLIENT-PROSPECT' && (
        <>
          <hr />
          <h4>
            <FormattedMessage {...messages.menu} />{' '}
          </h4>
        </>
      )}
      <ul>
        <Menu portal={selectedDashboard.value} />
      </ul>
      <hr />
      {selectedDashboard.value === 'hub' ? (
        <ul>
          <li>
            <button
              type="button"
              className="btn btn-link default-color font-medium font-size-12 p-0 m-0"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setIsShowFeedbackModal(true);
              }}
            >
              <img
                alt="Send feedback icon"
                title="Send feedback"
                src={FeedBackIcon}
              />
              <a>Send Feedback</a>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-right" className="tooltip-content">
                    We&apos;d love to hear from you. Your feedback helps us
                    create a better experience for you and all the whole
                    organization.
                  </Tooltip>
                }
              >
                <span
                  variant="secondary"
                  className="icon-table icon-tooltip align-self-center"
                  aria-describedby="tooltip-right"
                />
              </OverlayTrigger>
            </button>
          </li>
        </ul>
      ) : (
        ''
      )}
      {/* Main Send Feedback Modal */}
      <Modal
        show={isShowFeedbackModal}
        onHide={() => {
          handleClearFeedbackModal(true);
        }}
        size="md"
        className="send-feedback-modal"
        centered
      >
        <Modal.Header
          closeButton
          className="default-bgcolor align-items-center"
        >
          <span className="m-0 white-color font-medium">
            Send us your feedback!
          </span>
        </Modal.Header>
        <Modal.Body className="text-left">
          <h5 className="brand-color">Your feedback counts!</h5>
          <Form.Group>
            <label
              htmlFor="feedback-ratings"
              className="d-block font-medium text-left font-size-14 default-black"
            >
              How would you rate the Platform?
            </label>
            <Rating
              initialRating={rating}
              emptySymbol="fa fa-star-o fa-x"
              fullSymbol="fa fa-star fa-x"
              stop="5"
              id="feedback-ratings"
              onChange={handleOnChangeRatings}
            />
            <p className="text-danger mb-0">{ratingError}</p>
          </Form.Group>
          <Form.Group>
            <label
              htmlFor="feedback-comment"
              className="d-block font-medium text-left font-size-14 default-black"
            >
              Would you like to add a comment?
            </label>
            <textarea
              className="form-control"
              id="feedback-comment"
              value={comment}
              onChange={handleOnChangeComment}
              placeholder="Share your experience with us."
            />
            <p className="text-danger mb-0">{commentError}</p>
          </Form.Group>
          <div className="modal-btn pt-3">
            <Button
              variant="secondary"
              className="cancel"
              onClick={() => {
                setIsShowFeedbackModal(false);
                setIsShowCancelFeedbackModal(true);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="yes"
              onClick={handleOnClickSubmit}
            >
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Success Modal */}
      <Modal
        show={props.isSendFeedbackSuccess}
        onHide={() => {
          props.dispatch(showFeedbackSuccessModal({ show_modal: false }));
        }}
        className="save-modal success"
        centered
      >
        <Modal.Body>
          <img
            src={CheckIcon}
            title="Check Icon"
            className="d-block mx-auto mb-4"
            alt=""
          />
          <h4 className="pt-2">Feedback Submitted!</h4>
          <div className="modal-btn pt-3 mt-3">
            <Button
              variant="primary"
              onClick={() => {
                props.dispatch(showFeedbackSuccessModal({ show_modal: false }));
                handleClearFeedbackModal();
              }}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Error Modal */}
      <Modal
        show={props.isSendFeedbackFailed}
        onClick={() => {
          props.dispatch(showFeedbackFailedModal({ show_modal: false }));
          setIsShowFeedbackModal(true);
        }}
        className="cancel-modal error"
        size="md"
        centered
      >
        <Modal.Body>
          <img
            src={ErrorIcon}
            title="Error Icon"
            alt=""
            size="lg"
            className="d-block mx-auto w-25 mb-4"
          />
          <h4>Failed to send feedback. Please contact PB Administrator.</h4>
          <div className="modal-btn pt-5">
            <Button
              variant="primary"
              onClick={() => {
                props.dispatch(showFeedbackFailedModal({ show_modal: false }));
                setIsShowFeedbackModal(true);
              }}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Cancel Modal */}
      <Modal
        show={isShowCancelFeedbackModal}
        onHide={() => {
          setIsShowCancelFeedbackModal(false);
        }}
        className="cancel-modal error"
        size="md"
        centered
      >
        <Modal.Body>
          <img
            src={CancelIcon}
            title="Cancel Icon"
            className="d-block mx-auto w-25 mb-4"
          />
          <h4>Discard Feedback</h4>
          <p>If you discard now, you won&apos;t share any feedback with us.</p>
          <div className="modal-btn pt-3">
            <Button
              variant="secondary"
              className="no"
              onClick={() => {
                setIsShowFeedbackModal(true);
                setIsShowCancelFeedbackModal(false);
              }}
            >
              No
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleClearFeedbackModal(true);
                setIsShowCancelFeedbackModal(false);
              }}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

Sidebar.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
  toggleStatus: PropTypes.any,
  isSendFeedbackSuccess: PropTypes.bool,
  isSendFeedbackFailed: PropTypes.bool,
};

export default Sidebar;
