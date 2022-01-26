/**
 *
 * Stepper
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Stepper(props) {
  const [page, setPage] = useState(0);

  const showPage = () => props.pages[page].component;

  const handleSave = () => {
    props.save();
  };

  const handleCancel = () => {
    props.cancel();
  };

  const handleNextPage = () => {
    if (props.pages[page].error === '') {
      setPage(page + 1);
      return true;
    }
    // Call next function to display validation
    props.next(page);
  };

  return (
    <div className="col-lg-12 p-0">
      <div className="row">
        <div className="col-lg-2 stepper">
          <ul className="p-0">
            {props.pages.map((indiPage, index) => (
              <li
                key={index}
                className={page === index ? 'py-4 pl-4 active' : 'py-4 pl-4'}
              >
                <div className="d-flex">
                  <span className="default-color">0{index + 1}</span>
                  {indiPage.icon}
                </div>
                <label className="d-block mt-3 default-color">
                  {indiPage.title}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-lg-10 px-5 py-4">
          {showPage(1)}
          <div className="action-buttons">
            {page > 0 ? (
              <button
                type="button"
                className="prev-btn"
                onClick={() => setPage(page - 1)}
              >
                <i className="fa fa-chevron-left mr-2" /> Previous
              </button>
            ) : (
              ''
            )}
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            {props.pages.length - 1 > page ? (
              <button
                type="button"
                // disabled={props.pages[page].error !== ''}
                className="next-btn"
                onClick={handleNextPage}
              >
                Next <i className="fa fa-chevron-right ml-2" />
              </button>
            ) : (
              ''
            )}
            {props.pages.length - 1 === page ? (
              <button type="button" className="save-btn" onClick={handleSave}>
                Save
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Stepper.propTypes = {
  pages: PropTypes.any,
  dispatch: PropTypes.any,
  save: PropTypes.any,
  next: PropTypes.any,
  cancel: PropTypes.any,
};

export default Stepper;
