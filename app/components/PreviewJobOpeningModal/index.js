/**
 *
 * PreviewJobOpeningModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import PBLogo from '../../assets/images/PB_logo.png';

function PreviewJobOpeningModal(props) {
  const setContractType = contractType => {
    if (contractType === 'FULL-TIME') {
      return 'Full Time';
    }

    if (contractType === 'PART-TIME') {
      return 'Part Time';
    }

    if (contractType === 'PROJECT') {
      return 'Project Based';
    }

    if (contractType === 'CONTRACTUAL') {
      return 'Contractual';
    }

    return 'Others';
  };

  return (
    <div>
      <Modal.Body>
        <div className="container-fluid preview-job-modal">
          <div className="row">
            <div className="col-sm-12 text-right">
              <button
                type="button"
                className="close"
                onClick={props.onHide}
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 text-center pb-3">
              <img
                src={PBLogo}
                alt="Penbrothers Logo"
                title="Penbrothers"
                className="logo"
              />
            </div>
          </div>
          <div className="row p-4">
            <div className="col-sm-12">
              <div className="pb-2">
                <div className="font-semibold d-inline-block header-fontcolor">
                  Job Title:
                </div>
                <span className="pl-3">{props.job_details.title}</span>
              </div>
              <div>
                <div className="font-semibold d-inline-block header-fontcolor">
                  Contract Type:
                </div>
                <span className="pl-3">
                  {setContractType(props.job_details.contract_type)}
                </span>
              </div>
              <div className="pt-4">
                <div className="font-semibold d-inline-block header-fontcolor">
                  Preamble
                </div>
              </div>
              <div className="html-render m-0">
                {ReactHtmlParser(
                  props.job_details.preamble.replaceAll('<br><br>', '<br>'),
                )}
              </div>
              <div className="pt-3 pb-1">
                <div className="font-semibold d-inline-block header-fontcolor">
                  Responsibilities
                </div>
              </div>
              <div className="html-render">
                {ReactHtmlParser(
                  props.job_details.responsibilities.replaceAll(
                    '<br><br>',
                    '<br>',
                  ),
                )}
              </div>
              <div className="pt-3 pb-1">
                <div className="font-semibold d-inline-block header-fontcolor">
                  Qualifications
                </div>
              </div>
              <div className="html-render">
                {ReactHtmlParser(
                  props.job_details.qualifications.replaceAll(
                    '<br><br>',
                    '<br>',
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </div>
  );
}

PreviewJobOpeningModal.propTypes = {
  onHide: PropTypes.any,
  job_details: PropTypes.any,
};

export default PreviewJobOpeningModal;
