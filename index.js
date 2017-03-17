import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MenuWrapper from '.\\js\\components\\Menu\\Menu.jsx';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
  			<div className="app-wrapper">
  				<div className="image-background" />
  				<div className="fluid">
  					<MenuWrapper />
  				</div>
  				<div className="container">
	  				<Login />
	  			</div>
  			</div>	
        );
    }
}

ReactDOM.render(
	<MuiThemeProvider>
		<App />
	</MuiThemeProvider>,
	document.getElementById('app')
);