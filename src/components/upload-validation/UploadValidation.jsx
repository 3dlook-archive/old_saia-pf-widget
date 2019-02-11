import { h } from 'preact';

import classNames from 'classnames';

const crossIcon = require('../../images/cross.svg');
const checkIcon = require('../../images/check.svg');

/**
 * Displays image processing errors
 */
const UploadValidation = ({ validation }) => (
  <ul className={classNames('upload__file-validation', { active: validation.pose || validation.body })}>
    <li className={`upload__file-validation-status upload__file-validation-status--${validation.pose}`}>
      <span className="upload__file-validation-icon">
        <img className="valid" src={checkIcon} alt="Check icon" />
        <img className="invalid" src={crossIcon} alt="Cross icon" />
      </span>
      Correct pose
    </li>
    <li className={`upload__file-validation-status upload__file-validation-status--${validation.body}`}>
      <span className="upload__file-validation-icon">
        <img className="valid" src={checkIcon} alt="Check icon" />
        <img className="invalid" src={crossIcon} alt="Cross icon" />
      </span>
      Full body
    </li>
  </ul>
);

export default UploadValidation;
