/**
 *
 * InvoiceBreakdownDatatable
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Table from '../Table/Loadable';

function InvoiceBreakdownDatatable(props) {
  return (
    <>
      {props.columns.length > 0 ? (
        <Table columns={props.columns} data={props.tracked_items} />
      ) : (
        <div className="py-5">
          <h5 className="py-5 text-center font-weight-bold text-danger">
            Sorry, invoice breakdown detail is empty or unavailable at the
            moment.
          </h5>
        </div>
      )}
    </>
  );
}

InvoiceBreakdownDatatable.propTypes = {
  tracked_items: PropTypes.any,
  columns: PropTypes.any,
};

export default memo(InvoiceBreakdownDatatable);
