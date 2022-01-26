/**
 *
 * SalesPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Tabs, Tab, Modal } from 'react-bootstrap';
import makeSelectSalesPage, {
  makeSelectLoading,
  makeSelectClients,
  makeSelectIsModalShow,
  makeSelectDueDiligence,
  makeSelectSelectedClient,
  makeSelectDdFailed,
  makeSelectDdSuccess,
  makeSelectConfirmation,
  makeSelectAssignToProspectModal,
  makeSelectAssignToProspectModalSuccess,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getClients,
  setShowModal,
  createDueDiligence,
  updateDueDiligence,
  closeMsgs,
  assignToProspect,
  setConfirmationModal,
  setAssignToProspectModal,
} from './actions';
import ClientsDataTable from '../../../components/ClientsDataTable';
import DueDiligenceModal from '../../../components/DueDiligenceModal/Loadable';
import loadingImg from '../../../assets/images/loading.svg';

export function SalesPage(props) {
  useInjectReducer({ key: 'salesPage', reducer });
  useInjectSaga({ key: 'salesPage', saga });

  const {
    dispatch,
    loading,
    clients,
    isModalShow,
    dueDiligence,
    selectedClient,
    isDdFailed, 
    isDdSuccess, 
    confirmation,
    assignToProspectModal,
    assignToProspectSuccess
  } = props;

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const closeMessages = () => {
    dispatch(closeMsgs());
  }

  const handleAssignToProspect = () => {
    dispatch(assignToProspect());
  }

  return (
    <div id="sales" className="job-requisition">
      <div className="menu-title">
        <div className="col-md-12 p-0 d-inline-block">
          <h2 className="header-fontcolor">Clients</h2>
        </div>
      </div>
      <div className="data-table p-0">
        <Tabs activeKey="clients">
          <Tab
            eventKey="clients"
            title={
              <div>
                <span>Clients</span>
              </div>
            }
          >
            {loading ? (
              <img src={loadingImg} alt="loading" className="mx-auto d-block" />
            ) : (
              <ClientsDataTable data={clients} dispatch={dispatch} />
            )}
            
          </Tab>
        </Tabs>
      </div>
      <Modal
        show={isModalShow}
        onHide={() => {
          dispatch(setShowModal({ is_show: false }));
        }}
        dialogClassName="due-diligence-modal"
        backdrop="static"
      >
        <DueDiligenceModal
          dueDiligence={dueDiligence}
          dispatch={dispatch}
          client={selectedClient}
          createDueDiligence={createDueDiligence}
          updateDueDiligence={updateDueDiligence}
          loading={loading}
          closeMessages={closeMessages}
          isDdSuccess={isDdSuccess}
          isDdFailed={isDdFailed}
          confirmation={confirmation}
          setConfirmationModal={setConfirmationModal}
          handleAssignToProspect={handleAssignToProspect}
          setAssignToProspectModal={setAssignToProspectModal}
          assignToProspectModal={assignToProspectModal}
          assignToProspectSuccess={assignToProspectSuccess}
        />
      </Modal>
    </div>
  );
}

SalesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  salesPage: makeSelectSalesPage(),
  loading: makeSelectLoading(),
  clients: makeSelectClients(),
  isModalShow: makeSelectIsModalShow(),
  dueDiligence: makeSelectDueDiligence(),
  selectedClient: makeSelectSelectedClient(),
  isDdFailed: makeSelectDdFailed(),
  isDdSuccess: makeSelectDdSuccess(),
  confirmation: makeSelectConfirmation(),
  assignToProspectModal: makeSelectAssignToProspectModal(),
  assignToProspectSuccess: makeSelectAssignToProspectModalSuccess(),
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

export default compose(withConnect)(SalesPage);
