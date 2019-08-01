import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { connect } from 'preact-redux';

import Slider from '../../components/slider/Slider';
import { isMobileDevice, parseGetParams } from '../../utils';
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
  state = {
    isButtonDisabled: true,
  }

  componentDidMount() {
    const {
      setFlowId,
      setBrand,
      setBodyPart,
      setProductUrl,
      setToken,
      setIsMobile,
      setOrigin,
      matches,
    } = this.props;

    const token = matches.key || API_KEY || parseGetParams().key;

    setToken(token);
    setBrand(matches.brand);
    setBodyPart(matches.body_part);
    setProductUrl(matches.product);
    setOrigin(matches.origin);
    setIsMobile(isMobileDevice());

    this.flow = new FlowService(token);
    this.flow.create({
      status: 'created',
      productUrl: matches.product,
      brand: matches.brand,
      bodyPart: matches.body_part,
      returnUrl: matches.returnUrl,
    })
      .then((res) => {
        setFlowId(res);
        this.setState({
          isButtonDisabled: false,
        });
      })
      .catch(err => alert(err.message));
  }

  render() {
    const { isButtonDisabled } = this.state;

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
          <Link className="button" href="/data" onClick={gaWelcomeOnContinue} disabled={isButtonDisabled}>
            <span>Start</span>
          </Link>
        </div>
      </section>
    );
  }
}

export default connect(state => state, actions)(Welcome);
