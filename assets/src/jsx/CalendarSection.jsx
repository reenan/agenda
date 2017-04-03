import React, { Component, PropTypes } from 'react';
import Calendar from 'material-ui/DatePicker/Calendar';
import { connect } from 'react-redux'


import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import { Scrollbars } from 'react-custom-scrollbars';
import Icon from './Icon.jsx';

import { Row, Col } from './Grid.jsx';

import style from '../sass/calendar.scss';

import { selectDate } from '../flux/actions/index.js';

const mapStateToProps = (state, ownProps) => {
	return {
		currentDate: state.calendar.currentDate,
		eventList: state.events.eventList
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		selectDate: (date) => {
			dispatch(selectDate(date))
		}
	}
}

class CalendarEdited extends Component {
		static propTypes = {
				className: PropTypes.string,
		};

		constructor(props) {
				super(props);
		}

		onChange = (pass, date) => {
			this.props.selectDate(date);
		}

		render() {
				return (
					<div>
						<Row>
							<Col size={8}>
								<Events eventList={this.props.eventList} />
							</Col>
							<Col size={4} className='calendar-wrapper'>
								<Calendar onTouchTapDay={this.onChange} firstDayOfWeek={1} />
							</Col>
						</Row>
					</div>
				);
		}
}

class Events extends Component {
	constructor(props) {
		super(props);
		this.monthList = ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		this.state = {
			currentOpenModal: null
		}
	}


	closeModal = () => {
		this.setState({
			currentOpenModal: null
		});
	}


	openModal = (id) => {
		this.setState({
			currentOpenModal: id
		});
	}

	render() {

		let itensList = [];
		let item = null;
		let count = 0;

		while(itensList.length < this.props.eventList.length) {
			item = this.props.eventList[count];
			itensList.push(
				[
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
				   		onClick={this.openModal.bind(this, item.id)}
			   		/>,
			   		<EventModal
			   			key={'modal-' + this.props.eventList[count].id}
			   			item={item}
			   			open={this.state.currentOpenModal == item.id}
			   			onClose={this.closeModal}
			   		/>
		   	]
		   	);
			count++;
		}

		return (
			<List className='events'>
				<Subheader>Eventos</Subheader>
				<Scrollbars style={{ width: '100%', height: 300 }}>
					<div className='event-list'>
	 					{itensList}
	 				</div>
	 			</Scrollbars>
	 		</List>
		);
	}
}

class EventModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showDeleteModalConfirm: false,
			showEditModal: false
		}
	}

	openEdit = () => {
		this.setState({
			showEditModal: true
		});
	}

	closeEdit = () => {
		this.setState({
			showEditModal: false
		})
	}

	requestDelete = () => {
		this.setState({
			showDeleteModalConfirm: true
		});
	}

	cancelDelete = () => {
		this.setState({
			showDeleteModalConfirm: false
		})
	}

	render() {
		const actions = [
			<div className='modal-action-buttons'>
				<FlatButton
					className='float-button'
					label="Excluir"
					secondary={true}
					keyboardFocused={false}
					onTouchTap={this.requestDelete}
				/>
				<FlatButton
					className='float-button'
					label="Editar"
					primary={true}
					keyboardFocused={false}
					onTouchTap={this.openEdit}
				/>
				<FlatButton
					label="Ok"
					primary={true}
					keyboardFocused={false}
					onTouchTap={this.props.onClose}
				/>
			</div>
		];
			
		const editActions = [
			<div className='modal-action-buttons'>
				<FlatButton
					label="Cancelar"
					primary={true}
					keyboardFocused={false}
					onTouchTap={this.closeEdit}
				/>
				<FlatButton
					label="Salvar"
					primary={true}
					keyboardFocused={false}
					onTouchTap={this.closeEdit}
				/>
			</div>
		];

		const deleteActions = [
			<div className='modal-action-buttons'>
					<FlatButton
						label="Excluir"
						secondary={true}
						keyboardFocused={false}
						onTouchTap={this.cancelDelete}
					/>
					<FlatButton
						label="Cancelar"
						primary={true}
						keyboardFocused={false}
						onTouchTap={this.cancelDelete}
					/>
			</div>
		];
		return (
				<Dialog
					title={this.props.item.name}
					actions={actions}
					modal={false}
					open={this.props.open}
					onRequestClose={this.props.onClose}
				>
					<p>{this.props.item.description}</p>
					<br />
					<br />
					<p>{this.props.item.date.toString()} - {this.props.item.hour}</p>

					<Dialog
						title={'Confirmar exclusão'}
						actions={deleteActions}
						modal={false}
						open={this.state.showDeleteModalConfirm}
						onRequestClose={this.cancelDelete}
						contentStyle={{width: '450px'}}
					>
						<p>Você tem certeza que deseja excluir essa evento?</p>
						<p>Essa ação é irreversível.</p> 
					</Dialog>

					<Dialog
						title={this.props.item.name}
						actions={editActions}
						modal={false}
						open={this.state.showEditModal}
						onRequestClose={this.closeEdit}
					>
						<TextField
							hintText="Descrição"
							floatingLabelText="Descrição"
							multiLine={true}
							fullWidth={true}
							value={this.props.item.description}
						/>
						<DatePicker label="Data" hintText="Data" />
					</Dialog>
				</Dialog>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CalendarEdited)
