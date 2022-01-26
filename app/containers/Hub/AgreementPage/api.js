import axios from 'axios';
import env from '../../../config/env';
import { getToken } from '../../App/globalHelpers';
/**
 * getClientDetails - calls the API server for client details (prospect)
 *
 */

export const getClientDetails = config =>
  axios.get(`${env.API_SERVER()}/clients/my-details`, config);

/**
 * Gets the form data country and industries
 */
export const getFormData = async () => {
  const countryData = await axios.get(`${env.API_SERVER()}/hublite/countries`);
  const industryData = await axios.get(
    `${env.API_SERVER()}/hublite/business-categories`,
  );
  const primaryAppMessengersData = await axios.get(
    `${env.API_SERVER()}/clients/primary-app-messengers`,
  );
  const preferredModeOfCommunicationData = await axios.get(
    `${env.API_SERVER()}/clients/preferred-mode-communication`,
  );
  const preferredCurrenciesData = await axios.get(
    `${env.API_SERVER()}/clients/preferred-currencies`,
  );
  const jobTemplatesData = await axios.get(
    `${env.API_SERVER()}/job-templates`,
    { headers: { Authorization: `Bearer ${getToken()}` } },
  );

  const validIdListsData = await axios.get(
    `${env.API_SERVER()}/documents/valid-id-lists`,
  );

  const countries = countryData.data.data;
  const industries = industryData.data.data;
  const primaryAppMessengers = primaryAppMessengersData.data.data;
  const preferredModeOfCommunication =
    preferredModeOfCommunicationData.data.data;
  const preferredCurrencies = preferredCurrenciesData.data.data;
  const jobTemplates = jobTemplatesData.data.data;
  const validIdLists = validIdListsData.data.data;
  return {
    countries,
    industries,
    primaryAppMessengers,
    preferredModeOfCommunication,
    preferredCurrencies,
    jobTemplates,
    validIdLists,
  };
};

/**
 * post request update client profile
 */
export const updateClientProfile = async (data, config) =>
  axios.put(`${env.API_SERVER()}/clients/agreements`, data, config);

/**
 * Get all client prospect's contract drafts
 * @param Object config Headers
 */
export const fetchClientProspectContracDrafts = async config =>
  axios.get(`${env.API_SERVER()}/agreements`, config);

/**
 * Update contract draft
 * @param Object data Data that are needed to be updated {reason, status, annotated_file, agreement_code}
 * @param Objec config Headers
 * @param Object isParent classify if contract is parent record
 */
export const updateContractDraft = async (data, config, isParent) => {
  if (isParent === true) {
    return axios.put(
      `${env.API_SERVER()}/revisions/${data.revision_id}`,
      data,
      config,
    );
  }
  return axios.put(
    `${env.API_SERVER()}/revisions/${isParent.revision_id}`,
    data,
    config,
  );
};

/**
 * fetches due dilige nce
 * @param {*} id  client id
 * @param {*} config headers
 */
export const fetchDueDiligence = async (id, config) =>
  axios.get(`${env.API_SERVER()}/documents/due-diligence/active/${id}`, config);

export const submitDueDiligence = async (data, config) =>
  axios.post(`${env.API_SERVER()}/documents/requirements`, data, config);

export const updateDueDiligence = async (data, dueDiligenceId, config) =>
  axios.put(
    `${env.API_SERVER()}/documents/requirements/${dueDiligenceId}`,
    data,
    config,
  );

export const checkContractLatestVersion = async (id, config, isParent) => {
  return axios.get(
    `${env.API_SERVER()}/agreements/get-from-notif?isParent=${isParent}&agreement_id=${id}`,
    config
  );
} 
