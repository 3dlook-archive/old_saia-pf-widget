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
    // KOSTIL detected
    //
    // we cannot read router query params here
    // and origin is not a part of hash router history
    // so we need to read origin param from page get params
    const origin = new URLSearchParams(location.search).get('origin');
    window.parent.postMessage('saia-pf-widget.close', origin);
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
