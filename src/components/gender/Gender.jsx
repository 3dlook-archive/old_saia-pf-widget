import { h, Component } from 'preact';
import className from 'classnames';

const maleIcon = require('../../images/male-icon.png');
const maleIconX2 = require('../../images/male-icon@2x.png');
const femaleIcon = require('../../images/female-icon.png');
const femaleIconX2 = require('../../images/female-icon@2x.png');

/**
 * Gender component
 */
export default class Gender extends Component {
  state = {
    value: null,
  }

  /**
   * Gender change event handler
   */
  onGenderChange = (e) => {
    const { value } = e.target;

    this.props.change(value);

    this.setState({
      value,
    });
  }

  render() {
    return (
      <div className={className('gender', this.props.className, { 'gender--invalid': !this.props.isValid })}>
        <input type="radio" name="gender" id="gender-female" value="female" onChange={this.onGenderChange} checked={this.state.value === 'female'} />
        <label className="gender__item" for="gender-female">
          <span>Female</span>
          <img src={femaleIcon} srcSet={`${femaleIcon} 1x, ${femaleIconX2} 2x`} alt="female icon" />
        </label>

        <input type="radio" name="gender" id="gender-male" value="male" onChange={this.onGenderChange} checked={this.state.value === 'male'} />
        <label className="gender__item" for="gender-male">
          <span>Male</span>
          <img src={maleIcon} srcSet={`${maleIcon} 1x, ${maleIconX2} 2x`} alt="male icon" />
        </label>
      </div>
    );
  }
}
