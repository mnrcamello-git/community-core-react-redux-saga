/**
 *
 * AgreementPage
 *
 */

import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Tabs, Tab, Modal } from 'react-bootstrap';
import reducer from './reducer';
import saga from './saga';
import makeSelectAgreementPage, {
  makeSelectClientProfile,
  makeSelectLoading,
  makeSelectFormData,
  makeSelectSubmitSuccess,
  makeSelectActiveTab,
  makeSelectIsClientProfileUpdateFailed,
  makeSelectContractDrafts,
  makeSelectActiveContractDraft,
  makeSelectIsShowDraftModal,
  makeSelectIsDraftModalLoading,
  makeSelectIsContractDraftListLoading,
  makeSelectDueDiligence,
  makeSelectDueDiligenceLoading,
  makeSelectSaveDueDiligenceSuccess,
  makeSelectSaveDueDiligenceFailed,
  makeSelectIsDraftModalSuccess,
  makeSelectIsDraftModalFailed,
} from './selectors';
import {
  requestClientDetails,
  requestFormData,
  updateClientProfile,
  closeMsgs,
  setActiveTab,
  requestContractDrafts,
  showContractDraftModal,
  viewContractDraft,
  submitDueDiligence,
  updateDueDiligence,
  viewContractViaNotification,
} from './actions';
import {
  SelectColumnFilterByDate,
  NumberSortAndFilterByValue,
  SelectColumnFilterByDropdownValues,
} from '../../App/tableFilters';
import {
  formatISOtoLongYear,
  translateContractStatusToReadableFormat,
} from '../../App/globalHelpers';
import ComingSoon from '../../../components/ComingSoon/Loadable';
import CompanyInformation from '../../../components/CompanyInformation/Loadable';
import ContractRevisionsDataTable from '../../../components/ContractRevisionsDataTable/Loadable';
import ContractDraftDropdown from '../../../components/ContractDraftDropdown/Loadable';
import ContractDraftModal from '../../../components/ContractDraftModal/Loadable';
import DueDiligence from '../../../components/DueDiligence';
import loadingIcon from '../../../assets/images/loading.svg';
import loadingImg from '../../../assets/images/loading.svg';
import folderIcon from '../../../assets/images/hub/agreement/folder-icon.svg';
import noContractDraftIcon from '../../../assets/images/hub/agreement/no-contract-draft-icon.svg';
const queryString = require('query-string');

export function AgreementPage(props) {
  useInjectReducer({ key: 'agreementPage', reducer });
  useInjectSaga({ key: 'agreementPage', saga });
  const [role, setRole] = useState((JSON.parse(localStorage.getItem('me'))).role);
  const {
    dispatch,
    clientProfile,
    loading,
    formData,
    isSubmitSuccess,
    contractDrafts,
    activeContractDraft,
    isShowContractDraftModal,
    activeTab,
    isClientProfileUpdateFailed,
    isDraftModalLoading,
    isContractDraftListLoading,
    dueDiligence,
    dueDiligenceLoading,
    saveDueDiligenceSuccess,
    saveDueDiligenceFailed,
    isDraftModalFailed,
    isDraftModalSuccess,
  } = props;

  useEffect(() => {
    dispatch(requestFormData());
    dispatch(requestClientDetails());
    dispatch(requestContractDrafts());

    const queryObj = queryString.parse(location.search);
    if (Object.keys(queryObj).length) {
      if (queryObj.activeTab === 'contract-drafts') {
        let contractString = queryObj.contract;
        if (contractString.charAt(contractString.length -1) === ']') {
          contractString = contractString.substring(0, contractString.length - 1);
        }
        const data = (JSON.parse(contractString));
        dispatch(viewContractViaNotification({ contract: data.contract }));
      }
      setActiveTabParent({
        parent: queryObj.activeTab,
        child: null,
      });
    }
  }, [dispatch]);



  const saveClientProfile = data => {
    if (data) {
      dispatch(updateClientProfile(data));
      return true;
    }
    return false;
  };

  const refetchClientData = () => {
    dispatch(requestClientDetails());
  };

  const closeMessages = () => {
    dispatch(closeMsgs());
  };

  const columns = useMemo(() => [
    {
      columns: [
        {
          Header: 'Agreement Code',
          accessor: 'agreement_code',
          className: 'agreement-code',
          left: true,
          Cell: data => (
            <span
              className="default-color font-medium pointer hover-underline"
              onClick={() => {
                dispatch(viewContractDraft({ contract: data.row.original }));
              }}
            >
              {data.cell.value}
            </span>
          ),
        },
        {
          Header: 'Version',
          accessor: 'version',
          className: 'version',
          left: true,
          Filter: NumberSortAndFilterByValue,
          filter: 'filterByValueWithSort',
          Cell: data => (
            <span
              className="default-color font-medium pointer hover-underline"
              onClick={() => {
                dispatch(viewContractDraft({ contract: data.row.original }));
              }}
            >
              {data.cell.value}
            </span>
          ),
        },
        {
          Header: 'Date Created',
          accessor: 'createdAt',
          className: 'date-created',
          left: true,
          Filter: SelectColumnFilterByDate,
          filter: 'filterByDateRange',
          Cell: data => (
            <div className="text-left">
              <span>{formatISOtoLongYear(data.cell.value)}</span>
            </div>
          ),
        },
        {
          Header: 'Contract Type',
          accessor: 'contract_type',
          className: 'contract-type',
          Filter: SelectColumnFilterByDropdownValues,
          filter: 'multipleWithSort',
          left: true,
          Cell: data => <span> {data.cell.value}</span>,
        },
        {
          Header: 'Start Date',
          accessor: 'start_date',
          className: 'start-date',
          left: true,
          Filter: SelectColumnFilterByDate,
          filter: 'filterByDateRange',
          Cell: data => (
            <div className="text-left">
              <span>{formatISOtoLongYear(data.cell.value)}</span>
            </div>
          ),
        },
        {
          Header: 'End Date',
          accessor: 'end_date',
          className: 'end-date',
          left: true,
          Filter: SelectColumnFilterByDate,
          filter: 'filterByDateRange',
          Cell: data => (
            <div className="text-left">
              <span>{formatISOtoLongYear(data.cell.value)}</span>
            </div>
          ),
        },
        {
          Header: 'Status',
          accessor: 'status',
          className: 'status-name',
          Filter: SelectColumnFilterByDropdownValues,
          filter: 'multipleWithSort',
          Cell: props => (
            <div className="text-center">
              <span
                className={
                  translateContractStatusToReadableFormat(props.cell.value) === 'For Amendment' 
                  ? 'Rejected' 
                  : translateContractStatusToReadableFormat(props.cell.value)
                }
              >
                {translateContractStatusToReadableFormat(props.cell.value)}
              </span>
            </div>
          ),
        },
        {
          id: 'action',
          className: 'action-btn',
          Header: '',
          accessor: 'agreement_id',
          right: true,
          Cell: data => (
            <ContractDraftDropdown
              contract={data.row.original}
              dispatch={dispatch}
            />
          ),
          disableFilters: true,
        },
      ],
    },
  ]);
  const setActiveTabParent = data => {
    dispatch(setActiveTab(data));
  };

  return (
    <>
      {['CLIENT-ADMIN', 'CLIENT-BILLING', 'SUPER-ADMIN'].includes(role) ? (
        <ComingSoon title="Agreements" />
      ) : (
        <div className="job-requisition onboarding-content">
          <div className="menu-title">
            <div className="col-md-12 p-0 d-inline-block">
              <h2 className="header-fontcolor ">Onboarding</h2>
            </div>
          </div>
          <div className="data-table p-0">
            {role === 'CLIENT-PROSPECT' ? (
              <Tabs
                activeKey={activeTab && activeTab.parent}
                id="agreement-tab"
                onSelect={setActiveTabParent}
              >
                {clientProfile && (
                  <Tab
                    eventKey="company-information"
                    title={
                      <div>
                        <span>Company Information</span>
                      </div>
                    }
                  >
                    <CompanyInformation
                      isClientProfileUpdateFailed={isClientProfileUpdateFailed}
                      clientProfile={clientProfile}
                      saveClientProfile={saveClientProfile}
                      formData={formData}
                      isSubmitSuccess={isSubmitSuccess}
                      closeMessages={closeMessages}
                      refetchClientData={refetchClientData}
                      loading={loading}
                      activeTab={activeTab}
                      setActiveTabParent={setActiveTabParent}
                    />
                  </Tab>
                )}
                <Tab
                  eventKey="documents"
                  title={
                    <div>
                      <span>Documents</span>
                    </div>
                  }
                >
                  {dueDiligenceLoading ? (
                    <img src={loadingImg} alt="loading" />
                  ) : (
                    dueDiligence.length > 0 &&
                    dueDiligence[0].status !== 'IN_PROGRESS' ? (
                      <DueDiligence
                        dueDiligence={dueDiligence}
                        formData={formData}
                        dispatch={dispatch}
                        submitDueDiligence={submitDueDiligence}
                        updateDueDiligence={updateDueDiligence}
                        dueDiligenceLoading={dueDiligenceLoading}
                        saveDueDiligenceSuccess={saveDueDiligenceSuccess}
                        saveDueDiligenceFailed={saveDueDiligenceFailed}
                        closeMessages={closeMessages}
                      />
                    ) : (
                      <div className="empty-state d-flex">
                        <div className="align-self-center w-100 text-center">
                          <img src={folderIcon} />
                          <h3 className="font-semibold mt-3">NO DOCUMENTS</h3>
                          <p className="m-0">
                            You don't have any documents
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </Tab>
                <Tab
                  eventKey="contract-drafts"
                  title={
                    <div>
                      <span>Contract Drafts</span>
                    </div>
                  }
                >
                  
                  <div>
                    {isContractDraftListLoading ? (
                      <div>
                        <img
                          src={loadingIcon}
                          alt="We are loading"
                          className="mx-auto d-flex align-self-center"
                        />
                      </div>
                    ) : (
                      contractDrafts.length > 0 ? (
                        <ContractRevisionsDataTable
                        columns={columns}
                        data={contractDrafts}
                        dispatch={dispatch}
                      />
                      ) : (
                        <div className="empty-state d-flex">
                        <div className="align-self-center w-100 text-center">
                          <img src={noContractDraftIcon} />
                          <h3 className="font-semibold mt-3">NO CONTRACT DRAFTS</h3>
                          <p className="m-0">
                            You don't have any contract drafts
                          </p>
                        </div>
                      </div>
                      )
                    )}
                    <Modal
                      show={isShowContractDraftModal}
                      onHide={() => {
                        dispatch(
                          showContractDraftModal({
                            is_show: false,
                          }),
                        );
                      }}
                      dialogClassName="contract-draft-modal"
                      backdrop="static"
                    >
                      <ContractDraftModal
                        activeContractDraft={activeContractDraft}
                        dispatch={dispatch}
                        isDraftModalLoading={isDraftModalLoading}
                        isDraftModalFailed={isDraftModalFailed}
                        isDraftModalSuccess={isDraftModalSuccess}
                        closeMessages={closeMessages}
                        requestContractDrafts={requestContractDrafts}
                      />
                    </Modal>
                  </div>
                </Tab>
              </Tabs>
            ) : (
              ''
            )}
          </div>
        </div>
      )}
    </>
  );
}

AgreementPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  agreementPage: makeSelectAgreementPage(),
  clientProfile: makeSelectClientProfile(),
  loading: makeSelectLoading(),
  formData: makeSelectFormData(),
  isSubmitSuccess: makeSelectSubmitSuccess(),
  contractDrafts: makeSelectContractDrafts(),
  activeContractDraft: makeSelectActiveContractDraft(),
  isShowContractDraftModal: makeSelectIsShowDraftModal(),
  activeTab: makeSelectActiveTab(),
  isClientProfileUpdateFailed: makeSelectIsClientProfileUpdateFailed(),
  isDraftModalLoading: makeSelectIsDraftModalLoading(),
  isContractDraftListLoading: makeSelectIsContractDraftListLoading(),
  dueDiligence: makeSelectDueDiligence(),
  dueDiligenceLoading: makeSelectDueDiligenceLoading(),
  saveDueDiligenceSuccess: makeSelectSaveDueDiligenceSuccess(),
  saveDueDiligenceFailed: makeSelectSaveDueDiligenceFailed(),
  isDraftModalSuccess: makeSelectIsDraftModalSuccess(),
  isDraftModalFailed: makeSelectIsDraftModalFailed(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AgreementPage);
