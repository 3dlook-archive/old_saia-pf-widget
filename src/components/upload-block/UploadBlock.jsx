import { h, Component } from 'preact';

import { UploadValidation } from '../upload-validation/UploadValidation';
import { UploadFile } from '../upload-file/UploadFile';

/**
 * Upload file block component
 */
export class UploadBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validation: {
        pose: false,
        body: false,
      },
      valid: false,
    };
  }

  render({ type }) {
    const fileText = (type === 'front') ? 'Front' : 'Side';

    return (
      <div class="upload__file-block">
        <h3 class="upload__file-title">{fileText}</h3>

        <UploadFile type={type} />

        <UploadValidation validation={this.state.validation} />
      </div>
    );
  }
}
