import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import Toggle from 'material-ui/Toggle';

import { addAlarm } from '../flux/actions/index.js';

import style from '../sass/alarms.scss';

const mapStateToProps = (state, ownProps) => {
	console.log(state, ownProps);
	return {
		list: state.alarm.list
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		addAlarm: () => {
			dispatch(addAlarm())
		}
	}
}

class Alarm extends Component {
	static propTypes = {
		className: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	addAlarm = () => {
		this.props.addAlarm();
	}

	render() {
		return (
			<div>
				<AlarmList list={this.props.list} />
			</div>
			);
	}
}

class AlarmList extends Component {
	static propTypes = {
		list: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ul className='alarm-list'>
			{
				this.props.list.map((item, index) => {
					return <AlarmItem item={item} key={item.id} />
				})
			}
			</ul>
			);
	}
}

class AlarmItem extends Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
	}

	render() {
		let item = this.props.item;
		return (
			<li className='alarm-item'>
				<span className='hour'>{item.hour}</span>
				<span className='date'>{item.date}</span>
				{
					item.name != '' ? <span className='name'>{item.name}</span> : null
				}
				<div className='toggle-wrapper'>
					<Toggle />
				</div>
			</li>
		);
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Alarm)