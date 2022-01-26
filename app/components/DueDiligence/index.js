/**
 *
 * DueDiligence
 *
 */

import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Card,
  Form,
  Modal,
  Button,
} from 'react-bootstrap';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  formatISOtoLongYear,
  translateToHumanReadableFormat,
  renderFileName,
} from '../../containers/App/globalHelpers';
import deleteIcon from '../../assets/images/hub/agreement/delete-icon.png';
import submitIcon from '../../assets/images/hub/agreement/submit-icon.svg';
import checkIcon from '../../assets/images/hub/recruitment/check_icon.svg';
import errorIcon from '../../assets/images/hub/recruitment/error_icon.svg';
const _ = require('lodash');
const registration = require('../../assets/images/hub/agreement/registration.svg');
const id = require('../../assets/images/hub/agreement/id.svg');
const authorization = require('../../assets/images/hub/agreement/authorization.svg');
const others = require('../../assets/images/hub/agreement/others.svg');
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function DueDiligence(props) {
  const {
    dueDiligence,
    formData,
    dispatch,
    submitDueDiligence,
    dueDiligenceLoading,
    saveDueDiligenceFailed,
    saveDueDiligenceSuccess,
    closeMessages,
  } = props;
  const { requirements } = dueDiligence[0];

  const [ddId, setDdId] = useState();
  const [registrationFiles, setRegistrationFiles] = useState([]);
  const [validIds, setValidIds] = useState([]);
  const [authorizationCertificates, setAuthorizationCertificates] = useState(
    [],
  );
  const [otherDocuments, setOtherDocuments] = useState([]);
  const [finalData, setFinalData] = useState();
  const [clientId, setClientId] = useState();
  const [registrationRequirementId, setRegistrationRequirementId] = useState();
  const [
    authorizationRequirementId,
    setAuthorizationRequirementId,
  ] = useState();
  const [removedExistingFiles, setRemovedExistingFiles] = useState([]);
  const [removedExistingFilesKey, setRemovedExistingFilesKey] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const availableRequirements = [];
  const dueDiligenceState = dueDiligence[0].status;

  if (dueDiligence.length > 0) {
    dueDiligence[0].requirements.forEach(dd => {
      availableRequirements.push(dd.type);
    });
  }

  const dataPlaceHolder = {
    registration: [],
    ids: [],
    authorization: [],
    others: [],
    authorizationRequirementId: undefined,
    registrationRequirementId: undefined,
  };

  useEffect(() => {
    requirements.forEach(req => {
      switch (req.type) {
        case 'DOCUMENT':
          dataPlaceHolder.registrationRequirementId = req.requirement_id;
          if (req.requirement_files.length > 0) {
            req.requirement_files.forEach(file => {
              file.requirement_id = req.requirement_id;
              file.isUploadedToServer = true;
              dataPlaceHolder.registration.push(file);
            });
          }
          break;
        case 'VALID-ID':
          if (req.requirement_files.length > 0) {
            req.requirement_files.forEach(file => {
              file.requirement_id = req.requirement_id;
              file.isUploadedToServer = true;
              dataPlaceHolder.ids.push(file);
            });
            return;
          }
          dataPlaceHolder.ids.push({
            first_name: '',
            last_name: '',
            type: '',
            file: '',
            isUploadedToServer: false,
            requirement_id: req.requirement_id,
          });
          break;
        case 'AUTHORIZATION':
          dataPlaceHolder.authorizationRequirementId = req.requirement_id;
          if (req.requirement_files.length > 0) {
            req.requirement_files.forEach(file => {
              file.isUploadedToServer = true;
              dataPlaceHolder.authorization.push(file);
            });
          }
          break;
        case 'OTHERS':
          if (req.requirement_files.length > 0) {
            req.requirement_files.forEach(file => {
              file.requirement_id = req.requirement_id;
              file.title = req.title;
              file.description = req.description;
              file.isUploadedToServer = true;
              dataPlaceHolder.others.push(file);
            });
            return;
          }
          dataPlaceHolder.others.push({
            title: req.title,
            description: req.description,
            file: '',
            isUploadedToServer: false,
            requirement_id: req.requirement_id,
          });

          break;
      }
    });

    setRegistrationFiles(dataPlaceHolder.registration);
    setValidIds(dataPlaceHolder.ids);
    setAuthorizationCertificates(dataPlaceHolder.authorization);
    setOtherDocuments(dataPlaceHolder.others);
    setDdId(dueDiligence[0].due_diligence_id);
    setClientId(dueDiligence[0].client_id);
    setAuthorizationRequirementId(dataPlaceHolder.authorizationRequirementId);
    setRegistrationRequirementId(dataPlaceHolder.registrationRequirementId);
  }, []);
  /**
   * handles the registration data
   */
  const handleUploadRegistration = ({ meta, file }, status) => {
    const temp = new Array(...registrationFiles);
    if (status === 'done') {
      temp.push(file);
      file.isUploadedToServer = false;
      setRegistrationFiles(temp);
      return;
    }
    if (status === 'removed') {
      registrationFiles.forEach((registration, key) => {
        if (registration.name === file.name) {
          temp.splice(key, 1);
        }
      });
    }
    setRegistrationFiles(temp);
  };

  const handleRemoveRegistration = key => {
    const temp = new Array(...registrationFiles);
    const removedFiles = new Array(...removedExistingFiles);
    removedFiles.push(temp[key].id);
    setRemovedExistingFiles([...removedExistingFiles, temp[key].id]);
    temp.splice(key, 1);
    setRegistrationFiles(temp);
    const removedKey = new Array(...removedExistingFilesKey);
    removedKey.push({
      type: 'registration',
      key,
    });
    setRemovedExistingFilesKey(removedKey);
  };

  /**
   * handle the upload ids
   */
  const handleUploadIds = ({ meta, file }, status, target, key) => {
    const temp = new Array(...validIds);
    if (status === 'done') {
      temp[key][target] = file;
      setValidIds(temp);
    }
  };

  const handleRemoveUploadedId = key => {
    const temp = new Array(...validIds);
    temp[key].file = undefined;
    temp[key].isUploadedToServer = false;
    setRemovedExistingFiles([...removedExistingFiles, temp[key].id]);
    setRemovedExistingFilesKey([
      ...removedExistingFilesKey,
      { type: 'validIds', key },
    ]);
    setValidIds(temp);
  };

  const handleUploadAuthorization = ({ meta, file }, status) => {
    if (status === 'done') {
      file.isUploadedToServer = false;
      setAuthorizationCertificates([...authorizationCertificates, file]);
      return;
    }
    if (status === 'removed') {
      setAuthorizationCertificates([]);
    }
  };

  const handleRemoveAuthorization = key => {
    const temp = new Array(...authorizationCertificates);
    setAuthorizationCertificates([]);
    setRemovedExistingFiles([...removedExistingFiles, temp[key].id]);
    setRemovedExistingFilesKey([
      ...removedExistingFilesKey,
      { type: 'authorization', key },
    ]);
  };

  const handleUploadOthers = ({ meta, file }, status, target, key) => {
    if (status === 'done') {
      const temp = new Array(...otherDocuments);
      temp[key][target] = file;
      setOtherDocuments(temp);
    }
  };

  const handleRemoveUploadedOthers = key => {
    const temp = new Array(...otherDocuments);
    temp[key].file = undefined;
    temp[key].isUploadedToServer = false;

    setRemovedExistingFiles([...removedExistingFiles, temp[key].id]);

    setOtherDocuments(temp);

    setRemovedExistingFilesKey([
      ...removedExistingFilesKey,
      {
        type: 'otherDocuments',
        key,
      },
    ]);
  };

  // adds or deletes row data
  const handleValidIdData = (mode, key) => {
    const temp = new Array(...validIds);
    if (mode == 'delete') {
      setRemovedExistingFiles([...removedExistingFiles, temp[key].id]);
      temp.splice(key, 1);
      setValidIds(temp);
      return;
    }
    temp.push({
      first_name: '',
      last_name: '',
      type: '',
      file: '',
      requirement_id: validIds[0].requirement_id,
    });
    setValidIds(temp);
  };

  // handler for changing ids
  const handleChangeValidIds = (target, key, value) => {
    const temp = new Array(...validIds);
    temp[key][target] = value;
    setValidIds(temp);
  };

  const handleSubmit = () => {
    const data = {
      dueDiligenceId: ddId,
      clientId,
      registration: registrationFiles,
      authorizationRequirementId,
      registrationRequirementId,
      validIds,
      authorization: authorizationCertificates,
      others: otherDocuments,
      status: dueDiligenceState,
      removedExistingFiles,
      removedExistingFilesKey,
    };
    setFinalData(data);
    if (handleValidate(data)) {
      dispatch(submitDueDiligence(data));
    }
    setShowSubmitModal(false);
  };

  const handleValidate = data => {
    if (availableRequirements.includes('DOCUMENTS')) {
      if (registrationFiles.length === 0) {
        return false;
      }
    }

    if (availableRequirements.includes('VALID-ID')) {
      let hasErrors = false;
      validIds.forEach(id => {
        if (
          id.first_name === '' ||
          id.last_name === '' ||
          id.type === '' ||
          !id.file
        ) {
          hasErrors = true;
        }
      });

      if (hasErrors === true) {
        return false;
      }
    }

    if (availableRequirements.includes('AUTHORIZATION')) {
      if (authorizationCertificates.length === 0) {
        return false;
      }
    }

    if (availableRequirements.includes('OTHERS')) {
      let hasErrors = false;
      otherDocuments.forEach(doc => {
        if (!doc.file) {
          hasErrors = true;
        }
      });
      if (hasErrors === true) {
        return false;
      }
    }

    return true;
  };

  return (
    <>
      {dueDiligenceLoading ? (
        <h1> Loading .... </h1>
      ) : (
        <div id="due-diligence" className="container">
          {requirements && availableRequirements.includes('DOCUMENT') && (
            <div className="registration m-3">
              <Row>
                <Col>
                  <div>
                    <img src={registration} alt="registration" />
                    <span className="default-color font-medium font-size-14">
                      Registration/ Incorporation Certificate and other related
                      documents
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip
                            id="tooltip-right tooltip-due-diligence"
                            className="tooltip-content"
                          >
                            <ul
                              className="m-0"
                              style={{ padding: '10px 20px' }}
                            >
                              <li>Registration/ Incorporation Number</li>
                              <li>Date of Incorporation</li>
                              <li>Country of Incorporation/ Registration</li>
                              <li>Nature of Business</li>
                              <li>Type of Corporation/ Entity</li>
                              <li>Tax Identification Number</li>
                              <li>
                                Latest General Information Sheet (For Philippine
                                Entity)
                              </li>
                            </ul>
                          </Tooltip>
                        }
                      >
                        <span
                          variant="secondary"
                          className="icon-table icon-tooltip align-self-center"
                        />
                      </OverlayTrigger>
                    </span>
                    <Col md={{ span: 10, offset: 1 }}>
                      <small className="mb-2 mt-3 d-block font-italic-poppin">
                        Note: Accepts only 10MB max size, PDF, JPG, JPEG, and
                        PNG format.
                      </small>
                      {dueDiligenceState === 'SUBMITTED' &&
                        registrationFiles.length !== 0 &&
                        registrationFiles[0].isUploadedToServer && (
                          <table className="upload multiple-files">
                            {registrationFiles.map((reg, key) => (
                              reg.isUploadedToServer === true && (
                                <tr key={key}>
                                  <td>
                                    <a href={reg.file} target="_blank">
                                      {renderFileName(reg.file)}
                                    </a>
                                    <div className="timestamp">
                                      {formatISOtoLongYear(reg.createdAt, true)}
                                    </div>
                                    <a className="delete-button">
                                      <img
                                        src={deleteIcon}
                                        onClick={() =>
                                          handleRemoveRegistration(key)
                                        }
                                      />
                                    </a>
                                  </td>
                                </tr>
                              )
                            ))}
                          </table>
                        )}
                    </Col>
                  </div>
                  <Col md={{ span: 10, offset: 1 }}>
                    <div className="upload-file-section">
                      <Dropzone
                        onChangeStatus={handleUploadRegistration}
                        accept="image/png,image/jpg,image/jpeg,application/pdf"
                        maxSizeBytes={10000000}
                        inputContent="Drag ’n’drop some files here, or click to select files"
                      />
                    </div>
                    {registrationFiles.length === 0 && finalData && (
                      <span className="error-message">
                        This field is required.
                      </span>
                    )}
                  </Col>
                </Col>
              </Row>
              <br />
              <hr />
            </div>
          )}
          {requirements && availableRequirements.includes('VALID-ID') && (
            <div className="ids m-3">
              <Row>
                <Col>
                  <div>
                    <img src={id} alt="id" />
                    <span className="default-color font-medium font-size-14">
                      Name and valid IDs of the authorized representative
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip
                            id="tooltip-right tooltip-due-diligence"
                            className="tooltip-content"
                          >
                            Provide one Government ID such as but not limited to
                            Passport Photo ID (Foreigner), Driver’s License,
                            UMID, PhilHealth, TIN ID, Postal ID, Voters ID, PRC
                            ID, Senior Citizen ID, OFW ID. Upload the ID of both
                            sides.
                          </Tooltip>
                        }
                      >
                        <span
                          variant="secondary"
                          className="icon-table icon-tooltip align-self-center"
                        />
                      </OverlayTrigger>
                    </span>
                    <div className="container-fluid">
                      <div className="form-ids">
                        <Col
                          md={11}
                          className="text-right p-0 mb-4 button-section"
                        >
                          <i
                            className="fa fa-plus"
                            onClick={() => handleValidIdData('add', null)}
                          />
                          <span
                            onClick={() => handleValidIdData('add', null)}
                            className="font-size-14 font-medium"
                          >
                            Add
                          </span>
                        </Col>
                        {validIds.map((id, key) => (
                          <Card key={key}>
                            <Card.Body>
                              <div className="p-4">
                                <Row className="mb-3">
                                  <Col span={6}>
                                    <label>
                                      First Name
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Form.Control
                                      value={id.first_name}
                                      onChange={e =>
                                        handleChangeValidIds(
                                          'first_name',
                                          key,
                                          e.target.value,
                                        )
                                      }
                                    />
                                    {finalData && id.first_name === '' && (
                                      <span className="error-message">
                                        This field is required.
                                      </span>
                                    )}
                                  </Col>
                                  <Col span={6}>
                                    <label>
                                      Last Name
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Form.Control
                                      value={id.last_name}
                                      onChange={e =>
                                        handleChangeValidIds(
                                          'last_name',
                                          key,
                                          e.target.value,
                                        )
                                      }
                                    />
                                    {finalData && id.last_name === '' && (
                                      <span className="error-message">
                                        This field is required.
                                      </span>
                                    )}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={6}>
                                    <label>
                                      Government ID type
                                      <span className="text-danger">*</span>
                                    </label>
                                    {formData && formData.validIdLists && id && (
                                      <Form.Control
                                        as="select"
                                        value={id.type}
                                        onChange={e =>
                                          handleChangeValidIds(
                                            'type',
                                            key,
                                            e.target.value,
                                          )
                                        }
                                      >
                                        <option value="" />
                                        {formData.validIdLists.map(
                                          (validId, key2) => (
                                            <option key={key2} value={validId}>
                                              {translateToHumanReadableFormat(
                                                validId,
                                              )}
                                            </option>
                                          ),
                                        )}
                                      </Form.Control>
                                    )}
                                    {finalData && id.type === '' && (
                                      <span className="error-message">
                                        This field is required.
                                      </span>
                                    )}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <small className="mb-2 d-block font-italic-poppin pt-4">
                                      Note: Accepts only 10MB max size, PDF,
                                      JPG, JPEG, and PNG format.
                                    </small>
                                    {dueDiligenceState === 'SUBMITTED' &&
                                      id.isUploadedToServer && (
                                        <table className="upload">
                                          <tr>
                                            <td>
                                              <a href={id.file} target="_blank">
                                                {renderFileName(id.file)}
                                              </a>
                                              <div className="timestamp">
                                                {formatISOtoLongYear(
                                                  id.createdAt,
                                                  true,
                                                )}
                                              </div>
                                              <div className="delete-btn-section">
                                                <img
                                                  src={deleteIcon}
                                                  onClick={() => {
                                                    handleRemoveUploadedId(key);
                                                  }}
                                                />
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      )}
                                    {!id.isUploadedToServer && (
                                      <div className="with-file pb-1">
                                        <Dropzone
                                          onChangeStatus={(
                                            { meta, file },
                                            status,
                                          ) =>
                                            handleUploadIds(
                                              { meta, file },
                                              status,
                                              'file',
                                              key,
                                            )
                                          }
                                          maxFiles={1}
                                          multiple={false}
                                          maxSizeBytes={10000000}
                                          inputContent="Drag ’n’drop some files here, or click to select files"
                                          accept="image/png,image/jpg,image/jpeg,application/pdf"
                                        />
                                      </div>
                                    )}
                                  </Col>
                                </Row>
                              </div>
                              {finalData && !id.file && (
                                <div
                                  className="px-4"
                                  style={{ margin: '-25px 0 0 0' }}
                                >
                                  <span className="error-message">
                                    This field is required.
                                  </span>
                                </div>
                              )}
                            </Card.Body>
                            {validIds.length !== 1 && (
                              <div className="delete-card-footer">
                                <span className="delete-icon">
                                  <img
                                    src={deleteIcon}
                                    onClick={() =>
                                      handleValidIdData('delete', key)
                                    }
                                  />
                                </span>
                                <span
                                  className="delete-text"
                                  onClick={() =>
                                    handleValidIdData('delete', key)
                                  }
                                >
                                  Delete
                                </span>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <hr />
            </div>
          )}
          {requirements && availableRequirements.includes('AUTHORIZATION') && (
            <div className="authorization-certificate m-3">
              <Row>
                <Col>
                  <div>
                    <img src={authorization} alt="authorization" />
                    <span className="default-color font-medium font-size-14">
                      Authorization Certificate to Signatory/ies
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip
                            id="tooltip-right"
                            className="tooltip-content"
                          >
                            If the signatory is neither the president nor head
                            of the organization
                          </Tooltip>
                        }
                      >
                        <span
                          variant="secondary"
                          className="icon-table icon-tooltip align-self-center"
                        />
                      </OverlayTrigger>
                    </span>
                  </div>
                  <div>
                    {dueDiligenceState === 'SUBMITTED' &&
                      authorizationCertificates.length !== 0 &&
                      authorizationCertificates[0].isUploadedToServer && (
                        <Col md={{ span: 10, offset: 1 }} className="px-4">
                          <small className="font-italic-poppin default-black">
                            Note: Accepts only 10MB max size, PDF, JPG, JPEG,
                            and PNG format.
                          </small>
                          <table className="upload">
                            {authorizationCertificates.map((auth, key) => (
                              <tr key={key}>
                                <td>
                                  <a href={auth.file} target="_blank">
                                    {renderFileName(auth.file)}
                                  </a>

                                  <div className="timestamp">
                                    {formatISOtoLongYear(auth.createdAt, true)}
                                  </div>
                                  <div className="delete-btn-section">
                                    <img
                                      src={deleteIcon}
                                      onClick={() =>
                                        handleRemoveAuthorization(key)
                                      }
                                    />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </table>
                        </Col>
                      )}
                    <br />
                  </div>
                  {(authorizationCertificates.length === 0 ||
                    !authorizationCertificates[0].isUploadedToServer) && (
                    <Col md={{ span: 10, offset: 1 }} className="mb-3 px-4">
                      <small className="mb-2 d-block font-italic-poppin">
                        Note: Accepts only 10MB max size, PDF, JPG, JPEG, and
                        PNG format.
                      </small>
                      <Dropzone
                        onChangeStatus={handleUploadAuthorization}
                        maxFiles={1}
                        multiple={false}
                        maxSizeBytes={10000000}
                        accept="image/png,image/jpg,image/jpeg,application/pdf"
                        inputContent="Drag ’n’drop some files here, or click to select files"
                      />

                      {finalData && authorizationCertificates.length === 0 && (
                        <span className="error-message">
                          This field is required.
                        </span>
                      )}
                    </Col>
                  )}
                </Col>
              </Row>
              <hr />
            </div>
          )}
          {requirements && availableRequirements.includes('OTHERS') && (
            <div className="others m-3">
              <Row>
                <Col>
                  <div>
                    <img src={others} alt="authorization" />
                    <span className="default-color font-medium font-size-14">
                      Others
                    </span>
                  </div>
                  <div>
                    <br />
                  </div>
                  {otherDocuments.map((doc, key) => (
                    <Card key={key}>
                      <Card.Body className="p-4">
                        <Row className="mb-3">
                          <Col span={12}>
                            <div>Title</div>
                            <p>{doc.title}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            <div>Description</div>
                            <p>{doc.description}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            <small className="mb-2 d-block font-italic-poppin">
                              Note: Accepts only 10MB max size, PDF, JPG, JPEG,
                              and PNG format.
                            </small>
                            {dueDiligenceState === 'SUBMITTED' &&
                              doc.isUploadedToServer && (
                                <table className="upload">
                                  <tr>
                                    <td>
                                      <a href={doc.file} target="_blank">
                                        {renderFileName(doc.file)}
                                      </a>
                                      <div className="timestamp">
                                        {formatISOtoLongYear(
                                          doc.createdAt,
                                          true,
                                        )}
                                      </div>
                                      <div className="delete-btn-section">
                                        <img
                                          src={deleteIcon}
                                          onClick={() =>
                                            handleRemoveUploadedOthers(key)
                                          }
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              )}
                            {!doc.isUploadedToServer && (
                              <Dropzone
                                onChangeStatus={({ meta, file }, status) =>
                                  handleUploadOthers(
                                    { meta, file },
                                    status,
                                    'file',
                                    key,
                                  )
                                }
                                maxFiles={1}
                                multiple={false}
                                maxSizeBytes={10000000}
                                accept="image/png,image/jpg,image/jpeg,application/pdf"
                                inputContent="Drag ’n’drop some files here, or click to select files"
                              />
                            )}
                            {finalData && !doc.file && (
                              <span className="error-message">
                                This field is required.
                              </span>
                            )}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </Col>
              </Row>
            </div>
          )}
          <Col md={12} className="nav-buttons">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="btn btn-primary"
            >
              Submit
            </button>
          </Col>
          {/* confirmation */}
          <Modal
            show={showSubmitModal}
            onHide={() => setShowSubmitModal(false)}
            className="confirm-save-modal"
            backdrop="static"
            centered
          >
            <Modal.Body>
              <img
                src={submitIcon}
                title="Submit Save Icon"
                alt="Submit Save Icon"
                className="d-block mx-auto w-25 mb-4"
              />
              <h4 className="px-5 mx-3">
                Are you sure you want to submit your documents?
              </h4>
              <div className="modal-btn pt-3 mt-3">
                <Button
                  variant="secondary"
                  className="no"
                  onClick={() => setShowSubmitModal(false)}
                >
                  No
                </Button>
                <Button
                  variant="primary"
                  className="yes"
                  onClick={handleSubmit}
                >
                  Yes
                </Button>
              </div>
            </Modal.Body>
          </Modal>
          {/* success */}
          <Modal
            show={saveDueDiligenceSuccess}
            onHide={() => closeMessages()}
            className="confirm-save-modal"
            backdrop="static"
            centered
          >
            <Modal.Body>
              <img
                src={checkIcon}
                title="Check Icon"
                alt="Check Icon"
                className="d-block mx-auto w-25 mb-4"
              />
              <h4 className="px-5 mx-3">Successfully submitted!</h4>
              <div className="modal-btn pt-3 mt-3 text-center">
                <Button
                  variant="primary"
                  className="yes"
                  onClick={closeMessages}
                >
                  Ok
                </Button>
              </div>
            </Modal.Body>
          </Modal>
          {/* failed */}
          <Modal
            show={saveDueDiligenceFailed}
            onHide={() => closeMessages()}
            className="confirm-save-modal"
            backdrop="static"
            centered
          >
            <Modal.Body>
              <img
                src={errorIcon}
                title="Error Icon"
                alt="Error Icon"
                className="d-block mx-auto w-25 mb-4"
              />
              <h4 className="px-5 mx-3">
                Failed to submit, please contact admin!{' '}
              </h4>
              <div className="modal-btn pt-3 mt-3 text-center">
                <Button
                  variant="primary"
                  className="yes"
                  onClick={closeMessages}
                >
                  Ok
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}

DueDiligence.propTypes = {};

export default DueDiligence;
