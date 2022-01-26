/**
 *
 * MailConfigDataTable
 *
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 import OverlayLoader from '../MailConfigDataTable/OverlayLoader';
 import ResultComponent from './ResultComponent';
 
 function MsaManagementDataTable({ employeeAll }) {
   let isLoading = true;
   isLoading = typeof employeeAll === 'undefined';
 
   return (
     <>
       <OverlayLoader isActive={isLoading} />
       <ResultComponent employeeAll={employeeAll} />
     </>
   );
 }
 
 MsaManagementDataTable.propTypes = {
   dispatch: PropTypes.func,
   users: PropTypes.array,
 };
 
 export default MsaManagementDataTable;