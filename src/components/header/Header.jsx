import { h } from 'preact';

const saiaPfLogo = require('../../images/logo.svg');
const modalCloseIcon = require('../../images/close-icon.svg');

export const Header = () => (
  <div class="header">
    <button class="header__help">Help</button>

    <div class="header__logo">
      <img src={saiaPfLogo} alt="SAIA Perfect Fit Logo" />
    </div>

    <button class="header__close">
      <img src={modalCloseIcon} alt="Close button icon" />
    </button>
  </div>
);
