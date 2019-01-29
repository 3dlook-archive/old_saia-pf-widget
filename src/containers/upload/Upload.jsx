import { h } from 'preact';
import { Link } from 'preact-router';

const frontImage = require('../../images/front.svg');
const sideImage = require('../../images/side.svg');
const crossIcon = require('../../images/cross.svg');
const checkIcon = require('../../images/check.svg');
const nextArrowIcon = require('../../images/arrow.svg');

export const Upload = () => (
  <div class="screen screen--upload active">
    <div class="screen__content upload">
      <h2 class="screen__title">upload photos</h2>
      <p class="screen__text">Please upload two full body <br />photos of yourself:</p>

      <div class="upload__files">
        <div class="upload__file-block">
          <h3 class="upload__file-title">Front</h3>

          <label class="upload__file" for="front" tabindex="0">
            <input type="file" name="front" id="front" hidden />
            <div class="upload__file-image upload__file-image--placeholder active">
              <img src={frontImage} alt="Front image icon" />
              <p class="upload__file-select-text">select file</p>
            </div>
            <div class="upload__file-image upload__file-image--preview">
              <img src="https://gamemag.ru/images/news/c/c4fc5238a07cd07bb3a4c44236135426.png" alt="Front image preview" />
            </div>
          </label>

          <ul class="upload__file-validation">
            <li class="upload__file-validation-status upload__file-validation-status--valid">
              <span class="upload__file-validation-icon">
                <img class="valid" src={checkIcon} alt="Check icon" />
                <img class="invalid" src={crossIcon} alt="Cross icon" />
              </span>
              Correct pose
            </li>
            <li class="upload__file-validation-status upload__file-validation-status--invalid">
              <span class="upload__file-validation-icon">
                <img class="valid" src={checkIcon} alt="Check icon" />
                <img class="invalid" src={crossIcon} alt="Cross icon" />
              </span>
              Full body
            </li>
          </ul>
        </div>

        <div class="upload__file-block">
          <h3 class="upload__file-title">Side</h3>

          <label class="upload__file" for="side" tabindex="0">
            <input type="file" name="side" id="side" hidden />
            <div class="upload__file-image upload__file-image--placeholder active">
              <img src={sideImage} alt="side image icon" />
              <p class="upload__file-select-text">select file</p>
            </div>
            <div class="upload__file-image upload__file-image--preview">
              <img src="https://gamemag.ru/images/news/c/c4fc5238a07cd07bb3a4c44236135426.png" alt="side image preview" />
            </div>
          </label>

          <ul class="upload__file-validation">
            <li class="upload__file-validation-status upload__file-validation-status--valid">
              <span class="upload__file-validation-icon">
                <img class="valid" src={checkIcon} alt="Check icon" />
                <img class="invalid" src={crossIcon} alt="Cross icon" />
              </span>
              Correct pose
            </li>
            <li class="upload__file-validation-status upload__file-validation-status--invalid">
              <span class="upload__file-validation-icon">
                <img class="valid" src={checkIcon} alt="Check icon" />
                <img class="invalid" src={crossIcon} alt="Cross icon" />
              </span>
              Full body
            </li>
          </ul>
        </div>

      </div>

      <Link class="button" href="/data">
        Next step
        <img class="button__icon" src={nextArrowIcon} alt="Go next arrow icon" />
      </Link>
    </div>
  </div>
);
