import { h, Component } from 'preact';
import { Link } from 'preact-router';

import { UploadBlock } from '../../components/upload-block/UploadBlock';

// assets
const nextArrowIcon = require('../../images/arrow.svg');

export class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frontImage: null,
      sideImage: null,
      validation: {
        pose: false,
        body: false,
      },
      valid: false,
    };
  }

  /**
   * Save front image to state
   */
  saveFrontFile = (params) => {
    this.setState({
      frontImage: params.fileBlob,
    });
  }

  /**
   * Save side image to state
   */
  saveSideFile = (params) => {
    this.setState({
      sideImage: params.fileBlob,
    });
  }

  render() {
    return (
      <div class="screen screen--upload active">
        <div class="screen__content upload">
          <h2 class="screen__title">upload photos</h2>
          <p class="screen__text">Please upload two full body <br />photos of yourself:</p>

          <div class="upload__files">
            <UploadBlock type="front" validation={this.state.validation} change={this.saveFrontFile} />
            <UploadBlock type="side" validation={this.state.validation} change={this.saveSideFile} />
          </div>

          <Link class="button" href="/data" disabled={!this.state.frontImage || !this.state.sideImage}>
            Next step
            <img class="button__icon" src={nextArrowIcon} alt="Go next arrow icon" />
          </Link>
        </div>
      </div>
    );
  }
}
