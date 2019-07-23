/* eslint class-methods-use-this: off */
import { h, Component } from 'preact';
import classNames from 'classnames';

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
        <input type="file" name={type} id={type} onChange={this.onChange} tabIndex="-1" value={value} accept="image/*" capture="camera" />
        <div className={`upload-file__image upload-file__image--placeholder ${mode === 'placeholder' ? 'active' : ''}`}>
          {(type === 'front') ? (
            <svg width="36px" height="102px" viewBox="0 0 36 102" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-285.000000, -441.000000)" stroke="#DDDDDD">
                  <g transform="translate(286.000000, 442.000000)">
                    <g>
                      <path d="M24.9699522,31.560478 L24.7057195,35.2601156 L26.182443,48.2340789 L26.249262,49.7109827 L26.2481296,49.7109827 C26.3122987,50.7102733 26.2289935,50.579434 26.2481296,51.6306035 C26.2966153,54.2939876 26.0441028,58.6637479 25.490592,64.7398844 C25.1834999,66.4882237 25.0299539,69.3071749 25.0299539,73.1967379 C25.0299539,79.0310825 24.5080763,81.766167 24.0433441,84.0011967 C23.578612,86.2362265 23.2395306,88.4130191 22.7281796,91.6535385 C22.2168287,94.894058 22.0214916,95.0106729 24.0433441,97.7002301 C26.0651967,100.389787 22.8580403,99.9266867 19.8898744,99.9266867 C16.9217085,99.9266867 18.8755648,98.0737365 18.5270883,95.8559046 C18.3946649,95.0131134 18.5696068,94.6840342 18.6775134,93.2940408 C18.8535664,91.026222 18.9481901,87.5318456 18.9481901,84.0011967 C18.9481901,78.5975706 19.4964397,76.916177 19.0534497,73.1967379 C18.7581231,70.7171118 18.3521537,67.8981607 17.8355414,64.7398844 C17.8580304,58.1123712 17.5529134,54.7986145 16.9201904,54.7986145 C15.9711058,54.7986145 15.7114601,61.4223927 15.7114601,64.7398844 C15.7114601,68.057376 14.7127494,70.2635168 14.7127494,73.1967379 C14.7127494,76.1299591 15.1521811,77.9069752 15.1521811,83.682964 C15.1521811,89.4589529 15.1521811,90.6236986 15.1521811,93.2940408 C15.1521811,95.9643831 15.4904698,96.6745852 15.4904698,98.5162129 C15.4904698,100.357841 13.7378002,99.9266867 10.6375379,99.9266867 C7.53727561,99.9266867 10.5646113,96.9251927 11.1519287,95.8559046 C11.7392462,94.7866165 11.7166529,90.4837835 10.0142995,84.0011967 C8.31194619,77.51861 9.0016594,73.8343088 8.36976957,71.5673176 C7.35491195,64.3182003 7.05133892,57.0327553 7.45905049,49.7109827 L7.47556911,49.7109827 L7.59841694,47.4030512 L9.62889678,35.2601156 L9.19625215,31.0997853 C8.55080244,32.7984503 8.11284456,33.9925489 7.88237851,34.6820809 C7.24613542,36.5856584 6.85372019,37.1892003 5.96516307,39.4680217 C5.41489187,44.5086705 2.7123554,49.2671456 2.41271364,50.9588584 C2.11307189,52.6505712 3.52799804,52.9941282 3.41143198,55.4913295 C3.29486592,57.9885307 2.22355026,55.4913295 2.22355026,56.0693642 C2.22355026,56.6473988 3.44058115,60.4046243 1.37180329,58.9595376 C-0.696974564,57.5144509 0.123292369,52.2106179 0.361269182,50.867052 C0.599245995,49.5234862 0.911319787,45.7708696 1.66201671,42.2495966 C2.16248133,39.9020813 2.74561975,37.8806754 3.41143198,36.1853789 C3.94224092,33.3829865 4.61006088,30.7624267 5.41489187,28.3236994 C6.12659194,26.1671692 7.20037566,23.7720918 8.63624303,21.1384672 C9.07128771,19.8902698 9.99442953,18.8340418 11.2465204,18.2506215 L13.9558868,16.9881738 L14.4880596,13.2376045 C13.078604,12.1520919 12.1986777,10.5136377 12.0750892,8.7345479 L11.9393943,6.78118215 C11.7802571,6.28322702 11.6943839,5.75275287 11.6943839,5.20231214 C11.6943839,2.32915448 14.0340572,-5.13367127e-13 16.9201904,-5.13367127e-13 C19.8063236,-5.13367127e-13 22.1459968,2.32915448 22.1459968,5.20231214 C22.1459968,5.64497169 22.0904607,6.07471838 21.9859462,6.48502383 L21.7762026,8.76059934 C21.6089832,10.5748157 20.6784977,12.2324409 19.2168257,13.3200339 L19.0964389,13.4096106 L19.6318607,16.8719879 L22.6945043,18.3007758 C23.9508323,18.8868793 24.8781856,19.9507877 25.3103324,21.2097583 C26.7659446,23.7729812 27.8440924,26.116167 28.5447759,28.2393158 C29.3496069,30.6780431 30.0174269,33.2986029 30.5482358,36.1009952 C31.214048,37.7962918 31.7971864,39.8176977 32.2976511,42.165213 C33.048348,45.686486 33.3604218,49.4391025 33.5983986,50.7826684 C33.8363754,52.1262343 34.6566423,57.4300672 32.5878645,58.8751539 C30.5190866,60.3202406 31.7361175,56.5630152 31.7361175,55.9849805 C31.7361175,55.4069459 30.6648019,57.9041471 30.5482358,55.4069459 C30.4316697,52.9097446 31.8465959,52.5661876 31.5469541,50.8744748 C31.2473124,49.1827619 28.5447759,44.4242869 27.9945047,39.3836381 C27.1059476,37.1048166 26.7135324,36.5012748 26.0772893,34.5976973 C25.8723116,33.9844239 25.5031992,32.9720175 24.9699522,31.560478 Z" />
                      <path d="M11.9393943,6.78118215 C11.7802571,6.28322702 11.6943839,5.75275287 11.6943839,5.20231214 C11.6943839,2.32915448 14.0340572,0 16.9201904,0 C19.8063236,0 22.1459968,2.32915448 22.1459968,5.20231214 C22.1459968,5.64497169 22.0904607,6.07471838 21.9859462,6.48502383 L21.7762026,8.76059934 C21.6089832,10.5748157 20.6784977,12.2324409 19.2168257,13.3200339 C17.8521977,14.3354188 15.9844639,14.3404454 14.6143904,13.3324203 L14.5975552,13.3200339 C13.1242404,12.2360495 12.2018476,10.55927 12.0750892,8.7345479 L11.9393943,6.78118215 Z" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          ) : null}

          {(type === 'side') ? (
            <svg width="16px" height="102px" viewBox="0 0 16 102" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-407.000000, -441.000000)" stroke="#DDDDDD">
                  <g transform="translate(405.000000, 442.000000)">
                    <path d="M14.3212656,10.9738529 C14.1381702,12.1363994 14.0466225,13.1646559 14.0466225,14.0586225 C14.0466225,15.4685999 14.3727678,16.790329 14.381539,18.3513676 C14.9501629,19.3373789 15.4615592,20.937 15.7769025,23.6037442 C16.0595553,25.9940358 16.1746811,30.2350936 15.9668251,34.547931 L15.9668253,34.5479259 L15.9724525,34.539312 C15.7186934,42.1749398 15.5554603,46.6359458 15.4827532,47.9223302 C15.3879347,49.5999231 15.1600038,50.8875111 14.9999275,52.4100696 C14.5774918,56.4280466 14.9622737,60.0973325 14.9999275,62.0044772 C15.058313,64.9616766 14.8657264,68.9657265 14.4221678,74.0166268 C15.0107676,76.6017229 15.3618521,78.4483154 15.4754213,79.5564047 C15.8594419,83.3032778 14.9402814,87.9849755 14.1471351,93.9200567 L14.1471351,94.2179636 C14.690422,96.4440846 15.1375717,97.3704221 14.6045812,99.5084253 C6.00902565,100.537739 3,99.8211987 3,98.5524745 C3,97.28375 8.36052226,96.7727247 11.3324758,94.3863272 L10.4720174,75.5489025 C8.25819901,65.7102971 7.1512898,59.1717396 7.1512898,55.9332301 C7.1512898,53.9143727 7.38234002,52.1491531 7.66320913,50.489439 C5.45932758,42.1691945 5.2492736,37.9250678 4.4080374,29.1919883 C4.06758277,25.6576453 5.21057466,22.1412466 8.8390729,18.0664021 C9.15804953,16.6166494 9.27059172,15.2630655 9.17669938,14.0056503 C7.59092711,14.6975714 6.36182879,15.0377898 6.29008879,14.8316661 C3.90306776,7.97326677 5.4134067,4.8779911 6.29008879,2.72858668 C7.16677081,0.579182244 10.6363856,-0.272363703 12.305167,0.0752932366 C16.7283912,0.996782774 18.0892415,5.71008824 16.1187614,9.01346943 C15.7155201,9.68947722 15.079985,10.3517796 14.3212656,10.9738529 Z" />
                    <path d="M12.7945976,25.2888559 C11.5762197,27.7702964 7.39840081,48.1799149 7.2591145,48.1131293 C6.17579428,48.2910066 3.50155641,55.6850241 5.02511884,55.3551206 C6.3251686,55.0736153 7.78044042,54.203893 8.4483205,53.0076436 C9.36525956,51.3653015 9.88689937,49.4724355 9.64606428,49.0900004 C9.54640367,48.931744 18.3827886,24.4524243 18.5474904,24.2589133" transform="translate(11.557231, 39.812376) rotate(-17.000000) translate(-11.557231, -39.812376)" />
                  </g>
                </g>
              </g>
            </svg>
          ) : null}
        </div>
        <div className={`upload-file__image upload-file__image--preview ${mode === 'preview' ? 'active' : ''}`}>
          <img src={file} alt={`${fileText} preview`} />
        </div>
      </label>
    );
  }
}
