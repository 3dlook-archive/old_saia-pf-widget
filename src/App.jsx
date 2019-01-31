import { h, render, Component } from 'preact';
import Router from 'preact-router';

/**
 * Components
 */
import { Header } from './components/header/Header';

/**
 * Containers
 */
import { Welcome } from './containers/welcome/Welcome';
import { Tips } from './containers/tips/Tips';
import { Upload } from './containers/upload/Upload';
import { Data } from './containers/data/Data';
import { Results } from './containers/results/Results';

require('./scss/widget.scss');

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="widget-container">
        <Header />

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

render(<Main />, document.body);
