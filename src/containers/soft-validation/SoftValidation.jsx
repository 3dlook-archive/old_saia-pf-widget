import { h, Component } from 'preact';
import { route, Link } from 'preact-router';
import { connect } from 'preact-redux';

import actions from '../../store/actions';
import ImageExample from '../../components/image-example/ImageExample';
import FlowService from '../../services/flowService';
import { gaSoftValidationError, gaRetakePhotoWarning, gaContinueAnyway } from '../../ga';

const hmmIcon1x = require('../../images/hmm.png');
const hmmIcon2x = require('../../images/hmm@2x.png');

/**
 * Soft validation page component
 */
class SoftValidation extends Component {
  constructor(props) {
    super(props);

    const { flowId, token, softValidation } = this.props;
    this.flow = new FlowService(token);
    this.flow.setFlowId(flowId);

    this.isFrontError = softValidation.front.bodyAreaPercentage < 0.7
      || softValidation.front.legsDistance < 2
      || softValidation.front.legsDistance > 15
      || softValidation.front.messages.length;

    this.isSideError = softValidation.side.bodyAreaPercentage < 0.7
      || softValidation.side.messages.length;
  }

  componentDidMount = async () => {
    await this.flow.updateState({
      frontImage: !this.isFrontError,
      sideImage: !this.isSideError,
    });

    gaSoftValidationError();
  }

  back = () => {
    route('/upload', true);

    gaRetakePhotoWarning();
  }

  continue = () => {
    route('/results', true);

    gaContinueAnyway();
  }

  render() {
    const {
      softValidation,
      isMobile,
    } = this.props;

    return (
      <div className="screen active">
        <div className="screen__content soft-validation">
          <h2 className="screen__subtitle">
            <span className="warning">Warning</span>
          </h2>

          <h3 className="screen__title soft-validation__title">Huh…</h3>
          <p className="soft-validation__text">
            Good job, but for a better result we suggest
            <br />
            {(this.isFrontError && !this.isSideError)
              ? 'you to redo the front photo'
              : '' }

            {(this.isSideError && !this.isFrontError)
              ? 'you to redo the side photo'
              : '' }

            {(this.isFrontError && this.isSideError)
              ? 'you to redo the front and the side photos'
              : '' }
          </p>

          <img className="soft-validation__image" src={hmmIcon1x} srcSet={`${hmmIcon1x} 1x, ${hmmIcon2x} 2x`} alt="Soft validation errors" />

          <h4 className="soft-validation__title-2">
            Just follow these
            <br />
            recommendations:
          </h4>

          <ol className="soft-validation__recommendations">
            {(softValidation.front.legsDistance > 15 || softValidation.front.legsDistance < 2)
              ? (
                <li>
                  Make sure your feet are shoulder width apart.
                </li>
              )
              : null
            }

            {(softValidation.front.bodyAreaPercentage < 0.7)
              ? (
                <li>
                  Come a bit closer to a camera.
                </li>
              )
              : null
            }

            {(softValidation.front.messages.includes('Keep your head straight'))
              ? (
                <li>
                  Keep your head straight.
                </li>
              )
              : null
            }


            {(softValidation.front.messages.includes('Keep your hands at waist level'))
              ? (
                <li>
                  Keep your hands at waist level.
                </li>
              )
              : null
            }

            {(this.isFrontError) ? <ImageExample type="front" isMobile={isMobile} /> : null}

            {(softValidation.side.messages.includes('Keep your head straight'))
              ? (
                <li>
                  Keep your head straight.
                </li>
              )
              : null
            }

            {(softValidation.side.bodyAreaPercentage < 0.7)
              ? (
                <li>
                  Come a bit closer to a camera.
                </li>
              )
              : null
            }

            {(softValidation.side.messages.includes('Keep your hands at waist level'))
              ? (
                <li>
                  Keep your hands at waist level.
                </li>
              )
              : null
            }

            {(this.isSideError) ? <ImageExample type="side" isMobile={isMobile} /> : null}
          </ol>

        </div>
        <div className="screen__footer soft-validation__footer">
          <button className="button button--outline" onClick={this.continue} type="button"><span>Continue anyway</span></button>
          <button className="button" onClick={this.back} type="button">Retake photo</button>
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)(SoftValidation);
