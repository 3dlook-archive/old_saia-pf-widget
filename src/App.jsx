import { h, render } from 'preact';
import Router from 'preact-router';
import { Link } from 'preact-router/match';

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

const Main = () => (
  <div className="widget-container">
    <Header />

    <Router>
      <Welcome path="/" />
      <Tips path="/tips" />
      <Upload path="/upload" />
      <Data path="/data" />
      <Results path="/results" />
    </Router>
  </div>
);

render(<Main />, document.body);
