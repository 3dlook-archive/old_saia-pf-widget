import { h, Component } from 'preact';
import classNames from 'classnames';
import { cmToFtIn, getHeightCm } from '../../utils';

/**
 * Height component
 */
export default class Height extends Component {
  constructor(props) {
    super(props);

    this.state = {
      units: 'in',
      cm: null,
      ft: null,
      inches: null,
    };
  }

  /**
   * Units change handler
   */
  onUnitsChange = (e) => {
    this.setState({
      units: e.target.value,
    });
  }

  /**
   * Switch element click handler
   */
  onSwitchClick = () => {
    this.setState(prevState => ({
      units: (prevState.units === 'cm') ? 'in' : 'cm',
    }));
  }

  /**
   * Cm change handler
   */
  onCmInputChange = (e) => {
    const { change } = this.props;

    // get height in cm
    const { value } = e.target;

    // get ft and in
    const ftIn = cmToFtIn(value);

    this.setState({
      cm: value,
      ft: ftIn.ft,
      inches: ftIn.in,
    }, () => {
      const { cm } = this.state;
      change(cm);
    });
  }

  /**
   * Ft change handler
   */
  onFtInputChange = (e) => {
    const { change } = this.props;
    const { inches } = this.state;

    // get ft
    const { value } = e.target;

    // convert value to cm
    let centimeters = getHeightCm(value, inches || 0);
    centimeters = centimeters.toFixed(0);

    this.setState({
      cm: centimeters,
      ft: value,
      inches: inches || 0,
    }, () => {
      const { cm } = this.state;
      change(cm);
    });
  }

  /**
   * Inches change handler
   */
  onInInputChange = (e) => {
    const { change } = this.props;
    const { ft } = this.state;

    // get inches
    const { value } = e.target;

    // convert value to cm
    let centimeters = getHeightCm(ft || 0, value);
    centimeters = centimeters.toFixed(0);

    this.setState({
      cm: centimeters,
      ft: ft || 0,
      inches: value,
    }, () => {
      const { cm } = this.state;
      change(cm);
    });
  }

  /**
   * Validate cm value
   */
  validateCm = (e) => {
    const { value } = e.target;
    // TODO: create regexp to validate numbers
    // value = value.replace(/^(?![1-2]|[1-2][0-9]|1[5-9][0-9]|2[0-1][0-9]|2[1-2]0)$/g, '');

    e.target.value = value;
  }

  render() {
    const {
      className,
      isValid,
    } = this.props;

    const {
      units,
      cm,
      ft,
      inches,
    } = this.state;

    return (
      <div className={classNames(className, 'height', { 'height--invalid': !isValid })} data-measure={units}>
        <div className="height__measure height__measure--cm">
          <div className="height__input-block" data-measure="cm">
            <input
              className="height__input"
              type="number"
              value={cm}
              onChange={this.onCmInputChange}
            />
          </div>
        </div>

        <div className="height__measure height__measure--in">
          <div className="height__input-block" data-measure="ft">
            <input
              className="height__input"
              type="number"
              value={ft}
              onChange={this.onFtInputChange}
              placeholder="0"
            />
          </div>
          <div className="height__input-block" data-measure="in">
            <input
              className="height__input"
              type="number"
              value={inches}
              onChange={this.onInInputChange}
              placeholder="0"
            />
          </div>
        </div>

        <div className={classNames('height__switcher', { 'height__switcher--cm': units === 'cm', 'height__switcher--in': units === 'in' })}>
          <label className={classNames('height__switcher-item', 'height__switcher-item--cm', { checked: units === 'cm' })} htmlFor="measure-cm" tabIndex="-1">
            <input type="radio" name="measure" id="measure-cm" value="cm" onChange={this.onUnitsChange} checked={units === 'cm'} />
            cm
          </label>

          <label className={classNames('height__switcher-item', 'height__switcher-item--in', { checked: units === 'in' })} htmlFor="measure-in" tabIndex="-1">
            <input type="radio" name="measure" id="measure-in" value="in" onChange={this.onUnitsChange} checked={units === 'in'} />
            in
          </label>

          <button className="height__switcher-switch" onClick={this.onSwitchClick} type="button">
            <span>
              { 'Change units to ' }
              {(units === 'in') ? 'centimeters' : 'feets and inches'}
            </span>
          </button>
        </div>

        <p className={classNames('height__desc', { active: units === 'cm' && !isValid })}>
          Your height should be between
          <br />
          150-220 cm
        </p>

        <p className={classNames('height__desc', { active: units === 'in' && !isValid })}>
          Your height should be between
          <br />
          4’11” and 7’2”
        </p>
      </div>
    );
  }
}
