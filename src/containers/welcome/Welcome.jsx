import { h } from 'preact';
import { Link } from 'preact-router';

import { objectToUrlParams } from '../../utils';
import { gaWelcomeOnContinue } from '../../ga';

const saiaPfLogo = require('../../images/logo.svg');
const nextArrowIcon = require('../../images/arrow.svg');

/**
 * Welcome page component
 */
const Welcome = ({ matches }) => (
  <div className="screen screen--welcome active">
    <div className="screen__content welcome">
      <div className="welcome__logo">
        <img src={saiaPfLogo} alt="SAIA Perfect Fit Logo" />
        <p className="welcome__powered">POWERED BY 3DLOOK</p>
      </div>

      <p className="welcome__text">After uploading only two photos we will determine your body measurements and select the size that will fit you best</p>

      <Link className="button" href={`/tips?${objectToUrlParams(matches)}`} onClick={gaWelcomeOnContinue}>
        Start
        <img className="button__icon" src={nextArrowIcon} alt="Go next arrow icon" />
      </Link>
    </div>
  </div>
);

export default Welcome;
