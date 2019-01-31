import { h, render, Component } from 'preact';
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

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frontImage: null,
      sideImage: null,
      height: null,
      gender: null,
    };
  }

  /**
   * Save data from Data component to the state
   *
   * @param {Object} data - data from Data component
   * @param {string} data.gender - gender
   * @param {string} data.height - height
   */
  onData = (data) => {
    this.setState({
      ...this.state,
      ...data,
    })
  }

  onGetImages = () => {

  }

  render() {
    return (
      <div className="widget-container">
        <Header />

        <Router>
          <Welcome path="/" />
          <Tips path="/tips" />
          <Data path="/data" getData={this.onData} />
          <Upload path="/upload" getImages={this.onGetImages} />
          <Results path="/results" />
        </Router>
      </div>
    );
  }
}

render(<Main />, document.body);
