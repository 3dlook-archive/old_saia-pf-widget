import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { Gender } from '../../components/gender/Gender';
import { Height } from '../../components/height/Height';

const nextArrowIcon = require('../../images/arrow.svg');

export class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gender: null,
      height: null,
      validation: {
        gender: true,
        height: true,
        agree: true,
      },
    };
  }

  changeGender = (gender) => {
    this.setState({
      gender,
      validation: {
        height: this.state.validation.height,
        gender: (gender === 'male' || gender === 'female'),
      }
    });
  }

  changeHeight = (height) => {
    let isValueValid = false;
    const numHeight = parseInt(height);

    if (numHeight >= 150 && numHeight <= 220) {
      isValueValid = true;
    }

    this.setState({
      height: numHeight,
      validation: {
        height: isValueValid,
        gender: this.state.validation.gender,
        agree: false,
      }
    });
  }

  onNextScreen = () => {
    console.log(this.state);
  }

  render() {
    return (
      <div class="screen screen--data active">
        <div class="screen__content data">
          <h2 class="screen__title">PLEASE ENTER YOUR DATA</h2>
          <p class="screen__text">Please select your gender and enter height. <br />
          We need this information to create your Perfect Fit Profile</p>

          <div class="data__block">
            <div class="data__field">
              <h3 class="data__field-title">Gender:</h3>
              
              <Gender change={this.changeGender} isValid={this.state.validation.gender} />
            </div>

            <div class="data__field">
              <h3 class="data__field-title">Height:</h3>

              <Height change={this.changeHeight} isValid={this.state.validation.height} />
            </div>
          </div>

          <button class="button" onClick={this.onNextScreen}>
            Next step
            <img class="button__icon" src={nextArrowIcon} alt="Go next arrow icon" />
          </button>

          <div class={`data__check checkbox ${!this.state.validation.agree ? 'checkbox--invalid' : ''}`}>
            <input type="checkbox" name="agree" id="agree" />
            <label for="agree">I accept <a href="#">Terms and Conditions</a></label>
          </div>
        </div>
      </div>
    );
  }
}
