import axios from 'axios';
import env from '../../../config/env';

export const getClients = config =>
  axios.get(`${env.API_SERVER()}/clients/every`, config);

/**
 * Fetch client's due diligence
 * @param {*} config Bearer {token}
 * @param {*} clientId Selected client id
 */
export const fetchClientsDueDiligence = (config, clientId) =>
  axios.get(`${env.API_SERVER()}/documents/due-diligence/${clientId}`, config);

export const postDueDiligence = (data, config) =>
  axios.post(`${env.API_SERVER()}/documents`, data, config);

export const updateDueDiligence = (data, config) => axios.put(`${env.API_SERVER()}/documents/${data.due_diligence_id}`, data, config);

export const assignToProspectAPI = (data, config) => axios.put(`${env.API_SERVER()}/documents/prospect/assign-to-prospect`, data, config);