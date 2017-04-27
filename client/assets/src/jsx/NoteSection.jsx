import React, { Component, PropTypes } from 'react';
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

import { Grid, Row, Col } from 'react-bootstrap';

import style from '../sass/note.scss';

import { saveNote, deleteNote } from '../flux/actions/index.js';

const mapStateToProps = (state, ownProps) => {
	return {
		noteList: state.notes.noteList
	}
}


const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		saveNote: (item) => {
			dispatch(saveNote(item))
		},

		deleteNote: (id) => {
			dispatch(deleteNote(id));
		}
	}
}

class NoteSection extends Component {
		static propTypes = {
			className: PropTypes.string,
		};

		constructor(props) {
				super(props);

				this.state = {
					snackbarText: '',
					isOpenSnackbar: false
				}
		}

		deleteNote = (id) => {
			this.props.deleteNote(id);
		}

		saveNote = (item) => {
			this.setState({
				isOpenSnackbar: true,
				snackbarText: 'Lembrete salvo com sucesso'
			}, this.props.saveNote(item))
		}

		closeSnackbar = () => {
			this.setState({
				isOpenSnackbar: false,
				snackbarText: ''
			});
		}

		render() {
				return (
					<div className='note-section'>
						<Grid fluid={true}>
							<Row>
								<Col md={12}>
									<Notes deleteNote={this.deleteNote} saveNote={this.saveNote} noteList={this.props.noteList} />
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
		this.monthList = ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		this.state = {
			currentOpenModal: null,
			showCreateModal: false
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

	deleteNote = (id) => {
		this.closeModal();
		this.props.deleteNote(id);
	}

	openNoteCreateModal = () => {
		this.setState({
			showCreateModal: true
		});
	}

	closeNoteCreateModal = () => {
		this.setState({
			showCreateModal: false
		});
	}

	saveNote = (item) => {
		this.closeNoteCreateModal();
		this.props.saveNote(item);
	}

	render() {

		let itensList = [];
		let item = null;
		let count = 0;

		while(itensList.length < this.props.noteList.length) {
			item = this.props.noteList[count];
			itensList.push(
				[
					<ListItem 
						key={this.props.noteList[count].id}
						leftAvatar={
							<div className='when-avatar'>
								<p>
									INÍCIO: XX/XX/XXXX
								</p>
								<p>
									TÉRMINO: XX/XX/XXXX
								</p>
							</div>
						}
				   		primaryText={item.description ? item.description : '<i>sem descrição</i>'}
				   		onClick={this.openModal.bind(this, item.id)}
			   		/>,
			   		<NoteModal
			   			key={'modal-' + this.props.noteList[count].id}
			   			item={item}
			   			open={this.state.currentOpenModal == item.id}
			   			onClose={this.closeModal}
			   			deleteNote={this.props.deleteNote}
			   			saveNote={this.props.saveNote}
			   		/>
		   	]
		   	);
			count++;
		}

		return (
			<List className='notes'>
				<div>
					<Scrollbars className='note-list-scroll'>
						<div className='note-list'>
		 					{
		 						itensList.length > 0 ? 
		 							itensList : '<p>Nenhum notas encontrado</p>'
		 					}
		 				</div>
		 			</Scrollbars>
		 			<div className='add-note'>
		 				<FlatButton
		 					icon={<Icon icon='plus' />}
							label="Criar notas"
							primary={true}
							keyboardFocused={false}
							onTouchTap={this.openNoteCreateModal}
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

						<NoteEditModal item={null} saveNote={this.saveNote} closeModal={this.closeEventCreateModal} open={this.state.showCreateModal} />
		 			</div>
		 		</div>
	 		</List>
		);
	}
}

class NoteModal extends Component {

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

	saveNote = (item) => {
		this.setState({
			showEditModal: false
		}, this.props.saveNote(item));
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
		this.props.deleteNote(this.props.item.id);

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
					actions={actions}
					modal={false}
					open={this.props.open}
					onRequestClose={this.props.onClose}
				>
					<p>{this.props.item.description}</p>

					<Dialog
						title={'Confirmar exclusão'}
						actions={deleteActions}
						modal={false}
						open={this.state.showDeleteModalConfirm}
						onRequestClose={this.cancelDelete}
						contentStyle={{width: '450px'}}
					>
						<p>Você tem certeza que deseja excluir esse lembrete?</p>
						<p>Essa ação é irreversível.</p> 
					</Dialog>

					<NoteEditModal item={this.props.item} saveNote={this.saveNote} closeModal={this.closeEdit} open={this.state.showEditModal} />
				</Dialog>
		)
	}
}

class NoteEditModal extends Component {
	constructor(props) {
		super(props);

		if(this.props.item != null) {
			this.state = {
				description: this.props.item.description,
			}
		}  else {
			this.state = {
				description: undefined,
			}
		}

	}

	saveNote = () => {
		let item = {
			id: this.props.item != null ? this.props.item.id : null,
			description: this.state.description,
		}

		this.props.saveNote(item);
	}

	changeDescription = (e, value) => {
		this.setState({
			description: value
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
					onTouchTap={this.saveNote}
				/>
			</div>
		];

		return (
				<Dialog
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
						fullWidth={true}
						defaultValue={this.state.description}
						onChange={this.changeDescription}
					/>
				</Dialog>
		)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NoteSection)
