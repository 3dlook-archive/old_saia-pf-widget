/* eslint-disable */
import { h, render } from 'preact';
import { route } from 'preact-router';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import assertJsx from 'preact-jsx-chai';
import { Header } from '../../src/components/header/Header';
import { dispatchEvent } from '../test-utils';

chai.use(assertJsx);

describe('Header', () => {
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

  it('should render header component', () => {
    render(<Header />, scratch);

    expect(scratch.innerHTML).to.contain('Help');
    expect(scratch.innerHTML).to.contain('SAIA Perfect Fit Logo');
    expect(scratch.innerHTML).to.contain('Close button icon');
  });

  it('should call help prop', () => {
    const spy = sinon.spy();

    render(<Header help={spy} />, scratch);

    const button = scratch.querySelector('.header__help');

    dispatchEvent(button, 'click');

    expect(spy.called).to.be.ok;
  });

  it('should call close prop', () => {
    let component = null;
    const spy = sinon.spy();

    render(<Header ref={ref => component = ref} />, scratch);

    component.onCloseButtonClick = spy;
    component.onCloseButtonClick();

    expect(spy.called).to.be.ok;
  });

});
