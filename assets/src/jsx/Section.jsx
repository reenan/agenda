import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import HomeSection from './HomeSection.jsx';
import CalendarSection from './CalendarSection.jsx';

import style from '../sass/section.scss'

const mapStateToProps = (state, ownProps) => {
	return {
		menuList: state.menu.menuList,
		activeMenu: state.menu.activeMenu
	}
}

class Section extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='section-wrapper'>
				<SectionHeader activeMenu={this.props.menuList[this.props.activeMenu]}  />
				<SectionContent activeMenu={this.props.activeMenu} />
			</div>
		);
	}
}

class SectionHeader extends Component {
	static propTypes = {
		className: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='header'>
				<h2>{this.props.activeMenu.name}</h2>
			</div>
		);
	}
}

class SectionContent extends Component {
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
		let contentComponent = null;

		switch(this.props.activeMenu) {
 			case 0: 
 				contentComponent = <HomeSection />
 				break;
 			case 1:
 				contentComponent = <CalendarSection />
 				break;
 			case 2:
 				contentComponent = <NotesSection />
 				break;
 		}

		return (
			 <div className='section-content'>
			 	{contentComponent}
			 </div>
		 );
	}
}

export default connect(
	mapStateToProps
)(Section)
