import { h, Component } from 'preact';
import { Link } from 'preact-router';

const nextArrowIcon = require('../../images/arrow.svg');

export class Data extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="screen screen--data active">
        <div class="screen__content data">
          <h2 class="screen__title">And the last step</h2>
          <p class="screen__text">Please select your gender and enter height. <br />
          We need this information to create your Perfect Fit Profile</p>

          <div class="data__block">
            <div class="data__field">
              <h3 class="data__field-title">Gender:</h3>
              <div class="gender">
                <input type="radio" name="gender" id="gender-female" value="female" />
                <label class="gender__item" for="gender-female">Female</label>

                <input type="radio" name="gender" id="gender-male" value="male" />
                <label class="gender__item" for="gender-male">Male</label>
              </div>
            </div>

            <div class="data__field">
              <h3 class="data__field-title">Height:</h3>

              <div class="height" data-measure="in">

                <div class="height__measure height__measure--cm">
                  <div class="height__input-block" data-measure="cm">
                    <input class="height__input" type="text" />
                  </div>
                </div>

                <div class="height__measure height__measure--in">
                  <div class="height__input-block" data-measure="ft">
                    <input class="height__input" type="text" />
                  </div>
                  <div class="height__input-block" data-measure="in">
                    <input class="height__input" type="text" />
                  </div>
                </div>

                <div class="height__switcher">
                  <input type="radio" name="measure" id="measure-cm" value="cm" checked />
                  <label class="height__switcher-item height__switcher-item--cm" for="measure-cm">cm</label>
                  
                  <input type="radio" name="measure" id="measure-in" value="in" />
                  <label class="height__switcher-item height__switcher-item--in" for="measure-in">in</label>

                  <div class="height__switcher-switch"></div>
                </div>

                <p class="height__desc">
                  Your height should be between <br />
                  150-210 cm
                </p>
              </div>
            </div>
          </div>

          <Link class="button" href="/results">
            get your size
            <img class="button__icon" src={nextArrowIcon} alt="Go next arrow icon" />
          </Link>

          <div class="data__check checkbox">
            <input type="checkbox" name="agree" id="agree" />
            <label for="agree">I accept <a href="#">Terms and Conditions</a></label>
          </div>
        </div>
      </div>
    );
  }
}
