import axios from 'axios';
import env from '../../config/env';

/**
 * Fetch candidates by given job order id
 * @param {object} config headers Ex. Bearer token
 */
export const fetchAvailableCandidates = (config, jobOrderId) =>
  axios.get(
    `${env.API_SERVER()}/job-shortlists/available-candidates?job_order_id=${jobOrderId}`,
    config,
  );

/**
 * Fetch candidate by given candidate id
 * @param {object} config headers Ex. Bearer token
 */
export const fetchCandidate = (config, candidateId, jobOrderId) =>
  axios.get(
    `${env.API_SERVER()}/candidates?candidate_id=${candidateId}&job_order_id=${jobOrderId}`,
    config,
  );

/**
 * Update candidate
 * @param {object} config Headers
 * @param {number|string} candidateId Candidate Unique Id
 * @param {object} candidateDetails Candidate details
 */
export const updateCandidate = (config, candidateId, body) =>
  axios.put(`${env.API_SERVER()}/candidates/${candidateId}`, body, config);

/**
 * Update job shortlist
 * @param {object} config Headers
 * @param {number|string} shortlistId Candidate Shortlist Unique Id
 * @param {object} shortlistDetails Candidate shortlist details
 */
export const updateShortlist = (config, body) =>
  axios.put(`${env.API_SERVER()}/job-shortlists/update`, body, config);

/**
 * Download candidate's cv
 * @param {*} config Headers
 * @param {*} candidateId  Candidate unique id
 */
export const downloadCv = (config, candidateId) =>
  axios.put(
    `${env.API_SERVER()}/candidates/download-cv/${candidateId}`,
    config,
  );

/**
 * Fetch interview notes of a shortlisted candidate
 * @param {*} config Headers
 * @param {*} candidateId  Candidate unique id
 */
export const fetchInterviewNotes = (config, candidateId, jobOrderId) =>
  axios.get(
    `${env.API_SERVER()}/interview-notes/filter?candidate_id=${candidateId}&job_order_id=${jobOrderId}`,
    config,
  );

/**
 * Add interview note of a shortlisted candidate
 * @param {*} config Headers
 * @param {*} candidateId  Candidate unique id
 */
export const addInterviewNotes = (config, body) =>
  axios.post(`${env.API_SERVER()}/interview-notes`, body, config);

/**
 * Update interview note of a shortlisted candidate
 * @param {*} config Headers
 * @param {*} candidateId  Candidate unique id
 */
export const updateInterviewNotes = (config, interviewNoteId, body) =>
  axios.put(
    `${env.API_SERVER()}/interview-notes/${interviewNoteId}`,
    body,
    config,
  );

/**
 * Delete interview note of a shortlisted candidate
 * @param {*} config Headers
 * @param {*} candidateId  Candidate unique id
 */
export const deleteInterviewNotes = (config, interviewNoteId) =>
  axios.delete(
    `${env.API_SERVER()}/interview-notes/${interviewNoteId}`,
    config,
  );

/**
 * Fetch interview vacant schedule of a shortlisted candidate
 * @param {*} config Headers
 * @param {*} candidateId  Candidate unique id
 */
export const fetchInterviewVacantSched = (config, listId) =>
  axios.get(
    `${env.API_SERVER()}/interview-vacant-sched?list_id=${listId}`,
    config,
  );
