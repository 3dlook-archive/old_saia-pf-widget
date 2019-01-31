import { h } from 'preact';
import { Link } from 'preact-router';

import { objectToUrlParams } from '../../utils';

const saiaPfLogo = require('../../images/logo.svg');
const nextArrowIcon = require('../../images/arrow.svg');

export const Welcome = (props) => (
  <div class="screen screen--welcome active">
    <div class="screen__content welcome">
      <div class="welcome__logo">
        <img src={saiaPfLogo} alt="SAIA Perfect Fit Logo" />
        <p class="welcome__powered">POWERED BY 3DLOOK</p>
      </div>
      
      <p class="welcome__text">After uploading only two photos we will determine your body measurements and select the size that will fit you best</p>

      <Link class="button" href={`/tips?${objectToUrlParams(props.matches)}`}>Start
        <img class="button__icon" src={nextArrowIcon} alt="Go next arrow icon" />
      </Link>
    </div>
  </div>
);
