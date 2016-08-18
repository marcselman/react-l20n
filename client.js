import React from 'react'
import { render } from 'react-dom'
import Entry from './entry'

const rootEl = document.getElementById('app');
render(<Entry />, rootEl);

// Are we in development mode?
if (module.hot) {
	console.info('we\'re hot!');
	// Whenever a new version of App.js is available
	module.hot.accept('./entry', () => {
		console.info('update client');
		// Require the new version and render it instead
		let Next = require('./entry').default;
		render(<Next />, rootEl);
	});
}