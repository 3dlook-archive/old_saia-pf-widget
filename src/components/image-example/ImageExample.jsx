import { h, Component } from 'preact';
import classNames from 'classnames';

const exampleSide1x = require('../../images/example-side.png');
const exampleSide2x = require('../../images/example-side@2x.png');

const exampleFront1x = require('../../images/example-front.png');
const exampleFront2x = require('../../images/example-front@2x.png');

/**
 * Help component.
 * Displays help information
 */
class ImageExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageX: 0,
      imageY: 0,
    };
  }

  /**
   * Button hover and focus handler
   *
   * @param {MouseEvent} event - mouse event object
   */
  onMouseOver = ({ target }) => {
    const rect = target.getBoundingClientRect();

    this.setState({
      imageX: rect.left + target.offsetWidth / 2,
      imageY: rect.top - 366 - 8,
    });
  }

  render() {
    const { type } = this.props;
    const { imageX, imageY } = this.state;

    const imageStyle = {
      top: imageY,
      left: imageX,
    };

    return (
      <div className={classNames('image-example')}>
        <button className="image-example__btn" type="button" onMouseOver={this.onMouseOver} onFocus={this.onMouseOver}>See example</button>
        <div className="image-example__img" style={imageStyle}>
          {(type === 'side')
            ? <img src={exampleSide1x} srcSet={`${exampleSide1x} 1x, ${exampleSide2x} 2x`} alt="Side example" />
            : <img src={exampleFront1x} srcSet={`${exampleFront1x} 1x, ${exampleFront2x} 2x`} alt="Front example" /> }
        </div>
      </div>
    );
  }
}

export default ImageExample;
