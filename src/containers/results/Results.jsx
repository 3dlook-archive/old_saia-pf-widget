import { h, Component } from 'preact';
import classNames from 'classnames';
import { connect } from 'preact-redux';

import { send, objectToUrlParams } from '../../utils';
import { gaResultsOnContinue } from '../../ga';
import actions from '../../store/actions';
import FlowService from '../../services/flowService';

/**
 * Results page component.
 * Displays results of the flow.
 */
class Results extends Component {
  constructor(props) {
    super(props);

    const { flowId, token } = this.props;
    this.flow = new FlowService(token);
    this.flow.setFlowId(flowId);

    // the problem is that if we have soft validation screen
    // then at results screen we have size recommendations in componentDidMount
    // but if we dont have soft validation errors, then in componentDidMount
    // size recommendations will be equal null
    // to fix this we need to send patch request
    // only once (in componentDidMount or componentWillReceiveProps)
    // and because of that we need this flag to prevent double patch request
    this.isRecommendationsSent = false;
  }

  componentDidMount = async () => {
    const {
      recommendations,
    } = this.props;

    this.sendSizeRecommendations(recommendations);
  }

  componentWillReceiveProps = async (nextProps) => {
    const {
      recommendations,
    } = nextProps;

    this.sendSizeRecommendations(recommendations);
  }

  /**
   * Send size recommendations to flow api
   *
   * @param {Object} recommendations - size recommendation object
   * @param {string} [recommendations.tight] - tight size
   * @param {string} [recommendations.normal] - normal size
   * @param {string} [recommendations.loose] - loose size
   */
  sendSizeRecommendations = async (recommendations) => {
    if (recommendations.tight
        || recommendations.normal
        || recommendations.loose) {
      this.isRecommendationsSent = true;

      await this.flow.updateState({
        status: 'finished',
        recommendations,
      });
    }
  }

  onClick = () => {
    const {
      isMobile,
      returnUrl,
      isFromDesktopToMobile,
      origin,
      resetState,
      measurements,
    } = this.props;

    gaResultsOnContinue();

    resetState();

    if (!isMobile) {
      send('close', {}, origin);
    }

    if (isFromDesktopToMobile) {
      // pass measurements via hash get params to the destination page
      window.location = `${returnUrl}#/?${objectToUrlParams(measurements)}`;
    }
  }

  render() {
    const {
      recommendations,
    } = this.props;

    return (
      <div className="screen screen--result active">
        <div className="screen__content result">
          <h2 className="screen__subtitle">
            <span className="success">Complete</span>
          </h2>

          <h3 className="screen__title result__title">your recomended size</h3>

          <div className="result__sizes">
            <div className={classNames('result__size', 'result__size--tight', { active: recommendations.tight })}>
              <h3 className="result__size-num">{recommendations.tight}</h3>
              <p className="result__size-desc">Tight fit</p>
            </div>

            <div className={classNames('result__size', 'result__size--normal', { active: recommendations.normal })}>
              <h3 className="result__size-num">{recommendations.normal}</h3>
              <p className="result__size-desc">Regular fit</p>
            </div>

            <div className={classNames('result__size', 'result__size--loose', { active: recommendations.loose })}>
              <h3 className="result__size-num">{recommendations.loose}</h3>
              <p className="result__size-desc">Loose fit</p>
            </div>
          </div>

          <p className="result__text">
            {'Your '}
            <b>Perfect Fit Profile</b>
            {' is completed.'}
            <br />
            Size recommendations for other products are now available.
          </p>
        </div>
        <div className="screen__footer">
          <button className="button" type="button" onClick={this.onClick}>
            Go shopping
          </button>
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)(Results);
