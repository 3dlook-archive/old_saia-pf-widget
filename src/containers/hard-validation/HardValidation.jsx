import { h, Component } from 'preact';
import { route, Link } from 'preact-router';
import { connect } from 'preact-redux';

import { objectToUrlParams } from '../../utils';
import actions from '../../store/actions';
import ImageExample from '../../components/image-example/ImageExample';

const cryingIcon1x = require('../../images/crying.png');
const cryingIcon2x = require('../../images/crying@2x.png');

/**
 * Hard validation page component
 */
class HardValidation extends Component {
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
        <div className="screen__content hard-validation">
          <h2 className="screen__subtitle">
            <span className="failure">Error</span>
          </h2>

          <h3 className="screen__title hard-validation__title">Oops!</h3>
          <p className="hard-validation__text">
            We couldn’t detect your body
          </p>

          <img className="hard-validation__image" src={cryingIcon1x} srcSet={`${cryingIcon1x} 1x, ${cryingIcon2x} 2x`} alt="hard validation errors" />

          <h4 className="hard-validation__title-2">
            Just follow these
            <br />
            recommendations:
          </h4>

          <ol className="hard-validation__recommendations">
            <li>Make sure your feet are shoulder width apart.</li>
            <li>
              Keep your hands at waist level.

              <ImageExample />
            </li>
            <li>
              Keep your hands at waist level.

              <ImageExample />
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
        <div className="screen__footer hard-validation__footer">
          <Link className="button" href="/upload"><span>Retake photo</span></Link>
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)(HardValidation);
