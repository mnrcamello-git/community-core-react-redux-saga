/**
 *
 * ContractDraftModal
 *
 */

import React, { useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import Dropzone from 'react-dropzone-uploader';
import {
  Modal,
  Button,
  Form,
  Tooltip,
  OverlayTrigger,
  Row,
  Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  requestSaveContractDraft,
  showContractDraftModal,
} from '../../containers/Hub/AgreementPage/actions';
import {
  renderFileName,
  formatBytes,
} from '../../containers/App/globalHelpers';
import 'react-dropzone-uploader/dist/styles.css';
import BackIcon from '../../assets/images/hub/back_icon.png';
import CancelIcon from '../../assets/images/hub/recruitment/cancel_icon.svg';
import downloadIcon from '../../assets/images/noc/sales/blue-download-icon.png';
import deleteIcon from '../../assets/images/hub/agreement/delete-icon.png';
import disableScroll from 'disable-scroll';
import noContractDraftIcon from '../../assets/images/hub/agreement/no-contract-draft-icon.svg';
import acceptIcon from '../../assets/images/hub/agreement/thumbs-up-icon.png';
import rejectIcon from '../../assets/images/hub/agreement/thumbs-down-icon.png';
import acceptIconActive from '../../assets/images/hub/agreement/thumbs-up-icon-active.png';
import rejectIconActive from '../../assets/images/hub/agreement/thumbs-down-icon-active.png';
import rejectIconModal from '../../assets/images/hub/agreement/reject_contract.png';
import saveContractIcon from '../../assets/images/hub/agreement/save_accepted_contract.svg';
import styled from 'styled-components';
import checkIcon from '../../assets/images/hub/recruitment/check_icon.svg';
import loadingIcon from '../../assets/images/loading.svg';

function ContractDraftModal(props) {
  const { isDraftModalSuccess, isDraftModalFailed, closeMessages } = props;

  const [annotatedFile, setAnnotatedFile] = useState();
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [isShowSaveModal, setIsShowSaveModal] = useState(false);
  const [isAnnotatedFileRemoved, setIsAnnotatedFileRemoved] = useState(false);
  const [activeContract, setActiveContract] = useState(
    props.activeContractDraft,
  );
  const [reasonError, setReasonError] = useState(false);
  const [buttonError, setButtonError] = useState(false);
  const [isRejectButtonClicked, setRejectButtonClicked] = useState(false);
  const [showCancelModal, setIsShowCancelModal] = useState(false);
  const [errorFileSize, setErrorFileSize] = useState(false);
  const [iframeKey, setIframeKey] = useState(new Date().getTime());
  const [iframeLoading, setIframeLoading] = useState(false);

  // Max File Size
  const MAX_FILE_SIZE = 10485760;

  const handleOnChangeAnnotatedFile = ({ meta, file }, status) => {
    if (status === 'done') {
      setAnnotatedFile(file);
    }
    if (status === 'error_file_size') {
      setErrorFileSize(true);
    }
  };

  const handleOnClickDownloadContract = () => {
    if (activeContract.contract_draft !== '') {
      window.open(activeContract.contract_draft);
      return;
    }
    window.open('/contract-not-found');
  };

  const handleOnChangeReason = evt => {
    setActiveContract({
      ...activeContract,
      reason: evt.target.value,
    });
  };

  const handleOnChangeStatus = () => {
    setActiveContract({
      ...activeContract,
      status: 'ACCEPTED',
      revision_id: activeContract.isParent
        ? activeContract.agreement_id
        : activeContract.id,
    });
    setIsShowAcceptModal(true);
  };

  const handleSaveContract = () => {
    let hasErrors = false;
    if (
      activeContract.status !== 'FOR-AMENDMENT' &&
      activeContract.status !== 'ACCEPTED'
    ) {
      setButtonError(true);
      hasErrors = true;
    }

    if (!activeContract.reason) {
      setReasonError(true);
      hasErrors = true;
    }

    if (errorFileSize) {
      return;
    }

    if (hasErrors) {
      return;
    }
    setIsShowSaveModal(true);
    setReasonError(false);
    setButtonError(false);
  };

  const isDisabledLatestInput = (
    isContractLatest,
    contractStatus,
    IsRejectedClicked,
  ) => {
    if (isContractLatest) {
      if (contractStatus === 'ACCEPTED') {
        return true;
      }
      if (contractStatus === 'FOR-AMENDMENT') {
        return false;
      }
      if (IsRejectedClicked) {
        return false;
      }
    }
    return true;
  };

  const isDisabledLatestButton = (contractStatus, isContractLatest, type) => {
    if (isContractLatest && contractStatus === 'DRAFT') {
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    if (props.isDraftModalLoading) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
  }, [props.isDraftModalLoading])

  return (
    <>
      {props.isDraftModalLoading ? (
        <div style={{ height: '100vh' }}>
          <img 
            src={loadingIcon} 
            alt="loading" 
            className="mx-auto d-flex align-self-center"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'}}
          />
        </div>
      ) : (
        <>
        <Modal.Header>
        <button
          type="button"
          className="back-btn"
          onClick={() => {
            props.dispatch(
              showContractDraftModal({
                is_show: false,
              }),
            );
          }}
        >
          <img alt="back-icon" src={BackIcon} />
          Back
        </button>
      </Modal.Header>
      <Modal.Body>
        <Row style={{padding: '0 1rem', marginRight: '-17px', marginLeft: '-17px'}}>
          <Col 
            md={7} 
            sm={7} 
            className="left-side text-center" 
            style={{
                background: '#EFF4FA',
            }}
          >
            <a
              href="#"
              onClick={() => {
                setIframeLoading(true);
                setTimeout(() => {
                  setIframeKey(new Date().getTime());
                  setIframeLoading(false);
                }, 1000);
              }}
            >
              Document not loading? Click here to refresh
            </a>
          </Col>
        </Row>

        <Row className="modal-row">
          <Col md={7} className="left-side text-center">
            {activeContract.contract_draft !== '' ? (
              <>
                <IframeLoader
                  active={iframeLoading}
                  spinner
                  text={'Retrying..'}
                  style={{ height: '100%' }}
                >
                  <iframe
                    key={iframeKey}
                    title="PDF Viewer"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    src={`https://docs.google.com/gview?url=${activeContract.contract_draft ||
                      activeContract.gs_path}&embedded=true`}
                  />
                </IframeLoader>
              </>
            ) : (
              <div className="empty-state d-flex">
                <div className="align-self-center w-100 text-center">
                  <img src={noContractDraftIcon} />
                  <h3 className="font-semibold mt-3">
                    CONTRACT DRAFT UNAVAILABLE
                  </h3>
                  <p className="m-0">You don't have any contract drafts</p>
                </div>
              </div>
            )}
          </Col>
          <Col md={5} className="right-side p-0">
            <div className="menus">
              <h3>{activeContract.agreement_code} - Version {activeContract.version}</h3>
            </div>
            <hr />

            <div className="menus">
              <ul>
                <li>
                  <a
                    className="download-icon"
                    onClick={handleOnClickDownloadContract}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={downloadIcon} />
                  </a>
                  <br />
                  <span>Download</span>
                </li>
                <li className="divider">
                  <div />
                </li>
                <li>
                  {activeContract.status === 'ACCEPTED' && (
                    <Button
                      className="active"
                      onClick={() => {
                        handleOnChangeStatus();
                        setButtonError(false);
                      }}
                      disabled={activeContract.status !== 'DRAFT'}
                      id="contract-accepted"
                    >
                      <img src={acceptIconActive} />
                    </Button>
                  )}
                  {activeContract.status !== 'ACCEPTED' && (
                    <Button
                      onClick={() => {
                        handleOnChangeStatus();
                        setButtonError(false);
                      }}
                      disabled={isDisabledLatestButton(
                        activeContract.status,
                        activeContract.is_latest,
                      )}
                      id="contract-accepted"
                    >
                      <img src={acceptIcon} />
                    </Button>
                  )}
                  <span className="passed" htmlFor="contract-accepted">
                    Accept
                  </span>
                </li>
                <li>
                  {activeContract.status === 'FOR-AMENDMENT' && (
                    <Button
                      className="failed active"
                      id="contract-rejected"
                      disabled={isDisabledLatestButton(
                        activeContract.status,
                        activeContract.is_latest,
                      )}
                      onClick={() => {
                        setButtonError(false);
                        setActiveContract({
                          ...activeContract,
                          status: 'FOR-AMENDMENT',
                        });
                      }}
                    >
                      <img src={rejectIconActive} />
                    </Button>
                  )}
                  {activeContract.status !== 'FOR-AMENDMENT' && (
                    <Button
                      className="failed"
                      id="contract-rejected"
                      disabled={activeContract.status !== 'DRAFT'}
                      onClick={() => {
                        setButtonError(false);
                        setRejectButtonClicked(true);
                        setActiveContract({
                          ...activeContract,
                          status: 'FOR-AMENDMENT',
                        });
                      }}
                    >
                      <img src={rejectIcon} />
                    </Button>
                  )}
                  <span className="failed" htmlFor="contract-rejected">
                    For Amendment
                  </span>
                </li>
              </ul>
            </div>
            {buttonError && (
              <div className="menus">
                <span className="error-message">Please select an option</span>
              </div>
            )}
            <hr />
            <Form className="px-4 mx-3 mt-4 pt-2">
              <Form.Group>
                <Form.Label className="font-medium font-size-14 default-black">
                  Reason<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  disabled={isDisabledLatestInput(
                    activeContract.is_latest,
                    activeContract.status,
                    isRejectButtonClicked,
                  )}
                  as="textarea"
                  value={activeContract.reason ? activeContract.reason : ''}
                  onChange={handleOnChangeReason}
                  placeholder="Enter a reason"
                />
                {reasonError && (
                  <span className="error-message">Reason is required</span>
                )}
              </Form.Group>
              {activeContract.is_latest && (
                <Form.Group>
                  <p className="mb-2 d-block font-italic-poppin font-size-10">
                    You may upload an annotated file which consists of your
                    remarks and/ or corrections.
                    <br />
                    Only accepts only 10MB max size, word, PDF, JPG, JPEG, and
                    PNG format
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip
                          id="tooltip-right"
                          className="tooltip-content"
                        >
                          You may upload an annotated file which consists of
                          your remarks and/ or corrections
                        </Tooltip>
                      }
                    >
                      <span
                        variant="secondary"
                        className="icon-table icon-tooltip"
                      />
                    </OverlayTrigger>
                  </p>
                </Form.Group>
              )}
              <Form.Group>
                <Dropzone
                  styles={
                    errorFileSize
                      ? {
                          dropzone: { border: '1px solid red' },
                          inputLabel: { color: 'red', fontSize: 10 },
                          preview: { color: 'red' },
                        }
                      : {}
                  }
                  PreviewComponent={props => (
                    <PreviewComponent
                      {...props}
                      errorFileSize={errorFileSize}
                      setErrorFileSize={setErrorFileSize}
                    />
                  )}
                  disabled={isDisabledLatestInput(
                    activeContract.is_latest,
                    activeContract.status,
                    isRejectButtonClicked,
                  )}
                  accept="image/*,.pdf,.doc,.docx"
                  onChangeStatus={handleOnChangeAnnotatedFile}
                  multiple={false}
                  maxFiles={1}
                  inputContent="Drag ’n’drop some files here, or click to select files"
                  // inputContent="The file is too big, it could not be uploaded because it exceeds 10MB."
                  maxSizeBytes={MAX_FILE_SIZE}
                />
                {errorFileSize && (
                  <p className="error-message-upload-secondary">
                    Can't proceed in saving, please upload acceptable file
                    size.
                  </p>
                )}
                <br />
                {props.activeContractDraft.annotated_file &&
                  !isAnnotatedFileRemoved && (
                    <table className="upload">
                      <tr>
                        <td>
                          <span className="gray-color font-size-12 font-regular">
                            Annotated file:
                            {renderFileName(
                              props.activeContractDraft.annotated_file,
                            )}{' '}
                          </span>
                          <div className="action-btn">
                            <img
                              src={downloadIcon}
                              onClick={() =>
                                window.open(
                                  props.activeContractDraft.annotated_file,
                                )
                              }
                            />
                            {props.activeContractDraft.is_latest && (
                              <img
                                src={deleteIcon}
                                onClick={() => {
                                  setAnnotatedFile();
                                  setIsAnnotatedFileRemoved(true);
                                }}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    </table>
                  )}
              </Form.Group>
              <Form.Group className="nav-buttons mt-4">
                <Button
                  className="cancel-btn"
                  disabled={
                    activeContract.is_latest === false ||
                    activeContract.status === 'ACCEPTED'
                  }
                  onClick={() => {
                    setIsShowCancelModal(true);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={
                    activeContract.is_latest === false ||
                    activeContract.status === 'ACCEPTED'
                  }
                  onClick={() => {
                    handleSaveContract();
                  }}
                >
                  Save
                </Button>
              </Form.Group>
              <Col className="mt-4">
                <hr className="w-75" />
              </Col>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      {/* Are your sure Save Modal */}
      <Modal
        show={isShowAcceptModal}
        onHide={() => {
          setIsShowAcceptModal(false);
        }}
        className="confirm-save-modal"
        centered
      >
        <Modal.Body>
          {/* @TODO Image for this modal */}
          <img
            src={saveContractIcon}
            title="Save Contract Draft Icon"
            className="d-block mx-auto w-25 mb-4"
          />
          <h4>Are you sure you want to accept the contract?</h4>
          <div className="modal-btn pt-3 mt-3">
            <Button
              variant="secondary"
              className="no"
              onClick={() => {
                setIsShowAcceptModal(false);
                setActiveContract({
                  ...activeContract,
                  status: 'DRAFT',
                });
              }}
            >
              No
            </Button>
            <Button
              variant="primary"
              className="yes"
              onClick={() => {
                setIsShowAcceptModal(false);
                props.dispatch(
                  requestSaveContractDraft({
                    ...activeContract,
                    status: 'ACCEPTED',
                    reason: '',
                    annotated_file: '',
                    agreement_code: activeContract.agreement_code,
                    revision_id: activeContract.isParent
                      ? activeContract.agreement_id
                      : activeContract.id,
                  }),
                );
              }}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Success */}
      <Modal
        show={isDraftModalSuccess}
        onHide={() => {
          closeMessages();
        }}
        className="confirm-save-modal"
        centered
      >
        <Modal.Body>
          <img
            src={checkIcon}
            title="Check Icon"
            alt="Check Icon"
            className="d-block mx-auto w-25 mb-4"
          />
          {activeContract.status === 'ACCEPTED' && (
            <h4>Successfully accepted the contract</h4>
          )}
          {activeContract.status === 'FOR-AMENDMENT' && (
            <h4>Successfully requested an amendment for the contract</h4>
          )}
          {activeContract.status === 'DRAFT' && (
            <h4>Contract is still a draft, please select an option</h4>
          )}
          <div className="modal-btn pt-3 mt-3">
            <Button
              variant="primary"
              className="yes"
              onClick={() => {
                closeMessages();
              }}
            >
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Failed */}
      <Modal
        show={isDraftModalFailed}
        onHide={() => {
          closeMessages();
        }}
        className="confirm-save-modal"
        centered
      >
        <Modal.Body>
          <h4>Process failed, please contact admin</h4>
          <div className="modal-btn pt-3 mt-3">
            <Button
              variant="primary"
              className="yes"
              onClick={() => {
                closeMessages();
              }}
            >
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Are you sure cancel */}
      <Modal
        show={showCancelModal}
        onHide={() => {
          closeMessages();
        }}
        className="cancel-modal"
        centered
      >
        <Modal.Body>
          <img
            src={CancelIcon}
            title="Cancel Icon"
            alt=""
            className="d-block mx-auto w-25 mb-4"
          />
          <h4>Are you sure you want to cancel?</h4>
          <p className="mb-0 mt-2 text-danger">
            All changes made will not be saved.
          </p>
          <div className="modal-btn pt-3 mt-3">
            <Button
              variant="secondary"
              className="no"
              onClick={() => {
                setIsShowCancelModal(false);
              }}
            >
              No
            </Button>
            <Button
              variant="primary"
              className="yes"
              onClick={() => {
                closeMessages();
              }}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* are you sure save  */}
      <Modal
        show={isShowSaveModal}
        onHide={() => {
          setSIsShowSaveModal(false);
        }}
        className="cancel-modal"
        centered
      >
        <Modal.Body>
          <img
            src={rejectIconModal}
            title="Cancel Icon"
            alt=""
            className="d-block mx-auto w-25 mb-4"
          />
          <h4>
            Are you sure you want to request for <br />
            an amendment to the contract?
          </h4>
          <div className="modal-btn pt-3 mt-3">
            <Button
              variant="secondary"
              className="no"
              onClick={() => {
                setIsShowSaveModal(false);
              }}
            >
              No
            </Button>
            <Button
              variant="primary"
              className="yes"
              onClick={() => {
                setIsShowSaveModal(false);
                props.dispatch(
                  requestSaveContractDraft({
                    ...activeContract,
                    annotated_file:
                      annotatedFile === undefined ? '' : annotatedFile,
                    agreement_code: activeContract.agreement_code,
                    revision_id: activeContract.isParent
                      ? activeContract.agreement_id
                      : activeContract.id,
                  }),
                );
              }}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      </>
      )}
    </>
  );
}

const PreviewComponent = props => {
  const { errorFileSize, fileWithMeta, files, setErrorFileSize } = props;
  const metadata = fileWithMeta;

  return (
    <>
      <div
        className="dzu-previewContainer"
        style={errorFileSize ? { color: 'red', borderBottom: 'none' } : {}}
      >
        <span className="dzu-previewFileNameError">
          {metadata.file.name}, {formatBytes(metadata.file.size)}
        </span>
        <i
          className="fa fa-times dzu-previewButton"
          onClick={() => {
            files[0].remove();
            setErrorFileSize(false);
          }}
        />
      </div>
      {errorFileSize && (
        <p className="error-message-upload">
          The file is too big, it could not be uploaded because it exceeds 10MB.
        </p>
      )}
    </>
  );
};

const IframeLoader = styled(LoadingOverlay)`
  height: 100%;
`;

ContractDraftModal.propTypes = {
  dispatch: PropTypes.any,
  activeContractDraft: PropTypes.any,
  isDraftModalLoading: PropTypes.bool,
};

export default ContractDraftModal;
