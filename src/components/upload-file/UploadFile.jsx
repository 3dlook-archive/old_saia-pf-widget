import { h, Component } from 'preact';

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
    };
  }

  /**
   * Change file input handler
   *
   * @async
   */
  onChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
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
  }

  /**
   * Get image orientation
   *
   * @async
   * @param {Blob} blob - image blob object
   */
  getOrientation(blob) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();

      reader.addEventListener('load', function () {

        var view = new DataView(reader.result);

        if (view.getUint16(0, false) !== 0xFFD8) {

          return resolve(-2);
        }

        var length = view.byteLength;
        var offset = 2;

        while (offset < length) {

          var marker = view.getUint16(offset, false);
          offset += 2;

          if (marker === 0xFFE1) {

            if (view.getUint32(offset += 2, false) !== 0x45786966) {

              return resolve(-1);
            }

            var little = view.getUint16(offset += 6, false) === 0x4949;
            offset += view.getUint32(offset + 4, little);

            var tags = view.getUint16(offset, little);
            offset += 2;

            for (var i = 0; i < tags; i++) {

              if (view.getUint16(offset + (i * 12), little) === 0x0112) {

                return resolve(view.getUint16(offset + (i * 12) + 8, little));
              }
            }
          }
          else {

            if ((marker & 0xFF00) !== 0xFF00) {

              break;
            } else {

              offset += view.getUint16(offset, false);
            }
          }
        }

        return resolve(-1);
      });

      reader.addEventListener('error', function (e) {

        return reject(e);
      });

      reader.readAsArrayBuffer(blob);
    });
  }

  /**
   * 
   * @param {*} blob 
   * @param {*} fixOrientation 
   */
  loadPhoto(blob, fixOrientation) {
    return new Promise((resolve, reject) => {
      var fileReader = new FileReader();

      fileReader.addEventListener('load', () => {

        if (fixOrientation) {

          // TODO: remove getOrientation call
          this.getOrientation(blob).then(function (orientation) {

            if (orientation > 1) {

              var image = new Image();
              image.addEventListener('load', function () {

                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var width = canvas.width = image.width;
                var height = canvas.height = image.height;

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
            }
            resolve(fileReader.result);
          }, function (e) {
            reject(e);
          });
        } else {
          resolve(fileReader.result);
        }
      });

      fileReader.addEventListener('error', function (e) {
        reject(e);
      });

      fileReader.readAsDataURL(blob);
    });
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

    return (
      <label class={`upload__file ${!this.props.isValid ? 'upload__file--invalid' : ''}`} for={type} tabindex="0">
        <input type="file" name={type} id={type} hidden onChange={this.onChange} />
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
