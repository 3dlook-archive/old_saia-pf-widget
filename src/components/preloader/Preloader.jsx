import { h } from 'preact';

const preloaderImage = require('../../images/preloader.svg');

/**
 * Preloader component
 */
const Preloader = ({ isActive }) => (
  <div className={`preloader ${isActive ? 'active' : ''}`}>
    <h2 className="preloader__title screen__title">
      hold tight, the magic is
      <br />
      happening
    </h2>
    <img className="preloader__image" src={preloaderImage} alt="Preloader animation" />
  </div>
);

export default Preloader;
