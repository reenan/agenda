import React, { Component, PropTypes } from 'react';
import Calendar from 'material-ui/DatePicker/Calendar';
import { connect } from 'react-redux'

import Snackbar from 'material-ui/Snackbar';
import TimePicker from 'material-ui/TimePicker';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import { Scrollbars } from 'react-custom-scrollbars';
import Icon from './Icon.jsx';

import EmptyList from './EmptyList.jsx';

import { Grid, Row, Col } from 'react-bootstrap';


import style from '../sass/event.scss';

import { selectDate, saveEvent, deleteEvent } from '../flux/actions/index.js';

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
		},

		saveEvent: (item) => {
			dispatch(saveEvent(item))
		},

		deleteEvent: (id) => {
			dispatch(deleteEvent(id));
		}
	}
}

class EventSection extends Component {
		static propTypes = {
			className: PropTypes.string,
		};

		constructor(props) {
				super(props);

				this.state = {
					snackbarText: '',
					isOpenSnackbar: false,
					dateToCreate: null
				}
		}

		onSelectDate = (e, date) => {
			this.props.selectDate(date);
		}

		deleteEvent = (id) => {
			this.setState({
				isOpenSnackbar: true,
				snackbarText: 'Evento deletado com sucesso'
			}, this.props.deleteEvent(id))
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

		render() {
				return (
					<div className='event-section'>
						<Grid fluid={true}>
							<Row>
								<Col md={8}>
									<Events dateToCreate={this.props.currentDate} deleteEvent={this.deleteEvent} saveEvent={this.saveEvent} eventList={this.props.eventList} />
								</Col>
								<Col md={4} className='calendar-wrapper'>
									<Calendar onTouchTapDay={this.onSelectDate} firstDayOfWeek={1} />
								</Col>
							</Row>
						</Grid>
						<Snackbar autoHideDuration={3000} message={this.state.snackbarText} open={this.state.isOpenSnackbar} onRequestClose={this.closeSnackbar} />
					</div>
				);
		}
}

class Events extends Component {
	constructor(props) {
		super(props);
		this.monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		this.state = {
			currentOpenModal: null,
			showCreateModal: false,
			dateToCreate: null
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.dateToCreate != prevProps.dateToCreate) {
			this.openEventCreateModal();
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

	deleteEvent = (id) => {
		this.closeModal();
		this.props.deleteEvent(id);
	}

	openEventCreateModal = () => {
		this.setState({
			showCreateModal: true
		});
	}

	closeEventCreateModal = () => {
		this.setState({
			showCreateModal: false
		});
	}

	saveEvent = (item) => {
		this.closeEventCreateModal();
		this.props.saveEvent(item);
	}

	render() {

		let itensList = [];
		let item = null;
		let count = 0;

		while(count < this.props.eventList.length) {
			item = this.props.eventList[count];
			
			if(item == undefined) {
				count++;
				continue;
			}

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
						primaryText={item.name ? <p className='limit-text'>{item.name}</p> : <i>Sem título</i>}
				   		secondaryText={item.description ? item.description : <i>sem descrição</i>}
				   		onClick={this.openModal.bind(this, item.id)}
			   		/>,
			   		<EventModal
			   			key={'modal-' + this.props.eventList[count].id}
			   			item={item}
			   			open={this.state.currentOpenModal == item.id}
			   			onClose={this.closeModal}
			   			deleteEvent={this.props.deleteEvent}
			   			saveEvent={this.props.saveEvent}
			   		/>
		   	]
		   	);
			count++;
		}

		return (
			<List className='events'>
				<div>
					{
						itensList.length > 0 ?
							<Scrollbars style={{height: (itensList.length * 80) + 'px'}} className='event-list-scroll'>
								<div className='event-list'>
									{itensList}
				 				</div>
				 			</Scrollbars> : <EmptyList text='Nenhum evento encontrado' />
					}
		 			<div className='add-event'>
		 				<FlatButton
		 					icon={<Icon icon='plus' />}
							label="Criar evento"
							primary={true}
							keyboardFocused={false}
							onTouchTap={this.openEventCreateModal}
						/>

						{
							this.props.showCancel ?
								<FlatButton
									className='float-button'
									label="Cancelar"
									keyboardFocused={false}
									onTouchTap={this.props.onClose}
								/> : null
						}

						<EventEditModal dateToCreate={this.props.dateToCreate} item={null} saveEvent={this.saveEvent} closeModal={this.closeEventCreateModal} open={this.state.showCreateModal} />
		 			</div>
		 		</div>
	 		</List>
		);
	}
}

class EventModal extends Component {

	static defaultProps = {
		showCancel: false,
		dateToCreate: null
	}

	constructor(props) {
		super(props);

		this.state = {
			showDeleteModalConfirm: false,
			showEditModal: false
		}
	}

	saveEvent = (item) => {
		this.setState({
			showEditModal: false
		}, this.props.saveEvent(item));
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

	confirmDelete = () => {
		this.props.deleteEvent(this.props.item.id);

		this.setState({
			showDeleteModalConfirm: false
		});

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
			
		const deleteActions = [
			<div className='modal-action-buttons'>
					<FlatButton
						label="Excluir"
						secondary={true}
						keyboardFocused={false}
						onTouchTap={this.confirmDelete}
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
					<p>{this.props.item.date.toString() + (this.props.item.hour != undefined ? ' - ' + this.props.item.hour.getHours()+':'+this.props.item.hour.getMinutes() : '')}</p>

					<Dialog
						title={'Confirmar exclusão'}
						actions={deleteActions}
						modal={false}
						open={this.state.showDeleteModalConfirm}
						onRequestClose={this.cancelDelete}
						contentStyle={{width: '450px'}}
					>
						<p>Você tem certeza que deseja excluir esse evento?</p>
						<p>Essa ação é irreversível.</p> 
					</Dialog>

					<EventEditModal item={this.props.item} saveEvent={this.saveEvent} closeModal={this.closeEdit} open={this.state.showEditModal} />
				</Dialog>
		)
	}
}

class EventEditModal extends Component {
	constructor(props) {
		super(props);

		if(this.props.item != null) {
			this.state = {
				description: this.props.item.description,
				name: this.props.item.name,
				hour: this.props.item.hour,
				date: this.props.item.date
			}
		}  else {
			this.state = {
				description: undefined,
				name: undefined,
				hour: undefined,
				date: new Date()	
			}
		}

	}

	saveEvent = () => {
		let item = {
			id: this.props.item != null ? this.props.item.id : null,
			name: this.state.name,
			description: this.state.description,
			date: this.state.date,
			hour: this.state.hour,
		}

		this.props.saveEvent(item);
	}

	changeDescription = (e, value) => {
		this.setState({
			description: value
		});
	}

	changeHour = (e, value) => {
		this.setState({
			hour: value
		});
	}

	changeDate = (e, value) => {
		this.setState({
			date: value
		});
	}

	changeName = (e, value) => {
		this.setState({
			name: value
		});
	}

	render() {
		const editActions = [
			<div className='modal-action-buttons'>
				<FlatButton
					label="Cancelar"
					primary={true}
					keyboardFocused={false}
					onTouchTap={this.props.closeModal}
				/>
				<FlatButton
					label="Salvar"
					primary={true}
					keyboardFocused={false}
					onTouchTap={this.saveEvent}
				/>
			</div>
		];

		return (
				<Dialog
					title={
						<div>
							<TextField
								className='title-input'
								hintText='Título'
								name='name'
								hintStyle={{fontSize: '22px'}}
								defaultValue={this.state.name}
								onChange={this.changeName}
							/>
						</div>
					}
					actions={editActions}
					modal={false}
					open={this.props.open}
					onRequestClose={this.props.closeModal}
				>
					<TextField
						name='description'
						hintText="Descrição"
						floatingLabelText="Descrição"
						multiLine={true}
						defaultValue={this.state.description}
						onChange={this.changeDescription}
					/>
					<DatePicker 
						name='date'
						label="Data" 
						hintText="Data" 
						defaultDate={this.props.dateToCreate != null ? this.props.dateToCreate : this.state.date}
						onChange={this.changeDate}
					/>
					<TimePicker 
						name='hour'
						label="Horário" 
						hintText="Horário" 
						format='24hr' 
						defaultTime={this.state.hour}
						onChange={this.changeHour}
					/>
				</Dialog>
		)
	}
}


export { Events };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventSection)
