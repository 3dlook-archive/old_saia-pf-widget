import { h } from 'preact';
import classNames from 'classnames';

const modalCloseIcon = require('../../images/close-icon.svg');

const Help = ({ close, show }) => (
  <div className={classNames('help', { active: show })}>
    <header className="help__header">
      <button className="help__close" type="button" onClick={close}>
        <img src={modalCloseIcon} alt="Close button icon" />
      </button>
      <h1 className="help__logo">Help</h1>
    </header>
    <div className="help__content">
      <h2>Question 1</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi beatae quae necessitatibus, alias distinctio dolorum, minus cupiditate consequuntur enim error commodi harum nulla optio ullam obcaecati eveniet eaque asperiores sunt!</p>
      <h2>Question 1</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi beatae quae necessitatibus, alias distinctio dolorum, minus cupiditate consequuntur enim error commodi harum nulla optio ullam obcaecati eveniet eaque asperiores sunt!</p>
      <h2>Question 1</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi beatae quae necessitatibus, alias distinctio dolorum, minus cupiditate consequuntur enim error commodi harum nulla optio ullam obcaecati eveniet eaque asperiores sunt!</p>
      <h2>Question 1</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi beatae quae necessitatibus, alias distinctio dolorum, minus cupiditate consequuntur enim error commodi harum nulla optio ullam obcaecati eveniet eaque asperiores sunt!</p>
      <h2>Question 1</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi beatae quae necessitatibus, alias distinctio dolorum, minus cupiditate consequuntur enim error commodi harum nulla optio ullam obcaecati eveniet eaque asperiores sunt!</p>
      <h2>Question 1</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi beatae quae necessitatibus, alias distinctio dolorum, minus cupiditate consequuntur enim error commodi harum nulla optio ullam obcaecati eveniet eaque asperiores sunt!</p>
      <h2>Question 1</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi beatae quae necessitatibus, alias distinctio dolorum, minus cupiditate consequuntur enim error commodi harum nulla optio ullam obcaecati eveniet eaque asperiores sunt!</p>
    </div>
  </div>
);

export default Help;
