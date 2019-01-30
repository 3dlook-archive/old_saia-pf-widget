import { h, Component } from 'preact';

const sliderButtonIcon = require('../../images/slider-next-icon.svg');

/**
 * Slider component
 */
export class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };
  }

  /**
   * Slider next slide button click
   */
  onNextClick = () => {
    let i = this.state.index + 1;

    if (i >= this.props.images.length) {
      i = 0;
    }

    this.setState({
      index: i,
    });
  }

  /**
   * Slider prev slide button click
   */
  onPrevClick = () => {
    let i = this.state.index - 1;

    if (i < 0) {
      i = this.props.images.length - 1;
    }

    this.setState({
      index: i,
    });
  }

  render() {
    // slides
    const slides = this.props.images.map((image, i) => (
      <div class={'slider__slide ' + ((this.state.index === i) ? 'active' : '')}>
        <img src={image} alt="" />
      </div>
    ));

    // bullets
    const bullets = this.props.images.map((image, i) => (
      <div class={'slider__bullet ' + ((this.state.index === i) ? 'active' : '')}></div>
    ));

    return (
      <div class="tips__slider slider">
        <div class="slider__slides">
          {slides}
        </div>

        <div class="slider__bullets">
          {bullets}
        </div>

        <div class="slider__nav">
          <button class="slider__back-btn" onClick={this.onPrevClick}>
            <img src={sliderButtonIcon} alt="Prev slide button icon" />
          </button>
          <button class="slider__next-btn" onClick={this.onNextClick}>
            <img src={sliderButtonIcon} alt="Next slide button icon" />
          </button>
        </div>
      </div>
    );
  }
}
