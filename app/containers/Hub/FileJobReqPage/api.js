import axios from 'axios';
import env from '../../../config/env';

export const getAllJobRequisitions = config =>
  axios.get(`${env.API_SERVER()}/job-orders/my-job-orders`, config);

export const getClosedJobRequisitions = config =>
  axios.get(`${env.API_SERVER()}/job-orders/closed-job-orders`, config);

export const updateJobRequisition = (body, config) =>
  axios.put(
    `${env.API_SERVER()}/job-orders/modify/${body.jobOrderId}`,
    body,
    config,
  );

/**
 * Fetch job by given job order id
 * @param {object} config headers Ex. Bearer token
 */
export const fetchJob = (config, jobOrderId) =>
  axios.get(
    `${env.API_SERVER()}/job-orders/q?job_order_id=${jobOrderId}`,
    config,
  );

/**
 * Fetch job templates
 * @param {*} config headers Ex. Bearer token
 */
export const fetchJobTemplates = config =>
  axios.get(`${env.API_SERVER()}/job-templates`, config);

export const filterJobTemplates = (config, params) =>
  axios.get(
    `${env.API_SERVER()}/job-templates/filter?years_of_experience=${
      params.years_of_experience
    }&job_category=${params.job_category}`,
    config,
  );

/**
 * Save job order
 * @param {*} config headers Ex. Bearer token
 * @param {*} data data
 */
export const saveJobOrder = (data, config) =>
  axios.post(`${env.API_SERVER()}/job-orders`, data, config);

/**
 * Update job order
 * @param {*} id Job order id
 * @param {*} config headers Ex. Bearer token
 * @param {*} data data
 */
export const updateJobOrder = (jobId, data, config) =>
  axios.put(`${env.API_SERVER()}/job-orders/${jobId}`, data, config);

/**
 * Duplicate job order
 * @param {*} id Job order id
 * @param {*} config headers Ex. Bearer token
 * @param {*} data data
 */
export const duplicateJobOrder = (data, config) =>
  axios.post(`${env.API_SERVER()}/job-orders/duplicate`, data, config);

/**
 * Fetch blind cvs
 * @param {*} config headers Ex. Bearer token
 */
export const fetchBlindCvs = config =>
  axios.get(`${env.API_SERVER()}/blind-cvs`, config);
