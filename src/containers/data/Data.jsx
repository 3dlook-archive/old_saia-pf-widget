import { h, Component } from 'preact';
import { route } from 'preact-router';
import classNames from 'classnames';
import { connect } from 'preact-redux';

import Gender from '../../components/gender/Gender';
import Height from '../../components/height/Height';
import { gaDataOnContinue, gaDataMale, gaDataFemale } from '../../ga';
import actions from '../../store/actions';

/**
 * Data page component
 */
class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHeightValid: true,
      isGenderValid: true,
      isAgreeValid: true,
      buttonDisabled: true,
    };
  }

  /**
   * Check button state on component update
   */
  componentDidUpdate() {
    this.checkButtonState();
  }

  /**
   * Change gender handler
   */
  changeGender = (gender) => {
    const { addGender } = this.props;

    if (gender === 'male') {
      gaDataMale();
    } else {
      gaDataFemale();
    }

    addGender(gender);

    this.setState({
      isGenderValid: (gender === 'male' || gender === 'female'),
    });
  }

  /**
   * Change height handler
   */
  changeHeight = (height) => {
    const { addHeight } = this.props;

    let isValueValid = false;
    const numHeight = parseInt(height, 10);

    if (numHeight >= 150 && numHeight <= 220) {
      isValueValid = true;
    }

    addHeight(numHeight);

    this.setState({
      isHeightValid: isValueValid,
    });
  }

  /**
   * Change argee checkbox state handler
   */
  changeAgree = (e) => {
    const { addAgree } = this.props;

    addAgree(e.target.checked);

    this.setState({
      isAgreeValid: e.target.checked,
    });
  }

  /**
   * On next screen event handler
   */
  onNextScreen = () => {
    gaDataOnContinue();
    route('/upload', false);
  }

  /**
   * Set Next button disabled state
   */
  checkButtonState() {
    const { gender, height, agree } = this.props;
    const {
      buttonDisabled,
      isAgreeValid,
      isGenderValid,
      isHeightValid,
    } = this.state;

    const isButtonDisabled = !gender || !height
      || !agree || !isAgreeValid
      || !isGenderValid || !isHeightValid;

    if (isButtonDisabled !== buttonDisabled) {
      this.setState({
        buttonDisabled: isButtonDisabled,
      });
    }
  }

  render() {
    const {
      isGenderValid,
      isHeightValid,
      isAgreeValid,
      buttonDisabled,
    } = this.state;

    const {
      agree,
    } = this.props;

    return (
      <div className="screen active">
        <div className="screen__content data">
          <h2 className="screen__subtitle">
            <span className="success">STEP 1</span>
            <span className="screen__subtitle-separ" />
            <span>STEP 2</span>
          </h2>

          <h3 className="screen__title data__title">Select your gender</h3>
          <Gender className="data__gender" change={this.changeGender} isValid={isGenderValid} />

          <h3 className="screen__title data__title">How tall are you?</h3>
          <Height className="data__height" change={this.changeHeight} isValid={isHeightValid} />

        </div>
        <div className="screen__footer">
          <div className={classNames('data__check', 'checkbox', { checked: agree, 'checkbox--invalid': !isAgreeValid })}>
            <label htmlFor="agree">
              <input type="checkbox" name="agree" id="agree" onChange={this.changeAgree} checked={agree} />
              <span className="checkbox__icon" />
              { 'I accept ' }
              <a href="https://3dlook.me/terms-of-service/" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
            </label>
          </div>
          <button className="button" onClick={this.onNextScreen} type="button" disabled={buttonDisabled}>Next</button>
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)(Data);
