import React, { Component, PropTypes } from 'react';
import {Divider, IconButton, TextField, Paper, FlatButton, RaisedButton, RefreshIndicator} from "material-ui";

import style from "./style.scss";

class InitialSection extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{"backgroundColor": "black", "opacity": "0.6", "width": "100%", "height": "100%", "position": "absolute"}}>
				<div className="image-background">
					<div className="center-block">
						<p>Disponível em breve</p>
						<h1>Web-mqweqwsrket</h1>
						<Divider style={{"marginTop": "30px"}} />
						<div className="search-input">
							<Paper zDepth={5} >
								<TextField style={{"paddingLeft": "50px"}} fullWidth={true} disabled={false} hintText="Encontrar mercados" name="search" underlineShow={false} />
							</Paper>
							<RaisedButton type="submit" style={{"cursor": "pointer", "position": "relative", "top": "-42px", "right": "-300px"}} label="Buscar" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default InitialSection;
