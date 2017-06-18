import React, { Component, PropTypes } from 'react';

import { render } from 'react-dom';
import { MuiThemeProvider } from 'material-ui';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import normalize from 'normalize.css'; 

import Structure from './assets/src/jsx/Structure.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
import { Scrollbars } from 'react-custom-scrollbars';

injectTapEventPlugin();

import reducer from './assets/src/flux/reducers/index.js';
let store = createStore(reducer);

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="app-wrapper">
				<Structure />
			</div>
		);
	}
}

render(
	<Provider store={store}>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('app')
);

export default Component;