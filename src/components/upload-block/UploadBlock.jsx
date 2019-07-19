import { h, Component } from 'preact';

import UploadFile from '../upload-file/UploadFile';

/**
 * Upload file block component
 */
export default class UploadBlock extends Component {
  fileChange = (params) => {
    const { change } = this.props;
    change(params);
  }

  render() {
    const {
      type,
      gender,
      isValid,
      value,
    } = this.props;

    const fileText = (type === 'front') ? 'Front' : 'Side';

    return (
      <div className="upload-block">
        <UploadFile
          gender={gender}
          type={type}
          change={this.fileChange}
          isValid={isValid}
          value={value}
        />

        <h3 className="upload-block__title">{fileText}</h3>
      </div>
    );
  }
}
