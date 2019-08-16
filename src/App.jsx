import { h, render, Component } from 'preact';
import Router from 'preact-router';
import { createHashHistory } from 'history';
import { Provider } from 'preact-redux';
import store from './store';
import { gaStart } from './ga';

/**
 * Components
 */
import Header from './components/header/Header';

/**
 * Containers
 */
import Welcome from './containers/welcome/Welcome';
import Upload from './containers/upload/Upload';
import Tutorial from './containers/tutorial/Tutorial';
import Data from './containers/data/Data';
import Results from './containers/results/Results';
import Help from './components/help/Help';
import SoftValidation from './containers/soft-validation/SoftValidation';
import HardValidation from './containers/hard-validation/HardValidation';
import NotFound from './containers/not-found/NotFound';
import MobileFlow from './containers/mobile-flow/MobileFlow';

require('./scss/widget.scss');

class App extends Component {
  constructor(props) {
    super(props);

    gaStart();

    this.state = {
      isHelpActive: false,
    };
  }

  /**
   * Toggle Help component visibility
   */
  toggleHelp = () => {
    const { isHelpActive } = this.state;

    this.setState({
      isHelpActive: !isHelpActive,
    });
  }

  render() {
    const {
      isHelpActive,
    } = this.state;
    return (
      <Provider store={store}>
        <div className="widget-container">
          <Header help={this.toggleHelp} />
          <Help show={isHelpActive} close={this.toggleHelp} />

          <Router history={createHashHistory()}>
            <Welcome path="/" />
            <Data path="/data" />
            <Upload path="/upload" />
            <Tutorial path="/tutorial" />
            <SoftValidation path="/soft-validation" />
            <HardValidation path="/hard-validation" />
            <NotFound path="/not-found" />
            <Results path="/results" />
            <MobileFlow path="/mobile/:id" />
          </Router>
        </div>
      </Provider>
    );
  }
}

render(<App />, document.body);

export default App;
