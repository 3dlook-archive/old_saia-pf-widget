import { h } from 'preact';
import { Link } from 'preact-router';

import { objectToUrlParams } from '../../utils';
import { Slider } from '../../components/slider/Slider';
import { gaTipsOnContinue } from '../../ga';

// slider images
const slideImage1 = require('../../images/slide1.png');
const slideImage2 = require('../../images/slide2.png');
const slideImage3 = require('../../images/slide3.png');

/**
 * Tips page component.
 * Displays slider with tips on how to take proper photos
 */
const Tips = ({ matches }) => (
  <div className="screen screen--tips active">
    <div className="screen__content tips">
      <h2 className="screen__title">Hi, here are some tips</h2>
      <p className="screen__text">
        Simply take two photos with any smartphone
        <br />
        camera. You can be on any background.
      </p>

      <Slider images={[slideImage1, slideImage2, slideImage3]} />

      <Link className="button" href={`/data?${objectToUrlParams(matches)}`} onClick={gaTipsOnContinue}>I understand</Link>
    </div>
  </div>
);

export default Tips;
