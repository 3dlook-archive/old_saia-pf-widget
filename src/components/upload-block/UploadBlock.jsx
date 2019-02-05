import { h, Component } from 'preact';

import UploadValidation from '../upload-validation/UploadValidation';
import { UploadFile } from '../upload-file/UploadFile';

/**
 * Upload file block component
 */
export class UploadBlock extends Component {
  constructor(props) {
    super(props);
  }

  fileChange = (params) => {
    this.props.change(params);
  }

  render({ type, validation }) {
    const fileText = (type === 'front') ? 'Front' : 'Side';

    return (
      <div class="upload__file-block">
        <h3 class="upload__file-title">{fileText}</h3>

        <UploadFile type={type} change={this.fileChange} isValid={this.props.isValid} />

        <UploadValidation validation={validation} />
      </div>
    );
  }
}
