/**
 *
 * SampleCvModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { Modal, Dropdown } from 'react-bootstrap';
import BackIcon from '../../assets/images/hub/back_icon.png';
import PBLogo from '../../assets/images/PB_logo.png';

import { showBlindCvModal } from '../../containers/Hub/FileJobReqPage/actions';
import { generateBlindCvPdf } from '../../containers/Hub/FileJobReqPage/helper';

function SampleCvModal(props) {
  const handleDownloadBlindCv = async () => {
    await generateBlindCvPdf(props.blind_cv);
  };
  return (
    <div>
      <div className="dropdown-button">
        <Dropdown className="resume-dropdown">
          <Dropdown.Toggle className="gear-btn" onClick={handleDownloadBlindCv}>
            <i className="fa fa-file" />
          </Dropdown.Toggle>
          Download
        </Dropdown>
      </div>
      <Modal.Header>
        <button
          type="button"
          className="back-btn"
          onClick={() => {
            props.dispatch(
              showBlindCvModal({
                blind_cv_modal: false,
              }),
            );
          }}
        >
          <img alt="back-icon" src={BackIcon} />
          Back
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-4 p-0">
              <div className="mb-4 job-title">{props.blind_cv.job_title}</div>
              <div className="mx-4 px-2 pt-2">
                <label className="default-color font-size-14 font-semibold text-uppercase m-0 d-block">
                  Summary
                </label>
                <hr />
                <div className="mb-4">
                  <p className="text-justify">
                    {ReactHtmlParser(props.blind_cv.summary)}
                  </p>
                </div>
                <label className="default-color font-size-14 font-semibold text-uppercase m-0 d-block">
                  Education
                </label>
                <hr />
                <div>
                  <p>{ReactHtmlParser(props.blind_cv.education)}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-8 pt-5 px-4">
              <img
                src={PBLogo}
                alt="Penbrothers Logo"
                title="Penbrothers"
                className="logo mb-4"
              />
              <label className="default-color font-size-14 font-semibold text-uppercase m-0 d-block">
                Work Experience
              </label>
              <hr />
              <div className="default-black">
                {ReactHtmlParser(props.blind_cv.work_experience)}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </div>
  );
}

SampleCvModal.propTypes = {
  dispatch: PropTypes.any,
  blind_cv: PropTypes.any,
};

export default SampleCvModal;
