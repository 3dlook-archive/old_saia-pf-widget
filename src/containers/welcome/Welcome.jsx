import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { connect } from 'preact-redux';

import Slider from '../../components/slider/Slider';
import { objectToUrlParams, isMobileDevice } from '../../utils';
import { gaWelcomeOnContinue } from '../../ga';
import actions from '../../store/actions';
import FlowService from '../../services/flowService';

// slider images
const slideImage1 = require('../../images/slide1.svg');
const slideImage2 = require('../../images/slide2.svg');
const slideImage3 = require('../../images/slide3.svg');

/**
 * Welcome page component
 */
class Welcome extends Component {
  componentDidMount() {
    const {
      setFlowId,
      setBrand,
      setBodyPart,
      setProductUrl,
      setToken,
      setIsMobile,
      matches,
    } = this.props;

    const token = matches.key || API_KEY;

    setToken(token);
    setBrand(matches.brand);
    setBodyPart(matches.body_part);
    setProductUrl(matches.product);
    setIsMobile(isMobileDevice());

    this.flow = new FlowService(token);
    this.flow.create({
      status: 'created',
      productUrl: matches.product,
      brand: matches.brand,
      bodyPart: matches.body_part,
    })
      .then((res) => {
        setFlowId(res);
      })
      .catch(err => alert(err.message));
  }

  render() {
    return (
      <section className="screen active">
        <div className="screen__content welcome">
          <Slider className="welcome__slider">
            <div>
              <img src={slideImage1} alt="Slide 1" />
              <p className="welcome__slider-text">take two photos</p>
            </div>
            <div>
              <img src={slideImage2} alt="Slide 2" />
              <p className="welcome__slider-text">
                { 'Get personalized size ' }
                <br />
                { ' recommendations' }
              </p>
            </div>
            <div>
              <img src={slideImage3} alt="Slide 3" />
              <p className="welcome__slider-text">
                { 'Shop for apparel ' }
                <br />
                { ' that fits you' }
              </p>
            </div>
          </Slider>
        </div>
        <div className="screen__footer">
          <Link className="button" href="/data" onClick={gaWelcomeOnContinue}>
            <span>Start</span>
          </Link>
        </div>
      </section>
    );
  }
}

export default connect(state => state, actions)(Welcome);
