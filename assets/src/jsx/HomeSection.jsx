import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import { Row, Col } from './Grid.jsx';
import Calendar from './Calendar.jsx';

import style from '../sass/home.scss'

const mapStateToProps = (state, ownProps) => {
	return {
		menuList: state.menu.menuList,
		activeMenu: state.menu.activeMenu,
		currentDate: state.calendar.currentDate
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
			 		<Col size={5}>
			 			<Calendar />
			 			{this.props.currentDate.toString()}
			 		</Col>
			 		<Col size={7}>
			 		</Col>
			 	</Row>
			 </div>
		 );
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeSection)
