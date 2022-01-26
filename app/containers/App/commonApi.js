import axios from 'axios';
import env from '../../config/env';

/**
 * Fetch all visible keywords
 * @param {object} config headers Ex. Bearer token
 */
export const fetchKeywords = config =>
  axios.get(`${env.API_SERVER()}/keywords`, config);

/**
 * Fetch all job categories
 * @param {object} config headers Ex. Bearer token
 */
export const fetchJobCategories = config =>
  axios.get(`${env.API_SERVER()}/job-categories`, config);

/**
 * Fetch all active clients
 * @param {object} config headers Ex. Bearer token
 */
export const fetchActiveClients = config =>
  axios.get(`${env.API_SERVER()}/clients`, config);

/**
 * Fetch all active clients
 * @param {object} config headers Ex. Bearer token
 */
export const fetchRoles = config =>
  axios.get(`${env.API_SERVER()}/roles`, config);
