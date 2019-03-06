import { h, Component } from 'preact';
import Match from 'preact-router/match';
import { send } from '../../utils';
import { gaHelpOnClick, gaCloseOnClick } from '../../ga';

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
    gaCloseOnClick();
    send('close');
  };

  /**
   * Help button click
   */
  onHelpButtonClick = () => {
    gaHelpOnClick();
    this.props.help();
  };

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

        <button class="header__close" onClick={this.onCloseButtonClick} type="button">
          <img src={modalCloseIcon} alt="Close button icon" />
        </button>
      </div>
    );
  }
};
