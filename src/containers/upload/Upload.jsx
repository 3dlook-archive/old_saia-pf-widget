import { h, Component } from 'preact';
import { route } from 'preact-router';

import { UploadBlock } from '../../components/upload-block/UploadBlock';
import API from 'saia-sdk/lib/api';
import { Preloader } from '../../components/preloader/Preloader';
import { objectToUrlParams } from '../../utils';

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

      // image errors
      frontImagePose: null,
      sideImagePose: null,

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

  /**
   * On next button click handler
   *
   * @async
   */
  onNextButtonClick = async (e) => {
    e.preventDefault();

    try {
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
  
      let recommendations = await api.sizechart.getSize({
        gender: this.state.gender,
        hips: r.volume_params.hips,
        chest: r.volume_params.chest,
        waist: r.volume_params.waist,
        brand: this.props.matches.brand,
        body_part: this.props.matches.body_part,
      });

      for (const rec in recommendations) {
        if (recommendations.hasOwnProperty(rec)) {
          const element = recommendations[rec];
          recommendations[rec] = element.size;
        }
      }
      
      const params = {
        ...this.props.matches,
        ...recommendations,
      };

      route(`/results?${objectToUrlParams(params)}`, true);
    } catch (error) {
      this.setState({
        ...this.state,
        isPending: false,
      });

      if (error && error.response && error.response.data && error.response.data.sub_tasks) {
        const subTasks = error.response.data.sub_tasks;

        const front = subTasks.filter(item => item.name.indexOf('front_') !== -1)[0];
        const side = subTasks.filter(item => item.name.indexOf('side_') !== -1)[0];

        this.setState({
          ...this.state,
          isFrontImageValid: false,
          isSideImageValid: false,
          isPending: false,

          frontImagePose: front.message.indexOf('pose is wrong') !== -1 ? 'invalid' : 'valid',
          sideImagePose: side.message.indexOf('pose is wrong') !== -1 ? 'invalid' : 'valid',
        });
      } else if (error && error.response && error.response.data) {
        const { detail, brand, body_part } = error.response.data;
        alert(detail || brand || body_part);
      } else {
        alert(error);
      }
    }
  }

  render() {
    return (
      <div class="screen screen--upload active">
        <div class="screen__content upload">
          <h2 class="screen__title">YOU’RE ALMOST THERE</h2>
          <p class="screen__text">Please upload two full body <br />photos of yourself:</p>

          <div class="upload__files">
            <UploadBlock type="front" validation={{ pose: this.state.frontImagePose, body: null }} change={this.saveFrontFile} isValid={this.state.isFrontImageValid} />
            <UploadBlock type="side" validation={{ pose: this.state.sideImagePose, body: null }} change={this.saveSideFile} isValid={this.state.isSideImageValid} />
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
