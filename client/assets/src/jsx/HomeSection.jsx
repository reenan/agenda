import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import Subheader from 'material-ui/Subheader';

import Icon from './Icon.jsx';
import EmptyList from './EmptyList.jsx';

import { Grid, Row, Col } from 'react-bootstrap';

import { selectMenu } from '../flux/actions/index.js';

import style from '../sass/home.scss'

const mapStateToProps = (state, ownProps) => {
	return {
		eventList: state.events.eventList,
		noteList: state.notes.noteList,
		activeMenu: state.menu.activeMenu
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		selectMenu: (id) => {
			dispatch(selectMenu(id))
		}
	}
}

class HomeSection extends Component {
	static propTypes = {
		className: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	selectMenu = (id) => {
		this.props.selectMenu(id);
	}

	render() {
		return (
			 <div className='home'>
			 	<Grid fluid={true}>
			 		<Row>
				 		<Col md={6} xs={12}>
							<NextEvents selectMenu={this.selectMenu.bind(this, 1)} eventList={this.props.eventList} />
				 		</Col>
				 		<Col md={6} xs={12}>
				 			<Notes selectMenu={this.selectMenu.bind(this, 2)} noteList={this.props.noteList} />
				 		</Col>
				 	</Row>
			 	</Grid>
			 </div>
		 );
	}
}

class Notes extends Component {
	constructor(props) {
		super(props);
		this.monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		this.state = {
			openItem: null
		}
	}

	openItem = (id) => {
		this.setState({
			openItem: (id == this.state.openItem ? null : id)
		});
	}

	render() {

		let itensList = [];
		let item = null;
		let count = 0;

		while(count < 4 && count < this.props.noteList.length) {
			item = this.props.noteList[count];

			if(item == undefined) {
				count++;
				continue;
			}

			itensList.push(
				<ListItem
					key={count}
					className={'item' + (this.state.openItem == item.id ? ' open' : '')}
					primaryText={(item.title ? <p className='limit-text'>{item.title}</p> : <i>Sem título</i>)}
					leftIcon={<Icon className='item-icon' icon='info' />}
					open={this.state.openItem == item.id}
					onClick={this.openItem.bind(this, item.id)}
					nestedItems={[
						<Card key={'card-'+count} className='item'>
							<CardHeader
								title={item.begin.getDate() + ' ' + this.monthList[item.begin.getMonth()] + (item.end ? (' to ' + item.end.getDate() + ' ' + this.monthList[item.end.getMonth()]) : '')}
							/>
							<CardText className='description'>
								{item.description ? item.description : <i>sem descrição</i>}
							</CardText>
						</Card>
					]}
				/>
			);
			count++;
		}
		return (
			<List className='active-notes'>
				<Subheader>Lembretes</Subheader>
				{itensList.length > 0 ? itensList : <EmptyList text='Nenhum lembrete encontrado' />}
				<MoreItens text='Ver lembretes' onClick={this.props.selectMenu} />
			</List>
		);
	}
}

class NextEvents extends Component {
	constructor(props) {
		super(props);
		this.monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		this.state = {
			openItem: null
		}
	}

	openItem = (id) => {
		this.setState({
			openItem: (id == this.state.openItem ? null : id)
		});
	}

	render() {

		let itensList = [];
		let item = null;
		let count = 0;

		while(count < 4 && count < this.props.eventList.length) {
			item = this.props.eventList[count];

			if(item == undefined) {
				count++;
				continue;
			}

			itensList.push(
				<ListItem
					key={count}
					className={'item' + (this.state.openItem == item.id ? ' open' : '')}
					primaryText={item.name ? (<p className='limit-text'>{item.name}</p>) : <i>Sem título</i>}
					secondaryText={item.date.getDate() + ' ' + this.monthList[item.date.getMonth()] + (item.hour ? (' às ' + item.hour.getHours() + ':' + item.hour.getMinutes()) : '')}
					leftIcon={<Icon className='item-icon' icon='calendar' />}
					open={this.state.openItem == item.id}
					onClick={this.openItem.bind(this, item.id)}
					nestedItems={[
						<Card key={'card-'+count} className='item'>
							<CardText className='description'>
								{item.description ? item.description : <i>sem descrição</i>}
							</CardText>
						</Card>
					]}
				/>
		   	);

			count++;
		}

		return (
			<List className='next-events'>
				<Subheader>Próximos eventos</Subheader>
	 			{itensList.length > 0 ? itensList : <EmptyList text='Nenhum evento encontrado' />}
	 			<MoreItens text='Ver eventos' onClick={this.props.selectMenu} key={'a'} />
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
				<FlatButton onTouchTap={this.props.onClick} label={this.props.text} />
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeSection)