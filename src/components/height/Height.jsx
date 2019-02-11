import { h, Component } from 'preact';

// helper functions
function cmToFtIn(cm) {
  var inches = cm / 2.54;
  var ft = inches / 12;

  return {
    ft: Math.floor(ft),
    in: Math.ceil(inches.toFixed(0) % 12),
  };
}

function in2cm(inches) {
  return inches * 2.54;
}

function ft2in(ft) {
  return ft * 12;
}

function getHeightCm(ft = 0, inches = 0) {
  return in2cm(ft2in(ft) + parseInt(inches));
}

export class Height extends Component {
  constructor(props) {
    super(props);

    this.state = {
      units: 'cm',
      cm: null,
      ft: null,
      in: null,
    }
  }

  onUnitsChange = (e) => {
    this.setState({
      units: e.target.value,
    });
  }

  onCmInputChange = (e) => {
    // get height in cm
    const { value } = e.target;

    // get ft and in
    const ftIn = cmToFtIn(value);

    this.setState({
      cm: value,
      ft: ftIn.ft,
      in: ftIn.in,
    });

    this.props.change(this.state.cm);
  }

  onFtInputChange = (e) => {
    // get ft
    const { value } = e.target;

    // convert value to cm
    let cm = getHeightCm(value, this.state.in || 0);
    cm = cm.toFixed(0);

    this.setState({
      cm,
      ft: value,
      in: this.state.in || 0,
    });

    this.props.change(this.state.cm);
  }

  onInInputChange = (e) => {
    // get in
    const { value } = e.target;

    // convert value to cm
    let cm = getHeightCm(this.state.ft || 0, value);
    cm = cm.toFixed(0);

    this.setState({
      cm,
      ft: this.state.ft || 0,
      in: value,
    });

    this.props.change(this.state.cm);
  }

  validateCm = (e) => {
    let { value } = e.target;
    // TODO: create regexp to validate numbers
    // value = value.replace(/^(?![1-2]|[1-2][0-9]|1[5-9][0-9]|2[0-1][0-9]|2[1-2]0)$/g, '');

    e.target.value = value;
  }

  render() {
    return (
      <div class={`height ${!this.props.isValid ? 'height--invalid' : ''}`} data-measure={this.state.units}>
        <div class="height__measure height__measure--cm">
          <div class="height__input-block" data-measure="cm">
            <input
              class="height__input"
              type="number"
              value={this.state.cm}
              onChange={this.onCmInputChange}
              onKeyDown={this.validateCm}
              onInput={this.validateCm}
              onPropertyChange={this.validateCm}
            />
          </div>
        </div>

        <div class="height__measure height__measure--in">
          <div class="height__input-block" data-measure="ft">
            <input class="height__input"
            type="number"
            value={this.state.ft}
            onChange={this.onFtInputChange}
            />
          </div>
          <div class="height__input-block" data-measure="in">
            <input
              class="height__input"
              type="number"
              value={this.state.in}
              onChange={this.onInInputChange} />
          </div>
        </div>

        <div class="height__switcher">
          <input type="radio" name="measure" id="measure-cm" value="cm" onChange={this.onUnitsChange} checked={this.state.units === 'cm'} />
          <label class="height__switcher-item height__switcher-item--cm" for="measure-cm">cm</label>
          
          <input type="radio" name="measure" id="measure-in" value="in" onChange={this.onUnitsChange} checked={this.state.units === 'in'} />
          <label class="height__switcher-item height__switcher-item--in" for="measure-in">in</label>

          <div class="height__switcher-switch"></div>
        </div>

        <p class={`height__desc ${this.state.units === 'in' ? 'height__desc--hidden' : ''}`}>
          Your height should be between<br />
          150-210 cm
        </p>

        <p class={`height__desc ${this.state.units === 'cm' ? 'height__desc--hidden' : ''}`}>
          Your height should be between<br />
          4’11” and 7’2”
        </p>
      </div>
    );
  }
}
