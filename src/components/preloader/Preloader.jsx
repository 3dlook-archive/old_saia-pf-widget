import { h } from 'preact';

const preloaderImage = require('../../images/preloader.svg');

/**
 * Preloader component
 */
const Preloader = ({ isActive }) => (
  <div className={`preloader ${isActive ? 'active' : ''}`}>
    <h2 className="preloader__title screen__title">
      We’re doing some magic…
      <br />
      Please stand by
    </h2>
    <img className="preloader__image" src={preloaderImage} alt="Preloader animation" />
  </div>
);

export default Preloader;
