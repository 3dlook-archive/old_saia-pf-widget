import { h, Component } from 'preact';

/**
 * Gender component
 */
export class Gender extends Component {
  state = {
    value: null,
  }

  constructor(props) {
    super(props);
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
      <div class={`gender ${!this.props.isValid ? 'gender--invalid' : ''}`}>
        <input type="radio" name="gender" id="gender-female" value="female" onChange={this.onGenderChange} checked={this.state.value === 'female'} />
        <label class="gender__item" for="gender-female">Female</label>

        <input type="radio" name="gender" id="gender-male" value="male" onChange={this.onGenderChange} checked={this.state.value === 'male'} />
        <label class="gender__item" for="gender-male">Male</label>
      </div>
    );
  }
}
