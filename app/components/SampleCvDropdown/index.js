/**
 *
 * SampleCvDropdown
 *
 */

import React from 'react';
import { Dropdown } from 'react-bootstrap';

import PropTypes from 'prop-types';
import DownloadGrayIcon from '../../assets/images/hub/recruitment/download_gray_icon.png';
import ViewDetailIcon from '../../assets/images/hub/recruitment/view-detail_icon.png';
import { generateBlindCvPdf } from '../../containers/Hub/FileJobReqPage/helper';
import {
  showBlindCvModal,
  setBlindCv,
} from '../../containers/Hub/FileJobReqPage/actions';

function SampleCvDropdown(props) {
  const handleOnClickViewSampleCv = () => {
    props.dispatch(setBlindCv(props.sample_cv));
    props.dispatch(
      showBlindCvModal({
        blind_cv_modal: true,
      }),
    );
  };

  const handleOnClickDownload = async () => {
    await generateBlindCvPdf(props.sample_cv);
  };

  return (
    <div>
      <Dropdown drop="right" className="text-right">
        <Dropdown.Toggle className="gear-btn">
          <i className="fa fa-cog" />
          <Dropdown.Menu>
            <Dropdown.Item eventKey="view" onClick={handleOnClickViewSampleCv}>
              <img src={ViewDetailIcon} title="" alt="view" /> View
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="edit" onClick={handleOnClickDownload}>
              <img src={DownloadGrayIcon} title="" alt="download icon" />{' '}
              Download
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Toggle>
      </Dropdown>
    </div>
  );
}

SampleCvDropdown.propTypes = {
  dispatch: PropTypes.any,
  sample_cv: PropTypes.any,
};

export default SampleCvDropdown;
