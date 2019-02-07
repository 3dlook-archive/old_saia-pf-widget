import { h } from 'preact';
import classNames from 'classnames';
import { send } from '../../utils';

const nextArrowIcon = require('../../images/arrow.svg');

const Results = ({ matches }) => (
  <div className="screen screen--result active">
    <div className="screen__content result">
      <h2 className="screen__title result__title">your recomended size</h2>

      <div className={classNames('result__product', { active: matches.product_description && matches.image })}>
        <div className="result__product-img">
          <img src={matches.image} alt="" />
        </div>
        <div className="result__product-info">
          <h3 className="result__product-title">For this product:</h3>
          <p className="result__product-desc">{matches.product_description}</p>
        </div>
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

      <button className="button" type="button" onClick={() => send('close')}>
        back to store
        <img className="button__icon" src={nextArrowIcon} alt="Go next arrow icon" />
      </button>
    </div>
  </div>
);

export default Results;
