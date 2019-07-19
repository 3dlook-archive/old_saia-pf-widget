import { h, Component } from 'preact';
import { route, Link } from 'preact-router';
import { connect } from 'preact-redux';

import { objectToUrlParams } from '../../utils';
import actions from '../../store/actions';
import ImageExample from '../../components/image-example/ImageExample';

const hmmIcon1x = require('../../images/hmm.png');
const hmmIcon2x = require('../../images/hmm@2x.png');

/**
 * Soft validation page component
 */
class SoftValidation extends Component {
  back = () => {
    const { matches } = this.props;

    const params = {
      ...matches,
    };
    route(`/upload?${objectToUrlParams(params)}`, true);
  }

  render() {
    return (
      <div className="screen active">
        <div className="screen__content soft-validation">
          <h2 className="screen__subtitle">
            <span className="warning">Warning</span>
          </h2>

          <h3 className="screen__title soft-validation__title">Huh…</h3>
          <p className="soft-validation__text">
            Good job, but for a better result we suggest
            <br />
            you to redo the side photo
          </p>

          <img className="soft-validation__image" src={hmmIcon1x} srcSet={`${hmmIcon1x} 1x, ${hmmIcon2x} 2x`} alt="Soft validation errors" />

          <h4 className="soft-validation__title-2">
            Just follow these
            <br />
            recommendations:
          </h4>

          <ol className="soft-validation__recommendations">
            <li>Make sure your feet are shoulder width apart.</li>
            <li>
              Keep your hands at waist level.

              <ImageExample />
            </li>
            <li>
              Keep your hands at waist level.

              <ImageExample type="side" />
            </li>
            <li>
              Keep your hands at waist level.

              <ImageExample />
            </li>
            <li>
              Keep your hands at waist level.

              <ImageExample />
            </li>
          </ol>

        </div>
        <div className="screen__footer soft-validation__footer">
          <Link className="button button--outline" href="/results"><span>Continue</span></Link>
          <button className="button" onClick={this.back} type="button">Retake photo</button>
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)(SoftValidation);
