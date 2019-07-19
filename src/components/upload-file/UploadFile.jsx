/* eslint class-methods-use-this: off */
import { h, Component } from 'preact';
import classNames from 'classnames';

const frontImage = require('../../images/front-image.svg');
const sideImage = require('../../images/side-image.svg');

/**
 * Upload file component
 */
export default class UploadFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'placeholder',
      file: null,
      value: null,
    };
  }

  componentDidMount() {
    const { value, change } = this.props;

    if (value) {
      this.setState({
        file: value,
        mode: 'preview',
      }, () => change({
        file: value,
        mode: 'preview',
      }));
    }
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
   * Save file blob to the state
   *
   * @async
   * @param {Blob} file - image file
   */
  async saveFile(file) {
    const { change } = this.props;

    if (!file) {
      return;
    }

    const orientation = await this.getOrientation(file);
    const fileBase64 = await this.loadPhoto(file, orientation);

    this.setState({
      file: fileBase64,
      mode: 'preview',
    }, () => change({
      file: fileBase64,
      mode: 'preview',
    }));
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
            offset += 2;

            if (view.getUint32(offset, false) !== 0x45786966) {
              return resolve(-1);
            }

            const little = view.getUint16(offset += 6, false) === 0x4949;
            offset += view.getUint32(offset + 4, little);

            const tags = view.getUint16(offset, little);
            offset += 2;

            for (let i = 0; i < tags; i += 1) {
              if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                return resolve(view.getUint16(offset + (i * 12) + 8, little));
              }
            }
          } else {
            // eslint-disable-next-line no-bitwise
            if ((marker & 0xFF00) !== 0xFF00) {
              return resolve(-1);
            }

            offset += view.getUint16(offset, false);
          }
        }

        return resolve(-1);
      });

      reader.addEventListener('error', e => reject(e));

      reader.readAsArrayBuffer(blob);
    });
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
    const { files } = dt;
    await this.saveFile(files[0]);
  }

  /**
   * Get image base64 and fix its orientation (if needed)
   *
   * @param {*} blob - file blob
   * @param {*} orientation - image orientation
   */
  loadPhoto(blob, orientation) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.addEventListener('load', () => {
        if (!orientation || orientation <= 1) {
          return resolve(fileReader.result);
        }

        const image = new Image();
        image.addEventListener('load', () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const { width, height } = image;
          canvas.width = width;
          canvas.height = height;

          // eslint-disable-next-line default-case
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
            canvas.toDataURL('image/jpeg', 0.95),
          );
        });

        image.src = fileReader.result;

        return null;
      });

      fileReader.addEventListener('error', (e) => {
        reject(e);
      });

      fileReader.readAsDataURL(blob);
    });
  }

  /**
   * Enter and space buttons press handler
   * Triggers file input
   */
  keyboardAccess = (e) => {
    if (e.which === 32 || e.which === 13) {
      e.preventDefault();
      e.target.click();
    }
  }

  render() {
    const {
      type,
      isValid,
    } = this.props;

    const {
      value,
      mode,
      file,
    } = this.state;

    const fileText = (type === 'front') ? 'Front' : 'Side';
    const image = (type === 'front') ? frontImage : sideImage;

    const classes = classNames('upload-file',
      {
        'upload-file--invalid': !isValid,
      });

    return (
      <label
        onDragOver={this.disableDragEvents}
        onDragLeave={this.disableDragEvents}
        onDrop={this.dropImage}
        className={classes}
        htmlFor={type}
        tabIndex="0"
        onKeyPress={this.keyboardAccess}
        onKeyUp={this.keyboardAccess}
      >
        <input type="file" name={type} id={type} onChange={this.onChange} tabIndex="-1" value={value} />
        <div className={`upload-file__image upload-file__image--placeholder ${mode === 'placeholder' ? 'active' : ''}`}>
          <img src={image} alt={`${fileText} icon`} />
        </div>
        <div className={`upload-file__image upload-file__image--preview ${mode === 'preview' ? 'active' : ''}`}>
          <img src={file} alt={`${fileText} preview`} />
        </div>
      </label>
    );
  }
}
