/**
 *
 * ContractDraftDropdown
 *
 */

import React, { memo } from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DownloadGrayIcon from '../../assets/images/hub/recruitment/download_gray_icon.png';
import ViewDetailIcon from '../../assets/images/hub/recruitment/view-detail_icon.png';
import { viewContractDraft } from '../../containers/Hub/AgreementPage/actions';

function ContractDraftDropdown(props) {
  const handleOnClickView = () => {
    props.dispatch(viewContractDraft({ contract: props.contract }));
  };
  const handleOnClickDownload = () => {
    if (props.contract.contract_draft) {
      window.open(props.contract.contract_draft);
      return;
    }
    window.open('/contract-not-found');
  };

  return (
    <div>
      <Dropdown drop="right">
        <Dropdown.Toggle className="gear-btn">
          <i className="fa fa-cog" />
          <Dropdown.Menu>
            <Dropdown.Item eventKey="view" onClick={handleOnClickView}>
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

ContractDraftDropdown.propTypes = {
  dispatch: PropTypes.any,
  contract: PropTypes.any,
};

export default memo(ContractDraftDropdown);
