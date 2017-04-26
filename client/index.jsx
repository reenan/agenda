import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider } from 'material-ui';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import normalize from 'normalize.css'; 

import Structure from './assets/src/jsx/Structure.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
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

export default Component;

render(
	<Provider store={store}>
		<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('app')
);