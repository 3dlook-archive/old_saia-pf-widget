import { h, Component } from 'preact';

const slideImage1 = require('../../images/slide1.png');
const slideImage2 = require('../../images/slide2.png');
const slideImage3 = require('../../images/slide3.png');
const sliderButtonIcon = require('../../images/slider-next-icon.svg');

export class Slider extends Component {
  constructor(props) {
    super(props);
  }

  onNextClick() {
    console.log('next');
  }

  onPrevClick() {
    console.log('prev');
  }

  render() {
    return (
      <div class="tips__slider slider">
        <div class="slider__slides">
          <div class="slider__slide active">
            <img src={slideImage1} alt="" />
          </div>

          <div class="slider__slide">
            <img src={slideImage2} alt="" />
          </div>

          <div class="slider__slide">
            <img src={slideImage3} alt="" />
          </div>
        </div>

        <div class="slider__bullets">
          <div class="slider__bullet active"></div>
          <div class="slider__bullet"></div>
          <div class="slider__bullet"></div>
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
