require('../scss/widget.scss');

import { h, render, Component } from 'preact';

class Clock extends Component {
	render() {
		let time = new Date();
		return <time datetime={time.toISOString()}>{ time.toLocaleTimeString() }</time>;
	}
}

// render an instance of Clock into <body>:
render(<Clock />, document.body);

console.log('ok');
console.log(API_HOST);
