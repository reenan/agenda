import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
//import { Row, Col } from './Grid.jsx';
import { connect } from 'react-redux';

import { Grid, Row, Col } from 'react-bootstrap';

import SideMenu from './SideMenu.jsx';
import Section from './Section.jsx';

import style from "../sass/style.scss";

import { setEvents, setNotes } from '../flux/actions/index.js';

const mapStateToProps = (state, ownProps) => {
  return {
    currentDate: state.calendar.currentDate
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setEvents: (events) => {
			dispatch(setEvents(events))
		},

		setNotes: (notes) => {
			dispatch(setNotes(notes))
		}
	}
}

class Structure extends Component {
		static propTypes = {
			className: PropTypes.string,
		};

		constructor(props) {
			super(props);

			this.state = {
				loadedEvents: false,
				loadedNotes: false,
				eventList: [],
				noteList: []
			}
		}

		componentWillMount() {

			let settings = {
				async: true,
				crossDomain: true,
				method: "GET"
			};

			$.ajax(update(settings, {$merge: {url: helper.urls.events}})).done((response) => {
				this.setState({
					loadedEvents: true
				}, () => {
					this.props.setEvents(response._embedded.events);
				});
			});

			$.ajax(update(settings, {$merge: {url: helper.urls.notes}})).done((response) => {
				this.setState({
					loadedNotes: true
				}, () => {
					this.props.setNotes(response._embedded.notes);
				});
			});

		}

		render() {
			return (
				 <div className='main-wrapper'>
					<Grid fluid={true}>	
						<Row className='full-height'>
							{	
								!this.state.loadedEvents || !this.state.loadedNotes ?
									<Col className="loader-wrapper" xs={12}>
										<p>Atenção: A primeira requisição pode demorar bastante pois o servidor da API pode estar em espera. Aguarde.</p>
										<div className="loader-bg" />
										<Loader />
									</Col> : null
							}
							<Col className='fixed-menu' xs={12}>
								<SideMenu />
							</Col>
							<Col className='section' xs={12}>
								<Section />
							</Col>
						</Row>
					</Grid>
				</div> 
			);
		}
}

class Loader extends Component {
    render() {
        return (
			<div className="loader" />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Structure)
