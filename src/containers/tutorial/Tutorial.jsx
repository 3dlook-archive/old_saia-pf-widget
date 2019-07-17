import { h, Component } from 'preact';
import { route } from 'preact-router';

import { objectToUrlParams } from '../../utils';

/**
 * Tutorial video page component
 */
export default class Tutorial extends Component {
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
        <div className="screen__content tutorial">
          <h2 className="screen__subtitle">
            <span className="success">STEP 1</span>
            <span className="screen__subtitle-separ success" />
            <span className="success">STEP 2</span>
          </h2>

          <h3 className="screen__title tutorial__title">how to take photos</h3>

          <div className="tutorial__video-wrapper">
            <iframe
              className="tutorial__video"
              type="text/html"
              width="640"
              height="360"
              title="tutorial video"
              src={`http://www.youtube.com/embed/A5qNbGlROgg?autoplay=1&origin=${window.location.origin}&enablejsapi=1&rel=0&showinfo=0&autohide=1`}
              frameBorder="0"
            />
          </div>

        </div>
        <div className="screen__footer">
          <button className="button" onClick={this.back} type="button">Back</button>
        </div>
      </div>
    );
  }
}
