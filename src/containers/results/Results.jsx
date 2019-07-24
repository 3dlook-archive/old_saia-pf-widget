import { h, Component } from 'preact';
import classNames from 'classnames';
import { connect } from 'preact-redux';

import { send } from '../../utils';
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
  }

  componentDidMount = async () => {
    const {
      recommendations,
    } = this.props;

    await this.flow.updateState({
      status: 'finished',
      recommendations,
    });
  }

  static onClick = () => {
    const {
      isMobile,
    } = this.props;

    gaResultsOnContinue();

    if (!isMobile) {
      send('close');
    }

    if (isMobile) {
      window.close();
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
