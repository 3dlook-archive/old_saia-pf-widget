import { h, Component } from 'preact';
import { route } from 'preact-router';
import classNames from 'classnames';
import API from '@3dlook/saia-sdk/lib/api';
import { connect } from 'preact-redux';

import UploadBlock from '../../components/upload-block/UploadBlock';
import QRCodeBlock from '../../components/qrcode/QRCode';
import Preloader from '../../components/preloader/Preloader';
import { objectToUrlParams, send, transformRecomendations } from '../../utils';
import { gaUploadOnContinue } from '../../ga';
import actions from '../../store/actions';
import FlowService from '../../services/flowService';

// assets
const playIcon = require('../../images/play.svg');

/**
 * Upload page component.
 */
class Upload extends Component {
  constructor(props) {
    super(props);

    const { flowId, token } = this.props;

    this.state = {
      isFrontImageValid: true,
      isSideImageValid: true,

      // image errors
      frontImagePose: null,
      sideImagePose: null,

      isPending: false,

      qrCodeUrl: `${window.location.origin}/#/upload?flowId=${flowId}`,
    };

    this.api = new API({
      host: `${API_HOST}/api/v2/`,
      key: token,
    });

    this.flow = new FlowService(token);
    this.flow.setFlowId(flowId);
  }

  /**
   * Save front image to state
   */
  saveFrontFile = (params) => {
    const { addFrontImage } = this.props;

    addFrontImage(params.file);
  }

  /**
   * Save side image to state
   */
  saveSideFile = (params) => {
    const { addSideImage } = this.props;

    addSideImage(params.file);
  }

  /**
   * On next button click handler
   *
   * @async
   */
  onNextButtonClick = async (e) => {
    e.preventDefault();

    const {
      frontImage,
      sideImage,
      height,
      gender,
      brand,
      bodyPart,
      productUrl,
      setRecommendations,
      setSoftValidation,
      setHardValidation,
    } = this.props;

    try {
      if (!frontImage) {
        this.setState({
          isFrontImageValid: false,
        });
      }

      if (!sideImage) {
        this.setState({
          isSideImageValid: false,
        });
      }

      if (!frontImage || !sideImage) {
        return;
      }

      this.setState({
        isFrontImageValid: !!frontImage,
        isSideImageValid: !!sideImage,
        isPending: true,
      });

      const taskSetId = await this.api.person.create({
        gender,
        height,
        frontImage,
        sideImage,
      });

      const r = await this.api.queue.getResults(taskSetId);

      send('data', {
        hips: r.volume_params.high_hips,
        chest: r.volume_params.chest,
        waist: r.volume_params.waist,
        gender,
        height,
      });

      const softValidation = {
        front: {
          bodyAreaPercentage: r.front_params.body_area_percentage,
          legsDistance: r.front_params.legs_distance,
          messages: [...r.front_params.soft_validation.messages],
        },
        side: {
          bodyAreaPercentage: r.side_params.body_area_percentage,
          legsDistance: r.side_params.legs_distance,
          messages: [...r.side_params.soft_validation.messages],
        },
      };

      setSoftValidation(softValidation);

      let recommendations;

      if (brand && bodyPart) {
        recommendations = await this.api.sizechart.getSize({
          gender,
          hips: r.volume_params.high_hips,
          chest: r.volume_params.chest,
          waist: r.volume_params.waist,
          brand,
          body_part: bodyPart,
        });
      } else {
        recommendations = await this.api.product.getRecommendations({
          gender,
          hips: r.volume_params.high_hips,
          chest: r.volume_params.chest,
          waist: r.volume_params.waist,
          url: productUrl,
        });
      }

      if (recommendations) {
        recommendations = transformRecomendations(recommendations);
        setRecommendations(recommendations);
      }

      send('recommendations', recommendations);

      gaUploadOnContinue();

      // check if there is any soft validation message
      if ((softValidation.front.bodyAreaPercentage < 0.7
          || softValidation.front.legsDistance < 2
          || softValidation.front.legsDistance > 15
          || softValidation.front.messages.length

          || softValidation.side.bodyAreaPercentage < 0.7
          || softValidation.side.messages.length)
          && (recommendations.normal
            || recommendations.tight
            || recommendations.loose)) {
        route('/soft-validation', true);
      // check if there is any size recommendation
      } else if (!recommendations.normal
        && !recommendations.tight
        && !recommendations.loose) {
        route('/not-found', true);
      // ok, show just recommendations
      } else {
        route('/results', true);
      }
    } catch (error) {
      this.setState({
        isPending: false,
      });

      // hard validation part
      if (error && error.response && error.response.data && error.response.data.sub_tasks) {
        const subTasks = error.response.data.sub_tasks;

        const frontTask = subTasks.filter(item => item.name.indexOf('front_') !== -1)[0];
        const sideTask = subTasks.filter(item => item.name.indexOf('side_') !== -1)[0];

        setHardValidation({
          front: frontTask.message,
          side: sideTask.message,
        });

        route('/hard-validation', true);
      } else if (error && error.response && error.response.status === 400) {
        route('/not-found', true);
      } else if (error && error.response && error.response.data) {
        const { detail, brand: brandError, body_part: bodyPartError } = error.response.data;
        alert(detail || brandError || bodyPartError);
      } else {
        alert(error);
      }
    }
  }

  openVideo = () => {
    route('/tutorial', true);
  }

  render() {
    const {
      qrCodeUrl,
      isPending,
      isFrontImageValid,
      isSideImageValid,
      frontImagePose,
      frontImageBody,
      sideImagePose,
      sideImageBody,
    } = this.state;

    const {
      frontImage,
      sideImage,
      gender,
    } = this.props;

    return (
      <div className="screen active">
        <div className="screen__content upload">
          <h2 className="screen__subtitle">
            <span className="success">STEP 1</span>
            <span className="screen__subtitle-separ success" />
            <span className="success">STEP 2</span>
          </h2>

          <h3 className="screen__title upload__title">SCAN THIS QR CODE</h3>
          <p>and proceed on your mobile device</p>

          <QRCodeBlock className="upload__qrcode" data={qrCodeUrl} />


          <h3 className="screen__title upload__title-2">OR UPLOAD PHOTOS FROM YOUR PC</h3>

          <div className="upload__block">
            <div className="upload__video">
              <button className="upload__video-btn" type="button" onClick={this.openVideo}>
                <img src={playIcon} alt="Play icon" />
                <span>Play</span>
              </button>
              <p>View tutorial</p>
            </div>
            <div className="upload__files">
              <UploadBlock
                gender={gender}
                type="front"
                validation={{ pose: frontImagePose, body: frontImageBody }}
                change={this.saveFrontFile}
                isValid={isFrontImageValid}
                value={frontImage}
              />
              <UploadBlock
                gender={gender}
                type="side"
                validation={{ pose: sideImagePose, body: sideImageBody }}
                change={this.saveSideFile}
                isValid={isSideImageValid}
                value={sideImage}
              />
            </div>
          </div>

        </div>
        <div className="screen__footer">
          <button
            className="button"
            onClick={this.onNextButtonClick}
            type="button"
            disabled={!frontImage || !sideImage}
          >
            next
          </button>
        </div>

        <Preloader isActive={isPending} />
      </div>

    );
  }
}

export default connect(state => state, actions)(Upload);
