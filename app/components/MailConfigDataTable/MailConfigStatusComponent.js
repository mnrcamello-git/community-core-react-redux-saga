/**
 *
 * MailConfigDataTable
 *
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 import {} from '../../containers/Noc/MailConfigPage/actions';
 
 function MailConfigStatusComponent({
   mailSuccessStatistic,
   mailTotalStatistic,
   UploadError,
 }) {
   return (
     <>
       {typeof mailSuccessStatistic !== 'undefined' || typeof UploadError !== 'undefined' ? (
         <StatusComponent
           mailSuccessStatistic={mailSuccessStatistic}
           mailTotalStatistic={mailTotalStatistic}
           UploadError={UploadError}
         />
       ) : (
         ''
       )}
     </>
   );
 }
 
 function StatusComponent({ mailSuccessStatistic, mailTotalStatistic, UploadError }) {
   
   return (
     <>
       <div className="row">
         <div className="col-md-12 px-0">
           <div className="alert alert-success">
             {typeof mailSuccessStatistic !== 'undefined'
               ? `Total record parsed is ${mailTotalStatistic}. Out of total, there are ${mailSuccessStatistic} that have been parsed while ${mailTotalStatistic - mailSuccessStatistic} failed. `
               : ``}
             {typeof UploadError !== 'undefined'
               ? `${UploadError} `
               : ``}
 
           </div>
         </div>
       </div>
     </>
   );
 }
 
 MailConfigStatusComponent.propTypes = {
   dispatch: PropTypes.func,
   users: PropTypes.array,
 };
 
 export default MailConfigStatusComponent;