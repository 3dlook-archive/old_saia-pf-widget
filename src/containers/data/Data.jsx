import { h, Component } from 'preact';
import { route } from 'preact-router';
import classNames from 'classnames';

import { objectToUrlParams } from '../../utils';
import Gender from '../../components/gender/Gender';
import Height from '../../components/height/Height';
import { gaDataOnContinue, gaDataMale, gaDataFemale } from '../../ga';

/**
 * Data page component
 */
export default class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gender: null,
      height: null,
      agree: false,
      isHeightValid: true,
      isGenderValid: true,
      isAgreeValid: true,
      buttonDisabled: true,
    };
  }

  /**
   * Change gender handler
   */
  changeGender = (gender) => {
    if (gender === 'male') {
      gaDataMale();
    } else {
      gaDataFemale();
    }

    this.setState({
      gender,
      isGenderValid: (gender === 'male' || gender === 'female'),
    }, () => this.checkButtonState());
  }

  /**
   * Change height handler
   */
  changeHeight = (height) => {
    let isValueValid = false;
    const numHeight = parseInt(height, 10);

    if (numHeight >= 150 && numHeight <= 220) {
      isValueValid = true;
    }

    this.setState({
      height: numHeight,
      isHeightValid: isValueValid,
    }, () => this.checkButtonState());
  }

  /**
   * Change argee checkbox state handler
   */
  changeAgree = (e) => {
    this.setState({
      agree: e.target.checked,
      isAgreeValid: e.target.checked,
    }, () => this.checkButtonState());
  }

  /**
   * On next screen event handler
   */
  onNextScreen = () => {
    const { matches } = this.props;
    const { gender, height } = this.state;

    const params = {
      ...matches,
      gender,
      height,
    };

    gaDataOnContinue();
    route(`/upload?${objectToUrlParams(params)}`, false);
  }

  /**
   * Set Next button disabled state
   */
  checkButtonState() {
    this.setState(prevState => ({
      buttonDisabled: !prevState.gender || !prevState.height
        || !prevState.agree || !prevState.isAgreeValid
        || !prevState.isGenderValid || !prevState.isHeightValid,
    }));
  }

  render() {
    const {
      isGenderValid,
      isHeightValid,
      isAgreeValid,
      agree,
      buttonDisabled,
    } = this.state;

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
