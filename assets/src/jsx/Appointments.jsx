import React, { Component, PropTypes } from 'react';
import Calendar from 'material-ui/DatePicker/Calendar';
import { connect } from 'react-redux'

import { Row, Col } from './Grid.jsx';

import { selectDate } from '../flux/actions/index.js';

import style from '../sass/appointments.scss';

const mapStateToProps = (state, ownProps) => {
  return {
    currentDate: state.calendar.currentDate
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectDate: (date) => {
      dispatch(selectDate(date))
    }
  }
}

class Appointments extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
        	<div className='appointments-wrapper'>
				<Weekdays />
				<WeekAppointments />
			</div>
        );
    }
}

class Weekdays extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row className='weekdays'>
				<Col size={2}>
					<p className='day-number'>1</p>
					<p>DOM</p>
				</Col>

				<Col size={2}>
					<p className='day-number'>2</p>
					<p>SEG</p>	
				</Col>

				<Col size={2}>
					<p className='day-number'>3</p>
					<p>TER</p>
				</Col>

				<Col size={2}>
					<p className='day-number'>4</p>
					<p>QUA</p>
				</Col>

				<Col size={2}>
					<p className='day-number'>5</p>
					<p>QUI</p>
				</Col>

				<Col size={2}>
					<p className='day-number'>6</p>
					<p>SEX</p>
				</Col>

				<Col size={2}>
					<p className='day-number'>7</p>
					<p>SAB</p>
				</Col>
			</Row>
        );
    }
}

class WeekAppointments extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row className='week-appoitments'>
				<Col style={{textAlign: 'center'}} size={2}>
					evento
				</Col>

				<Col style={{textAlign: 'center'}} size={2}>
					evento
				</Col>

				<Col style={{textAlign: 'center'}} size={2}>
					evento
				</Col>

				<Col style={{textAlign: 'center'}} size={2}>
					evento
				</Col>

				<Col style={{textAlign: 'center'}} size={2}>
					evento
				</Col>

				<Col style={{textAlign: 'center'}} size={2}>
					evento
				</Col>

				<Col style={{textAlign: 'center'}} size={2}>
					evento
				</Col>
			</Row>
        );
    }
}

class DayAppointments extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
			<ul>
			
			</ul>            
        );
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Appointments)
