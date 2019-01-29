import { h } from 'preact';

const nextArrowIcon = require('../../images/arrow.svg');
const productImagePlaceholder = require('../../images/product-img.png');

export const Results = () => (
  <div class="screen screen--result active">
    <div class="screen__content result">
      <h2 class="screen__title">your recomended size</h2>

      <div class="result__product">
        <div class="result__product-img">
          <img src={productImagePlaceholder} alt="" />
        </div>
        <div class="result__product-info">
          <h3 class="result__product-title">For this product:</h3>
          <p class="result__product-desc">The Nike Air Rally Women's Crew</p>
        </div>
      </div>

      <div class="result__sizes">
        <div class="result__size">
          <h3 class="result__size-num">XS</h3>
          <p class="result__size-desc">Tight fit</p>
        </div>

        <div class="result__size result__size--big">
          <h3 class="result__size-num">S</h3>
          <p class="result__size-desc">Normal fit</p>
        </div>

        <div class="result__size">
          <h3 class="result__size-num">M</h3>
          <p class="result__size-desc">Loose fit</p>
        </div>
      </div>

      <p class="result__text">Your <b>Perfect Fit Profile</b> is completed. <br />
          Size recommendations for other products are now available.</p>

      <button class="button">
        back to store
        <img class="button__icon" src={nextArrowIcon} alt="Go next arrow icon" />
      </button>
    </div>
  </div>
);
