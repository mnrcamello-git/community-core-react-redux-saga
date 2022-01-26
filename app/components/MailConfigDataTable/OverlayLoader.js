import React from 'react';
import loadingIcon from '../../assets/images/loading.svg';

function OverlayLoader({ isActive }) {
  return (
    <>
      <div className="row">
        <div className="col-md-12 col-md-offset-3 text-center">
          {isActive ? (
            <img src={loadingIcon} alt="loading image" className="mx-auto" />
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}

export default OverlayLoader;