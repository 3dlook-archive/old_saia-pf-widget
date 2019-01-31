import { h, Component } from 'preact';
import { route } from 'preact-router';

import { UploadBlock } from '../../components/upload-block/UploadBlock';
import API from 'saia-sdk/lib/api';
import { Preloader } from '../../components/preloader/Preloader';

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
      gender: this.props.matches.gender,
      height: this.props.matches.height,

      frontImage: null,
      sideImage: null,

      isFrontImageValid: true,
      isSideImageValid: true,

      valid: false,

      isPending: false,
    };
  }

  /**
   * Save front image to state
   */
  saveFrontFile = (params) => {
    this.setState({
      ...this.state,
      frontImage: params.file,
    });
  }

  /**
   * Save side image to state
   */
  saveSideFile = (params) => {
    this.setState({
      ...this.state,
      sideImage: params.file,
    });
  }

  onNextButtonClick = async (e) => {
    e.preventDefault();

    if (!this.state.frontImage) {
      this.setState({
        ...this.state,
        isFrontImageValid: false,
      });
    }

    if (!this.state.sideImage) {
      this.setState({
        ...this.state,
        isSideImageValid: false,
      });
    }

    if (!this.state.frontImage && !this.state.sideImage) {
      return;
    }

    this.setState({
      ...this.state,
      isFrontImageValid: !!this.state.frontImage,
      isSideImageValid: !!this.state.sideImage,
      isPending: true,
    });

    const taskSetId = await api.person.create({
      gender: this.state.gender,
      height: this.state.height,
      frontImage: this.state.frontImage,
      sideImage: this.state.sideImage,
    });

    const r = await api.queue.getResults(taskSetId);
    console.log(r);

    // route('/results', true);
  }

  render() {
    return (
      <div class="screen screen--upload active">
        <div class="screen__content upload">
          <h2 class="screen__title">YOU’RE ALMOST THERE</h2>
          <p class="screen__text">Please upload two full body <br />photos of yourself:</p>

          <div class="upload__files">
            <UploadBlock type="front" validation={{ pose: true, body: false }} change={this.saveFrontFile} isValid={this.state.isFrontImageValid} />
            <UploadBlock type="side" validation={{ pose: true, body: false }} change={this.saveSideFile} isValid={this.state.isSideImageValid} />
          </div>

          <button class="button" onClick={this.onNextButtonClick}>
            get your size
            <img class="button__icon" src={nextArrowIcon} alt="Go next arrow icon" />
          </button>
        </div>

        <Preloader isActive={this.state.isPending} />
      </div>

    );
  }
}
