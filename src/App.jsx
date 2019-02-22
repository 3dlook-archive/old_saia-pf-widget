import { h, render, Component } from 'preact';
import Router from 'preact-router';

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

  render() {
    return (
      <div className="widget-container">
        <Header help={this.toggleHelp} />
        <Help show={this.state.isHelpActive} close={this.toggleHelp} />

        <Router>
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
