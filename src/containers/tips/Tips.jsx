import { h } from 'preact';
import { Link } from 'preact-router';

const slideImage1 = require('../../images/slide1.png');
const slideImage2 = require('../../images/slide2.png');
const slideImage3 = require('../../images/slide3.png');
const sliderButtonIcon = require('../../images/slider-next-icon.svg');

export const Tips = () => (
  <div class="screen screen--tips active">
    <div class="screen__content tips">
      <h2 class="screen__title">Hi, here are some tips</h2>
      <p class="screen__text">Simply take two photos with any smartphone<br />camera. You can be on any background.</p>
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
          <button class="slider__back-btn">
            <img src={sliderButtonIcon} alt="Prev slide button icon" />
          </button>
          <button class="slider__next-btn">
            <img src={sliderButtonIcon} alt="Next slide button icon" />
          </button>
        </div>
      </div>
      <Link class="button" href="/upload">I understand</Link>
    </div>
  </div>
);
