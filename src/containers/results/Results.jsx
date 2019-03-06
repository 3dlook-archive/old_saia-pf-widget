import { h, Component } from 'preact';
import classNames from 'classnames';
import { send } from '../../utils';
import { gaResultsOnContinue, gaSizeNotFound } from '../../ga';

const nextArrowIcon = require('../../images/arrow.svg');

/**
 * Results page component.
 * Displays results of the flow.
 */
class Results extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { tight, normal, loose } = this.props.matches;
    if (!tight && !normal && !loose) {
      gaSizeNotFound();
    }
  }

  onClick() {
    send('close');
    gaResultsOnContinue();
  }

  render({ matches }) {
    return (<div className="screen screen--result active">
      <div className="screen__content result">
        <h2 className={classNames('screen__title', 'result__title', { active: matches.tight || matches.normal || matches.loose })}>your recomended size</h2>

        <div className={classNames('result__product', { active: matches.product_description && matches.image && (matches.tight || matches.normal || matches.loose) })}>
          <div className="result__product-img">
            <img src={matches.image} alt="" />
          </div>
          <div className="result__product-info">
            <h3 className="result__product-title">For this product:</h3>
            <p className="result__product-desc">{matches.product_description}</p>
          </div>
        </div>

        <div className={classNames('result__size-not-found', { active: !matches.tight && !matches.normal && !matches.loose })}>
          <h2>OOPS, SOMETHING WENT WRONG…</h2>
          <p>
            We can’t find your Perfect Fit for this item.
            <br />
            Please try out other items.
          </p>
        </div>

        <div className="result__sizes">
          <div className={classNames('result__size', 'result__size--tight', { active: matches.tight })}>
            <h3 className="result__size-num">{matches.tight}</h3>
            <p className="result__size-desc">Tight fit</p>
          </div>

          <div className={classNames('result__size', 'result__size--normal', { active: matches.normal })}>
            <h3 className="result__size-num">{matches.normal}</h3>
            <p className="result__size-desc">Normal fit</p>
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

        <button className="button" type="button" onClick={this.onClick}>
          back to store
          <img className="button__icon" src={nextArrowIcon} alt="Go next arrow icon" />
        </button>
      </div>
    </div>);
  }
}

export default Results;
