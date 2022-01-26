/*
 *
 * SalesPage constants
 *
 */

export const DEFAULT_ACTION = 'app/Noc/SalesPage/DEFAULT_ACTION';
export const GET_CLIENTS = 'app/Noc/SalesPage/GET_CLIENTS';
export const GET_CLIENTS_SUCCESS = 'app/Noc/SalesPage/GET_CLIENTS_SUCCESS';
export const GET_CLIENTS_FAILED = 'app/Noc/SalesPage/GET_CLIENTS_FAILED';

export const SET_SHOW_MODAL = 'app/Noc/SalesPage/SET_SHOW_MODAL';
export const SET_CLIENT = 'app/Noc/SalesPage/SET_CLIENT';

export const GET_DUE_DILIGENCE = 'app/Noc/SalesPage/GET_DUE_DILIGENCE';
export const GET_DUE_DILIGENCE_SUCCESS =
  'app/Noc/SalesPage/GET_DUE_DILIGENCE_SUCCESS';
export const GET_DUE_DILIGENCE_FAILED =
  'app/Noc/SalesPage/GET_DUE_DILIGENCE_FAILED';
export const CREATE_DUE_DILIGENCE = 'app/Noc/SalesPage/CREATE_DUE_DILIGENCE';
export const UPDATE_DUE_DILIGENCE = 'app/Noc/SalesPage/UPDATE_DUE_DILIGENCE';
export const CREATE_DUE_DILIGENCE_SUCCESS =
  'app/Noc/SalesPage/CREATE_DUE_DILIGENCE_SUCCESS';
export const UPDATE_DUE_DILIGENCE_SUCCESS =
  'app/Noc/SalesPage/UPDATE_DUE_DILIGENCE_SUCCESS';
export const CREATE_DUE_DILIGENCE_FAILED =
  'app/Noc/SalesPage/CREATE_DUE_DILIGENCE_FAILED';
export const UPDATE_DUE_DILIGENCE_FAILED =
  'app/Noc/SalesPage/UPDATE_DUE_DILIGENCE_FAILED';
export const CLOSE_MESSAGES = 'app/Noc/SalesPage/CLOSE_MESSAGES';
export const ASSIGN_TO_PROSPECT = 'app/Noc/SalesPage/ASSIGN_TO_PROSPECT';
export const SET_CONFIRMATION_MODAL = 'app/NOC/SalesPage/SET_CONFIRMATION_MODAL';
export const ASSIGN_TO_PROSPECT_MODAL = 'app/NOC/SalesPage/ASSIGN_TO_PROSPECT_MODAL';
export const ASSIGN_TO_PROSPECT_SUCCESS = 'app/NOC/SalesPage/ASSIGN_TO_PROSPECT_SUCCESS';

/**
 * https://penbrothers.atlassian.net/browse/CORE2-1064
 * (1) Registration/ Incorporation Certificate and (2)
 * Name and Valid IDs of the Authorized Representative
 * fields are always ticked and available
 * in client prospect’s HUB Limited
 * */
export const initialRequirements = [
  {
    type: 'VALID-ID',
    title: '',
    description: '',
    is_active: 1,
  },
  {
    type: 'DOCUMENT',
    title: '',
    description: '',
    is_active: 1,
  },
];
