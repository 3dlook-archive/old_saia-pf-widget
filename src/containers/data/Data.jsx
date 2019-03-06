import { h, Component } from 'preact';
import { route } from 'preact-router';

import { objectToUrlParams } from '../../utils';
import { Gender } from '../../components/gender/Gender';
import { Height } from '../../components/height/Height';
import { gaDataOnContinue, gaDataMale, gaDataFemale } from '../../ga';

const nextArrowIcon = require('../../images/arrow.svg');

/**
 * Data page component
 */
export class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gender: null,
      height: null,
      agree: false,
      isHeightValid: true,
      isGenderValid: true,
      isAgreeValid: true,
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
      ...this.state,
      gender,
      isGenderValid: (gender === 'male' || gender === 'female'),
    });
  }

  /**
   * Change height handler
   */
  changeHeight = (height) => {
    let isValueValid = false;
    const numHeight = parseInt(height);

    if (numHeight >= 150 && numHeight <= 220) {
      isValueValid = true;
    }

    this.setState({
      ...this.state,
      height: numHeight,
      isHeightValid: isValueValid,
    });
  }

  /**
   * Change argee checkbox state handler
   */
  changeAgree = (e) => {
    this.setState({
      ...this.state,
      agree: e.target.checked,
    });
  }

  /**
   * On next screen event handler
   */
  onNextScreen = () => {
    // validate values
    let isHeightValid = false;
    let isGenderValid = false;
    let isAgreeValid = false;

    // validate height
    const { height } = this.state;

    if (height >= 150 && height <= 220) {
      isHeightValid = true;
    }

    // validate gender
    const { gender } = this.state;

    if (gender && (gender === 'male' || gender === 'female')) {
      isGenderValid = true;
    }

    // validate agree checkbox
    const { agree } = this.state;

    if (agree) {
      isAgreeValid = true;
    }

    this.setState({
      ...this.state,
      isHeightValid,
      isGenderValid,
      isAgreeValid,
    });

    // if all data is valid
    // go to the next step
    if (isHeightValid && isGenderValid && isAgreeValid) {
      const params = {
        ...this.props.matches,
        gender: this.state.gender,
        height: this.state.height,
      };
      gaDataOnContinue();
      route(`/upload?${objectToUrlParams(params)}`, false);
    }
  }

  render() {
    return (
      <div class="screen screen--data active">
        <div class="screen__content data">
          <h2 class="screen__title">PLEASE ENTER YOUR DATA</h2>
          <p class="screen__text">Please select your gender and enter height. <br />
          We need this information to create your Perfect Fit Profile</p>

          <div class="data__block">
            <div class={`data__field ${!this.state.isGenderValid ? 'data__field--invalid' : ''}`}>
              <h3 class="data__field-title">Gender:</h3>

              <Gender change={this.changeGender} isValid={this.state.isGenderValid} />

              <p className="data__field-error"><span>!</span> Please select your gender</p>
            </div>

            <div class={`data__field ${!this.state.isHeightValid ? 'data__field--invalid' : ''}`}>
              <h3 class="data__field-title">Height:</h3>

              <Height change={this.changeHeight} isValid={this.state.isHeightValid} />

              <p className="data__field-error"><span>!</span> Please enter a valid height</p>
            </div>
          </div>

          <button class="button" onClick={this.onNextScreen}>
            Next step
            <img class="button__icon" src={nextArrowIcon} alt="Go next arrow icon" />
          </button>

          <div class={`data__check checkbox ${!this.state.isAgreeValid ? 'checkbox--invalid' : ''}`}>
            <input type="checkbox" name="agree" id="agree" onChange={this.changeAgree} checked={this.state.agree} />
            <label for="agree">I accept <a href="https://3dlook.me/terms-of-service/" target="_blank">Terms and Conditions</a></label>
          </div>
        </div>
      </div>
    );
  }
}
