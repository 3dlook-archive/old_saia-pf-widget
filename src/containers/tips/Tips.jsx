import { h } from 'preact';
import { Link } from 'preact-router';

import { Slider } from '../../components/slider/Slider';

export const Tips = () => (
  <div class="screen screen--tips active">
    <div class="screen__content tips">
      <h2 class="screen__title">Hi, here are some tips</h2>
      <p class="screen__text">Simply take two photos with any smartphone<br />camera. You can be on any background.</p>

      <Slider />
      
      <Link class="button" href="/upload">I understand</Link>
    </div>
  </div>
);
