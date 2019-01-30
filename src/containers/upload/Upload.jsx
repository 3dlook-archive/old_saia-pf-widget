import { h, Component } from 'preact';
import { route } from 'preact-router';

import { UploadBlock } from '../../components/upload-block/UploadBlock';
import API from 'saia-sdk/lib/api';

const api = new API({
  host: API_HOST,
  key: API_KEY,
});

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
      frontImage: params.file,
    });
  }

  /**
   * Save side image to state
   */
  saveSideFile = (params) => {
    this.setState({
      sideImage: params.file,
    });
  }

  onNextButtonClick = async (e) => {
    e.preventDefault();

    const taskSetId = await api.person.create({
      gender: 'female',
      height: 170,
      frontImage: this.state.frontImage,
      sideImage: this.state.sideImage,
    });

    const r = await api.queue.getResults(taskSetId);
    console.log(r);

    route('/results', true);
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

          <button class="button" disabled={!this.state.frontImage || !this.state.sideImage} onClick={this.onNextButtonClick}>
            get your size
            <img class="button__icon" src={nextArrowIcon} alt="Go next arrow icon" />
          </button>
        </div>
      </div>
    );
  }
}
