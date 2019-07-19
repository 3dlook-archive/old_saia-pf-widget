import { h, Component } from 'preact';
import classNames from 'classnames';
import { send } from '../../utils';
import { gaResultsOnContinue } from '../../ga';

/**
 * Results page component.
 * Displays results of the flow.
 */
class Results extends Component {
  static onClick = () => {
    send('close');
    gaResultsOnContinue();
  }

  render({ matches }) {
    return (
      <div className="screen screen--result active">
        <div className="screen__content result">
          <h2 className="screen__subtitle">
            <span className="success">Complete</span>
          </h2>

          <h3 className="screen__title result__title">your recomended size</h3>

          <div className="result__sizes">
            <div className={classNames('result__size', 'result__size--tight', { active: matches.tight })}>
              <h3 className="result__size-num">{matches.tight}</h3>
              <p className="result__size-desc">Tight fit</p>
            </div>

            <div className={classNames('result__size', 'result__size--normal', { active: matches.normal })}>
              <h3 className="result__size-num">{matches.normal}</h3>
              <p className="result__size-desc">Regular fit</p>
            </div>

            <div className={classNames('result__size', 'result__size--loose', { active: matches.loose })}>
              <h3 className="result__size-num">{matches.loose}</h3>
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

export default Results;
