import { h } from 'preact';

const preloaderImage = require('../../images/preloader.svg');

export const Preloader = ({ isActive }) => (
  <div class={`preloader ${isActive ? 'active' : ''}`}>
    <h2 class="preloader__title screen__title">We’re doing some magic…<br />Please stand by</h2>
    <img class="preloader__image" src={preloaderImage} alt="Preloader image" />
  </div>
);
