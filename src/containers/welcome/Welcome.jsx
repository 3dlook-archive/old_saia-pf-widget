import { h } from 'preact';
import { Link } from 'preact-router';

import Slider from '../../components/slider/Slider';
import { objectToUrlParams } from '../../utils';
import { gaWelcomeOnContinue } from '../../ga';

// slider images
const slideImage1 = require('../../images/slide1.svg');
const slideImage2 = require('../../images/slide2.svg');
const slideImage3 = require('../../images/slide3.svg');

/**
 * Welcome page component
 */
const Welcome = ({ matches }) => (
  <section className="screen active">
    <div className="screen__content welcome">
      <Slider className="welcome__slider" images={[slideImage1, slideImage2, slideImage3]}>
        <div>
          <img src={slideImage1} alt="Slide 1" />
          <p className="welcome__slider-text">take two photos</p>
        </div>
        <div>
          <img src={slideImage2} alt="Slide 2" />
          <p className="welcome__slider-text">Get personalized size <br /> recommendations</p>
        </div>
        <div>
          <img src={slideImage3} alt="Slide 3" />
          <p className="welcome__slider-text">Shop for apparel <br /> that fits you</p>
        </div>
      </Slider>
    </div>
    <div className="screen__footer">
      <Link className="button" href={`/data?${objectToUrlParams(matches)}`} onClick={gaWelcomeOnContinue}>
        <span>Start</span>
      </Link>
    </div>
  </section>
);

export default Welcome;
