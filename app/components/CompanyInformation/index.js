/**
 *
 * CompanyInformation
 *
 */

import React, { memo, useState } from 'react';
import {
  Tabs,
  Tab,
  Form,
  Row,
  Col,
  Container,
  Button,
  Modal,
  Tooltip,
  OverlayTrigger,
  Table,
} from 'react-bootstrap';
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  ImageWithZoom,
  Slide,
  Slider,
} from 'pure-react-carousel';
import Select from 'react-select';
import 'pure-react-carousel/dist/react-carousel.es.css';
import PropTypes from 'prop-types';
import { translateToHumanReadableFormat } from '../../containers/App/globalHelpers';
import { validateForm, isAllFieldValid, validateTeamSetup } from './validator';
import loadingImg from '../../assets/images/loading.svg';
import clientInformationIcon from '../../assets/images/hub/agreement/client-info.png';
import contractInformationIcon from '../../assets/images/hub/agreement/contract-info.png';
import contactInformationIcon from '../../assets/images/hub/agreement/contact-info.png';
import billingInformationIcon from '../../assets/images/hub/agreement/billing-info.png';
import teamSetupIcon from '../../assets/images/hub/agreement/team-setup.png';
import blueArrow from '../../assets/images/hub/agreement/blue-arrow.png';
import submitIcon from '../../assets/images/hub/agreement/submit-icon.svg';
import deleteIcon from '../../assets/images/hub/agreement/delete-icon.png';
import oplOffice from '../../assets/images/hub/agreement/opl-office.jpg';
import oplOffice1 from '../../assets/images/hub/agreement/opl-office-1.jpg';
import oplOffice2 from '../../assets/images/hub/agreement/opl-office-2.jpg';
import sheridanOffice from '../../assets/images/hub/agreement/sheridan-office.jpg';
import sheridanOffice1 from '../../assets/images/hub/agreement/sheridan-office-1.jpg';
import sheridanOffice2 from '../../assets/images/hub/agreement/sheridan-office(2).jpg';
import sheridanOffice3 from '../../assets/images/hub/agreement/sheridan-office(3).jpg';
import sheridanOffice4 from '../../assets/images/hub/agreement/sheridan-office(4).png';
import sheridanGoogleMap from '../../assets/images/hub/agreement/sheridan-googlemap.jpg';
import legazpiGoogleMap from '../../assets/images/hub/agreement/legazpi-googlemap.jpg';
import checkIcon from '../../assets/images/hub/recruitment/check_icon.svg';

const _ = require('lodash');

function CompanyInformation(props) {
  const {
    clientProfile,
    formData,
    isSubmitSuccess,
    closeMessages,
    refetchClientData,
    loading,
    setActiveTabParent,
    saveClientProfile,
    isClientProfileUpdateFailed,
  } = props;
  const [clientProfileInternal, setUpdatedProfile] = useState();
  const [formErrors, setFormHasErrors] = useState(false);
  const [isSaveNoticeOpen, setIsSaveNoticeOpen] = useState(false);
  const [currentFormStep, setCurrentFormStep] = useState(0);
  const [recipients, setRecipients] = useState([]);
  const [isSubmit, setSubmit] = useState(false);
  const [teamSetupData, setTeamSetupData] = useState([]);
  const [blurState, setBlurState] = useState([0]);
  const [availableExperienceLevels, setAvailableExperienceLevel] = useState([]);
  const [isDuplicated, setDuplicated] = useState(false);
  const [isCustomPositionEmpty, setCustomPositionEmpty] = useState(false);
  const [isLimitPositions, setLimitPositions] = useState(false);
  const [isSpecifiedPositionValid, setSpecifiedPositionValid] = useState(true);
  const [teamSetupValidityState, setTeamSetupValidityState] = useState(null);

  React.useEffect(() => {
    setUpdatedProfile(clientProfile);
  });

  React.useEffect(() => {
    if (
      clientProfile.client_team_setups &&
      clientProfile.client_team_setups.length
    ) {
      setTeamSetupData(clientProfile.client_team_setups);
    } else {
      const newArr = [];
      newArr.push(null);
      setTeamSetupData(newArr);
    }
  }, []);

  const setClientProfile = data => {
    setUpdatedProfile(data);
  };

  const handleChangeClientProfile = (field, value) => {
    const temp = clientProfile;
    temp[field] = value;
    setClientProfile(temp);

    if (formErrors !== false) {
      const tempError = JSON.parse(JSON.stringify(formErrors));
      tempError[field] = true;
      setFormHasErrors(tempError);
    }
  };

  const handleAddRecipient = recipientData => {
    setRecipients(recipientData);
  };

  const saveClientProfileInternal = data => {
    saveClientProfile(data);
  };

  const onTabNavigate = e => {
    if (clientProfile.is_agreements_saved) {
      setCurrentFormStep(e);
      addBlurState(parseInt(e));
      return;
    }
    const formState = validateForm(
      { previous: currentFormStep, next: parseInt(e) },
      setCurrentFormStep,
      clientProfileInternal,
      recipients,
      teamSetupData,
      false,
      addBlurState,
    );

    if (formState.state && !formState.isFinal) {
      setFormHasErrors(false);
      addBlurState(parseInt(e));
      return;
    }
    setFormHasErrors(formState);
  };

  const handleValidateForm = () => {
    const formState = validateForm(
      currentFormStep,
      setCurrentFormStep,
      clientProfileInternal,
      recipients,
      teamSetupData,
      true,
      addBlurState,
    );

    if (formState.state && !formState.isFinal) {
      setFormHasErrors(false);
      return;
    }
    if (formState.state && formState.isFinal) {
      setFormHasErrors(false);
      setSubmit(true);
      return;
    }

    setFormHasErrors(formState);

    return formState;
  };

  const handleSave = () => {
    const isFormInvalid = handleValidateForm();
    const teamSetupValidity = validateTeamSetup(teamSetupData);
    const lengthErrors = teamSetupValidity.errors.length;
    setTeamSetupValidityState(teamSetupValidity.errors);

    if (teamSetupValidity.hasDuplicates) {
      setDuplicated(true);
    }
    if (!teamSetupValidity.hasDuplicates) {
      setDuplicated(false);
    }
    
    if (teamSetupData.length > 50) {
      return;
    }

    for (let i = 0; i < lengthErrors; i++) {
      if (teamSetupValidity.errors[i].isSpecifiedDescriptionEmpty
          || !teamSetupValidity.errors[i].isDescriptionValid) {
        return;
      }
    }
   
    if (!isFormInvalid && !teamSetupValidity.hasDuplicates) {
      setDuplicated(false);
      setIsSaveNoticeOpen(true);
    }
  };

  const addBlurState = key => {
    const temp = JSON.parse(JSON.stringify(blurState));
    temp.push(parseInt(key));
    setBlurState(temp);
  };


  return (
    <>
      {loading ? (
        <img src={loadingImg} alt="requesting change password" />
      ) : (
        <>
          {/* success modal */}
          <Modal
            show={isSubmitSuccess}
            className="confirm-save-modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
          >
            <Modal.Body>
              <img
                src={checkIcon}
                title="Check Icon"
                alt="Check Icon"
                className="d-block mx-auto w-25 mb-4"
              />
              <h4 className="px-5 mx-3">
                Your record has been submitted successfully
              </h4>
              <div className="modal-btn pt-4">
                <button
                  variant="secondary"
                  className="yes"
                  onClick={() => {
                    closeMessages();
                    window.location.reload();
                  }}
                >
                  Ok
                </button>
              </div>
            </Modal.Body>
          </Modal>

          {/* info modal */}
          <Modal
            show={isSaveNoticeOpen}
            className="agreements-modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
          >
            <Modal.Body>
              <img className="d-block mx-auto w-25 mb-4" src={submitIcon} />
              <h4 className="mb-3">
                Are you sure you want to submit your Company Information?
              </h4>
              <p>
                By clicking yes, you confirm that you have read and understood
                our
                <a
                  className="font-bold"
                  href="https://penbrothers.com/privacy-policy"
                  target="_blank"
                >
                  {' Data Privacy Policy '}
                </a>
                , and represent and warrant that all information provided herein
                pertaining to my personal and company information or on behalf
                of my employer shall be true and correct
              </p>
              <div className="modal-btn pt-3 mt-3">
                <button
                  variant="secondary"
                  className="no"
                  onClick={() => setIsSaveNoticeOpen(false)}
                >
                  No
                </button>
                <button
                  variant="primary"
                  className="yes"
                  onClick={() => {
                    saveClientProfile({
                      clientProfile: clientProfileInternal,
                      recipients,
                      teamSetupData,
                    });
                    setIsSaveNoticeOpen(false);
                  }}
                >
                  Yes
                </button>
              </div>
            </Modal.Body>
          </Modal>
          {/* failed modal */}
          <Modal
            show={isClientProfileUpdateFailed}
            size="md"
            className="save-modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
          >
            <Modal.Body>
              <h4>Failed</h4>
              <p>Failed to save profile, please contact admin</p>
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
          <Tabs activeKey={currentFormStep} onSelect={onTabNavigate}>
            <Tab
              eventKey={0}
              title={
                <div className="tab-profile">
                  <img src={clientInformationIcon} />
                  <span>Client Information</span>
                  <img src={blueArrow} className="blue-arrow" />
                </div>
              }
            >
              <ClientInformationForm
                saveClientProfileInternal={saveClientProfileInternal}
                setClientProfile={setClientProfile}
                clientProfile={clientProfile}
                formData={formData}
                clientProfileInternal={clientProfileInternal}
                handleChangeClientProfile={handleChangeClientProfile}
                formErrors={formErrors}
                recipients={recipients}
                isAgreementsSaved={clientProfile.is_profile_saved}
              />
            </Tab>
            <Tab
              eventKey={1}
              title={
                <>
                  {blurState && blurState.includes(1) ? (
                    <div className="tab-profile">
                      <img src={contractInformationIcon} />
                      <span>Contract Information</span>
                      <img src={blueArrow} className="blue-arrow" />
                    </div>
                  ) : (
                    <div className="tab-profile blurred-element">
                      <img src={contractInformationIcon} />
                      <span>Contract Information</span>
                      <img src={blueArrow} className="blue-arrow" />
                    </div>
                  )}
                </>
              }
            >
              <ClientContractInformation
                clientProfile={clientProfile}
                handleChangeClientProfile={handleChangeClientProfile}
                formErrors={formErrors}
                isAgreementsSaved={clientProfile.is_profile_saved}
              />
            </Tab>
            <Tab
              eventKey={2}
              title={
                <>
                  {blurState && blurState.includes(2) ? (
                    <div className="tab-profile">
                      <img src={contactInformationIcon} />
                      <span>Contact Information</span>
                      <img src={blueArrow} className="blue-arrow" />
                    </div>
                  ) : (
                    <div className="tab-profile blurred-element">
                      <img src={contactInformationIcon} />
                      <span>Contact Information</span>
                      <img src={blueArrow} className="blue-arrow" />
                    </div>
                  )}
                </>
              }
            >
              <ClientContactInformation
                clientProfile={clientProfile}
                handleChangeClientProfile={handleChangeClientProfile}
                formData={formData}
                handleAddRecipient={handleAddRecipient}
                recipients={recipients}
                setRecipients={setRecipients}
                formErrors={formErrors}
                setFormHasErrors={setFormHasErrors}
                isAgreementsSaved={clientProfile.is_profile_saved}
              />
            </Tab>
            <Tab
              eventKey={3}
              title={
                <>
                  {blurState && blurState.includes(3) ? (
                    <div className="tab-profile">
                      <img src={billingInformationIcon} />
                      <span>Billing Information</span>
                      <img src={blueArrow} className="blue-arrow" />
                    </div>
                  ) : (
                    <div className="tab-profile blurred-element">
                      <img src={billingInformationIcon} />
                      <span>Billing Information</span>
                      <img src={blueArrow} className="blue-arrow" />
                    </div>
                  )}
                </>
              }
            >
              <ClientBillingInformation
                clientProfile={clientProfile}
                handleChangeClientProfile={handleChangeClientProfile}
                formData={formData}
                formErrors={formErrors}
                isAgreementsSaved={clientProfile.is_profile_saved}
              />
            </Tab>
            <Tab
              eventKey={4}
              title={
                <>
                  {blurState && blurState.includes(4) ? (
                    <div className="tab-profile">
                      <img src={teamSetupIcon} />
                      <span>Team Setup</span>
                    </div>
                  ) : (
                    <div className="tab-profile blurred-element">
                      <img src={teamSetupIcon} />
                      <span>Team Setup</span>
                    </div>
                  )}
                </>
              }
            >
              <ClientTeamSetup
                clientProfile={clientProfile}
                formData={formData}
                handleChangeClientProfile={handleChangeClientProfile}
                teamSetupData={teamSetupData}
                setTeamSetupData={setTeamSetupData}
                formErrors={formErrors}
                isAgreementsSaved={clientProfile.is_profile_saved}
                availableExperienceLevels={availableExperienceLevels}
                setAvailableExperienceLevel={setAvailableExperienceLevel}
                isDuplicated={isDuplicated}
                isCustomPositionEmpty={isCustomPositionEmpty}
                setFormHasErrors={setFormHasErrors}
                setLimitPositions={setLimitPositions}
                isLimitPositions={isLimitPositions}
                isSpecifiedPositionValid={isSpecifiedPositionValid}
                setSpecifiedPositionValid={setSpecifiedPositionValid}
                teamSetupValidityState={teamSetupValidityState}
                setTeamSetupValidityState={setTeamSetupValidityState}
              />
            </Tab>
          </Tabs>
          <div className="nav-buttons">
            {parseInt(currentFormStep) !== 0 && (
              <Button
                className="prev-btn"
                onClick={() =>
                  setCurrentFormStep(parseInt(currentFormStep) - parseInt(1))
                }
              >
                Previous
              </Button>
            )}
            {parseInt(currentFormStep) !== 4 && (
              <Button className="next-btn" onClick={handleValidateForm}>
                Next
              </Button>
            )}

            {!clientProfile.is_profile_saved &&
              isAllFieldValid(clientProfileInternal) &&
              (parseInt(currentFormStep) === 4 && (
                <Button onClick={handleSave}>Submit</Button>
              ))}
          </div>
        </>
      )}
    </>
  );
}

/**
 * Form for client information
 */
const ClientInformationForm = ({
  saveClientProfileInternal,
  clientProfile,
  formData,
  clientProfileInternal,
  handleChangeClientProfile,
  formErrors,
  isAgreementsSaved,
}) => {
  let formattedCountries = [];
  let formattedBusinessCategories = [];
  const defaultCountryLabel = { value: '', label: '' };
  const defaultBusinessCategoryLabel = { value: '', label: '' };

  if (formData) {
    formattedCountries = formData.countries.map((val, key) => {
      if (val.country_id === clientProfile.country_id) {
        defaultCountryLabel.value = val.country_id;
        defaultCountryLabel.label = val.Country;
      }
      return {
        value: val.country_id,
        label: val.Country,
      };
    });
    formattedBusinessCategories = formData.industries.map((val, key) => {
      if (val.business_category_id === clientProfile.business_category_id) {
        defaultBusinessCategoryLabel.value = val.business_category_id;
        defaultBusinessCategoryLabel.label = val.description;
      }
      return {
        value: val.business_category_id,
        label: val.description,
      };
    });
  }

  return (
    <>
      <Container className="px-0 py-3 mt-4 mb-5">
        <div className="mx-5">
          <Row>
            <Col>
              <label>
                Company Name<span className="text-danger">*</span>
              </label>
              <Form.Control
                onChange={e =>
                  handleChangeClientProfile('client_name', e.target.value)
                }
                defaultValue={clientProfile.client_name}
                placeholder="Enter company name"
                readOnly={!!isAgreementsSaved}
              />
              {formErrors.client_name === false ? (
                <span className="error-message">Company name is required.</span>
              ) : (
                ''
              )}
            </Col>
            <Col>
              <label>
                Business Name<span className="text-danger">*</span>
              </label>
              <Form.Control
                onChange={e =>
                  handleChangeClientProfile('business_name', e.target.value)
                }
                defaultValue={clientProfile.business_name}
                placeholder="Enter business name"
                readOnly={!!isAgreementsSaved}
              />
              {formErrors.business_name === false ? (
                <span className="error-message">
                  Business name is required.
                </span>
              ) : (
                ''
              )}
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mt-4">
              <label>Client Code</label>
              <Form.Control
                placeholder="Enter client code"
                defaultValue={clientProfile.client_code}
                readOnly
              />
            </Col>
          </Row>
        </div>
        <br />
        <div className="divider">
          <hr />
        </div>
        <div className="mx-5 mt-4">
          <Row>
            <Col>
              <label>Operational/Business/Contact Address</label>
              <Form.Control
                readOnly={!!isAgreementsSaved}
                placeholder="Enter operational/business/contact address"
                defaultValue={clientProfile.business_address}
                onChange={e =>
                  handleChangeClientProfile('business_address', e.target.value)
                }
              />
            </Col>
          </Row>
        </div>
        <div className="mx-5 mt-4">
          <Row>
            <Col>
              <label>
                Corporate Address<span className="text-danger">*</span>
              </label>
              <Form.Control
                placeholder="Enter corporate address"
                readOnly={!!isAgreementsSaved}
                defaultValue={clientProfile.address}
                onChange={e =>
                  handleChangeClientProfile('address', e.target.value)
                }
              />
              {formErrors.address === false ? (
                <span className="error-message">
                  {' '}
                  Corporate address is required.
                </span>
              ) : (
                ''
              )}
            </Col>
          </Row>
        </div>
        <div className="mx-5 mt-4">
          <Row>
            <Col>
              <label>
                City<span className="text-danger">*</span>
              </label>
              <Form.Control
                readOnly={!!isAgreementsSaved}
                placeholder="Enter city"
                readOnly={!!isAgreementsSaved}
                defaultValue={clientProfile.city}
                onChange={e =>
                  handleChangeClientProfile('city', e.target.value)
                }
              />
              {formErrors.city === false ? (
                <span className="error-message"> City is required.</span>
              ) : (
                ''
              )}
            </Col>
            <Col>
              <label>
                Zip Code<span className="text-danger">*</span>
              </label>
              <Form.Control
                readOnly={!!isAgreementsSaved}
                placeholder="Enter zip code"
                defaultValue={clientProfile.zip_code}
                onChange={e =>
                  handleChangeClientProfile('zip_code', e.target.value)
                }
              />
              {formErrors.zip_code === false ? (
                <span className="error-message"> Zip code is required.</span>
              ) : (
                ''
              )}
            </Col>
          </Row>
        </div>
        <div className="mx-5 mt-4">
          <Row>
            <Col className="col-md-6">
              <label>
                Country<span className="text-danger">*</span>
              </label>
              {formData && (
                <Select
                  isDisabled={!!isAgreementsSaved}
                  classNamePrefix="input"
                  defaultValue={defaultCountryLabel}
                  isSearchable
                  name="color"
                  options={formattedCountries}
                  onChange={e => {
                    handleChangeClientProfile('country_id', e.value);
                  }}
                />
              )}
              {formErrors.country_id === false ? (
                <span className="error-message"> Country is required.</span>
              ) : (
                ''
              )}
            </Col>
          </Row>
        </div>
        <br />
        <div className="divider">
          <hr />
        </div>
        <div className="mx-5 mt-4 mb-4">
          <Row>
            <Col>
              <label>Company Profile Link</label>
              <Form.Control
                readOnly={!!isAgreementsSaved}
                defaultValue={clientProfile.company_profile_link}
                placeholder="Enter Company Profile Link"
                onChange={e =>
                  handleChangeClientProfile(
                    'company_profile_link',
                    e.target.value,
                  )
                }
              />
            </Col>
            <Col>
              <label>Website</label>
              <Form.Control
                readOnly={!!isAgreementsSaved}
                defaultValue={clientProfile.website}
                placeholder="Enter website"
                onChange={e =>
                  handleChangeClientProfile('website', e.target.value)
                }
              />
              {formErrors.isUrlValid === false ? (
                <span className="error-message"> Invalid URL</span>
              ) : (
                ''
              )}
            </Col>
          </Row>
        </div>
        <div className="mx-5 mb-4">
          <Row>
            <Col md={6}>
              <label>
                Industry<span className="text-danger">*</span>
              </label>
              {formData && (
                <Select
                  isDisabled={!!isAgreementsSaved}
                  classNamePrefix="input"
                  defaultValue={defaultBusinessCategoryLabel}
                  isSearchable
                  name="color"
                  options={formattedBusinessCategories}
                  onChange={e =>
                    handleChangeClientProfile('business_category_id', e.value)
                  }
                />
              )}
              {formErrors.business_category_id === false ? (
                <span className="error-message"> Industry is required. </span>
              ) : (
                ''
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

/**
 * Form for client contract
 */
const ClientContractInformation = ({
  clientProfile,
  handleChangeClientProfile,
  formErrors,
  isAgreementsSaved,
}) => {
  const {
    dom_int,
    contract_type,
    employee_contract,
    billing_type,
    office,
    contract_duration,
    seat_type_private_office,
    seat_type_remote,
    seat_type_switch,
    seat_type_regular,
    seat_type_privroom,
    nbr_requisitions,
    nbr_setups,
  } = clientProfile;

  const seatTypeContract = () => {
    let type = '';

    if (seat_type_private_office) {
      type += 'Private Office, ';
    }
    if (seat_type_remote) {
      type += 'Remote, ';
    }
    if (seat_type_switch) {
      type += 'Switch, ';
    }
    if (seat_type_regular) {
      type += 'Seat, ';
    }

    if (seat_type_privroom) {
      type += 'Private Room, ';
    }

    return type.slice(0, -2);
  };

  const billingType = () => {
    switch (billing_type) {
      case 'SEAT':
        return 'Seats Only';
      case 'ROOM':
        return 'Private Room';
      case 'ROOMSEAT':
        return 'Private Room & Seats';
      case 'UTILIZED_SEATS':
        return 'Utilized Seats';
      case 'DAILY':
        return 'Daily';
      case 'WEEKLY':
        return 'Weekly';
      case 'QUARTERLY':
        return 'Quarterly';
      case '':
        return 'No type specified';
      default:
        return 'No type specified';
    }
  };

  return (
    <Container className="px-0 py-3 mt-4 mb-5">
      <div className="mx-5">
        <Row>
          <Col>
            <label>Client Type</label>
            <Form.Control readOnly defaultValue={dom_int} />
          </Col>
          <Col>
            <label>Contract Type</label>
            <Form.Control readOnly defaultValue={contract_type} />
          </Col>
        </Row>
      </div>
      <div className="mx-5 mt-4">
        <Row>
          <Col>
            <label>Employee Contract</label>
            <Form.Control readOnly defaultValue={employee_contract} />
          </Col>
          <Col>
            <label>Billing Type</label>
            <Form.Control readOnly defaultValue={billingType()} />
          </Col>
        </Row>
      </div>
      <div className="mx-5 mt-4">
        <Row>
          <Col>
            <label>Seat Type</label>
            <Form.Control readOnly defaultValue={seatTypeContract()} />
          </Col>
          <Col>
            <label>Contract Duration</label>
            {office && (
              <Form.Control
                readOnly
                defaultValue={`${contract_duration} Months`}
              />
            )}
          </Col>
          <div className="divider">
            <hr />
          </div>
        </Row>
      </div>
      <br />
      <div className="divider">
        <hr />
      </div>
      <div className="mx-5 mt-4">
        <Row>
          <Col>
            <label>Office Location</label>
            {office && (
              <Form.Control readOnly defaultValue={office.office_name} />
            )}
          </Col>
        </Row>
      </div>
      {office.office_name.includes('OPL') ? (
        <div className="mx-5 mt-4">
          <Row className="m-0">
            <Col md={4} className="office-location">
              <div>
                <i className="fa fa-map-marker default-black" />
                <h3 className="default-black font-medium mb-3">Legazpi</h3>
              </div>
              <div>
                <p>
                  100 OPL Building, C. Palanca Street, Legaspi Village, Makati
                  City, Metro Manila
                </p>
              </div>
            </Col>
            <Col md={8} className="pr-0">
              <img src={legazpiGoogleMap} className="w-100" />
            </Col>
          </Row>
          <Row>
            <CarouselProvider
              visibleSlides={3}
              totalSlides={4}
              step={1}
              className="container mt-4"
              naturalSlideWidth={400}
              naturalSlideHeight={500}
            >
              <div>
                <Slider className="slider">
                  <Slide index={0}>
                    <ImageWithZoom
                      className="rounded-image-slider"
                      src={oplOffice}
                    />
                  </Slide>
                  <Slide index={1}>
                    <ImageWithZoom
                      className="rounded-image-slider"
                      src={oplOffice1}
                    />
                  </Slide>
                  <Slide index={2}>
                    <ImageWithZoom
                      className="rounded-image-slider"
                      src={oplOffice2}
                    />
                  </Slide>
                  <Slide index={3}>
                    <ImageWithZoom
                      className="rounded-image-slider"
                      src={oplOffice}
                    />
                  </Slide>
                </Slider>
                <ButtonBack>
                  <i className="fa fa-chevron-left" />
                </ButtonBack>
                <ButtonNext>
                  <i className="fa fa-chevron-right" />
                </ButtonNext>
              </div>
            </CarouselProvider>
          </Row>
        </div>
      ) : (
        <div className="mx-5 mt-4">
          <Row className="m-0">
            <Col md={4} className="office-location">
              <div>
                <i className="fa fa-map-marker default-black" />
                <h3 className="default-black font-medium mb-3">Sheridan</h3>
              </div>
              <div>
                <p>
                  Rockwell Business Center Sheridan 1 Tower, United Street,
                  Mandaluyong City, Metro Manila
                </p>
              </div>
            </Col>
            <Col md={8} className="pr-0">
              <img src={sheridanGoogleMap} className="w-100" />
            </Col>
          </Row>
          <Row>
            <CarouselProvider
              visibleSlides={3}
              totalSlides={5}
              step={1}
              className="container mt-4"
              naturalSlideWidth={400}
              naturalSlideHeight={500}
            >
              <div>
                <Slider className="slider">
                  <Slide index={0}>
                    <ImageWithZoom
                      className="rounded-image-slider"
                      src={sheridanOffice}
                    />
                  </Slide>
                  <Slide index={1}>
                    <ImageWithZoom
                      className="rounded-image-slider"
                      src={sheridanOffice1}
                    />
                  </Slide>
                  <Slide index={2}>
                    <ImageWithZoom
                      className="rounded-image-slider"
                      src={sheridanOffice2}
                    />
                  </Slide>
                  <Slide index={3}>
                    <ImageWithZoom
                      className="rounded-image-slider"
                      src={sheridanOffice3}
                    />
                  </Slide>
                  <Slide index={4}>
                    <ImageWithZoom
                      className="rounded-image-slider"
                      src={sheridanOffice4}
                    />
                  </Slide>
                </Slider>
                <ButtonBack>
                  <i className="fa fa-chevron-left" />
                </ButtonBack>
                <ButtonNext>
                  <i className="fa fa-chevron-right" />
                </ButtonNext>
              </div>
            </CarouselProvider>
          </Row>
        </div>
      )}

      <div className="mx-5">
        <Row>
          <Col>
            <label>
              Number of Requisitions<span className="text-danger">*</span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-right" className="tooltip-content">
                    Number of job requisition needed
                  </Tooltip>
                }
              >
                <span
                  variant="secondary"
                  className="icon-table icon-tooltip align-self-center ml-2"
                />
              </OverlayTrigger>
            </label>
            <Form.Control
              defaultValue={nbr_requisitions}
              readOnly={!!isAgreementsSaved}
              placeholder="Enter Number of Requisitions"
              onChange={e =>
                handleChangeClientProfile('nbr_requisitions', e.target.value)
              }
            />
            {formErrors.nbr_requisitions === false ? (
              <span className="error-message">
                {' '}
                Number of requisitions is required.
              </span>
            ) : (
              ''
            )}
          </Col>
          <Col>
            <label>Number of Setups</label>
            <span className="text-danger">*</span>
            <Form.Control
              defaultValue={nbr_setups}
              placeholder="Enter Number of Setups"
              readOnly={!!isAgreementsSaved}
              onChange={e =>
                handleChangeClientProfile('nbr_setups', e.target.value)
              }
            />
            {formErrors.nbr_setups === false ? (
              <span className="error-message">
                {' '}
                Number of setups is required.
              </span>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

const ClientContactInformation = ({
  clientProfile,
  handleChangeClientProfile,
  formData,
  recipients,
  handleAddRecipient,
  formErrors,
  setFormHasErrors,
  setRecipients,
  isAgreementsSaved,
}) => {
  const {
    primary_contact,
    primary_app_name,
    primary_app_username,
    primary_contact_last_name,
    primary_contact_position,
    primary_contact_email,
    primary_contact_mobile,
    primary_contact_landline,
    primary_contact_messenger,
    primary_preferred_mode_communication,
    signatory,
    signatory_position,
    signatory_email,
    signatory_mobile,
    signatory_landline,
    signatory_messenger,
    signatory_username,
    signatory_preferred_mode_communication,
    team_leader,
    team_leader_email,
    team_leader_position,
    finance_mgr_email,
    finance_mgr_first_name,
    finance_mgr_last_name,
    hiring_mgr_first_name,
    hiring_mgr_last_name,
    hiring_mgr_email,
    invoice_recipient_1_email,
    invoice_recipient_1_first_name,
    invoice_recipient_1_last_name,
    invoice_recipient_2_email,
    invoice_recipient_2_first_name,
    invoice_recipient_2_last_name,
    invoice_recipient_3_email,
    invoice_recipient_3_first_name,
    invoice_recipient_3_last_name,
    invoice_recipient_4_email,
    invoice_recipient_4_first_name,
    invoice_recipient_4_last_name,
    invoice_recipient_5_email,
    invoice_recipient_5_first_name,
    invoice_recipient_5_last_name,
  } = clientProfile;

  React.useEffect(() => {
    const tempNumberOfRecipients = 0;
    const rawRecipients = [
      {
        email: invoice_recipient_1_email,
        firstName: invoice_recipient_1_first_name,
        lastName: invoice_recipient_1_last_name,
      },
      {
        email: invoice_recipient_2_email,
        firstName: invoice_recipient_2_first_name,
        lastName: invoice_recipient_2_last_name,
      },
      {
        email: invoice_recipient_3_email,
        firstName: invoice_recipient_3_first_name,
        lastName: invoice_recipient_3_last_name,
      },
      {
        email: invoice_recipient_4_email,
        firstName: invoice_recipient_4_first_name,
        lastName: invoice_recipient_4_last_name,
      },
      {
        email: invoice_recipient_5_email,
        firstName: invoice_recipient_5_first_name,
        lastName: invoice_recipient_5_last_name,
      },
    ];
    const final = rawRecipients.filter(val => {
      if (val.email !== '') {
        return val;
      }
    });
    handleAddRecipient(final);
  }, []);

  return (
    <Container className="px-0 py-3 mt-3 mb-5">
      <h3 className="font-semibold mb-4">Point of Contact</h3>
      <div className="mx-5">
        <Row>
          <Col>
            <label>
              First Name<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={primary_contact}
              placeholder="Enter first name"
              onChange={e =>
                handleChangeClientProfile('primary_contact', e.target.value)
              }
            />
            {formErrors.primary_contact === false ? (
              <span className="error-message"> First name is required.</span>
            ) : (
              ''
            )}
          </Col>
          <Col>
            <label>
              Last Name<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={primary_contact_last_name}
              placeholder="Enter last name"
              onChange={e =>
                handleChangeClientProfile(
                  'primary_contact_last_name',
                  e.target.value,
                )
              }
            />
            {formErrors.primary_contact_last_name === false ? (
              <span className="error-message"> Last name is required.</span>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
      <div className="mx-5 mt-4">
        <Row>
          <Col>
            <label>
              Position<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={primary_contact_position}
              placeholder="Enter position"
              onChange={e =>
                handleChangeClientProfile(
                  'primary_contact_position',
                  e.target.value,
                )
              }
            />
            {formErrors.primary_contact_position === false ? (
              <span className="error-message"> Position is required.</span>
            ) : (
              ''
            )}
          </Col>
          <Col>
            <label>
              Email Address<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={primary_contact_email}
              placeholder="Enter email address"
              type="email"
              onChange={e =>
                handleChangeClientProfile(
                  'primary_contact_email',
                  e.target.value,
                )
              }
            />
            {formErrors.primary_contact_email === false ? (
              <span className="error-message">
                {' '}
                Email address is required/invalid.
              </span>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
      <div className="mx-5 mt-4">
        <Row>
          <Col>
            <label>
              Mobile<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={primary_contact_mobile}
              placeholder="0917-XXX-XXXX or +63 917-XXX-XXXX"
              onChange={e =>
                handleChangeClientProfile(
                  'primary_contact_mobile',
                  e.target.value,
                )
              }
            />
            {formErrors.primary_contact_mobile === false ? (
              <span className="error-message"> Mobile no. is required.</span>
            ) : (
              ''
            )}
          </Col>
          <Col>
            <label>
              Landline<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={primary_contact_landline}
              placeholder="(02) 7XXX-XXXX"
              onChange={e =>
                handleChangeClientProfile(
                  'primary_contact_landline',
                  e.target.value,
                )
              }
            />
            {formErrors.primary_contact_landline === false ? (
              <span className="error-message"> Landline is required.</span>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
      <div className="mx-5 mt-4">
        <Row>
          <Col>
            <label>Messenger</label>
            {formData && (
              <select
                className="form-control"
                disabled={!!isAgreementsSaved}
                defaultValue={primary_contact_messenger}
                onChange={e =>
                  handleChangeClientProfile(
                    'primary_contact_messenger',
                    e.target.value,
                  )
                }
              >
                {formData &&
                  formData.primaryAppMessengers.map((val, key) => (
                    <option value={val} key={key}>
                      {translateToHumanReadableFormat(val)}
                    </option>
                  ))}
              </select>
            )}
          </Col>
          <Col>
            <label>User ID</label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={primary_app_username}
              placeholder="Enter user ID"
              onChange={e =>
                handleChangeClientProfile(
                  'primary_app_username',
                  e.target.value,
                )
              }
            />
          </Col>
        </Row>
      </div>
      <div className="mx-5 mt-4">
        <Row>
          <Col>
            <label>Preferred Mode of Communication</label>
            {formData && (
              <select
                className="form-control"
                disabled={!!isAgreementsSaved}
                defaultValue={primary_preferred_mode_communication}
                onChange={e =>
                  handleChangeClientProfile(
                    'primary_preferred_mode_communication',
                    e.target.value,
                  )
                }
              >
                {formData &&
                  formData.preferredModeOfCommunication.map((val, key) => (
                    <option value={val} key={key}>
                      {val}
                    </option>
                  ))}
              </select>
            )}
          </Col>
          <Col />
        </Row>
      </div>
      <br />
      <div className="divider">
        <hr />
      </div>
      <h3 className="font-semibold my-4">Contract Signatory</h3>
      <div className="mx-5 mt-4">
        <Row>
          <Col>
            <label>
              Full Name<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={signatory}
              placeholder="Enter full name"
              onChange={e =>
                handleChangeClientProfile('signatory', e.target.value)
              }
            />
            {formErrors.signatory === false ? (
              <span className="error-message"> Full name is required.</span>
            ) : (
              ''
            )}
          </Col>
          <Col>
            <label>
              Position<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={signatory_position}
              placeholder="Enter position"
              onChange={e =>
                handleChangeClientProfile('signatory_position', e.target.value)
              }
            />
            {formErrors.signatory_position === false ? (
              <span className="error-message"> Position is required.</span>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
      <div className="mx-5 mt-4">
        <Row>
          <Col md={6}>
            <label>
              Email Address<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              type="email"
              defaultValue={signatory_email}
              placeholder="Enter email address"
              onChange={e =>
                handleChangeClientProfile('signatory_email', e.target.value)
              }
            />
            {formErrors.signatory_email === false ? (
              <span className="error-message"> Email is required/invalid.</span>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
      <div className="mx-5 mt-4">
        <Row>
          <Col>
            <label>
              Mobile<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={signatory_mobile}
              placeholder="0917-XXX-XXXX or +63 917-XXX-XXXX"
              onChange={e =>
                handleChangeClientProfile('signatory_mobile', e.target.value)
              }
            />
            {formErrors.signatory_mobile === false ? (
              <span className="error-message"> Mobile no. is required.</span>
            ) : (
              ''
            )}
          </Col>
          <Col>
            <label>
              Landline<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={signatory_landline}
              placeholder="(02) 7XXX-XXXX"
              onChange={e =>
                handleChangeClientProfile('signatory_landline', e.target.value)
              }
            />
            {formErrors.signatory_landline === false ? (
              <span className="error-message"> Landline is required.</span>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
      <div className="mx-5 mt-4">
        <Row>
          <Col>
            <label>Messenger</label>
            {formData && (
              <select
                className="form-control"
                disabled={!!isAgreementsSaved}
                style={
                  isAgreementsSaved
                    ? { backgroundColor: '#e9ecef !important' }
                    : {}
                }
                defaultValue={signatory_messenger}
                onChange={e =>
                  handleChangeClientProfile(
                    'signatory_messenger',
                    e.target.value,
                  )
                }
              >
                {formData &&
                  formData.primaryAppMessengers.map((val, key) => (
                    <option value={val} key={key}>
                      {translateToHumanReadableFormat(val)}
                    </option>
                  ))}
              </select>
            )}
          </Col>
          <Col>
            <label>User ID</label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={signatory_username}
              placeholder="Enter user ID"
              onChange={e =>
                handleChangeClientProfile('signatory_username', e.target.value)
              }
            />
          </Col>
        </Row>
      </div>
      <div className="mx-5 mt-4">
        <Row>
          <Col>
            <label>Preferred Mode of Communication</label>
            {formData && (
              <select
                className="form-control"
                readOnly={!!isAgreementsSaved}
                style={
                  isAgreementsSaved
                    ? { backgroundColor: '#e9ecef !important' }
                    : {}
                }
                defaultValue={signatory_preferred_mode_communication}
                onChange={e =>
                  handleChangeClientProfile(
                    'signatory_preferred_mode_communication',
                    e.target.value,
                  )
                }
              >
                {formData &&
                  formData.preferredModeOfCommunication.map((val, key) => (
                    <option value={val} key={key}>
                      {val}
                    </option>
                  ))}
              </select>
            )}
          </Col>
          <Col />
        </Row>
      </div>
      <br />
      <div className="divider">
        <hr />
      </div>

      <h3 className="font-medium my-4">Team Leader</h3>
      <div className="mx-5 mt-4">
        <Row>
          <Col>
            <label>Full Name</label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={team_leader}
              placeholder="Enter Team Leader name"
              onChange={e =>
                handleChangeClientProfile('team_leader', e.target.value)
              }
            />
          </Col>
          <Col>
            <label>Position</label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={team_leader_position}
              placeholder="Enter Position"
              onChange={e =>
                handleChangeClientProfile(
                  'team_leader_position',
                  e.target.value,
                )
              }
            />
          </Col>
        </Row>
        <div className="mt-4">
          <Row>
            <Col md={6}>
              <label>Email Address</label>
              <Form.Control
                readOnly={!!isAgreementsSaved}
                type="email"
                defaultValue={team_leader_email}
                placeholder="Enter Email"
                onChange={e =>
                  handleChangeClientProfile('team_leader_email', e.target.value)
                }
              />
            </Col>
          </Row>
        </div>
      </div>
      <br />
      <div className="divider">
        <hr />
      </div>
      <h3 className="font-medium my-4">Finance Manager</h3>
      <div className="mx-5">
        <Row>
          <Col>
            <label>
              First Name<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={finance_mgr_first_name}
              placeholder="Enter full name"
              onChange={e =>
                handleChangeClientProfile(
                  'finance_mgr_first_name',
                  e.target.value,
                )
              }
            />
            {formErrors.finance_mgr_first_name === false ? (
              <span className="error-message"> First name is required.</span>
            ) : (
              ''
            )}
          </Col>
          <Col>
            <label>
              Last Name<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={finance_mgr_last_name}
              placeholder="Enter last name"
              onChange={e =>
                handleChangeClientProfile(
                  'finance_mgr_last_name',
                  e.target.value,
                )
              }
            />
            {formErrors.finance_mgr_last_name === false ? (
              <span className="error-message"> Last name is required.</span>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
      <div className="mx-5 mt-4">
        <Row>
          <Col md={6}>
            <label>
              Email Address<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              type="email"
              defaultValue={finance_mgr_email}
              placeholder="Enter email address"
              onChange={e =>
                handleChangeClientProfile('finance_mgr_email', e.target.value)
              }
            />
            {formErrors.finance_mgr_email === false ? (
              <span className="error-message"> Email is required/invalid.</span>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
      <br />
      <div className="divider">
        <hr />
      </div>

      <h3 className="font-medium my-4">Hiring Manager</h3>
      <div className="mx-5">
        <Row>
          <Col>
            <label>
              First Name<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={hiring_mgr_first_name}
              placeholder="Enter first name"
              onChange={e =>
                handleChangeClientProfile(
                  'hiring_mgr_first_name',
                  e.target.value,
                )
              }
            />
            {formErrors.hiring_mgr_first_name === false ? (
              <span className="error-message"> First name is required.</span>
            ) : (
              ''
            )}
          </Col>
          <Col>
            <label>
              Last Name<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={hiring_mgr_last_name}
              placeholder="Enter last name"
              onChange={e =>
                handleChangeClientProfile(
                  'hiring_mgr_last_name',
                  e.target.value,
                )
              }
            />
            {formErrors.hiring_mgr_last_name === false ? (
              <span className="error-message"> Last name is required.</span>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
      <div className="mx-5 mt-4">
        <Row>
          <Col md={6}>
            <label>
              Email Address<span className="text-danger">*</span>
            </label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              type="email"
              defaultValue={hiring_mgr_email}
              placeholder="Enter email address"
              onChange={e =>
                handleChangeClientProfile('hiring_mgr_email', e.target.value)
              }
            />
            {formErrors.hiring_mgr_email === false ? (
              <span className="error-message"> Email is required/invalid.</span>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
      <br />
      <div className="divider">
        <hr />
      </div>
      <h3 className="font-medium my-4">Additional Billing Recipients</h3>
      <Row>
        <div
          className="button-section mb-3 w-100"
          hidden={!!(recipients && recipients.length === 5)}
        >
          <Col md={6}>
            <span className="font-size-14 font-italic default-black m-0">
              Note: Maximum 5 records can be added
            </span>
          </Col>
          {!isAgreementsSaved && (
            <Col 
              md={6} 
              className="text-right"
              onClick={() => {
                const tempRecipients = JSON.parse(JSON.stringify(recipients));
                tempRecipients.push({ email: '', firstName: '', lastName: '' });
                handleAddRecipient(tempRecipients);
                const tempFormErrors = JSON.parse(JSON.stringify(formErrors));
                if (tempFormErrors.recipientValidation) {
                  tempFormErrors.recipientValidation = [];
                  setFormHasErrors(tempFormErrors);
                }
              }}
            >
              <i 
                className="fa fa-plus"
                style={{ cursor: 'pointer' }}
              />
              <span 
                className="font-size-14 font-medium"
                style={{ cursor: 'pointer' }}
              >
                Add
              </span>
            </Col>
          )}
        </div>
      </Row>
      {recipients && recipients.length ? (
        <>
          <AdditionalInvoiceRecipients
            handleAddRecipient={handleAddRecipient}
            recipients={recipients}
            formErrors={formErrors}
            setFormHasErrors={setFormHasErrors}
            setRecipients={setRecipients}
            isAgreementsSaved={isAgreementsSaved}
          />
        </>
      ) : (
        <>
          <h2> No recipients</h2>
        </>
      )}
    </Container>
  );
};

const ClientBillingInformation = ({
  clientProfile,
  handleChangeClientProfile,
  formData,
  isAgreementsSaved,
  formErrors,
}) => {
  const { bank_details, tin, preferred_currency } = clientProfile;

  return (
    <Container className="px-0 py-3 mt-4 mb-5">
      <div className="mx-5">
        <Row>
          <Col md={6}>
            <label>Tax Account Number</label>
            <Form.Control
              readOnly={!!isAgreementsSaved}
              defaultValue={tin}
              placeholder="Enter tax account number"
              onChange={e => handleChangeClientProfile('tin', e.target.value)}
            />
          </Col>
          <Col md={6}>
            <label>
              Default Currency<span className="text-danger">*</span>
            </label>
            {formData && (
              <select
                className="form-control"
                disabled={!!isAgreementsSaved}
                defaultValue={preferred_currency}
                onChange={e =>
                  handleChangeClientProfile(
                    'preferred_currency',
                    e.target.value,
                  )
                }
              >
                {formData &&
                  formData.preferredCurrencies.map((val, key) => (
                    <option value={val} key={key}>
                      {val}
                    </option>
                  ))}
              </select>
            )}
            {formErrors.preferred_currency === false ? (
              <span className="error-message"> Currency is required.</span>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

const ClientTeamSetup = ({
  clientProfile,
  formData,
  teamSetupData,
  setTeamSetupData,
  formErrors,
  isAgreementsSaved,
  availableExperienceLevels,
  setAvailableExperienceLevel,
  isDuplicated,
  setFormHasErrors,
  isCustomPositionEmpty,
  setLimitPositions,
  isLimitPositions,
  isSpecifiedPositionValid,
  setSpecifiedPositionValid,
  teamSetupValidityState,
  setTeamSetupValidityState,
}) => {
  const { client_team_setups } = clientProfile;

  /**
   * Adds a row to team setup
   */
  const handleAddTeamSetup = () => {
    const temp = teamSetupData ? JSON.parse(JSON.stringify(teamSetupData)) : [];
    temp.push(null);
    const tempExp = availableExperienceLevels ? JSON.parse(JSON.stringify(availableExperienceLevels)) : [];
    tempExp.push(null);
    if (temp.length === 51) {
      setLimitPositions(true);
      return;
    }

    // limit only to 50 positions
    setTeamSetupData(temp);
    setAvailableExperienceLevel(tempExp);
  };

  /**
   * Modify setupdata
   */
  const modifySetupData = (index, value, type) => {
    // initialize team setup data to mutable
    const temp = JSON.parse(JSON.stringify(teamSetupData));
    const tempExp = JSON.parse(JSON.stringify(availableExperienceLevels));
    const tempAvailExp = [];
    let othersTemplateId = 0;
    // check who triggered the setup data
    if (type === 'position') {
      // if selected is none, reset values
      if (value === 'placeholder') {
        temp[index] = null;
        setTeamSetupData(temp);
        tempExp[index] = null;
        setAvailableExperienceLevel(tempExp);
        return;
      }
      // filter only those who are related to the job order title
      const matches = formData.jobTemplates.filter((template) => {
        if (template.job_title.includes(value)) {
          tempAvailExp.push(template.experience_level);
          return template;
        }
        // if others, give it some experience level to choose from
        if (value === 'Others') {
          tempAvailExp.push('FRESH-GRAD','JUNIOR','MID-LEVEL','SENIOR','MANAGER');
          return template;
        }
      })
      //manipulate data;
      tempExp[index] = tempAvailExp;
      temp[index] = matches[0];
      temp[index].job_title = value;
      temp[index].quantity = 1;

      // check if title is custom
      matches.forEach((match) => {
        if (match.job_title === 'Others') {
          othersTemplateId = match.template_id;
          temp[index].template_id = othersTemplateId;
        }
      })
      //set
      setTeamSetupData(JSON.parse(JSON.stringify(temp)));
      setAvailableExperienceLevel(JSON.parse(JSON.stringify(tempExp)));
      return;
    }

    if (type === 'experience_level') {
      const templateLength = formData.jobTemplates.length;
      for (let i = 0; i < templateLength; i++) {
        if (formData.jobTemplates[i].job_title.includes(teamSetupData[index].job_title)) {
          if (formData.jobTemplates[i].experience_level === value) {
            temp[index].template_id = formData.jobTemplates[i].template_id;
            temp[index].experience_level = formData.jobTemplates[i].experience_level;
            setTeamSetupData(temp);
            break; 
          }
        }

        if (teamSetupData[index].job_title === 'Others' && formData.jobTemplates[i].job_title === 'Others') {
          othersTemplateId = formData.jobTemplates[i].template_id;
          temp[index].experience_level = value;
          temp[index].template_id = othersTemplateId;
          setTeamSetupData(temp);
          break;
        }
      }
      return;
    }

    if (type === 'description') {
      temp[index].description = value;
      setTeamSetupData(temp);
    }
  }
  const modifyQuantitySetupData = (index, quantity) => {
    const temp = JSON.parse(JSON.stringify(teamSetupData));
    if (temp[index]) {
      temp[index].quantity = quantity;
      setTeamSetupData(temp);
    }
  };


  /**
   * delete row setup
   */
  const deleteSetupData = index => {
    setLimitPositions(false);
    const temp = JSON.parse(JSON.stringify(teamSetupData));
    const tempErrors = JSON.parse(JSON.stringify(formErrors));
    const tempErrorsTeamSetup = JSON.parse(JSON.stringify(teamSetupValidityState));
    if (tempErrorsTeamSetup && tempErrorsTeamSetup.length) {
      tempErrorsTeamSetup.splice(index, 1);
      setTeamSetupValidityState(tempErrorsTeamSetup);
    }

    temp.splice(index, 1);
    setTeamSetupData(temp);
    if (!temp.length) {
      setFormHasErrors(false);
      return;
    }
    if (tempErrors && tempErrors.teamSetupValidation && tempErrors.teamSetupValidation.length) {
      tempErrors.teamSetupValidation.splice(index, 1);
    }
    setFormHasErrors(tempErrors);
  };
  

  return (
    <Container className="px-0 py-3 mt-4 mb-5">
      {!isAgreementsSaved && (
        <div className="mx-5">
          <Row>
            <Col className="team-setup">
              <div className="button-section" onClick={handleAddTeamSetup}>
                <i className="fa fa-plus" />
                <span className="font-size-14 font-medium">Add</span>
              </div>
            </Col>
          </Row>
        </div>
      )}
      <TeamSetupForm
        clientTeamSetups={client_team_setups}
        setTeamSetupData={setTeamSetupData}
        teamSetupData={teamSetupData}
        formData={formData}
        modifySetupData={modifySetupData}
        formErrors={formErrors}
        deleteSetupData={deleteSetupData}
        modifyQuantitySetupData={modifyQuantitySetupData}
        isAgreementsSaved={isAgreementsSaved}
        availableExperienceLevels={availableExperienceLevels}
        isDuplicated={isDuplicated}
        isCustomPositionEmpty={isCustomPositionEmpty}
        isLimitPositions={isLimitPositions}
        isSpecifiedPositionValid={isSpecifiedPositionValid}
        setSpecifiedPositionValid={setSpecifiedPositionValid}
        teamSetupValidityState={teamSetupValidityState}
        setTeamSetupValidityState={setTeamSetupValidityState}
      />
    </Container>
  );
};

const TeamSetupForm = ({
  clientTeamSetups,
  formData,
  modifySetupData,
  teamSetupData,
  formErrors,
  deleteSetupData,
  modifyQuantitySetupData,
  isAgreementsSaved,
  availableExperienceLevels,
  isDuplicated,
  isCustomPositionEmpty,
  isLimitPositions,
  isSpecifiedPositionValid,
  teamSetupValidityState,
  setTeamSetupValidityState
}) => {
  let disabled;
  if (teamSetupData) {
    disabled = teamSetupData.map(val => {
      if (val) {
        return val.template_id;
      }
    });
  }


  const uniqueJobDetails = () => {
    if (formData && formData.jobTemplates) {
      const experienceLevels = [];
      let jobTitles = formData.jobTemplates.map(template => {
        experienceLevels.push({ experience_level: template.experience_level });
        let title = '';
        if (template.job_title !== 'OTHERS') {
          title = template.job_title.substr(0, template.job_title.lastIndexOf(' - '));
        }
        return {
          jobTitleMask: title === '' ? template.job_title : title,
          jobTitleActual: template.job_title,
        }
      })
      jobTitles = _.uniqBy(jobTitles, 'jobTitleMask');
      
      let tempContainer = null;
      // rearrange because others is getting first in the first element
      const finalJobTitles = jobTitles.filter(titles => {
        if (titles.jobTitleMask === 'Others') {
          tempContainer = titles;
          return false;
        }
        return true;
      })
      
      finalJobTitles.push(tempContainer);

      return {
        jobTitles: finalJobTitles,
        experienceLevels: _.uniqBy(experienceLevels, 'experience_level'),
      }
    }
  }

  return (
    <>
      {isAgreementsSaved ? (
        <div className="team-setup-content filled-team-setup">
          <div className="mx-5 mb-4">
            {clientTeamSetups.length <= 0 && (
              <h4 className="header-fontcolor">No team setup</h4>
            )}
            {clientTeamSetups.map((val, key) => (
              <Row className="mb-3" key={key}>
                <Col md={5}>
                  <label>Position Title</label>
                  <Form.Control
                    type="text"
                    defaultValue={val.description}
                    disabled
                  />
                </Col>
                <Col md={5}>
                  <label>Experience Level</label>
                  <Form.Control
                    type="text"
                    defaultValue={translateToHumanReadableFormat(val.experience_level)}
                    disabled
                  />
                </Col>
                <Col md={1} className="p-0">
                  <label>Count</label>
                  <Form.Control
                    type="number"
                    defaultValue={val.quantity}
                    disabled
                    onWheel={e => e.currentTarget.blur()}
                  />
                </Col>
              </Row>
            ))}
          </div>
        </div>
      ) : (
        <>
        {isDuplicated && (
          <div className="mx-5 mb-4">
              <span className="error-message">Same position and experience level is not allowed.</span>
          </div>
        )}
        {isLimitPositions && (
          <div className="mx-5 mb-4">
            <span className="error-message">Limit reached, only 50 positions are allowed.</span>
          </div>
        )}
        {teamSetupData 
          && teamSetupData.map((val, key) => (
            <div className="team-setup-content" key={key}>
              <div className="mx-5 mb-4">
              {val &&
                formErrors &&
                formErrors.teamSetupValidation !== undefined &&
                formErrors.teamSetupValidation[key] &&
                formErrors.teamSetupValidation[key].quantity ===
                  false && (
                  <span className="error-message">
                    Only accepts a whole number from 1 to 99
                  </span>
              )}
                <Row key={key}>
                  <Col md={5}>
                    <label>Position Title</label>
                    {uniqueJobDetails() && uniqueJobDetails().jobTitles && (
                      <select
                        onChange={e => modifySetupData(key, e.target.value, 'position')}
                        className="form-control"
                        value={
                          val
                            ? val.job_title
                            : 'placeholder'
                        }
                      >
                        <option value="placeholder">Select position</option>
                        {uniqueJobDetails() && 
                          uniqueJobDetails().jobTitles.map((val2, key2) => (
                            <option key={`title-${key2}`} value={val2.jobTitleMask}>
                              {val2.jobTitleMask}
                            </option>
                          ))}
                      </select>
                    )}
                  </Col>
                  <Col md={5}>
                  <label>Experience Level</label>
                    {uniqueJobDetails() && uniqueJobDetails().experienceLevels && (
                      <select
                        onChange={e => modifySetupData(key, e.target.value, 'experience_level')}
                        className="form-control"
                        placeholder="Select Experience Level"
                        value={
                          val
                            ? val.experience_level
                            : 'placeholder'
                        }
                        disabled={val ? false : true }
                      >
                        <option value="placeholder">Select experience level</option>
                        {uniqueJobDetails() && 
                          uniqueJobDetails().experienceLevels.map((val2, key2) => {
                            if (val2.experience_level) {
                              return (
                                <option 
                                  key={`title-${key2}`} value={val2.experience_level}
                                  disabled={
                                     availableExperienceLevels && availableExperienceLevels.length
                                    ? availableExperienceLevels[key] && availableExperienceLevels[key].includes(val2.experience_level) ? false : true
                                    : false
                                  }
                                >
                                  {translateToHumanReadableFormat(val2.experience_level)}
                                </option>
                              )
                            }  
                          }
                          )}
                      </select>
                    )}
                  </Col>
                  <Col md={1} className="p-0">
                      <label>Count</label>
                      <Form.Control
                        type="number"
                        value={val ? val.quantity : 1}
                        disabled={!val}
                        onChange={e =>
                          modifyQuantitySetupData(key, e.target.value)
                        }
                        onWheel={e => e.currentTarget.blur()}
                        min="1"
                        max="99"
                      />
                    </Col>
                    <Col md={1} className="d-flex">
                      <div
                        className="delete-section"
                        onClick={() => deleteSetupData(key)}
                      >
                        <img src={deleteIcon} alt="Delete Icon" />
                      </div>
                    </Col>
                </Row>
                <Row>
                  <Col md={5} style={{ marginTop: 9 }}>
                    {val && val.job_title === 'Others' && (
                      <>
                        <label>Specify Position:</label>
                        <Form.Control
                          type="text"
                          value={val ? val.description : ''}
                          onChange={e => 
                            modifySetupData(key, e.target.value, 'description')
                          }
                          min="1"
                          max="99"
                        />
                        {teamSetupValidityState 
                        && teamSetupValidityState[key]
                        && teamSetupValidityState[key].isSpecifiedDescriptionEmpty && (
                          <span className="error-message">
                            Please fill out this field.
                          </span>
                        )}
                        {teamSetupValidityState 
                        && teamSetupValidityState[key]
                        && !teamSetupValidityState[key].isDescriptionValid && (
                          <span className="error-message">
                            Only accepts alphanumeric characters.
                          </span>
                        )}
                      </>
                    )} 
                  </Col>
                </Row>
              </div>
            </div>
          ))
        }     
        </>
      )}
    </>
  );
};
const AdditionalInvoiceRecipients = ({
  recipients,
  handleAddRecipient,
  formErrors,
  setFormHasErrors,
  setRecipients,
  isAgreementsSaved,
}) => {
  const deleteRecipient = key => {
    const tempRecipients = JSON.parse(JSON.stringify(recipients));
    tempRecipients.splice(key, 1);
    setRecipients(tempRecipients);
  };

  const handleChangeRecipients = (key, field, value) => {
    const tempRecipients = JSON.parse(JSON.stringify(recipients));
    tempRecipients[key][field] = value;
    handleAddRecipient(tempRecipients);

    if (formErrors) {
      const tempFormErrors = JSON.parse(JSON.stringify(formErrors));
      tempFormErrors.recipientValidation[key][field] = true;
      setFormHasErrors(tempFormErrors);
    }
  };

  return (
    <>
      {recipients &&
        recipients.map((val, key) => (
          <div className="mx-5 mt-4" key={key}>
            <Row className="additional-recipient-container m-0">
              <Col md={6} className="left-column">
                <label>
                  First Name<span className="text-danger">*</span>
                </label>
                <Form.Control
                  readOnly={!!isAgreementsSaved}
                  value={val.firstName}
                  placeholder="Enter first name"
                  onChange={e =>
                    handleChangeRecipients(key, 'firstName', e.target.value)
                  }
                />
                {formErrors &&
                formErrors.recipientValidation !== undefined &&
                formErrors.recipientValidation[key].firstName === false ? (
                  <span className="error-message">First name is required</span>
                ) : (
                  ''
                )}
              </Col>
              <Col md={6} className="right-column">
                <label>
                  Last Name<span className="text-danger">*</span>
                </label>
                <Form.Control
                  readOnly={!!isAgreementsSaved}
                  value={val.lastName}
                  placeholder="Enter last name"
                  onChange={e =>
                    handleChangeRecipients(key, 'lastName', e.target.value)
                  }
                />
                {formErrors &&
                formErrors.recipientValidation !== undefined &&
                formErrors.recipientValidation[key].lastName === false ? (
                  <span className="error-message">Last name is required</span>
                ) : (
                  ''
                )}
              </Col>
              <Col md={6} className="left-column mb-4">
                <div className="mt-4">
                  <label>
                    Email Address<span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    readOnly={!!isAgreementsSaved}
                    type="email"
                    value={val.email}
                    placeholder="Enter email"
                    onChange={e =>
                      handleChangeRecipients(key, 'email', e.target.value)
                    }
                  />
                  {formErrors &&
                  formErrors.recipientValidation !== undefined &&
                  formErrors.recipientValidation[key].email === false ? (
                    <span className="error-message">
                      {' '}
                      Email is required/invalid
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </Col>
              {!isAgreementsSaved && (
                <Col md={12} className="delete-content">
                  <span
                    className="font-medium"
                    onClick={() => deleteRecipient(key, recipients)}
                  >
                    Delete
                  </span>
                  <div
                    className="button-trash"
                    onClick={() => deleteRecipient(key, recipients)}
                  >
                    <img src={deleteIcon} alt="Delete Icon" />
                  </div>
                </Col>
              )}
            </Row>
          </div>
        ))}
    </>
  );
};

CompanyInformation.propTypes = {
  clientProfile: PropTypes.any,
  saveClientProfile: PropTypes.any,
  refetchClientData: PropTypes.any,
};

export default memo(CompanyInformation);
