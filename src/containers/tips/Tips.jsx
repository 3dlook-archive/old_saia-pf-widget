import { h } from 'preact';
import { Link } from 'preact-router';

import { Slider } from '../../components/slider/Slider';

// slider images
const slideImage1 = require('../../images/slide1.png');
const slideImage2 = require('../../images/slide2.png');
const slideImage3 = require('../../images/slide3.png');

export const Tips = () => (
  <div class="screen screen--tips active">
    <div class="screen__content tips">
      <h2 class="screen__title">Hi, here are some tips</h2>
      <p class="screen__text">Simply take two photos with any smartphone<br />camera. You can be on any background.</p>

      <Slider images={[slideImage1, slideImage2, slideImage3]} />
      
      <Link class="button" href="/upload">I understand</Link>
    </div>
  </div>
);
