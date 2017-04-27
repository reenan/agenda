import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import HomeSection from './HomeSection.jsx';
import EventSection from './EventSection.jsx';
import NoteSection from './NoteSection.jsx';

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
				<SectionContent activeMenu={this.props.activeMenu} />
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
 				contentComponent = <EventSection />
 				break;
 			case 2:
 				contentComponent = <NoteSection />
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
