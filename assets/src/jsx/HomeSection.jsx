import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

import { Row, Col } from './Grid.jsx';

import style from '../sass/home.scss'

const mapStateToProps = (state, ownProps) => {
	return {
		currentDate: state.calendar.currentDate,
		eventList: state.events.eventList,
		noteList: state.notes.noteList
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		// selectDate: (date) => {
		// 	dispatch(selectDate(date))
		// }
	}
}

class HomeSection extends Component {
	static propTypes = {
		className: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			 <div className='home'>
			 	<Row>
			 		<Col size={6}>
						<Events eventList={this.props.eventList} />			 			
			 		</Col>
			 		<Col size={6}>
			 			<Notes noteList={this.props.noteList} />
			 		</Col>
			 	</Row>
			 </div>
		 );
	}
}

class Notes extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		let itensList = [];
		let count = 0;

		while(itensList.length < 4 && itensList.length < this.props.noteList.length) {
			itensList.push(
				<ListItem 
					key={this.props.noteList[count].id}
					primaryText={this.props.noteList[count].description.length < 200 ? this.props.noteList[count].description : this.props.noteList[count].description.substr(0, 200) + '...'}
			    />
			);
			count++;
		}

		if(this.props.noteList.length > itensList.length) {
			itensList.push(<MoreItens key={itensList.length} />);
		}

		return (
			<List className='notes'>
				<Subheader>Lembretes</Subheader>
				{itensList}
			</List>
		);
	}
}

class Events extends Component {
	constructor(props) {
		super(props);
		this.monthList = ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	}

	render() {

		let itensList = [];
		let item = null;
		let count = 0;

		while(itensList.length < 4 && itensList.length < this.props.eventList.length) {
			item = this.props.eventList[count];
			itensList.push(
				<ListItem 
					key={this.props.eventList[count].id}
					leftAvatar={
						<div className='when-avatar'>
							<p>
								{item.date.getDate()}
							</p>
							<p>
								{this.monthList[item.date.getMonth()]}
							</p>
						</div>
					}
					primaryText={item.name.length < 40 ? item.name : item.name.substr(0, 40) + '...'}
			   		secondaryText={item.description.length < 100 ? item.description : item.description.substr(0, 100) + '...'}
		   		/>
		   	);

			count++;
		}

		if(this.props.eventList.length > itensList.length) {
			itensList.push(<MoreItens key={itensList.length} />);
		}

		return (
			<List className='next-events'>
				<Subheader>Próximos eventos</Subheader>
	 			{itensList}
	 		</List>
		);
	}
}

class MoreItens extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='more-button'>
				<FlatButton label='Ver todos' />
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeSection)