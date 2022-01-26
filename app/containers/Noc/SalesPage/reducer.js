/*
 *
 * SalesPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_CLIENTS,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAILED,
  SET_SHOW_MODAL,
  GET_DUE_DILIGENCE,
  GET_DUE_DILIGENCE_SUCCESS,
  SET_CLIENT,
  GET_DUE_DILIGENCE_FAILED,
  initialRequirements,
  CREATE_DUE_DILIGENCE,
  UPDATE_DUE_DILIGENCE,
  CREATE_DUE_DILIGENCE_SUCCESS,
  CREATE_DUE_DILIGENCE_FAILED,
  UPDATE_DUE_DILIGENCE_SUCCESS,
  UPDATE_DUE_DILIGENCE_FAILED,
  CLOSE_MESSAGES,
  ASSIGN_TO_PROSPECT,
  SET_CONFIRMATION_MODAL,
  ASSIGN_TO_PROSPECT_MODAL,
  ASSIGN_TO_PROSPECT_SUCCESS,
} from './constants';

export const initialState = {
  data: {
    clients: [],
    dueDiligence: { requirements: initialRequirements },
    selectedClient: {},
  },
  ui: {
    loading: false,
    isModalShow: false,
    isModalLoading: false,
    isDdSuccess: false,
    isDdFailed: false,
    assignToProspectSuccess: false,
    confirmation: false,
    assignToProspectModal: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const salesPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_CLIENTS_SUCCESS:
        draft.data.clients = action.payload;
        draft.ui.loading = false;
        break;
      case GET_CLIENTS:
        draft.ui.loading = true;
        break;
      case GET_CLIENTS_FAILED:
        draft.ui.loading = false;
        break;
      case SET_SHOW_MODAL:
        draft.ui.isModalShow = action.payload.is_show;
        break;
      case SET_CLIENT:
        draft.data.selectedClient = action.payload;
        break;
      case GET_DUE_DILIGENCE:
        draft.ui.isModalShow = false;
        draft.data.selectedClient = action.payload;
        break;
      case GET_DUE_DILIGENCE_SUCCESS:
        draft.ui.isModalShow = true;
        draft.data.dueDiligence = action.payload;
        break;
      case GET_DUE_DILIGENCE_FAILED:
        draft.ui.isModalShow = false;
        draft.data.dueDiligence = {
          requirements: initialRequirements,
        };
        break;
      case CREATE_DUE_DILIGENCE:
        draft.data.dueDiligence = action.payload;
        draft.ui.loading = true;
        break;
      case UPDATE_DUE_DILIGENCE:
        draft.data.dueDiligence = action.payload;
        draft.ui.loading = true;
        break;
      case CREATE_DUE_DILIGENCE_SUCCESS:
        draft.ui.loading = false;
        draft.ui.isDdSuccess = true;
        break;
      case CREATE_DUE_DILIGENCE_FAILED:
        draft.ui.loading = false;
        draft.ui.isDdFailed = true;
      break;
      case UPDATE_DUE_DILIGENCE_SUCCESS:
        draft.ui.loading = false;
        draft.ui.isDdSuccess = true;
        draft.ui.dueDiligence = action.payload;
        break;
      case UPDATE_DUE_DILIGENCE_FAILED:
        draft.ui.loading = false;
        draft.ui.isDdFailed = true;
        break;
      case CLOSE_MESSAGES:
        draft.ui.isDdFailed = false;
        draft.ui.isDdSuccess = false;
        draft.ui.confirmation = false;
        draft.ui.assignToProspectModal = false;
        draft.ui.assignToProspectSuccess = false;
        break;
      case ASSIGN_TO_PROSPECT:
        draft.ui.loading = true;
        break;
      case SET_CONFIRMATION_MODAL:
        draft.ui.confirmation = action.payload;
        break;
      case ASSIGN_TO_PROSPECT_MODAL:
        draft.ui.assignToProspectModal = action.payload;
        break;
      case ASSIGN_TO_PROSPECT_SUCCESS:
        draft.ui.assignToProspectSuccess = true;
        draft.ui.loading = false;
      default:
        break;
    }
  });

export default salesPageReducer;
