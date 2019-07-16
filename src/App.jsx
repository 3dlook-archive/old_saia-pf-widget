import { h, render, Component } from 'preact';
import Router from 'preact-router';
import { createHashHistory } from 'history';

/**
 * Components
 */
import Header from './components/header/Header';

/**
 * Containers
 */
import Welcome from './containers/welcome/Welcome';
import { Upload } from './containers/upload/Upload';
import Data from './containers/data/Data';
import Results from './containers/results/Results';
import Help from './components/help/Help';

require('./scss/widget.scss');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHelpActive: false,
      isLogoActive: false,
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
    const { isLogoActive, isHelpActive } = this.state;
    return (
      <div className="widget-container">
        <Header help={this.toggleHelp} isLogoActive={isLogoActive} />
        <Help show={isHelpActive} close={this.toggleHelp} />

        <Router history={createHashHistory()}>
          <Welcome path="/" />
          <Data path="/data" />
          <Upload path="/upload" />
          <Results path="/results" />
        </Router>
      </div>
    );
  }
}

render(<App />, document.body);

export default App;
