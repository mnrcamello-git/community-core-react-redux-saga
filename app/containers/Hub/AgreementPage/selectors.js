import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agreementPage state domain
 */

const selectAgreementPageDomain = state => state.agreementPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AgreementPage
 */

const makeSelectAgreementPage = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.ui.loading,
  );

const makeSelectClientProfile = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.data.clientProfile,
  );

const makeSelectFormData = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.data.formData,
  );

const makeSelectUpdatedClientProfile = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.data.updatedClientProfile,
  );

const makeSelectSubmitSuccess = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.ui.isSubmitSuccess,
  );

const makeSelectContractDrafts = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.data.contractDrafts,
  );

const makeSelectActiveContractDraft = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.data.activeDraft,
  );

const makeSelectActiveContractDraftFromNotification = () =>
    createSelector(
      selectAgreementPageDomain,
      substate => substate.data.activeDraftFromNotification
  );

const makeSelectIsShowDraftModal = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.ui.isDraftModalShow,
  );

const makeSelectActiveTab = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.ui.activeTab,
  );

const makeSelectIsClientProfileUpdateFailed = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.ui.isClientProfileUpdateFailed,
  );

const makeSelectIsDraftModalLoading = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.ui.isDraftModalLoading,
  );

const makeSelectIsContractDraftListLoading = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.ui.isContractDraftListLoading,
  );

const makeSelectDueDiligence = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.data.dueDiligence,
  );

const makeSelectDueDiligenceLoading = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.ui.dueDiligenceLoading,
  );

const makeSelectSaveDueDiligenceSuccess = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.ui.successSaveDueDiligence,
  );

const makeSelectSaveDueDiligenceFailed = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.ui.failedSaveDueDiligence,
  );

const makeSelectIsDraftModalSuccess = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.ui.isDraftModalSuccess,
  );

const makeSelectIsDraftModalFailed = () =>
  createSelector(
    selectAgreementPageDomain,
    substate => substate.ui.isDraftModalFailed,
  );

export default makeSelectAgreementPage;

export {
  selectAgreementPageDomain,
  makeSelectLoading,
  makeSelectClientProfile,
  makeSelectFormData,
  makeSelectUpdatedClientProfile,
  makeSelectSubmitSuccess,
  makeSelectContractDrafts,
  makeSelectActiveContractDraft,
  makeSelectIsShowDraftModal,
  makeSelectActiveTab,
  makeSelectIsClientProfileUpdateFailed,
  makeSelectIsDraftModalLoading,
  makeSelectIsContractDraftListLoading,
  makeSelectDueDiligence,
  makeSelectDueDiligenceLoading,
  makeSelectSaveDueDiligenceSuccess,
  makeSelectSaveDueDiligenceFailed,
  makeSelectIsDraftModalSuccess,
  makeSelectIsDraftModalFailed,
  makeSelectActiveContractDraftFromNotification,
};
