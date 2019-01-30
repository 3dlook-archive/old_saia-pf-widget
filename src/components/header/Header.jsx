import { h, Component } from 'preact';
import Match from 'preact-router/match';

const saiaPfLogo = require('../../images/logo.svg');
const modalCloseIcon = require('../../images/close-icon.svg');

/**
 * Widget header component
 */
export class Header extends Component {
  /**
   * Close button click
   */
  onCloseButtonClick = () => {
    console.log('click');
  }

  /**
   * Help button click
   */
  onHelpButtonClick = () => {
    console.log('click');
  }

  render() {
    return (
      <div class="header">
        <button class="header__help" onClick={this.onHelpButtonClick}>Help</button>

        <Match path="/">
          { ({ matches }) => !matches && (
            <div class="header__logo">
              <img src={saiaPfLogo} alt="SAIA Perfect Fit Logo" />
            </div>
          ) }
        </Match>

        <button class="header__close" onClick={this.onCloseButtonClick}>
          <img src={modalCloseIcon} alt="Close button icon" />
        </button>
      </div>
    );
  }
};