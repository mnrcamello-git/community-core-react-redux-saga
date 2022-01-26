/**
 *
 * MailConfigDataTable
 *
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 import {
   requestCsvUser,
   requestUpload,
 } from '../../containers/Noc/MailConfigPage/actions';
 import OverlayLoader from './OverlayLoader';
 import ResultComponent from './ResultComponent';
 
 function MailConfigDataTable({
   users,
   dispatch,
   affectedUsers,
   mailRequestStatus,
 }) {
   return (
     <>
       <UploadComponent
         users={users}
         dispatch={dispatch}
         affectedUsers={affectedUsers}
         mailRequestStatus={mailRequestStatus}
       />
       <ResultComponent affectedUsers={affectedUsers} />
     </>
   );
 }
 
 function UploadComponent(props) {
   const [csvEmployeeName, setCsvEmployeeName] = React.useState('');
   const [isLoading, setIsLoading] = React.useState(
     typeof props.mailRequestStatus !== 'undefined',
   );
 
   const handleCsvNameState = e => {
     setCsvEmployeeName(e);
   };
   const isLoadingState = e => {
     setIsLoading(e);
   };
 
   typeof props.mailRequestStatus !== 'undefined' && isLoading == true
     ? isLoadingState(false)
     : '';
 
   const handleOnChangeFile = evt => {
       if (evt.target.files[0].size <= 10485760) { // 10 mb
         
       const fileUpload = document.getElementById('upload-csv');
 
       if (typeof FileReader !== 'undefined') {
         const reader = new FileReader();
         isLoadingState(true);
         handleCsvNameState(evt.target.files[0].name);
         reader.onload = function(e) {
           const rows = e.target.result.split('\n');
           const employeeArr = rows.map(employeeItem => employeeItem);
 
           props.dispatch(
             requestCsvUser({
               users: employeeArr,
             }),
           );
         };
         reader.readAsText(fileUpload.files[0]);
       }
     } else {
       props.dispatch(
         requestUpload({
           uploadError: 'File should not exceed 10 MB',
         }),
       );
 
     }
   };
 
   return (
     <>
       <div className="row">
         <div className="col-md-12">
           <div className="action-btn-section">
             <div className="form-group mb-0">
               <div className="d-flex">
                 <div className="input-file mr-3">
                   <span className="mailconfig-upload ml-3">
                     <i className="fa fa-file-pdf-o mx-1 mailconfig-upload-cursor" />
                     Upload{' '}
                   </span>
                   <input
                     type="file"
                     accept=".csv"
                     className="opacity-0"
                     id="upload-csv"
                     onChange={handleOnChangeFile}
                   />
                 </div>
                 <input
                   type="text"
                   disabled
                   className="file-upload"
                   value={csvEmployeeName}
                 />
               </div>
             </div>
           </div>
         </div>
       </div>
 
       <OverlayLoader isActive={isLoading} />
     </>
   );
 }
 
 UploadComponent.propTypes = {
   dispatch: PropTypes.func,
 };
 
 MailConfigDataTable.propTypes = {
   dispatch: PropTypes.func,
   users: PropTypes.array,
 };
 
 export default MailConfigDataTable;