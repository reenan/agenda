import React, { Component, PropTypes } from 'react';
import Calendar from 'material-ui/DatePicker/Calendar';
import { connect } from 'react-redux'

import { selectDate } from '../flux/actions/index.js';

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
					<div className='calendar-wrapper'>
						<Calendar onTouchTapDay={this.onChange} firstDayOfWeek={1} />
					</div>
				);
		}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CalendarEdited)
