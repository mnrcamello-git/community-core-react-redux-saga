/*
 *
 * AgreementPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  REQUEST_CLIENT_DETAILS,
  REQUEST_CLIENT_DETAILS_SUCCESS,
  REQUEST_CLIENT_DETAILS_FAILED,
  REQUEST_FORM_DATA,
  GET_FORM_DATA_SUCCESS,
  UPDATE_CLIENT_PROFILE,
  UPDATE_CLIENT_PROFILE_SUCCESS,
  UPDATE_CLIENT_PROFILE_FAILED,
  CLOSE_MESSAGES,
  REQUEST_CONTRACT_DRAFTS,
  REQUEST_CONTRACT_DRAFTS_SUCCESS,
  VIEW_CONTRACT_DRAFT,
  SHOW_CONTRACT_DRAFT_MODAL,
  SET_ACTIVE_TAB,
  REQUEST_SAVE_CONTRACT_DRAFT,
  SAVE_CONTRACT_DRAFT_SUCCESS,
  SAVE_CONTRACT_DRAFT_FAILED,
  REQUEST_DUE_DILIGENCE_SUCCESS,
  SUBMIT_DUE_DILIGENCE,
  SUCCESS_DUE_DILIGENCE,
  FAILED_DUE_DILIGENCE,
  VIEW_CONTRACT_VIA_NOTIFICATION,
} from './constants';

export const initialState = {
  ui: {
    loading: false,
    isSubmitSuccess: false,
    isContractDraftListLoading: false,
    isDraftModalLoading: false,
    isDraftModalShow: false,
    isDraftModalSuccess: false,
    isDraftModalFailed: false,
    activeTab: {
      parent: 'company-information',
      child: 'client-information',
    },
    isClientProfileUpdateFailed: false,
    dueDiligenceLoading: false,
    successSaveDueDiligence: false,
    failedSaveDueDiligence: false,
  },
  data: {
    clientProfile: [],
    formData: null,
    updatedClientProfile: null,
    contractDrafts: [],
    activeDraft: {},
    activeDraftFromNotification: {},
    dueDiligence: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const agreementPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case REQUEST_CLIENT_DETAILS:
        draft.ui.loading = true;
        break;
      case REQUEST_CLIENT_DETAILS_SUCCESS:
        draft.ui.loading = false;
        draft.data.clientProfile = action.payload;
        break;
      case REQUEST_CLIENT_DETAILS_FAILED:
        draft.ui.loading = false;
        break;
      case REQUEST_FORM_DATA:
        draft.ui.loading = true;
        break;
      case GET_FORM_DATA_SUCCESS:
        draft.ui.loading = false;
        draft.data.formData = action.payload;
        break;
      case UPDATE_CLIENT_PROFILE:
        draft.ui.loading = true;
        draft.data.updatedClientProfile = action.payload;
        break;
      case UPDATE_CLIENT_PROFILE_SUCCESS:
        draft.ui.loading = false;
        draft.data.updatedClientProfile = null;
        draft.ui.isSubmitSuccess = true;
        break;
      case UPDATE_CLIENT_PROFILE_FAILED:
        draft.ui.loading = false;
        draft.ui.isSubmitSuccess = false;
        draft.ui.isClientProfileUpdateFailed = true;
        break;
      case CLOSE_MESSAGES:
        draft.ui.isSubmitSuccess = false;
        draft.ui.isClientProfileUpdateFailed = false;
        draft.ui.successSaveDueDiligence = false;
        draft.ui.failedSaveDueDiligence = false;
        draft.ui.isDraftModalFailed = false;
        draft.ui.isDraftModalSuccess = false;
        draft.ui.isDraftModalShow = false;
        break;
      case SET_ACTIVE_TAB:
        draft.ui.activeTab = action.payload;
        break;
      case REQUEST_CONTRACT_DRAFTS:
        draft.ui.isContractDraftListLoading = true;
        break;
      case REQUEST_CONTRACT_DRAFTS_SUCCESS:
        draft.data.contractDrafts = action.payload;
        draft.ui.isContractDraftListLoading = false;
        break;
      case VIEW_CONTRACT_DRAFT:
        draft.ui.isDraftModalLoading = false;
        draft.data.activeDraft = action.payload.contract;
        draft.ui.isDraftModalShow = true;
        break;
      case VIEW_CONTRACT_VIA_NOTIFICATION:
        draft.ui.isDraftModalLoading = true;
        draft.data.activeDraftFromNotification = action.payload.contract;
        draft.ui.isDraftModalShow = false;
        break;
      case SHOW_CONTRACT_DRAFT_MODAL:
        draft.ui.isDraftModalShow = action.payload.is_show;
        break;
      case REQUEST_SAVE_CONTRACT_DRAFT:
        draft.data.activeDraft = action.payload;
        draft.ui.isDraftModalLoading = true;
        break;
      case SAVE_CONTRACT_DRAFT_SUCCESS:
        draft.ui.isDraftModalLoading = false;
        draft.ui.isDraftModalFailed = false;
        draft.ui.isDraftModalSuccess = true;
        break;
      case SAVE_CONTRACT_DRAFT_FAILED:
        draft.ui.isDraftModalLoading = false;
        draft.ui.isDraftModalShow = true;
        draft.ui.isDraftModalFailed = true;
        draft.ui.isDraftModalSuccess = false;
        break;
      case REQUEST_DUE_DILIGENCE_SUCCESS:
        draft.data.dueDiligence = action.payload;
        draft.ui.dueDiligenceLoading = false;
        break;
      case SUBMIT_DUE_DILIGENCE:
        draft.data.dueDiligence = action.payload;
        draft.ui.dueDiligenceLoading = true;
        break;
      case SUCCESS_DUE_DILIGENCE:
        draft.ui.dueDiligenceLoading = false;
        draft.ui.successSaveDueDiligence = true;
        break;
      case FAILED_DUE_DILIGENCE:
        draft.ui.dueDiligenceLoading = false;
        draft.ui.failedSaveDueDiligence = true;
        break;
    }
  });

export default agreementPageReducer;
