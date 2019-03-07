import { h, Component } from 'preact';
import { route } from 'preact-router';
import classNames from 'classnames';

import { UploadBlock } from '../../components/upload-block/UploadBlock';
import API from '@3dlook/saia-sdk/lib/api';
import Preloader from '../../components/preloader/Preloader';
import { objectToUrlParams, send, transformRecomendations } from '../../utils';
import { gaUploadOnContinue } from '../../ga';

// assets
const nextArrowIcon = require('../../images/arrow.svg');

/**
 * Upload page component.
 */
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

    this.api = new API({
      host: `${API_HOST}/api/v2/`,
      key: this.props.matches.key || API_KEY,
    });
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

      if (!this.state.frontImage || !this.state.sideImage) {
        return;
      }

      this.setState({
        ...this.state,
        isFrontImageValid: !!this.state.frontImage,
        isSideImageValid: !!this.state.sideImage,
        isPending: true,
      });

      const taskSetId = await this.api.person.create({
        gender: this.state.gender,
        height: this.state.height,
        frontImage: this.state.frontImage,
        sideImage: this.state.sideImage,
      });

      const r = await this.api.queue.getResults(taskSetId);

      send('data', {
        hips: r.volume_params.high_hips,
        chest: r.volume_params.chest,
        waist: r.volume_params.waist,
        gender: this.state.gender,
        height: this.state.height,
      });

      let recommendations;

      if (this.props.matches.brand && this.props.matches.body_part) {
        recommendations = await this.api.sizechart.getSize({
          gender: this.state.gender,
          hips: r.volume_params.high_hips,
          chest: r.volume_params.chest,
          waist: r.volume_params.waist,
          brand: this.props.matches.brand,
          body_part: this.props.matches.body_part,
        });
      } else {
        recommendations = await this.api.product.getRecommendations({
          gender: this.state.gender,
          hips: r.volume_params.high_hips,
          chest: r.volume_params.chest,
          waist: r.volume_params.waist,
          url: this.props.matches.product,
        });
      }

      if (recommendations) {
        recommendations = transformRecomendations(recommendations);
      }

      const params = {
        ...this.props.matches,
        ...recommendations,
      };

      send('recommendations', recommendations);

      gaUploadOnContinue();

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
        const frontStatus = (front.message.indexOf('pose is wrong') !== -1 || front.message.indexOf('detect the human body') !== -1) ? 'invalid' : 'valid';
        const sideStatus = (side.message.indexOf('pose is wrong') !== -1 || side.message.indexOf('detect the human body') !== -1) ? 'invalid' : 'valid';

        this.setState({
          ...this.state,
          isFrontImageValid: frontStatus === 'valid' && front.status === 'SUCCESS',
          isSideImageValid: sideStatus === 'valid' && side.status === 'SUCCESS',
          isPending: false,

          frontImagePose: frontStatus,
          sideImagePose: sideStatus,
        });
      } else if (error && error.response && error.response.status === 400) {
        const params = {
          ...this.props.matches,
        };
        route(`/results?${objectToUrlParams(params)}`, true);
      } else if (error && error.response && error.response.data) {
        const { detail, brand, body_part } = error.response.data;
        alert(detail || brand || body_part);
      } else {
        alert(error);
      }
    }
  }

  render() {
    const filesErrorClasses = classNames('upload__files-error', {
      active: (!this.state.isFrontImageValid || !this.state.isSideImageValid) &&
              (!this.state.frontImage || !this.state.sideImage),
    });

    return (
      <div class="screen screen--upload active">
        <div class="screen__content upload">
          <h2 class="screen__title">YOU’RE ALMOST THERE</h2>
          <p class="screen__text">Please upload two full body <br />photos of yourself:</p>

          <div class="upload__files">
            <UploadBlock gender={this.state.gender} type="front" validation={{ pose: this.state.frontImagePose, body: this.state.frontImagePose }} change={this.saveFrontFile} isValid={this.state.isFrontImageValid} />
            <UploadBlock gender={this.state.gender} type="side" validation={{ pose: this.state.sideImagePose, body: this.state.sideImagePose }} change={this.saveSideFile} isValid={this.state.isSideImageValid} />
            <p className={filesErrorClasses}><span>!</span> Please upload your photos first</p>
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
