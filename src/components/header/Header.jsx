import { h, Component } from 'preact';
import { send } from '../../utils';
import { gaHelpOnClick, gaCloseOnClick } from '../../ga';

const helpIcon = require('../../images/help-icon.svg');
const modalCloseIcon = require('../../images/close-icon.svg');

/**
 * Widget header component
 */
export default class Header extends Component {
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
    const { help } = this.props;
    gaHelpOnClick();
    help();
  };

  render() {
    return (
      <header className="header">
        <button className="header__help" onClick={this.onHelpButtonClick} type="button">
          <img src={helpIcon} alt="Help button icon" />
        </button>

        <button className="header__close" onClick={this.onCloseButtonClick} type="button">
          <img src={modalCloseIcon} alt="Close button icon" />
        </button>
      </header>
    );
  }
}
