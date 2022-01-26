/**
 *
 * MsaManagement
 *
 */

 import React, { useEffect } from 'react';
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 import { createStructuredSelector } from 'reselect';
 import { compose } from 'redux';
 import { useInjectSaga } from 'utils/injectSaga';
 import { useInjectReducer } from 'utils/injectReducer';
 import { makeTestMessage, makeEmployeeAll } from './selectors';
 
 import reducer from './reducer';
 import saga from './saga';
 import MsaManagementDataTable from '../../../components/MsaManagementDataTable';
 import { requestEmployee } from './actions';
 import Title from '../../../components/Title';
 
 export function MsaManagement({ dispatch, employeeAll }) {
   useInjectReducer({ key: 'userManagement', reducer });
   useInjectSaga({ key: 'userManagement', saga });
   useEffect(() => {
     dispatch(
       requestEmployee({
         employees: 'all',
       }),
     );
   }, []);
 
   return (
     <div className="user-management">
       <Title title="Msa Management" description="Msa Management Page" />
       <div className="menu-title">
         <div className="col-md-12 p-0 position-relative d-flex">
           <h2 className="header-fontcolor">MSA Management</h2>
           <div className="create-user-btn" />
         </div>
       </div>
       <div className="data-table">
         <MsaManagementDataTable employeeAll={employeeAll} />
       </div>
     </div>
   );
 }
 
 MsaManagement.propTypes = {
   dispatch: PropTypes.func.isRequired,
   testMessage: PropTypes.any,
   employeeAll: PropTypes.any,
 };
 
 const mapStateToProps = createStructuredSelector({
   testMessage: makeTestMessage(),
   employeeAll: makeEmployeeAll(),
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
 
 export default compose(withConnect)(MsaManagement);