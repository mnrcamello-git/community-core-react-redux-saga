/**
 *
 * SettingsModal
 *
 */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Tab, Row, Col, Nav, Form } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import Select from 'react-select';
import CancelIcon from '../../assets/images/hub/recruitment/cancel_icon.svg';
import HandIcon from '../../assets/images/hub/recruitment/hand_icon.svg';
import loadingImg from '../../assets/images/loading.svg';
import { isRolePermitted } from '../../containers/App/globalHelpers';
import moment from 'moment';

function SettingsModal(props) {
  const {
    isShown,
    close,
    settings,
    updateUserSettings,
    loading,
    showSettings,
    hasErrors,
    isSaved,
    globalSettings,
    crmUsers,
    crmRequestIsLoading,
    crmRequestFailed,
    xeroState,
  } = props;

  const [isShowSaveModal, setShowSaveModal] = useState(false);
  const [isSuccessModalShown, setIsSuccessModalShown] = useState(false);
  const [isFailedModalShown, setIsFailedModalShown] = useState(false);
  const [maxNotifications, setMaxNotifications] = useState(0);
  const [isOutOfRange, setIsOutOfRange] = useState(false);
  const [missedRequired, setMissedRequired] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [crmLeadOwnerId, setCrmLeadOwnerId] = useState();

  const onValidate = () => {
    if (maxNotifications === '') {
      setMissedRequired(true);
      setIsSubmitDisabled(true);
      return;
    }

    if (isOutOfRange) {
      return;
    }

    if (crmLeadOwnerId) {
      updateUserSettings({
        user_id: settings.user_id,
        settings_id: settings.settings_id,
        maximum_notifications:
          maxNotifications == 0
            ? settings.maximum_notifications
            : maxNotifications,
        crmLeadOwnerId,
      });
    } else {
      updateUserSettings({
        user_id: settings.user_id,
        settings_id: settings.settings_id,
        maximum_notifications:
          maxNotifications == 0
            ? settings.maximum_notifications
            : maxNotifications,
      });
    }

    setShowSaveModal(false);
    setIsSubmitDisabled(false);
  };

  useEffect(() => {
    if (hasErrors) {
      setIsFailedModalShown(true);
      showSettings(false);
      setIsSuccessModalShown(false);
      return;
    }
    if (isSaved) {
      setIsFailedModalShown(false);
      showSettings(false);
      setIsSuccessModalShown(true);
    }
  }, [hasErrors, isSaved]);

  return (
    <>
      <Modal
        show={isShowSaveModal}
        onHide={() => {
          setShowSaveModal(false);
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
          <h4>Are you sure you want to save your settings?</h4>
          <div className="modal-btn pt-5">
            <Button
              variant="primary"
              disabled={isSubmitDisabled}
              className="yes"
              onClick={onValidate}
            >
              Yes
            </Button>
            <Button
              variant="secondary"
              className="no"
              onClick={() => setShowSaveModal(false)}
            >
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={isSuccessModalShown}
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
          <h4>SUCCESS!</h4>
          <p> We'll reload to reflect your fresh settings</p>
          <div className="modal-btn pt-5">
            <Button
              variant="primary"
              onClick={() => {
                setIsSuccessModalShown(false);
                window.location.reload();
              }}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={isFailedModalShown} size="md" centered>
        <Modal.Body>
          <h4>Failed!</h4>
          <p>
            {' '}
            We encountered an error, please try again later or contact admin
          </p>
          <div className="modal-btn pt-5">
            <Button
              variant="primary"
              onClick={() => {
                setIsFailedModalShown(false);
              }}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={isShown}
        className="settings-modal"
        onHide={close}
        animation
      >
        <LoadingOverlay active={loading} spinner text="Please Wait...">
          <Modal.Header>
            <Modal.Title>Settings</Modal.Title>
            <Button type="button" onClick={() => setShowSaveModal(true)}>
              {' '}
              Done{' '}
            </Button>
          </Modal.Header>
          <Modal.Body>
            <Tab.Container
              id="left-tabs-example"
              defaultActiveKey="notifications"
            >
              <Col sm={12}>
                <Row>
                  <Col sm={3} className="py-5">
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="notifications">
                          Notifications
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    {globalSettings.length !== 0 && isRolePermitted(globalSettings) && (
                      <>
                        <Nav
                          variant="pills"
                          className="flex-column"
                          onClick={props.requestZohoUsers}
                        >
                          <Nav.Item>
                            <Nav.Link eventKey="crm">Zoho CRM</Nav.Link>
                          </Nav.Item>
                        </Nav>
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item>
                            <Nav.Link eventKey="xero">
                              Xero Accouting
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </>
                    )}
                  </Col>
                  <Col sm={9} className="py-5 px-3">
                    <Tab.Content>
                      <Tab.Pane eventKey="notifications">
                        <Form.Group>
                          <Form.Label className="font-medium font-size-14 gray-color">
                            Maximum Notification Limit
                          </Form.Label>
                          <Form.Row className="px-4 mt-3">
                            <Col>
                              <div className="font-medium font-size-12">
                                Minimum
                              </div>
                              <input
                                placeholder="Minumum"
                                disabled
                                value="1"
                                className="mt-2 px-3 py-1"
                              />
                            </Col>
                            <Col>
                              <div className="font-medium font-size-12">
                                Maximum
                              </div>
                              <input
                                className="mt-2 d-block px-3 py-1"
                                type="number"
                                max="100"
                                placeholder="Maximum"
                                defaultValue={settings.maximum_notifications}
                                onChange={e => {
                                  if (parseInt(e.target.value) > 100) {
                                    setIsOutOfRange(true);
                                    setIsSubmitDisabled(true);
                                    return;
                                  }
                                  setIsOutOfRange(false);
                                  setMaxNotifications(e.target.value);
                                  setIsSubmitDisabled(false);
                                }}
                              />
                              {isOutOfRange && (
                                <span style={{ color: 'red' }}>
                                  {' '}
                                  Cannot be more than 100
                                </span>
                              )}
                              <span style={{ color: 'red' }}>
                                {maxNotifications == '' && missedRequired
                                  ? 'required'
                                  : ''}
                              </span>
                            </Col>
                          </Form.Row>
                        </Form.Group>
                      </Tab.Pane>
                      {globalSettings.length !== 0 && isRolePermitted(globalSettings) && (
                        <>
                          <ZohoSettings
                            globalSettings={globalSettings}
                            crmUsers={crmUsers}
                            crmRequestIsLoading={crmRequestIsLoading}
                            crmRequestFailed={crmRequestFailed}
                            setCrmLeadOwnerId={setCrmLeadOwnerId}
                          />
                          <XeroAccounting xeroState={xeroState} globalSettings={globalSettings} />
                        </>
                      )}
                      
                    </Tab.Content>
                  </Col>
                </Row>
              </Col>
            </Tab.Container>
          </Modal.Body>
        </LoadingOverlay>
      </Modal>
    </>
  );
}

const ZohoSettings = props => {
  const {
    globalSettings,
    crmUsers,
    crmRequestIsLoading,
    crmRequestFailed,
    setCrmLeadOwnerId,
  } = props;

  let owner = 0;

  if (globalSettings) {
    for (const property in globalSettings) {
      if (globalSettings[property].default_crm_lead_owner_id !== 0) {
        owner = globalSettings[property].default_crm_lead_owner_id;
      }
    }
  }

  return (
    <Tab.Pane eventKey="crm">
      <Form.Group>
        <Form.Label className="font-medium font-size-14 gray-color">
          Zoho CRM Configuration
        </Form.Label>
        <Form.Row className="px-4 mt-3">
          <Col>
            <div className="font-medium font-size-12">Default lead owner</div>
            {!crmRequestIsLoading ? (
              <Select
                defaultValue={crmUsers.filter(user => {
                  if (user.value === owner) {
                    return { value: owner, label: user.label };
                  }
                })}
                options={crmUsers}
                placeholder="Select lead owner"
                isSearchable={false}
                onChange={e => setCrmLeadOwnerId(e.value)}
              />
            ) : (
              <img src={loadingImg} alt="loading..." />
            )}
            {crmRequestFailed && (
              <h6 className="error-message">
                Failed to load crm users, please contact admin
              </h6>
            )}
          </Col>
        </Form.Row>
      </Form.Group>
    </Tab.Pane>
  );
};

const XeroAccounting = props => {
  const { xeroState, globalSettings } = props;

  const isXeroSynced = () => {
    let isSynced = false;
    globalSettings.forEach(gs => {
      const triggeredAt = moment(gs.xero_manual_trigger_date).format('YYYY MM DD');
      const current = moment(gs.current).format('YYYY MM DD');
      if (triggeredAt === current) {
        isSynced = true;
      }
    });

    return isSynced;
  }
  return (
    <Tab.Pane eventKey="xero">
      <Form.Group>
        <Form.Label className="font-medium font-size-14 gray-color">
          Xero to Hub Invoice Syncing
        </Form.Label>
        <Form.Row className="px-4 mt-3">
          <Col>
            <div>
              <small className="font-italic-poppin default-black">
                NOTE: Sync button will not be visible once you've reached the sync limit
              </small>
            </div>
            {xeroState.xeroLoading && (
              <small className="font-italic-poppin default-black">
                Sync in progress, this may take up to 5-10 minutes<br />
                You can close this prompt while the sync runs in the background
                <img style={{ width: 40 }} src={loadingImg} alt="loading..." />
              </small>
            )}
            {xeroState.xeroFailed && (
              <small className="font-italic-poppin error-message">
                The sync failed, please try again or 
                <a 
                  className="font-italic-poppin "
                  href="https://desk.zoho.com/portal/penbrothersinc/home" 
                  target="_blank"
                >
                  {' contact admin.'}
                </a>
              </small>
            )}
            {isXeroSynced() && (
              <small className="font-italic-poppin success-message">
                The XERO invoice is already synced today. <br />
              </small>
            )}

            {!isXeroSynced() && !xeroState.xeroSuccess && (
              <Button
                variant="primary"
                className="yes"
                disabled={xeroState.xeroLoading}
                onClick={() => xeroState.syncCrmToXeroFxn()}
              > 
                {'Sync Xero -> CORE Invoice'}
              </Button>
            )}

          </Col>
        </Form.Row>
      </Form.Group>
    </Tab.Pane>
  )
}

export default SettingsModal;
