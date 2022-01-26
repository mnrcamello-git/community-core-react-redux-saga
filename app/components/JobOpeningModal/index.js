/**
 *
 * JobOpeningModal
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import { Modal, Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import Select from 'react-select';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DatePicker from 'react-datepicker';

import {
  changeTitle,
  changeStartDate,
  changeContract,
  changeNumberRequest,
  changeImmSupervisor,
  changeSupervisorTitle,
  changeSupervisorEmail,
  changeYearsOfExp,
  changeMaxSalary,
  changeSkills,
  changeJobCategories,
  changePreamble,
  changeQualifications,
  changeResponsibilities,
  changeRemarks,
  changeExamType,
  changeExam,
  changeExamLink,
  changeExamFile,
  showJobModal,
  clearJobForm,
  requestSaveJob,
  showJobFormSuccessModal,
  changeJobTemplates,
  requestFetchJobTemplates,
  requestUpdateJob,
  fetchAllJobRequisitions,
  setJobFormErrorModal,
  requestFilterJobTemplate,
  showJobPreviewModal,
} from '../../containers/Hub/FileJobReqPage/actions';

// Asssets
import JobInformationIcon from '../../assets/images/hub/recruitment/job_information.svg';
import JobDetailsIcon from '../../assets/images/hub/recruitment/job_details.svg';
import ExamRemarksIcon from '../../assets/images/hub/recruitment/exam_remarks.svg';
import CancelIcon from '../../assets/images/hub/recruitment/cancel_icon.svg';
import ErrorIcon from '../../assets/images/hub/recruitment/error_icon.svg';
import HandIcon from '../../assets/images/hub/recruitment/hand_icon.svg';
import ArrowSaveIcon from '../../assets/images/hub/recruitment/arrow_save_icon.svg';
import BackIcon from '../../assets/images/hub/back_icon.png';
import PBLogo from '../../assets/images/PB_logo.png';
import CheckIcon from '../../assets/images/hub/recruitment/check_icon.svg';

import {
  formatHtmlToEditorState,
  convertObjectToString,
  validateEmail,
  validateUrl,
  getToken,
} from '../../containers/App/globalHelpers';

function JobOpeningModal(props) {
  useEffect(() => {
    props.dispatch(requestFilterJobTemplate());
  }, []);

  const toolbarOptions = {
    options: ['inline', 'list', 'textAlign', 'remove', 'history'],
  };

  const [isShowErrorModal, setShowErrorModal] = useState(false);
  const [isShowCancelModal, setShowCancelModal] = useState(false);
  const [isShowSaveModal, setShowSaveModal] = useState(false);

  const handleOnFilterJobTemplate = () => {
    props.dispatch(requestFilterJobTemplate());
  };

  /**
   * =========================
   * Job Information Forms
   * =========================
   */
  const handleOnChangeTitle = evt => {
    if (evt.target.value === '') {
      props.dispatch(
        changeTitle({
          title: evt.target.value,
          title_error: 'Job Position/Title is a required.',
        }),
      );
      return true;
    }
    props.dispatch(
      changeTitle({
        title: evt.target.value,
        title_error: '',
      }),
    );
  };

  const handleOnChangeStartDate = date => {
    if (date === null || date === '') {
      props.dispatch(
        changeStartDate({
          start_date: date,
          start_date_error: 'Job start date is a required.',
        }),
      );
      return true;
    }
    props.dispatch(
      changeStartDate({
        start_date: date,
        start_date_error: '',
      }),
    );
  };

  const handleOnChangeContract = evt => {
    if (evt.target.value === '') {
      props.dispatch(
        changeContract({
          contract_type: evt.target.value,
          contract_type_error: 'Job contract type is required.',
        }),
      );
      return true;
    }
    props.dispatch(
      changeContract({
        contract_type: evt.target.value,
        contract_type_error: '',
      }),
    );
  };

  const handleOnChangeNumberOfRequest = evt => {
    if (evt.target.value > 5) {
      props.dispatch(
        changeNumberRequest({
          number_of_request: 1,
          number_of_request_error:
            'Number of request must not be greater than 5.',
        }),
      );
    } else if (evt.target.value === '' || evt.target.value <= 0) {
      props.dispatch(
        changeNumberRequest({
          number_of_request: evt.target.value,
          number_of_request_error: 'Please enter a valid number of request.',
        }),
      );
    } else {
      props.dispatch(
        changeNumberRequest({
          number_of_request: evt.target.value,
          number_of_request_error: '',
        }),
      );
    }
  };

  const handleOnChangeImmSupervisor = evt => {
    if (evt.target.value === '') {
      props.dispatch(
        changeImmSupervisor({
          immediate_supervisor: evt.target.value,
          immediate_supervisor_error: 'Job immediate supervisor is required.',
        }),
      );
      return true;
    }
    props.dispatch(
      changeImmSupervisor({
        immediate_supervisor: evt.target.value,
        immediate_supervisor_error: '',
      }),
    );
    return true;
  };

  const handleOnChangeSupervisorTitle = evt => {
    if (evt.target.value === '') {
      props.dispatch(
        changeSupervisorTitle({
          supervisor_title: evt.target.value,
          supervisor_title_error: 'Job supervisor title is required.',
        }),
      );
      return true;
    }
    props.dispatch(
      changeSupervisorTitle({
        supervisor_title: evt.target.value,
        supervisor_title_error: '',
      }),
    );
    return true;
  };

  const handleOnChangeSupervisorEmail = evt => {
    if (evt.target.value === '') {
      props.dispatch(
        changeSupervisorEmail({
          supervisor_email: evt.target.value,
          supervisor_email_error: 'Job supervisor email is required.',
        }),
      );
      return true;
    }

    if (validateEmail(evt.target.value) === false) {
      props.dispatch(
        changeSupervisorEmail({
          supervisor_email: evt.target.value,
          supervisor_email_error: 'Job supervisor email is invalid.',
        }),
      );
      return true;
    }

    props.dispatch(
      changeSupervisorEmail({
        supervisor_email: evt.target.value,
        supervisor_email_error: '',
      }),
    );
    return true;
  };

  /**
   * ======================
   * Job Details Form
   * ======================
   */
  const initialPreamble = formatHtmlToEditorState(props.job_details.preamble);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [preambleEditor, setPreambleEditor] = useState(initialPreamble);
  const initialResponsibility = formatHtmlToEditorState(
    props.job_details.responsibilities,
  );
  const [responsibilityEditor, setResponsibilityEditor] = useState(
    initialResponsibility,
  );

  const initialQualifications = formatHtmlToEditorState(
    props.job_details.qualifications,
  );
  const [qualificationEditor, setQualificationEditor] = useState(
    initialQualifications,
  );

  const handleOnChangeYearsOfExperience = evt => {
    if (evt.target.value === '') {
      props.dispatch(
        changeYearsOfExp({
          years_of_experience: evt.target.value,
          years_of_experience_error: 'Job experience level is a required.',
        }),
      );

      return true;
    }
    props.dispatch(
      changeYearsOfExp({
        years_of_experience: evt.target.value,
        years_of_experience_error: '',
      }),
    );
    handleOnFilterJobTemplate();
  };

  const handleOnChangeMaxSalary = evt => {
    if (evt.target.value === '' || evt.target.value <= 0) {
      props.dispatch(
        changeMaxSalary({
          max_salary: evt.target.value,
          max_salary_error: 'Job max salary is a required.',
        }),
      );
      return true;
    }
    props.dispatch(
      changeMaxSalary({
        max_salary: evt.target.value,
        max_salary_error: '',
      }),
    );
  };

  const handleOnChangeJobCategories = selected => {
    if (selected === null || selected.length < 1) {
      props.dispatch(
        changeJobCategories({
          job_category: selected,
          job_category_error: 'Job category is required.',
        }),
      );
      return true;
    }

    if (selected.length > 5) {
      props.dispatch(
        changeJobCategories({
          job_category: selected,
          job_category_error: 'Maximum selected job category is limited to 5.',
        }),
      );
      return true;
    }
    props.dispatch(
      changeJobCategories({
        job_category: selected,
        job_category_error: '',
      }),
    );
    handleOnFilterJobTemplate();
  };

  const handleOnChangeSkills = selected => {
    if (selected === null || selected.length < 1) {
      props.dispatch(
        changeSkills({
          skills: selected,
          skills_error: 'Job skills is required.',
        }),
      );
      return true;
    }
    props.dispatch(
      changeSkills({
        skills: selected,
        skills_error: '',
      }),
    );
  };

  const handlePreambleEditorStateChange = (evt, editorState) => {
    setPreambleEditor(editorState);
    const preambleHtml = convertObjectToString(editorState);
    if (preambleHtml === '' || preambleHtml === '<p></p>\n') {
      props.dispatch(
        changePreamble({
          preamble: preambleHtml,
          preamble_error: 'Job preamble is required.',
        }),
      );
      return true;
    }

    props.dispatch(
      changePreamble({
        preamble: preambleHtml,
        preamble_error: '',
      }),
    );
  };

  const [qualificationError, setQualificationError] = useState(
    props.job_form_error.qualifications_error,
  );
  const handleQualificationsEditorStateChange = editorState => {
    setQualificationEditor(editorState);
    const qualificationHtml = convertObjectToString(editorState);
    if (qualificationHtml === '' || qualificationHtml === '<p></p>\n') {
      setQualificationError('Job qualification is required.');
      return true;
    }
    setQualificationError('');
  };

  const [responsibilitiesError, setResponsibilitiesError] = useState(
    props.job_form_error.responsibilities_error,
  );
  const handleResponsibilitiesEditorStateChange = editorState => {
    setResponsibilityEditor(editorState);
    const responsibilityHtml = convertObjectToString(editorState);
    if (responsibilityHtml === '' || responsibilityHtml === '<p></p>\n') {
      setResponsibilitiesError('Job responsibilities is required.');
      return true;
    }
    setResponsibilitiesError('');
  };

  const handleOnChangeJobTemplates = evt => {
    if (
      evt.target.value === '' ||
      evt.target.selectedOptions[0].text === 'Others'
    ) {
      setResponsibilityEditor(formatHtmlToEditorState('<p></p>\n'));
      setQualificationEditor(formatHtmlToEditorState('<p></p>\n'));
      props.dispatch(
        changeJobTemplates({
          skills: [],
          qualifications: '<p></p>\n',
          responsibilities: '<p></p>\n',
          job_template_id: evt.target.value,
        }),
      );
      return true;
    }

    const selectedTemplateIndex = props.templates.findIndex(
      obj => obj.template_id == evt.target.value,
    );
    const qualificationTemplate = formatHtmlToEditorState(
      props.templates[selectedTemplateIndex].qualifications
        ? props.templates[selectedTemplateIndex].qualifications
        : '',
    );
    const respoTemplate = formatHtmlToEditorState(
      props.templates[selectedTemplateIndex].responsibilities
        ? props.templates[selectedTemplateIndex].responsibilities
        : '',
    );

    setResponsibilityEditor(respoTemplate);
    setQualificationEditor(qualificationTemplate);
    setResponsibilitiesError('');
    setQualificationError('');
    props.dispatch(
      changeJobTemplates({
        skills: props.templates[selectedTemplateIndex].keywords_ids,
        qualifications: props.templates[selectedTemplateIndex].qualifications
          ? props.templates[selectedTemplateIndex].qualifications
          : '',
        responsibilities: props.templates[selectedTemplateIndex]
          .responsibilities
          ? props.templates[selectedTemplateIndex].responsibilities
          : '',
        job_template_id: props.templates[selectedTemplateIndex].template_id
          ? props.templates[selectedTemplateIndex].template_id
          : '',
      }),
    );
  };

  /**
   * ======================
   * Exam and Remarks Form
   * ======================
   */
  const initialRemarks = formatHtmlToEditorState(props.job_details.remarks);
  const [remarksEditor, setRemarksEditor] = useState(initialRemarks);
  // https://storage.googleapis.com/core2_bucket/staging/job-requisition/DERIVATIVE PATH/asdadasdFAQsR3C.pdf
  const initialExamFile = props.job_details.exam_path.substring(
    props.job_details.exam_path.lastIndexOf('/') + 1,
  );
  const [examFile, setExamFile] = useState(initialExamFile);
  const [examError, setExamError] = useState('');

  const handleRemarksEditorStateChange = (evt, editorState) => {
    setRemarksEditor(editorState);
    props.dispatch(
      changeRemarks({
        remarks: convertObjectToString(editorState),
      }),
    );
  };

  const handleOnChangeExam = evt => {
    setExamFile('');
    props.dispatch(
      changeExamType({
        exam_type: '',
      }),
    );
    if (evt.target.checked === true) {
      props.dispatch(
        changeExam({
          exam: evt.target.checked,
          exam_file: props.job_details.exam_file,
          exam_link: props.job_details.exam_link,
          exam_link_error: '',
          exam_pb: false,
          exam_path: props.job_details.exam_path,
          exam_file_error: props.job_details.exam_file_error,
          exam_type: '',
        }),
      );
      return true;
    }
    props.dispatch(
      changeExam({
        exam: evt.target.checked,
        exam_file: '',
        exam_link: '',
        exam_link_error: '',
        exam_pb: false,
        exam_file_error: '',
        exam_path: '',
        exam_type: '',
      }),
    );
  };

  const handleOnChangeExamType = exam => {
    if (exam === 'exam-pb') {
      setExamFile('');
      props.dispatch(
        changeExam({
          exam: true,
          exam_file: '',
          exam_link: '',
          exam_link_error: '',
          exam_pb: true,
          exam_file_error: '',
          exam_path: '',
          exam_type: 'exam-pb',
        }),
      );
      return true;
    }

    if (exam === 'exam-link') {
      setExamFile('');
      props.dispatch(
        changeExam({
          exam: true,
          exam_file: '',
          exam_link: '',
          exam_link_error: '',
          exam_pb: false,
          exam_file_error: '',
          exam_path: '',
          exam_type: 'exam-link',
        }),
      );
      return true;
    }
    if (exam === 'exam-file') {
      props.dispatch(
        changeExam({
          exam: true,
          exam_file: '',
          exam_link: '',
          exam_link_error: '',
          exam_pb: false,
          exam_file_error: '',
          exam_path: '',
          exam_type: 'exam-file',
        }),
      );
      return true;
    }

    setExamFile('');
    props.dispatch(
      changeExam({
        exam,
        exam_file: '',
        exam_link: '',
        exam_link_error: '',
        exam_pb: false,
        exam_file_error: '',
        exam_path: '',
        exam_type: '',
      }),
    );
  };

  const handleOnChangeFile = evt => {
    if (evt.target.files[0].size <= 2097152) {
      props.dispatch(
        changeExamFile({
          exam_file: evt.target.files[0],
          exam_file_error: '',
          exam_link: '',
          exam_link_error: '',
          exam_pb: false,
          exam_path: '',
          exam: true,
        }),
      );
      setExamFile(evt.target.files[0].name);
      return true;
    }
    props.dispatch(
      changeExamFile({
        exam_file: evt.target.files[0],
        exam_file_error: '*  NOTE: 2MB max size, only accepts PDF format',
        exam_link: props.job_details.exam_link,
        exam_link_error: '',
        exam_path: '',
        exam_pb: props.job_details.exam_pb,
        exam: true,
      }),
    );
  };

  const handleOnChangeExamLink = evt => {
    setExamFile('');
    let errorMessage = '';
    if (evt.target.value === '') {
      errorMessage = 'Exam link is required.';
    }
    if (validateUrl(evt.target.value) === false) {
      errorMessage = 'Exam link is invalid.';
    }
    props.dispatch(
      changeExamLink({
        exam_link: evt.target.value,
        exam: evt.target.value,
        exam_file: '',
        exam_pb: false,
        exam_file_error: '',
        exam_link_error: errorMessage,
        exam_path: '',
      }),
    );
    return true;
  };

  const handleOnResetFile = () => {
    setExamFile('');
    document.getElementById('upload-exam').value = '';
    props.dispatch(
      changeExamFile({
        exam_file: '',
        exam_path: '',
        exam_file_error: '',
        exam_link: '',
        exam_link_error: '',
        exam_pb: false,
      }),
    );
  };

  /**
   * ======================
   * Validate Form
   * ======================
   */
  const onValidate = () => {
    setShowSaveModal(false);
    let errorCount = 0;

    // Job Information Validation
    if (props.job_details.title === '') {
      errorCount += 1;
      props.dispatch(
        changeTitle({
          title: '',
          title_error: 'Job title/position is required.',
        }),
      );
    }

    if (props.job_details.start_date === '') {
      errorCount += 1;
      props.dispatch(
        changeTitle({
          title: '',
          title_error: 'Job start date is a required.',
        }),
      );
    }

    if (props.job_details.contract_type === '') {
      errorCount += 1;
      props.dispatch(
        changeContract({
          contract_type: '',
          contract_type_error: 'Job contract type is required.',
        }),
      );
    }

    if (props.job_details.number_of_request > 5) {
      errorCount += 1;
      props.dispatch(
        changeNumberRequest({
          number_of_request: 1,
          number_of_request_error:
            'Number of request must not be greater than 5.',
        }),
      );
    }

    if (
      props.job_details.number_of_request === '' ||
      props.job_details.number_of_request <= 0
    ) {
      errorCount += 1;
      props.dispatch(
        changeNumberRequest({
          number_of_request: props.job_details.number_of_request,
          number_of_request_error: 'Please enter a valid number of request.',
        }),
      );
    }

    if (props.job_details.immediate_supervisor === '') {
      errorCount += 1;
      props.dispatch(
        changeImmSupervisor({
          immediate_supervisor: props.job_details.immediate_supervisor,
          immediate_supervisor_error: 'Job immediate supervisor is required.',
        }),
      );
    }

    if (props.job_details.supervisor_title === '') {
      errorCount += 1;
      props.dispatch(
        changeSupervisorTitle({
          supervisor_title: props.job_details.supervisor_title,
          supervisor_title_error: 'Job supervisor title is required.',
        }),
      );
    }

    if (props.job_details.supervisor_email === '') {
      errorCount += 1;
      props.dispatch(
        changeSupervisorEmail({
          supervisor_email: props.job_details.supervisor_email,
          supervisor_email_error: 'Job supervisor email is required.',
        }),
      );
    }

    if (validateEmail(props.job_details.supervisor_email) === false) {
      errorCount += 1;
      props.dispatch(
        changeSupervisorEmail({
          supervisor_email: props.job_details.supervisor_email,
          supervisor_email_error: 'Job supervisor email is invalid.',
        }),
      );
    }

    // Job Details Validation
    if (props.job_details.years_of_experience === '') {
      errorCount += 1;
      props.dispatch(
        changeYearsOfExp({
          years_of_experience: props.job_details.years_of_experience,
          years_of_experience_error: 'Job experience level is a required.',
        }),
      );
    }

    if (
      props.job_details.max_salary === '' ||
      props.job_details.max_salary <= 0
    ) {
      errorCount += 1;
      props.dispatch(
        changeMaxSalary({
          max_salary: props.job_details.max_salary,
          max_salary_error: 'Job max salary is a required.',
        }),
      );
    }

    if (
      props.job_details.job_category === null ||
      props.job_details.job_category.length < 1
    ) {
      errorCount += 1;
      props.dispatch(
        changeJobCategories({
          job_category: props.job_details.job_category,
          job_category_error: 'Job category is required.',
        }),
      );
    }

    if (props.job_details.job_category.length > 5) {
      errorCount += 1;
      props.dispatch(
        changeJobCategories({
          job_category: props.job_details.job_category,
          job_category_error: 'Maximum selected job category is limited to 5.',
        }),
      );
    }

    if (
      props.job_details.skills === null ||
      props.job_details.skills.length < 1
    ) {
      errorCount += 1;
      props.dispatch(
        changeSkills({
          skills: props.job_details.skills,
          skills_error: 'Job skills is required.',
        }),
      );
    }

    const preambleHtml = convertObjectToString(preambleEditor);
    if (preambleHtml === '' || preambleHtml === '<p></p>\n') {
      errorCount += 1;
      props.dispatch(
        changePreamble({
          preamble: preambleHtml,
          preamble_error: 'Job preamble is required.',
        }),
      );
    } else {
      props.dispatch(
        changePreamble({
          preamble: preambleHtml,
          preamble_error: '',
        }),
      );
    }

    const qualificationHtml = convertObjectToString(qualificationEditor);
    if (qualificationHtml === '' || qualificationHtml === '<p></p>\n') {
      errorCount += 1;
      setQualificationError('Job qualification is required.');
      props.dispatch(
        changeQualifications({
          qualifications: qualificationHtml,
          qualifications_error: 'Job qualification is required.',
        }),
      );
    } else {
      setQualificationError('');
      props.dispatch(
        changeQualifications({
          qualifications: qualificationHtml,
          qualifications_error: '',
        }),
      );
    }

    const responsibilityHtml = convertObjectToString(responsibilityEditor);
    if (responsibilityHtml === '' || responsibilityHtml === '<p></p>\n') {
      errorCount += 1;
      setResponsibilitiesError('Job responsibilities is required.');
      props.dispatch(
        changeResponsibilities({
          responsibilities: responsibilityHtml,
          responsibilities_error: 'Job responsibilities is required.',
        }),
      );
    } else {
      setResponsibilitiesError('');
      props.dispatch(
        changeResponsibilities({
          responsibilities: responsibilityHtml,
          responsibilities_error: '',
        }),
      );
    }

    // Exam and Remarks Error Handler
    if (props.job_details.exam === true && props.job_details.exam_type === '') {
      setExamError('Please select one of the following exam.');
      errorCount += 1;
    }

    if (
      props.job_details.exam_type === 'exam-link' &&
      props.job_details.exam_link === ''
    ) {
      errorCount += 1;
      props.dispatch(
        changeExamLink({
          exam_link: props.job_details.exam_link,
          exam: props.job_details.exam,
          exam_file: '',
          exam_pb: false,
          exam_file_error: '',
          exam_link_error: 'Exam link is required.',
          exam_path: '',
        }),
      );
    }

    if (
      props.job_details.exam_type === 'exam-link' &&
      validateUrl(props.job_details.exam_link) === false
    ) {
      errorCount += 1;
      props.dispatch(
        changeExamLink({
          exam_link: props.job_details.exam_link,
          exam: props.job_details.exam,
          exam_file: '',
          exam_pb: false,
          exam_file_error: '',
          exam_link_error: 'Exam link is invalid.',
          exam_path: '',
        }),
      );
    }

    if (
      props.job_details.exam_type === 'exam-file' &&
      props.job_details.exam_file === '' &&
      props.job_details.exam_path === ''
    ) {
      errorCount += 1;
      props.dispatch(
        changeExamFile({
          exam_file: props.job_details.exam_file,
          exam_file_error: 'Exam file is required.',
          exam_link: '',
          exam_link_error: '',
          exam_pb: false,
          exam_path: '',
          exam: true,
        }),
      );
      setExamFile('');
    }

    if (
      props.job_details.exam_file.size > 2097152 &&
      props.job_details.exam_path === ''
    ) {
      errorCount += 1;
      props.dispatch(
        changeExamFile({
          exam_file: '',
          exam_file_error: 'Maximum of 2 MB. Uploaded file exceeds size limit.',
          exam_link: props.job_details.exam_link,
          exam_link_error: '',
          exam_path: '',
          exam_pb: props.job_details.exam_pb,
          exam: true,
        }),
      );
      setExamFile('');
    }

    // Save or update job
    if (errorCount === 0) {
      setShowSaveModal(false);
      if (props.method === 'create') {
        props.dispatch(
          requestSaveJob({
            job_form_modal_loading: true,
          }),
        );
        return true;
      }
      props.dispatch(
        requestUpdateJob({
          job_form_modal_loading: true,
        }),
      );
      return true;
    }

    setShowErrorModal(true);
  };

  /**
   * =====================
   * Preview
   * =====================
   */
  const handlePreviewModal = () => {
    const responsibilityHtml = convertObjectToString(responsibilityEditor);
    props.dispatch(
      changeResponsibilities({
        responsibilities: responsibilityHtml,
        responsibilities_error: responsibilitiesError,
      }),
    );
    const qualificationHtml = convertObjectToString(qualificationEditor);
    props.dispatch(
      changeQualifications({
        qualifications: qualificationHtml,
        qualifications_error: qualificationError,
      }),
    );
    props.dispatch(
      showJobPreviewModal({
        job_preview_modal: true,
      }),
    );
  };
  /**
   * =====================
   * Cancel Modal
   * =====================
   */
  const handleCancelConfirmed = () => {
    setShowCancelModal(false);
    props.dispatch(clearJobForm());
    props.dispatch(
      showJobModal({
        job_form_modal: false,
      }),
    );
  };

  const handleOnClickOk = () => {
    props.dispatch(showJobFormSuccessModal({ show_modal: false }));
    props.dispatch(clearJobForm());
    props.dispatch(fetchAllJobRequisitions());
    props.dispatch(
      showJobModal({
        job_form_modal: false,
      }),
    );
  };

  useEffect(() => {
    const jobCategories = props.job_details.job_category;
    if (jobCategories == null) {
      setQualificationEditor(formatHtmlToEditorState('<p> </p>'));
      setResponsibilityEditor(formatHtmlToEditorState('<p> </p>'));
    }
    if (Array.isArray(jobCategories)) {
      if (jobCategories.length <= 0) {
        setQualificationEditor(formatHtmlToEditorState('<p> </p>'));
        setResponsibilityEditor(formatHtmlToEditorState('<p> </p>'));
      }
    }
  }, [props.job_details.job_category]);
  const validateJobDescriptionState = method => {
    const experienceLevel = [
      'MID-LEVEL',
      'FRESH-GRAD',
      'SENIOR',
      'MANAGER',
      'JUNIOR',
    ];
    if (method === 'close') {
      return true;
    }
    const jobCategories = props.job_details.job_category;
    if (Array.isArray(jobCategories)) {
      if (jobCategories.length <= 0) {
        return true;
      }
    }
    if (jobCategories == null) {
      props.dispatch(
        changeJobCategories({
          job_category: [],
          job_category_error: '',
        }),
      );
      props.dispatch(
        changeSkills({
          skills: [],
          skills_error: '',
        }),
      );
      props.dispatch(
        changeJobTemplates({
          skills: [],
          qualifications: '<p></p>\n',
          responsibilities: '<p></p>\n',
          job_template_id: 0,
        }),
      );

      handleOnFilterJobTemplate();
      return true;
    }
    if (experienceLevel.includes(props.job_details.years_of_experience)) {
      return false;
    }
    return true;
  };

  const jobDescriptionPlaceHolder = {
    emptyState: 'Please select Experience Level and Job Categories first',
    filledState: 'Select Job Description Template',
  };

  return (
    <div>
      <LoadingOverlay active={props.loading} spinner text="Saving...">
        <button
          type="button"
          className="back-btn"
          onClick={handleCancelConfirmed}
        >
          <img alt="back-icon" src={BackIcon} />
          Back
        </button>
        <Modal.Header>
          <img
            src={PBLogo}
            alt="Penbrothers Logo"
            title="Penbrothers"
            className="logo"
          />
        </Modal.Header>
        <Modal.Body>
          <div className="contailer-fluid">
            <div className="row">
              <div className="col-sm-2 text-center">
                <img
                  src={JobInformationIcon}
                  alt="Job Information Icon"
                  title="Job Information Icon"
                />
                <p className="d-block mt-3 default-color">Job Information</p>
              </div>
              <div className="col-sm-9 mt-3">
                <div className="form-group row">
                  <div className="col-sm-6">
                    <label htmlFor="create-job-title">
                      Job Title/Position <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={
                        props.job_details.title_error
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      placeholder="Enter job title/position"
                      id="create-job-title"
                      defaultValue={props.job_details.title}
                      onBlur={handleOnChangeTitle}
                      disabled={props.method === 'close'}
                    />

                    {props.job_details.title_error ? (
                      <div className="text-danger">
                        {props.job_details.title_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="create-job-start-date">
                      Start Date <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                      selected={props.job_details.start_date}
                      placeholderText="Select an earliest start date"
                      dateFormat="dd-MMM-yyyy"
                      disabled={props.method === 'close'}
                      className={
                        props.job_details.start_date_error
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      minDate={new Date()}
                      onChange={handleOnChangeStartDate}
                    />
                    {props.job_details.start_date_error ? (
                      <div className="text-danger">
                        {props.job_details.start_date_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6 d-none">
                    <label htmlFor="create-job-contract">
                      Contract Type <span className="text-danger">*</span>
                    </label>
                    <select
                      type="text"
                      disabled={props.method === 'close'}
                      className={
                        props.job_details.contract_type_error
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      placeholder="Enter job title/position"
                      id="create-job-contract"
                      onBlur={handleOnChangeContract}
                      defaultValue={props.job_details.contract_type}
                    >
                      <option value="FULL-TIME">Full Time</option>
                      <option value="PART-TIME">Part Time</option>
                      <option value="CONTRACTUAL">Contractual</option>
                      <option value="PROJECT">Project</option>
                    </select>
                    {props.job_details.contract_type_error ? (
                      <div className="text-danger">
                        {props.job_details.contract_type_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="create-job-supervisor">
                      Number of Request <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      defaultValue={props.job_details.number_of_request}
                      onBlur={handleOnChangeNumberOfRequest}
                      disabled={props.method !== 'create'}
                      className={
                        props.job_details.number_of_request_error
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      placeholder="Enter number of request"
                      id="create-job-supervisor"
                    />
                    {props.job_details.number_of_request_error ? (
                      <div className="text-danger">
                        {props.job_details.number_of_request_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <label htmlFor="create-job-supervisor">
                      Immediate Supervisor{' '}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={props.job_details.immediate_supervisor}
                      onBlur={handleOnChangeImmSupervisor}
                      disabled={props.method === 'close'}
                      className={
                        props.job_details.immediate_supervisor_error
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      placeholder="Enter immediate supervisor"
                      id="create-job-supervisor"
                    />
                    {props.job_details.immediate_supervisor_error ? (
                      <div className="text-danger">
                        {props.job_details.immediate_supervisor_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="create-job-supervisor-title">
                      Supervisor Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={props.job_details.supervisor_title}
                      disabled={props.method === 'close'}
                      onBlur={handleOnChangeSupervisorTitle}
                      className={
                        props.job_details.supervisor_title_error
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      placeholder="Enter supervisor title"
                      id="create-job-supervisor-title"
                    />
                    {props.job_details.supervisor_title_error ? (
                      <div className="text-danger">
                        {props.job_details.supervisor_title_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <label htmlFor="create-job-supervisor-email">
                      Supervisor Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      defaultValue={props.job_details.supervisor_email}
                      onBlur={handleOnChangeSupervisorEmail}
                      disabled={props.method === 'close'}
                      className={
                        props.job_details.supervisor_email_error
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      placeholder="Enter supervisor email"
                      id="create-job-supervisor-email"
                    />
                    {props.job_details.supervisor_email_error ? (
                      <div className="text-danger">
                        {props.job_details.supervisor_email_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-11 offset-sm-1">
              <hr />
            </div>
            <div className="row">
              <div className="col-sm-2 text-center">
                <img
                  src={JobDetailsIcon}
                  alt="Job Details Icon"
                  title="Job Details Icon"
                />
                <p className="d-block mt-3 default-color">Job Details</p>
              </div>
              <div className="col-sm-9 mt-3">
                <div className="form-group row">
                  <div className="col-sm-6">
                    <label htmlFor="create-job-years-of-exp">
                      Experience Level <span className="text-danger">*</span>
                    </label>
                    <select
                      className={
                        props.job_details.years_of_experience_error
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      disabled={props.method === 'close'}
                      placeholder="Enter job title/position"
                      id="create-job-years-of-exp"
                      defaultValue={props.job_details.years_of_experience}
                      onChange={handleOnChangeYearsOfExperience}
                    >
                      <option value="" hidden>
                        Select Experience Level
                      </option>
                      <option value="FRESH-GRAD">
                        Fresh Graduate (0 - 1 year)
                      </option>
                      <option value="JUNIOR">Junior (1 - 3 years)</option>
                      <option value="MID-LEVEL">Mid-Level (3 - 5 years)</option>
                      <option value="SENIOR">Senior (5 - 8 years)</option>
                      <option value="MANAGER">Manager ({'>'} 8 years)</option>
                    </select>
                    {props.job_details.years_of_experience_error ? (
                      <div className="text-danger">
                        {props.job_details.years_of_experience_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="create-job-max-salary">
                      Max Salary <span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-12">
                      <div className="row">
                        <span className="white-color default-bgcolor php">
                          PHP
                        </span>
                        <input
                          type="number"
                          onWheel={e => e.currentTarget.blur()}
                          className={
                            props.job_details.max_salary_error
                              ? 'is-invalid input form-control max-salary float-right'
                              : 'input form-control max-salary float-right'
                          }
                          disabled={props.method === 'close'}
                          placeholder="Input amount of max salary per month"
                          id="create-job-max-salary"
                          defaultValue={props.job_details.max_salary}
                          onBlur={handleOnChangeMaxSalary}
                        />
                        {props.job_details.max_salary_error ? (
                          <div className="text-danger">
                            {props.job_details.max_salary_error}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <label htmlFor="create-job-categories">
                      Job Categories <span className="text-danger">*</span>
                    </label>
                    <Select
                      isMulti
                      value={props.job_details.job_category}
                      name="colors"
                      options={props.categories}
                      size="10"
                      isDisabled={props.method === 'close'}
                      placeholder="Select job categories"
                      classNamePrefix={
                        props.job_details.job_category_error
                          ? 'is-invalid input select-control'
                          : 'input select-control'
                      }
                      onChange={handleOnChangeJobCategories}
                    />
                    {props.job_details.job_category_error ? (
                      <div className="text-danger">
                        {props.job_details.job_category_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <label htmlFor="create-job-years-of-exp">
                      Job Descriptions
                    </label>
                    <select
                      className="input form-control"
                      placeholder="Enter job title/position"
                      id="create-job-years-of-exp"
                      onChange={handleOnChangeJobTemplates}
                      value={props.job_details.job_template_id}
                      disabled={validateJobDescriptionState(props.method)}
                    >
                      {props.method !== 'close' &&
                        props.templates.map(template => (
                          <>
                            <option value="" hidden>
                              {validateJobDescriptionState(props.method)
                                ? jobDescriptionPlaceHolder.emptyState
                                : jobDescriptionPlaceHolder.filledState}
                            </option>
                            <option
                              key={template.template_id}
                              value={template.template_id}
                            >
                              {template.job_title}
                            </option>
                          </>
                        ))}
                      {props.method === 'close' &&
                        props.job_details.job_template_id != 0 &&
                        props.templates.map(template => (
                          <option
                            key={template.template_id}
                            value={template.template_id}
                          >
                            {template.job_title}
                          </option>
                        ))}
                      {props.method === 'close' &&
                        props.job_details.job_template_id == 0 && (
                          <option value={' '}>No description provided.</option>
                        )}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <label htmlFor="create-job-skills">
                      Skills <span className="text-danger">*</span>
                    </label>
                    <Select
                      isMulti
                      name="colors"
                      value={props.job_details.skills}
                      options={props.keywords}
                      placeholder="Select skills"
                      classNamePrefix={
                        props.job_details.skills_error
                          ? 'is-invalid input select-control'
                          : 'input select-control'
                      }
                      isDisabled={props.method === 'close'}
                      onChange={handleOnChangeSkills}
                    />
                    {props.job_details.skills_error ? (
                      <div className="text-danger">
                        {props.job_details.skills_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <label htmlFor="create-job-years-of-exp">
                      Preamble <span className="text-danger">*</span>
                    </label>
                    <Editor
                      toolbar={toolbarOptions}
                      defaultEditorState={preambleEditor}
                      wrapperClassName={
                        props.method === 'close' ? 'editor-disabled' : ''
                      }
                      stripPastedStyles
                      readOnly={props.method === 'close'}
                      editorClassName={
                        props.job_details.preamble_error
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      onBlur={handlePreambleEditorStateChange}
                    />
                    {props.job_details.preamble_error ? (
                      <div className="text-danger">
                        {props.job_details.preamble_error}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <label htmlFor="create-job-years-of-exp">
                      Responsibilities <span className="text-danger">*</span>
                    </label>
                    <Editor
                      editorState={responsibilityEditor}
                      wrapperClassName={
                        props.method === 'close' ? 'editor-disabled' : ''
                      }
                      toolbar={toolbarOptions}
                      stripPastedStyles
                      readOnly={props.method === 'close'}
                      editorClassName={
                        responsibilitiesError
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      onEditorStateChange={
                        handleResponsibilitiesEditorStateChange
                      }
                    />
                    {responsibilitiesError ? (
                      <div className="text-danger">{responsibilitiesError}</div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <label htmlFor="create-job-years-of-exp">
                      Qualifications <span className="text-danger">*</span>
                    </label>
                    <Editor
                      editorState={qualificationEditor}
                      stripPastedStyles
                      toolbar={toolbarOptions}
                      wrapperClassName={
                        props.method === 'close' ? 'editor-disabled' : ''
                      }
                      readOnly={props.method === 'close'}
                      editorClassName={
                        qualificationError
                          ? 'is-invalid input form-control'
                          : 'input form-control'
                      }
                      onEditorStateChange={
                        handleQualificationsEditorStateChange
                      }
                    />
                    {qualificationError ? (
                      <div className="text-danger">{qualificationError}</div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-11 offset-sm-1">
              <hr />
            </div>
            <div className="row">
              <div className="col-sm-2 text-center">
                <img
                  src={ExamRemarksIcon}
                  alt="Exam and Remarks Icon"
                  title="Exam and Remarks Icon"
                />
                <p className="d-block mt-3 default-color">Exam &amp; Remarks</p>
              </div>
              <div className="col-sm-9 mt-3">
                <div className="form-group row mb-0">
                  <div className="col-sm-6">
                    <div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={props.job_details.exam}
                          onChange={handleOnChangeExam}
                          disabled={props.method === 'close'}
                        />
                        <label htmlFor="create-job-years-of-exp">
                          Exam Required
                        </label>
                        <span className="slider round" />
                      </label>
                      {examError !== '' ? (
                        <div className="text-danger">{examError}</div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12 mb-3">
                    <label className="d-block" htmlFor="job-radio-exam-file">
                      Upload Exam
                    </label>
                    <div className="d-flex mb-3">
                      <input
                        type="radio"
                        name="exam-type"
                        value="exam-file"
                        id="job-radio-exam-file"
                        disabled={props.method === 'close'}
                        checked={props.job_details.exam_type === 'exam-file'}
                        onChange={() => handleOnChangeExamType('exam-file')}
                      />
                      <div className="input-file mr-3">
                        <span>Upload Exam</span>
                        <input
                          type="file"
                          accept="application/pdf"
                          className="opacity-0"
                          id="upload-exam"
                          disabled={
                            props.job_details.exam_type !== 'exam-file' ||
                            props.method === 'close'
                          }
                          onChange={handleOnChangeFile}
                        />
                      </div>
                      <input
                        type="text"
                        disabled
                        value={examFile}
                        className="file-upload"
                      />
                      <button
                        onClick={handleOnResetFile}
                        type="button"
                        className="remove-file btn btn-light"
                        disabled={props.job_details.exam_type !== 'exam-file'}
                      >
                        X
                      </button>

                      {props.job_details.exam_file_error ? (
                        <div className="text-danger">
                          {props.job_details.exam_file_error}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  {props.method !== 'create' &&
                  props.job_details.exam_path !== '' ? (
                    <div className="col-sm-12 mb-3">
                      <a target="_blank" href={props.job_details.exam_path}>
                        Click here to view the uploaded exam.
                      </a>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className="col-sm-12 mb-3">
                    <label className="d-block" htmlFor="job-radio-exam-link">
                      Exam Link
                    </label>
                    <div className="d-flex mb-3">
                      <input
                        type="radio"
                        name="exam-type"
                        value="exam-link"
                        id="job-radio-exam-link"
                        disabled={props.method === 'close'}
                        checked={props.job_details.exam_type === 'exam-link'}
                        onChange={() => handleOnChangeExamType('exam-link')}
                      />
                      <input
                        type="url"
                        defaultValue={props.job_details.exam_link}
                        disabled={
                          props.job_details.exam_type !== 'exam-link' ||
                          props.method === 'close'
                        }
                        onBlur={handleOnChangeExamLink}
                        className={
                          props.job_details.exam_link_error
                            ? 'is-invalid input form-control'
                            : 'input form-control'
                        }
                        placeholder="Enter the exam link"
                      />
                      {props.job_details.exam_link_error ? (
                        <p className="text-danger">
                          {props.job_details.exam_link_error}
                        </p>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <label className="d-block" htmlFor="job-radio-exam-pb">
                      Exam by Penbrothers
                      {/* <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip
                            id="tooltip-right"
                            className="tooltip-content"
                          >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris ex
                            ex ea commodo consequat.
                          </Tooltip>
                        }
                      >
                        <span
                          variant="secondary"
                          className="icon-table icon-tooltip"
                        />
                      </OverlayTrigger> */}
                    </label>
                    <div className="d-flex">
                      <input
                        type="radio"
                        name="exam-type"
                        id="job-radio-exam-pb"
                        value="exam-pb"
                        checked={props.job_details.exam_type === 'exam-pb'}
                        disabled={props.method === 'close'}
                        onChange={() => handleOnChangeExamType('exam-pb')}
                      />
                      <p className="mb-0">
                        No worries, Penbrothers can provide you an exam.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <label htmlFor="create-job-years-of-exp">Remarks</label>
                    <Editor
                      defaultEditorState={remarksEditor}
                      wrapperClassName={
                        props.method === 'close' ? 'editor-disabled' : ''
                      }
                      stripPastedStyles
                      toolbar={toolbarOptions}
                      readOnly={props.method === 'close'}
                      editorClassName="form-control"
                      onBlur={handleRemarksEditorStateChange}
                    />
                  </div>
                </div>
                {props.method !== 'close' ? (
                  <div className="action-buttons text-right">
                    <button
                      type="button"
                      className="cancel-btn mr-3"
                      onClick={() => setShowCancelModal(true)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="default-btn mr-3"
                      onClick={handlePreviewModal}
                    >
                      Preview
                    </button>
                    <button
                      type="button"
                      className="default-btn"
                      onClick={() => setShowSaveModal(true)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </LoadingOverlay>
      {/* Error Modal */}
      <Modal
        show={isShowErrorModal}
        onHide={() => setShowErrorModal(false)}
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
          <h4>Please complete the required fields.</h4>
          <div className="modal-btn pt-4">
            <Button
              variant="primary"
              onClick={() => {
                setShowErrorModal(false);
              }}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Cancel Modal */}
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
          <h4 className="pt-3">Are you sure you want to cancel?</h4>
          <div className="modal-btn pt-5">
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
      {/* Are your sure Save Modal */}
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
            alt=""
            className="d-block mx-auto w-25 mb-4"
          />
          <h4>
            Are you sure you want to save your{' '}
            {props.method === 'create' ? 'creation in ' : 'edited '} Job
            Requisition?
          </h4>
          <div className="modal-btn pt-3 mt-3">
            <Button
              variant="secondary"
              className="no"
              onClick={() => setShowSaveModal(false)}
            >
              No
            </Button>
            <Button
              variant="primary"
              className="yes"
              onClick={onValidate}
              disabled={props.job_form_error}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Success Modal */}
      <Modal
        show={props.success_modal}
        onHide={() => {
          props.dispatch(showJobFormSuccessModal({ show_modal: false }));
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
          <h4 className="pt-2">{props.success_message}</h4>
          <div className="modal-btn pt-3 mt-3">
            <Button variant="primary" onClick={handleOnClickOk}>
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Error Modal */}
      <Modal
        show={props.job_form_error}
        onHide={() => {
          props.dispatch(setJobFormErrorModal({ job_form_error: false }));
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
            size="md"
            className="d-block mx-auto w-25 mb-4"
          />
          <h4>
            Failed to save job opening request. Please contact PB Administrator.
          </h4>
          <div className="modal-btn pt-5">
            <Button
              variant="primary"
              onClick={() => {
                props.dispatch(setJobFormErrorModal({ job_form_error: false }));
              }}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

JobOpeningModal.propTypes = {
  method: PropTypes.any,
  loading: PropTypes.any,
  onHide: PropTypes.any,
  dispatch: PropTypes.any,
  job_details: PropTypes.any,
  categories: PropTypes.any,
  keywords: PropTypes.any,
  templates: PropTypes.any,
  success_modal: PropTypes.any,
  success_message: PropTypes.any,
  job_form_error: PropTypes.any,
  show_modal_preview: PropTypes.any,
};

export default JobOpeningModal;
