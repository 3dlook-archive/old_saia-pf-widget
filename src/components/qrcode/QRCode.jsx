import { h, Component } from 'preact';
import classNames from 'classnames';
import QRCode from 'qrcode';
import Clipboard from 'clipboard';

/**
 * QR code block component
 */
export default class QRCodeBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: null,
      error: null,
      isCopied: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;

    this.drawQrCode(data);
  }

  componentDidMount() {
    const { data } = this.props;

    this.drawQrCode(data);
    // init clipboard
    this.clipboard = new Clipboard('.qrcode__btn');
  }

  drawQrCode(data) {
    if (data) {
      QRCode.toDataURL(data, {
        width: 140,
        margin: 0,
      })
        .then((imageData) => {
          this.setState({
            imageData,
          });
        })
        .catch(err => this.setState({ error: err.message }));
    }
  }

  copy = () => {
    const { onCopy } = this.props;

    if (onCopy) {
      onCopy();
    }

    this.setState({
      isCopied: true,
    }, () => {
      const timer = setTimeout(() => {
        this.setState({
          isCopied: false,
        }, () => clearTimeout(timer));
      }, 3000);
    });
  }

  render() {
    const {
      className,
      data,
    } = this.props;

    const {
      imageData,
      error,
      isCopied,
    } = this.state;

    return (
      <div className={classNames(className, 'qrcode')}>
        <div className="qrcode__img">
          {(!error)
            ? <img src={imageData} alt="QR Code" />
            : <p>{error}</p>
          }
        </div>
        <button className={classNames('qrcode__btn', { 'qrcode__btn--copied': isCopied })} type="button" data-clipboard-text={data} onClick={this.copy}>
          {(!isCopied) ? 'Copy link' : 'Link copied'}
          <svg width="11px" height="14px" viewBox="0 0 11 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g className="qrcode__btn-svg" transform="translate(-325.000000, -341.000000)" stroke="#FFAB55" strokeWidth="1.3">
                <g transform="translate(326.000000, 342.000000)">
                  <path d="M1.27272727,10 C0.569819409,10 0,9.36040679 0,8.57142857 L0,1.42857143 C0,0.639593215 0.569819409,0 1.27272727,0 L1.27272727,0 L5.72727273,0 C6.43018059,0 7,0.639593215 7,1.42857143 L7,1.42857143" id="Path" />
                  <rect id="Rectangle" x="2.65" y="2.65" width="6.7" height="9.7" rx="2" />
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
    );
  }
}
