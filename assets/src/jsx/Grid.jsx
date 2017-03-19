import React, { Component } from "react";

import style from '../sass/grid.scss';

export class Row extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		gutter: React.PropTypes.oneOf(['no-gutter', 'xs', 's', 'm', 'l', 'xl']),
		className: React.PropTypes.string,
		style: React.PropTypes.object
	};

	static defaultProps = {
		gutter: "s",
		className: "",
		style: {}
	};

	render() {
		return (
			<div className={"row gutter-" + this.props.gutter + (this.props.className != "" && typeof this.props.className != "undefined" ? " " + this.props.className : "")} style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
}

export class Col extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		size: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).isRequired,
		className: React.PropTypes.string,
		style: React.PropTypes.object
	};

	static defaultProps = {
		className: "",
		style: {}
	};

	render() {
		return (
			<div className={"column size-" + this.props.size + (this.props.className != "" && typeof this.props.className != "undefined" ? " " + this.props.className : "")} style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
}