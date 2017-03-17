import React, { Component } from 'react';

import style from './style.scss';

export class Grid extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		gutter: React.PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
		className: React.PropTypes.string,
		style: React.PropTypes.object
	};

	static defaultProps = {
		gutter: 's',
		className: '',
		style: {}
	};

	render() {
		return (
			<div className={'grid gutter-' + this.props.gutter + (this.props.className != '' && typeof this.props.className != 'undefined' ? ' ' + this.props.className : '')} style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
}

export class Col extends Component {
	constructor(props) {
		super(props);

		let { l, m, s, xs } = this.props;

		if(!!l && !!m && !!s && !!xs) {
			//throw error;
		}
	}

	static propTypes = {
		l: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
		m: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
		s: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
		xs: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
		
		className: React.PropTypes.string,
		style: React.PropTypes.object
	};

	static defaultProps = {
		className: '',
		style: {}
	};

	render() {
		let { l, m, s, xs } = this.props;
		let gridClass = "";

		if(l) {
			gridClass += " l-" + l;
		}

		if(m) {
			gridClass += " m-" + m;
		}

		if(s) {
			gridClass += " s-" + s;
		}

		if(xs) {
			gridClass += " xs-" + xs;
		}



		return (
			<div className={'column' + gridClass + (this.props.className != '' && typeof this.props.className != 'undefined' ? ' ' + this.props.className : '')} style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
}