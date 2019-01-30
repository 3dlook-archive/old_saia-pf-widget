import { h } from 'preact';

const crossIcon = require('../../images/cross.svg');
const checkIcon = require('../../images/check.svg');

export const UploadValidation = ({ validation }) => (
  <ul class="upload__file-validation">
    <li class={`upload__file-validation-status upload__file-validation-status--${validation.pose}`}>
      <span class="upload__file-validation-icon">
        <img class="valid" src={checkIcon} alt="Check icon" />
        <img class="invalid" src={crossIcon} alt="Cross icon" />
      </span>
      Correct pose
    </li>
    <li class={`upload__file-validation-status upload__file-validation-status--${validation.body}`}>
      <span class="upload__file-validation-icon">
        <img class="valid" src={checkIcon} alt="Check icon" />
        <img class="invalid" src={crossIcon} alt="Cross icon" />
      </span>
      Full body
    </li>
  </ul>
);
