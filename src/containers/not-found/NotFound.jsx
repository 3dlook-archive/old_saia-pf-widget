import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { connect } from 'preact-redux';

import { gaSizeNotFound } from '../../ga';
import actions from '../../store/actions';
import FlowService from '../../services/flowService';

const confusedIcon1x = require('../../images/confused.png');
const confusedIcon2x = require('../../images/confused@2x.png');

/**
 * Size not found page component
 */
class NotFound extends Component {
  componentDidMount() {
    gaSizeNotFound();

    const {
      addFrontImage,
      addSideImage,
      token,
      setFlowId,
    } = this.props;

    addFrontImage(null);
    addSideImage(null);

    this.flow = new FlowService(token);
    this.flow.create({
      status: 'created',
    })
      .then((res) => {
        setFlowId(res);
      })
      .catch(err => alert(err.message));
  }

  render() {
    return (
      <section className="screen active">
        <div className="screen__content not-found">
          <h2 className="screen__subtitle">
            <span className="failure">Error</span>
          </h2>

          <h3 className="screen__title not-found__title">Oops!</h3>
          <p className="not-found__text">
            Something went wrong
          </p>

          <img className="not-found__image" src={confusedIcon1x} srcSet={`${confusedIcon1x} 1x, ${confusedIcon2x} 2x`} alt="not found" />

          <p className="not-found__text-2">
            {'We '}
            <span>can’t find your Perfect Fit</span>
            {' for this item. Please '}
            <br />
            try out other items.
          </p>
        </div>
        <div className="screen__footer">
          <Link className="button" href="/upload">ok</Link>
        </div>
      </section>
    );
  }
}

export default connect(state => state, actions)(NotFound);
