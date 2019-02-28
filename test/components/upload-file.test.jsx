/* eslint-disable */
import { h, render } from 'preact';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';
import { UploadFile } from '../../src/components/upload-file/UploadFile';
import { sleep, keyboardEvent } from '../test-utils';

chai.use(assertJsx);

describe('UploadFile', () => {
  let scratch;

  before(() => {
    scratch = document.createElement('div');
    (document.body || document.documentElement).appendChild(scratch);
  });

  beforeEach(() => {
    scratch.innerHTML = '';
  });

  after(() => {
    scratch.parentNode.removeChild(scratch);
    scratch = null;
  });

  it('should render UploadFile', () => {
    render(<UploadFile gender={'male'} isValid={true} type={'front'} />, scratch);

    expect(scratch.innerHTML).to.contain('upload__file');
    expect(scratch.innerHTML).to.contain('upload__file-select-text');
    expect(scratch.innerHTML).to.contain('select file');
    expect(scratch.innerHTML).to.contain('front-male');
  });

  it('should display front-male.svg for gender===male and type===front', () => {
    render(<UploadFile gender={'male'} isValid={true} type={'front'} />, scratch);

    expect(scratch.innerHTML).to.contain('front-male');
  });

  it('should display side-male.svg for gender===male and type===side', () => {
    render(<UploadFile gender={'male'} isValid={true} type={'side'} />, scratch);

    expect(scratch.innerHTML).to.contain('side-male');
  });

  it('should display front-female.svg for gender===female and type===front', () => {
    render(<UploadFile gender={'female'} isValid={true} type={'front'} />, scratch);

    expect(scratch.innerHTML).to.contain('front-female');
  });

  it('should display side-female.svg for gender===female and type===side', () => {
    render(<UploadFile gender={'female'} isValid={true} type={'side'} />, scratch);

    expect(scratch.innerHTML).to.contain('side-female');
  });

  it('should display placeholder image when mode===placeholder', async () => {
    let component = null;

    render(<UploadFile ref={(ref) => component = ref} gender={'female'} isValid={true} type={'side'} />, scratch);

    component.setState({
      ...component.state,
      mode: 'placeholder',
    });

    await sleep(1);

    const c = scratch.querySelector('.upload__file-image.upload__file-image--placeholder.active');

    expect(c).to.be.ok;
  });

  it('should display placeholder image when mode===preview', async () => {
    let component = null;

    render(<UploadFile ref={(ref) => component = ref} gender={'female'} isValid={true} type={'side'} />, scratch);

    component.setState({
      ...component.state,
      mode: 'preview',
    });

    await sleep(1);

    const c = scratch.querySelector('.upload__file-image.upload__file-image--preview.active');

    expect(c).to.be.ok;
  });

  it('should call keyboardAccess on space', () => {
    render(<UploadFile gender={'female'} isValid={true} type={'side'} />, scratch);

    const c = scratch.querySelector('.upload__file');

    keyboardEvent(c, 'keypress', {
      char: 'enter',
      key: 'enter',
      keyCode: 32,
    });

    expect(c).to.be.ok;
  });

  it('should call keyboardAccess on enter', () => {
    render(<UploadFile gender={'female'} isValid={true} type={'side'} />, scratch);

    const c = scratch.querySelector('.upload__file');

    keyboardEvent(c, 'keypress', {
      char: 'enter',
      key: 'enter',
      keyCode: 13,
    });

    expect(c).to.be.ok;
  });

});
