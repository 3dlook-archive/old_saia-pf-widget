import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { route } from 'preact-router';

import { isMobileDevice, parseGetParams } from '../../utils';
import { gaSwitchToMobileFlow } from '../../ga';
import actions from '../../store/actions';
import FlowService from '../../services/flowService';

/**
 * Mobile flow page component
 */
class MobileFlow extends Component {
  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  componentDidMount = async () => {
    gaSwitchToMobileFlow();

    const {
      setFlowId,
      setBrand,
      setBodyPart,
      setProductUrl,
      setToken,
      setIsMobile,
      matches,
      addHeight,
      addGender,
      addFrontImage,
      addSideImage,
      setPersonId,
      setIsFromDesktopToMobile,
      setReturnUrl,
      setRecommendations,
    } = this.props;

    const token = matches.key || API_KEY || parseGetParams().key;

    this.flow = new FlowService(token);
    setFlowId(matches.id);
    this.flow.setFlowId(matches.id);

    const flowState = await this.flow.get();

    if (flowState.state.status !== 'finished') {
      await this.flow.updateState({
        ...flowState.state,
        status: 'opened-on-mobile',
      });
    }

    setToken(token);
    setPersonId(flowState.person);
    setBrand(flowState.state.brand);
    setBodyPart(flowState.state.bodyPart);
    setProductUrl(flowState.state.productUrl);
    setIsMobile(isMobileDevice());
    addHeight(flowState.state.height);
    addGender(flowState.state.gender);
    addFrontImage(flowState.state.frontImage);
    addSideImage(flowState.state.sideImage);
    setIsFromDesktopToMobile(true);
    setReturnUrl(flowState.state.returnUrl);
    setRecommendations(flowState.state.recommendations);

    if (flowState.state.status === 'finished') {
      route('/results', true);
    } else {
      route('/tutorial', true);
    }
  }

  render() {
    return (
      <div />
    );
  }
}

export default connect(state => state, actions)(MobileFlow);
