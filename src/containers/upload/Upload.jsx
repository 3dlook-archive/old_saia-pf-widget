import { h, Component } from 'preact';
import { Link } from 'preact-router';

import { UploadBlock } from '../../components/upload-block/UploadBlock';

// assets
const nextArrowIcon = require('../../images/arrow.svg');

export class Upload extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="screen screen--upload active">
        <div class="screen__content upload">
          <h2 class="screen__title">upload photos</h2>
          <p class="screen__text">Please upload two full body <br />photos of yourself:</p>

          <div class="upload__files">
            <UploadBlock type="front" />
            <UploadBlock type="side" />
          </div>

          <Link class="button" href="/data" disabled>
            Next step
            <img class="button__icon" src={nextArrowIcon} alt="Go next arrow icon" />
          </Link>
        </div>
      </div>
    );
  }
}
