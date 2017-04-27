import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Icon from './Icon.jsx';

class EmptyList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Paper className='empty-list' zDepth={2}>
				<div>
					<Icon icon='info' />
					<p>{this.props.text}</p>
				</div>
			</Paper>
		);
	}
}

export default EmptyList;
