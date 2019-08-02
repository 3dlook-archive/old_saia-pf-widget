import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { send } from '../../utils';
import { gaHelpOnClick, gaCloseOnClick } from '../../ga';
import actions from '../../store/actions';

const helpIcon = require('../../images/help-icon.svg');
const modalCloseIcon = require('../../images/close-icon.svg');

/**
 * Widget header component
 */
class Header extends Component {
  /**
   * Close button click
   */
  onCloseButtonClick = () => {
    gaCloseOnClick();
    const {
      returnUrl,
      isFromDesktopToMobile,
      origin,
      resetState,
    } = this.props;

    if (isFromDesktopToMobile) {
      window.location = returnUrl;
    } else {
      resetState();
      send('close', {}, origin);
    }
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

export default connect(state => state, actions)(Header);
