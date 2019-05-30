import { h, render, Component } from 'preact';
import Router from 'preact-router';
import { createHashHistory } from 'history';

/**
 * Components
 */
import { Header } from './components/header/Header';

/**
 * Containers
 */
import Welcome from './containers/welcome/Welcome';
import Tips from './containers/tips/Tips';
import { Upload } from './containers/upload/Upload';
import { Data } from './containers/data/Data';
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
    this.setState({
      isHelpActive: !this.state.isHelpActive,
    });
  }

  /**
   * Show or hide logo in header
   */
  showHideLogo = (e) => {
    if (e.url === '/' || e.url === '/?') {
      return this.setState({
        ...this.state,
        isLogoActive: false,
      });
    }

    return this.setState({
      ...this.state,
      isLogoActive: true,
    });
  }

  render() {
    return (
      <div className="widget-container">
        <Header help={this.toggleHelp} isLogoActive={this.state.isLogoActive} />
        <Help show={this.state.isHelpActive} close={this.toggleHelp} />

        <Router history={createHashHistory()} onChange={this.showHideLogo}>
          <Welcome path="/" />
          <Tips path="/tips" />
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
