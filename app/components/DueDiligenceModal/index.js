/**
 *
 * DueDiligenceModal
 *
 */

import React, { useState, memo, useEffect } from 'react';
import { Modal, Tabs, Tab, Row, Col, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import LoadingOverlay from 'react-loading-overlay';
import { processNodes } from 'react-html-parser';
import { setShowModal } from '../../containers/Noc/SalesPage/actions';
import {
  formatISOtoLongYear,
  translateToHumanReadableFormat,
} from '../../containers/App/globalHelpers';
import BackIcon from '../../assets/images/hub/back_icon.png';
import documentIcon from '../../assets/images/noc/sales/registration-documents-icon.svg';
import representativeIcon from '../../assets/images/noc/sales/authorized-representative-icon.svg';
import certificateIcon from '../../assets/images/noc/sales/authorization-certificate-icon.svg';
import othersIcon from '../../assets/images/noc/sales/others-icon.svg';
import CheckIcon from '../../assets/images/hub/recruitment/check_icon.svg';
import downloadIcon from '../../assets/images/noc/sales/blue-download-icon.png';
import ArrowSaveIcon from '../../assets/images/hub/recruitment/arrow_save_icon.svg';
import assignProspectIcon from '../../assets/images/noc/sales/assign-prospect-icon.svg';

function DueDiligenceModal(props) {
  const {
    client,
    dispatch,
    createDueDiligence,
    updateDueDiligence,
    loading,
    isDdFailed,
    isDdSuccess,
    confirmation,
    closeMessages,
    setConfirmationModal,
    setAssignToProspectModal,
    handleAssignToProspect,
    assignToProspectModal,
    assignToProspectSuccess,
  } = props;

  const [requirements, setRequirements] = useState(
    props.dueDiligence.requirements,
  );
  useEffect(() => {
    if (props.dueDiligence.requirements !== undefined) {
      setRequirements(props.dueDiligence.requirements);
    }
  }, [props.dueDiligence.requirements]);

  const [isFormValid, setFormValid] = useState(false);
  const [isFormSaved, setFormSaved] = useState(false);
  const [toDelete, setToDelete] = useState([]);

  const handleOnChangeTitle = (evt, requirementIndex) => {
    const tempReq = requirements;
    tempReq[requirementIndex].title = evt.target.value;
    setRequirements([...tempReq]);
  };
  const handleOnChangeDescription = (evt, requirementIndex) => {
    const tempReq = requirements;
    tempReq[requirementIndex].description = evt.target.value;
    setRequirements([...tempReq]);
  };

  const handleOnClickClear = requirementIndex => {
    const tempReq = requirements;
    tempReq[requirementIndex] = {
      type: 'OTHERS',
      title: '',
      description: '',
    };
    setRequirements([...tempReq]);
  };

  const handleOnClickAddOthers = () => {
    setRequirements([
      ...requirements,
      { type: 'OTHERS', title: '', description: '', is_active: 0 },
    ]);
  };

  const handleOnClickRemoveOthers = requirementIndex => {
    const tempReq = requirements.filter(
      (requirement, index) => index !== requirementIndex,
    );
    setRequirements([...tempReq]);
    setToDelete([...toDelete, requirements[requirementIndex].requirement_id]);
  };

  const handleOnCheckOthers = (evt, requirementIndex) => {
    const tempReq = requirements;
    tempReq[requirementIndex].is_active = evt.target.checked;
    setRequirements([...tempReq]);
  };

  const handleOnChangeCheckbox = (evt, requirementIndex, type) => {
    const tempReq = requirements;
    if (requirementIndex > -1) {
      tempReq[requirementIndex].is_active = evt.target.checked;
      setRequirements([...tempReq]);
      return true;
    }
    setRequirements([
      ...requirements,
      {
        type,
        title: '',
        description: '',
        is_active: evt.target.checked,
      },
    ]);
  };

  const handleOnClickSave = () => {
    setFormSaved(true);
    const finalRequirements = [];
    requirements.forEach(req => {
      finalRequirements.push(req);
    });

    setFormValid(true);
    // update
    if (props.dueDiligence.due_diligence_id) {
      dispatch(
        updateDueDiligence({
          client_id: props.client.client_id,
          due_diligence_id: props.dueDiligence.due_diligence_id,
          status: props.dueDiligence.status,
          deleted_requirements: toDelete,
          requirements,
        }),
      );

      return true;
    }

    // CREATE
    dispatch(createDueDiligence(finalRequirements));
  };

  const renderFileName = file => {
    if (file) {
      const filename = file.split('/');
      const finalFilename = filename[filename.length - 1];
      return finalFilename;
    }
  };

  return (
    <LoadingOverlay active={loading} spinner text="Loading...">
      <div>
        <Modal.Header>
          <button
            type="button"
            className="back-btn"
            onClick={() => {
              props.dispatch(
                setShowModal({
                  is_show: false,
                }),
              );
            }}
          >
            <img alt="back-icon" src={BackIcon} />
            Back
          </button>
          <h1>{props.client.business_name}</h1>
        </Modal.Header>
        <Modal.Body>
          <Tabs activeKey="due-diligence">
            <Tab
              eventKey="due-diligence"
              title={
                <div>
                  <span>Due Diligence</span>
                </div>
              }
            >
              <div className="mx-5 px-5 pb-5">
                <Row className="my-5">
                  <Col>
                    <Col md={{ span: 10, offset: 1 }}>
                      <label className="switch">
                        <input
                          type="checkbox"
                          disabled
                          checked={
                            requirements.findIndex(x => x.type === 'DOCUMENT') >
                              -1 &&
                            requirements[
                              requirements.findIndex(x => x.type === 'DOCUMENT')
                            ].is_active
                          }
                          onChange={evt => {
                            handleOnChangeCheckbox(
                              evt,
                              requirements.findIndex(
                                x => x.type === 'DOCUMENT',
                              ),
                              'DOCUMENT',
                            );
                          }}
                        />
                      </label>
                      <img
                        src={documentIcon}
                        alt="Registration/ Incorporation Certificate and other related documents icon"
                        title="Registration/ Incorporation Certificate and other related documents icon"
                      />
                      <span className="default-color ml-2 font-medium font-size-14">
                        Registration/ Incorporation Certificate and other
                        related documents
                      </span>
                    </Col>
                    <Col md={{ span: 10, offset: 3 }}>
                      <ul>
                        <li className="col-md-6 float-right">
                          Registration/Incorporation Number
                        </li>
                        <li className="col-md-6">Date of Incorporation</li>
                        <li className="col-md-6 float-right">
                          Country of Incorporation/Registration
                        </li>
                        <li className="col-md-6">Nature of Business</li>
                        <li className="col-md-6 float-right">
                          Type of Corporation/Entity
                        </li>
                        <li className="col-md-6">Tax Identification Number</li>
                        <li className="col-md-6">
                          Latest General Information Sheet (For Philippine
                          Entity)
                        </li>
                      </ul>
                    </Col>
                    {requirements.map((requirement, index) =>
                      requirement.type === 'DOCUMENT' &&
                      requirement.requirement_files &&
                      requirement.requirement_files.length > 0 ? (
                        <Col md={{ span: 10, offset: 2 }}>
                          <small className="font-italic-poppin default-black">
                            Note: Accepts only 10MB max size, PDF, JPG, JPEG,
                            and PNG format.
                          </small>
                          <table className="upload multiple-files" key={index}>
                            {requirement.requirement_files.map((file, key) => (
                              <tr key={key}>
                                <td>
                                  <a href={file.file} target="_blank">
                                    {renderFileName(file.file)}
                                  </a>
                                  <div className="timestamp">
                                    {formatISOtoLongYear(file.createdAt, true)}
                                  </div>
                                  <a
                                    className="download-button"
                                    href={file.file}
                                  >
                                    <img src={downloadIcon} />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </table>
                        </Col>
                      ) : (
                        <span />
                      ),
                    )}
                  </Col>
                </Row>
                <hr />
                <Row className="py-3">
                  <Col>
                    <Col md={{ span: 10, offset: 1 }}>
                      {requirements && (
                        <label className="switch">
                          <input
                            disabled
                            type="checkbox"
                            checked={
                              requirements.findIndex(
                                x => x.type === 'VALID-ID',
                              ) > -1 &&
                              requirements[
                                requirements.findIndex(
                                  x => x.type === 'VALID-ID',
                                )
                              ].is_active
                            }
                            onChange={evt => {
                              handleOnChangeCheckbox(
                                evt,
                                requirements.findIndex(
                                  x => x.type === 'VALID-ID',
                                ),
                                'VALID-ID',
                              );
                            }}
                          />
                        </label>
                      )}
                      <img
                        src={representativeIcon}
                        alt="Name and valid IDs of the authorized representative icon"
                        title="Name and valid IDs of the authorized representative icon"
                      />
                      <span className="default-color ml-2 font-medium font-size-14">
                        Name and valid IDs of the authorized representative
                      </span>
                    </Col>
                    <Col md={{ span: 6, offset: 3 }}>
                      <p className="ml-3">
                        Provide at least one Government ID such as but not
                        limited to Passport Photo ID (Foreigner), Driver’s
                        License, UMID, PhilHealth, TIN ID, Postal ID, Voters ID,
                        PRC ID, Senior Citizen ID, OFW ID. Upload the ID of both
                        sides.
                      </p>
                    </Col>
                    <Col md={{ span: 10, offset: 2 }} className="mt-5">
                      {requirements.map((requirement, index) =>
                        requirement.type === 'VALID-ID' &&
                        requirement.requirement_files &&
                        requirement.requirement_files.length > 0 ? (
                          <table
                            className="upload authorized-representative"
                            key={index}
                          >
                            {requirement.requirement_files.map((file, ke) => (
                              <>
                                <div className="card-uploaded-files">
                                  <tr key={`${ke}rand`}>
                                    <span className="gray-color">
                                      {file.first_name} {file.last_name}
                                    </span>
                                  </tr>
                                  <tr key={`${ke}rand`} className="mt-2">
                                    <span className="gray-color">
                                      {translateToHumanReadableFormat(
                                        file.type,
                                      )}
                                    </span>
                                  </tr>
                                  <tr key={ke} className="mt-3">
                                    <td>
                                      <a href={file.file} target="_blank">
                                        {renderFileName(file.file)}
                                      </a>
                                      <div
                                        className="timestamp"
                                        style={{ color: '#2675E4' }}
                                      >
                                        {formatISOtoLongYear(
                                          file.createdAt,
                                          true,
                                        )}
                                      </div>
                                      <a
                                        className="download-button"
                                        href={file.file}
                                      >
                                        <img src={downloadIcon} />
                                      </a>
                                    </td>
                                  </tr>
                                </div>
                              </>
                            ))}
                          </table>
                        ) : (
                          <span />
                        ),
                      )}
                    </Col>
                  </Col>
                </Row>
                <hr />
                <Row className="py-3">
                  <Col>
                    <Col md={{ span: 10, offset: 1 }}>
                      {requirements && (
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={
                              requirements.findIndex(
                                x => x.type === 'AUTHORIZATION',
                              ) > -1 &&
                              requirements[
                                requirements.findIndex(
                                  x => x.type === 'AUTHORIZATION',
                                )
                              ].is_active
                            }
                            onChange={evt => {
                              handleOnChangeCheckbox(
                                evt,
                                requirements.findIndex(
                                  x => x.type === 'AUTHORIZATION',
                                ),
                                'AUTHORIZATION',
                              );
                            }}
                          />
                        </label>
                      )}
                      <img
                        src={certificateIcon}
                        alt="Authorization Certificate to Signatory/ies icon"
                        title="Authorization Certificate to Signatory/ies icon"
                      />
                      <span className="default-color ml-2 font-medium font-size-14">
                        Authorization Certificate to Signatory/ies
                      </span>
                    </Col>
                    {requirements.map((requirement, index) =>
                      requirement.type === 'AUTHORIZATION' &&
                      requirement.requirement_files &&
                      requirement.requirement_files.length > 0 ? (
                        <Col className="mt-4" md={{ span: 10, offset: 2 }}>
                          <small className="font-italic-poppin default-black">
                            Note: Accepts only 10MB max size, PDF, JPG, JPEG,
                            and PNG format.
                          </small>
                          <table className="upload" key={index}>
                            {requirement.requirement_files.map((file, key) => (
                              <tr key={key}>
                                <td>
                                  <a href={file.file} target="_blank">
                                    {renderFileName(file.file)}
                                  </a>
                                  <div className="timestamp">
                                    {formatISOtoLongYear(file.createdAt, true)}
                                  </div>
                                  <a
                                    className="download-button"
                                    href={file.file}
                                  >
                                    <img src={downloadIcon} />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </table>
                        </Col>
                      ) : (
                        <span />
                      ),
                    )}
                  </Col>
                </Row>
                <hr />
                <Row className="py-3">
                  <Col>
                    <Row className="align-items-center">
                      <Col md={{ span: 5, offset: 1 }}>
                        <img
                          src={othersIcon}
                          className="ml-5 pl-4"
                          alt="Authorization Certificate to Signatory/ies icon"
                          title="Authorization Certificate to Signatory/ies icon"
                        />
                        <span className="default-color ml-2 font-medium font-size-14">
                          Others
                        </span>
                      </Col>
                      <Col md={5} className="text-right button-section">
                        <i
                          onClick={handleOnClickAddOthers}
                          className="fa fa-plus"
                        />
                        <span
                          className="font-size-14 font-medium"
                          onClick={handleOnClickAddOthers}
                        >
                          Add
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {requirements &&
                  requirements.map((requirement, requirementIndex) => {
                    if (requirement.type === 'OTHERS') {
                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <Row
                          className="py-3"
                          key={`${requirementIndex}-requirement`}
                        >
                          <Col className="others-section">
                            <Col md={{ span: 11, offset: 1 }}>
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  checked={requirement.is_active}
                                  onChange={evt => {
                                    handleOnCheckOthers(evt, requirementIndex);
                                  }}
                                />
                              </label>
                              <Form>
                                <Form.Group className="mx-4 px-2">
                                  <Form.Label>Title</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    value={requirement.title}
                                    onChange={evt => {
                                      handleOnChangeTitle(
                                        evt,
                                        requirementIndex,
                                      );
                                    }}
                                  />
                                </Form.Group>
                                <Form.Group className="mx-4 px-2">
                                  <Form.Label>Description</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    placeholder="Enter your description"
                                    value={requirement.description}
                                    onChange={evt => {
                                      handleOnChangeDescription(
                                        evt,
                                        requirementIndex,
                                      );
                                    }}
                                  />
                                </Form.Group>
                                {requirement.requirement_files &&
                                  requirement.requirement_files.length > 0 &&
                                  requirement.requirement_files.map(
                                    (file, index) => (
                                      <div className="mx-4 px-2">
                                        <small className="font-italic-poppin default-black">
                                          Note: Accepts only 10MB max size, PDF,
                                          JPG, JPEG, and PNG format.
                                        </small>
                                        <table className="upload" key={index}>
                                          {requirement.requirement_files.map(
                                            (file, index2) => (
                                              <tr key={index2}>
                                                <td>
                                                  <a
                                                    href={file.file}
                                                    target="_blank"
                                                  >
                                                    {renderFileName(file.file)}
                                                  </a>
                                                  <div className="timestamp">
                                                    {formatISOtoLongYear(
                                                      file.createdAt,
                                                      true,
                                                    )}
                                                  </div>
                                                  <a
                                                    className="download-button"
                                                    href={file.file}
                                                  >
                                                    <img src={downloadIcon} />
                                                  </a>
                                                </td>
                                              </tr>
                                            ),
                                          )}
                                        </table>
                                      </div>
                                    ),
                                  )}
                                <Form.Group className="form-bottom">
                                  {/* <span
                                    onClick={() => {
                                      handleOnClickClear(requirementIndex);
                                    }}
                                  >
                                    Clear
                                  </span> */}
                                  <i
                                    className="fa fa-times-circle"
                                    disabled={
                                      requirement.requirement_files &&
                                      requirement.requirement_files.length > 0
                                    }
                                    onClick={() => {
                                      handleOnClickRemoveOthers(
                                        requirementIndex,
                                      );
                                    }}
                                  />
                                  <span
                                    disabled={
                                      requirement.requirement_files &&
                                      requirement.requirement_files.length > 0
                                    }
                                    onClick={() => {
                                      handleOnClickRemoveOthers(
                                        requirementIndex,
                                      );
                                    }}
                                  >
                                    Delete
                                  </span>
                                </Form.Group>
                              </Form>
                            </Col>
                          </Col>
                        </Row>
                      );
                    }
                  })}
                <hr />
                <Row>
                  <Col md={12} className="nav-buttons mt-3">
                    <Button
                      onClick={() => dispatch(setConfirmationModal(true))}
                      className="save-btn"
                    >
                      Save
                    </Button>
                    {!isFormValid && isFormSaved && (
                      <span className="error-message">
                        {' '}
                        Please check at least 1 requirement
                      </span>
                    )}
                    <Button
                      className="prospect-btn"
                      disabled={!isFormSaved}
                      onClick={() => dispatch(setAssignToProspectModal(true))}
                    >
                      Assign to Prospect
                    </Button>
                  </Col>
                </Row>
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </div>
      <Modal
        show={isDdSuccess}
        className="save-modal success"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Body>
          <img
            src={CheckIcon}
            title="Check Icon"
            className="d-block mx-auto mb-4"
            alt="Check Icon"
          />
          <h4>Record has been saved</h4>
          <div className="modal-btn pt-3 mt-3">
            <Button
              variant="primary"
              className="yes"
              onClick={() => {
                closeMessages();
              }}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={isDdFailed}
        size="md"
        className="save-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Body>
          <h4>Failed</h4>
          <p>Failed to save, please contact admin</p>
          <div className="modal-btn pt-4">
            <button
              variant="secondary"
              className="no"
              onClick={() => closeMessages()}
            >
              Close
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={confirmation}
        className="save-modal-due-diligence"
        centered
        backdrop="static"
      >
        <Modal.Body>
          <img
            src={ArrowSaveIcon}
            title="Arrow Save Icon"
            alt="Arrow Save Icon"
            className="d-block mx-auto mb-4"
          />
          <h4 className="mb-3">Are you sure you want to save this record?</h4>
          <p>
            {' '}
            If <span className="font-semibold">YES</span>, all changes shall be
            saved but not assigned yet.{' '}
          </p>
          <p>
            {' '}
            If <span className="font-semibold">NO</span>, click the button{' '}
            <span className="font-semibold">"No"</span> if you do not wish to
            proceed with saving.{' '}
          </p>
          <div className="modal-btn pt-3 mt-3">
            <Button
              variant="primary"
              className="no"
              onClick={() => {
                closeMessages();
              }}
            >
              No
            </Button>
            <Button
              variant="primary"
              className="yes"
              onClick={() => {
                dispatch(setConfirmationModal(false));
                handleOnClickSave();
              }}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={assignToProspectModal}
        className="confirm-save-modal"
        centered
      >
        <Modal.Body>
          <img
            src={assignProspectIcon}
            title="Assign Prospect Icon"
            alt="Assign Prospect Icon"
            className="d-block mx-auto w-25 mb-4"
          />
          <h4>Are you sure you want to assign this to the client prospect?</h4>
          <div className="modal-btn pt-3 mt-3">
            <Button
              variant="primary"
              className="no"
              onClick={() => {
                closeMessages();
              }}
            >
              No
            </Button>
            <Button
              variant="primary"
              className="yes"
              onClick={() => {
                handleAssignToProspect();
                dispatch(setAssignToProspectModal(false));
              }}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={assignToProspectSuccess}
        className="save-modal success"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Body>
          <img
            src={CheckIcon}
            title="Check Icon"
            className="d-block mx-auto mb-4"
            alt="Check Icon"
          />
          <h4>Assigned to client prospect</h4>
          <div className="modal-btn pt-3 mt-3">
            <Button
              variant="primary"
              className="yes"
              onClick={() => {
                closeMessages();
              }}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </LoadingOverlay>
  );
}

DueDiligenceModal.propTypes = {
  dispatch: PropTypes.any,
  client: PropTypes.any,
  dueDiligence: PropTypes.any,
};

export default memo(DueDiligenceModal);
