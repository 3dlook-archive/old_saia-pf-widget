import { h, Component } from 'preact';
import classNames from 'classnames';

const frontMaleImage = require('../../images/front-male.svg');
const sideMaleImage = require('../../images/side-male.svg');
const frontFemaleImage = require('../../images/front-female.svg');
const sideFemaleImage = require('../../images/side-female.svg');

/**
 * Upload file component
 */
export class UploadFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'placeholder',
      file: null,
      fileBlob: null,
      value: null,
    };
  }

  /**
   * Save file blob to the state
   *
   * @async
   * @param {Blob} file - image file
   */
  async saveFile(file) {
    if (!file) {
      return;
    }

    const orientation = await this.getOrientation(file);
    const fileBase64 = await this.loadPhoto(file, orientation);

    this.setState({
      file: fileBase64,
      fileBlob: file,
      mode: 'preview',
    });

    this.props.change({
      file: fileBase64,
      fileBlob: file,
      mode: 'preview',
    });
  }

  /**
   * Change file input handler
   *
   * @async
   */
  onChange = async (e) => {
    const file = e.target.files[0];
    await this.saveFile(file);
  }

  /**
   * Disable dragOver and dragLeave events
   */
  disableDragEvents = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * Handle drop image file event
   */
  dropImage = async (e) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    const files = dt.files;
    await this.saveFile(files[0]);
  }

  /**
   * Get image orientation
   *
   * @async
   * @param {Blob} blob - image blob object
   */
  getOrientation(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const view = new DataView(reader.result);

        if (view.getUint16(0, false) !== 0xFFD8) {
          return resolve(-2);
        }

        const length = view.byteLength;
        let offset = 2;

        while (offset < length) {
          const marker = view.getUint16(offset, false);
          offset += 2;

          if (marker === 0xFFE1) {

            if (view.getUint32(offset += 2, false) !== 0x45786966) {
              return resolve(-1);
            }

            const little = view.getUint16(offset += 6, false) === 0x4949;
            offset += view.getUint32(offset + 4, little);

            const tags = view.getUint16(offset, little);
            offset += 2;

            for (let i = 0; i < tags; i++) {
              if (view.getUint16(offset + (i * 12), little) === 0x0112) {

                return resolve(view.getUint16(offset + (i * 12) + 8, little));
              }
            }
          } else {
            if ((marker & 0xFF00) !== 0xFF00) {
              break;
            } else {
              offset += view.getUint16(offset, false);
            }
          }
        }

        return resolve(-1);
      });

      reader.addEventListener('error', e => reject(e));

      reader.readAsArrayBuffer(blob);
    });
  }

  /**
   *
   * @param {*} blob
   * @param {*} orientation
   */
  loadPhoto(blob, orientation) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.addEventListener('load', () => {

        if (!orientation || orientation <= 1) {
          return resolve(fileReader.result);
        }

        const image = new Image();
        image.addEventListener('load', function () {

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const width = canvas.width = image.width;
          const height = canvas.height = image.height;

          switch (orientation) {
            case 2:
              ctx.translate(width, 0);
              ctx.scale(-1, 1);
              break;
            case 3:
              ctx.translate(width, height);
              ctx.rotate(180 / 180 * Math.PI);
              break;
            case 4:
              ctx.translate(0, height);
              ctx.scale(1, -1);
              break;
            case 5:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(90 / 180 * Math.PI);
              ctx.scale(1, -1);
              break;
            case 6:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(90 / 180 * Math.PI);
              ctx.translate(0, -height);
              break;
            case 7:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(270 / 180 * Math.PI);
              ctx.translate(-width, height);
              ctx.scale(1, -1);
              break;
            case 8:
              canvas.width = height;
              canvas.height = width;
              ctx.translate(0, width);
              ctx.rotate(270 / 180 * Math.PI);
              break;
          }

          ctx.drawImage(image, 0, 0, width, height);
          resolve(
            canvas.toDataURL('image/jpeg', 0.95)
          );
        });

        image.src = fileReader.result;
        return;
      });

      fileReader.addEventListener('error', function (e) {
        reject(e);
      });

      fileReader.readAsDataURL(blob);
    });
  }

  keyboardAccess = (e) => {
    if(e.which === 32 || e.which === 13){
      e.preventDefault();
      e.target.click();
    }
  }

  render({ type }) {
    const fileText = (type === 'front') ? 'Front' : 'Side';
    let image = null;

    if (this.props.gender === 'male') {
      image = (type === 'front') ? frontMaleImage : sideMaleImage;
    }

    if (this.props.gender === 'female') {
      image = (type === 'front') ? frontFemaleImage : sideFemaleImage;
    }

    const classes = classNames('upload__file',
      {
        'upload__file--invalid': !this.props.isValid,
      });

    return (
      <label onDragOver={this.disableDragEvents} onDragLeave={this.disableDragEvents} onDrop={this.dropImage} class={classes} for={type} tabIndex="0" onKeyPress={this.keyboardAccess} onKeyUp={this.keyboardAccess}>
        <input type="file" name={type} id={type} onChange={this.onChange} tabIndex="-1" value={this.state.value} />
        <div class={`upload__file-image upload__file-image--placeholder ${this.state.mode === 'placeholder' ? 'active' : ''}`}>
          <img src={image} alt={`${fileText} image icon`} />
          <p class="upload__file-select-text">select file</p>
        </div>
        <div class={`upload__file-image upload__file-image--preview ${this.state.mode === 'preview' ? 'active' : ''}`}>
          <img src={this.state.file} alt={`${fileText} image preview`} />
        </div>
      </label>
    );
  }
}
