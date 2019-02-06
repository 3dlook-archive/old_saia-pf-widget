import { h, render } from 'preact';
import Router from 'preact-router';
import createHashHistory from 'history/createHashHistory';

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

require('./scss/widget.scss');

const App = () => (
  <div className="widget-container">
    <Header />

    <Router history={createHashHistory()}>
      <Welcome path="/" />
      <Tips path="/tips" />
      <Data path="/data" />
      <Upload path="/upload" />
      <Results path="/results" />
    </Router>
  </div>
);

render(<App />, document.body);
