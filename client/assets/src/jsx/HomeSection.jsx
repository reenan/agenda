import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Avatar from 'material-ui/Avatar';
import Snackbar from 'material-ui/Snackbar';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';

import { Events } from './EventSection.jsx';


//import { Row, Col } from './Grid.jsx';
import { Grid, Row, Col } from 'react-bootstrap';


import { saveEvent, deleteEvent } from '../flux/actions/index.js';

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
		saveEvent: (item) => {
			dispatch(saveEvent(item))
		},

		deleteEvent: (id) => {
			dispatch(deleteEvent(id));
		}
	}
}

class HomeSection extends Component {
	static propTypes = {
		className: PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.state = {
			snackbarText: '',
			isOpenSnackbar: false,
			isOpenAllEvents: false
		}
	}

	deleteEvent = (id) => {
		this.props.deleteEvent(id);
	}

	saveEvent = (item) => {
		this.setState({
			isOpenSnackbar: true,
			snackbarText: 'Evento salvo com sucesso'
		}, this.props.saveEvent(item))
	}

	closeSnackbar = () => {
		this.setState({
			isOpenSnackbar: false,
			snackbarText: ''
		});
	}

	closeAllEvents = () => {
		this.setState({
			isOpenAllEvents: false
		});
	}

	openAllEvents = () => {
		this.setState({
			isOpenAllEvents: true
		});
	}

	render() {
		return (
			 <div className='home'>
			 	<Grid fluid={true}>
			 		<Row>
				 		<Col md={6} xs={12}>
							<NextEvents closeAllEvents={this.closeAllEvents} isOpenAllEvents={this.state.isOpenAllEvents} openAllEvents={this.openAllEvents} eventList={this.props.eventList} deleteEvent={this.deleteEvent} saveEvent={this.saveEvent} />
				 		</Col>
				 		<Col md={6} xs={12}>
				 			<Notes noteList={this.props.noteList} />
				 		</Col>
				 	</Row>
			 	</Grid>
			 	<Snackbar autoHideDuration={3000} message={this.state.snackbarText} open={this.state.isOpenSnackbar} onRequestClose={this.closeSnackbar} />
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

class NextEvents extends Component {
	constructor(props) {
		super(props);
		this.monthList = ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	}

	render() {

		let itensList = [];
		let item = null;
		let count = 0;

		const actions = [
			<div className='modal-action-buttons'>
				<FlatButton
					label="Cancelar"
					primary={true}
					keyboardFocused={false}
					onTouchTap={this.props.closeAllEvents}
				/>
			</div>
		];

		while(itensList.length < 4 && itensList.length < this.props.eventList.length) {
			item = this.props.eventList[count];
			itensList.push(
				<div key={this.props.eventList[count].id}>
					<Card className='card'>
						<CardHeader
							title={item.name.length < 35 ? item.name : item.name.substr(0, 32) + '...'}
							subtitleStyle={{marginTop: "5px"}}
							subtitle={item.date.getDate() + ' ' + this.monthList[item.date.getMonth()]}
							actAsExpander={true}
							showExpandableButton={true}
						/>
						<CardText expandable={true} className='description'>
							{item.description}
						</CardText>
					</Card>
				</div>
		   	);

			count++;
		}

		if(this.props.eventList.length > itensList.length) {
			itensList.push(<MoreItens onClick={this.props.openAllEvents} key={this.props.eventList[itensList.length - 1].id + 1} />);
		}

		return (
			<div className='next-events'>
				<Subheader>Próximos eventos</Subheader>
	 			{itensList}
	 			<Dialog
					modal={false}
					open={this.props.isOpenAllEvents}
					onRequestClose={this.props.closeAllEvents}
				>
	 				<Events showCancel={true} onClose={this.props.closeAllEvents} deleteEvent={this.props.deleteEvent} saveEvent={this.props.saveEvent} eventList={this.props.eventList} />
	 			</Dialog>
	 		</div>
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
				<FlatButton onTouchTap={this.props.onClick} label='Ver todos' />
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeSection)