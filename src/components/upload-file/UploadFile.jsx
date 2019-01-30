import { h, Component } from 'preact';

import { UploadValidation } from '../upload-validation/UploadValidation';

const frontImage = require('../../images/front.svg');
const sideImage = require('../../images/side.svg');


/**
 * Upload file component
 */
export class UploadFile extends Component {
  constructor(props) {
    super(props);
  }

  render({ type }) {
    const fileText = (type === 'front') ? 'Front' : 'Side';

    return (
      <label class="upload__file" for={type} tabindex="0">
        <input type="file" name={type} id={type} hidden />
        <div class="upload__file-image upload__file-image--placeholder active">
          <img src={frontImage} alt={`${fileText} image icon`} />
          <p class="upload__file-select-text">select file</p>
        </div>
        <div class="upload__file-image upload__file-image--preview">
          <img src="https://gamemag.ru/images/news/c/c4fc5238a07cd07bb3a4c44236135426.png" alt={`${fileText} image preview`} />
        </div>
      </label>
    );
  }
}
