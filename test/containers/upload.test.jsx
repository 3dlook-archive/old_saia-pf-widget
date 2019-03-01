/* eslint-disable */
import { h, render } from 'preact';
import sinon from 'sinon';
import { route, Router } from 'preact-router';
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';
import App from '../../src/App';
import { Upload } from '../../src/containers/upload/Upload';
import { sleep, dispatchEvent } from '../test-utils';

chai.use(assertJsx);

window.API_HOST = 'https://saia-test.3dlook.me/api/v2/';
window.API_KEY = 'uweh721gt7723trv';

describe('Upload', () => {
  let scratch;
  let mount;
  let component = null;

  before(() => {
    scratch = document.createElement('div');
    (document.body || document.documentElement).appendChild(scratch);
  });

  beforeEach(() => {
    scratch.innerHTML = '';

    render(<Router>
      <Upload path="/upload" ref={(ref) => component = ref} />
    </Router>, scratch);

    route('/upload');
  });

  after(() => {
    scratch.parentNode.removeChild(scratch);
    scratch = null;
  });

  it('should render Upload component', () => {
    expect(scratch.innerHTML).to.contain('YOU’RE ALMOST THERE');
    expect(scratch.innerHTML).to.contain('Please upload two full body');
    expect(scratch.innerHTML).to.contain('get your size');
  });

  it('should save front image file to state', () => {
    const file = 'fake file';
    component.saveFrontFile({ file });
    expect(component.state.frontImage).to.equal(file);
  });

  it('should save side image file to state', () => {
    const file = 'fake file';
    component.saveSideFile({ file });
    expect(component.state.sideImage).to.equal(file);
  });

  it('should return undefined if there is no frontImage', async () => {
    const r = await component.onNextButtonClick(new Event('click'));
    expect(r).to.be.undefined;
  });

  it('should return undefined if there is no sideImage', async () => {
    const file = 'fake file';
    component.saveSideFile({ file });
    const r = await component.onNextButtonClick(new Event('click'));
    expect(r).to.be.undefined;
  });

});
