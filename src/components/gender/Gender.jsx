import { h, Component } from 'preact';

/**
 * Gender component
 */
export class Gender extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Gender change event handler
   */
  onGenderChange = (e) => {
    this.props.change(e.target.value);
  }

  render() {
    return (

      <div class={`gender ${!this.props.isValid ? 'gender--invalid' : ''}`}>
        <input type="radio" name="gender" id="gender-female" value="female" onChange={this.onGenderChange} />
        <label class="gender__item" for="gender-female">Female</label>

        <input type="radio" name="gender" id="gender-male" value="male" onChange={this.onGenderChange} />
        <label class="gender__item" for="gender-male">Male</label>
      </div>
    );
  }
}
