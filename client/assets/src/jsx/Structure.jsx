import React, { Component, PropTypes } from 'react';
import { Row, Col } from './Grid.jsx';
import { connect } from 'react-redux'

import SideMenu from './SideMenu.jsx';
import Section from './Section.jsx';

import style from "../sass/style.scss";

const mapStateToProps = (state, ownProps) => {
  return {
    currentDate: state.calendar.currentDate
  }
}

class Structure extends Component {
		static propTypes = {
			className: PropTypes.string,
		};

		constructor(props) {
			super(props);
		}

		render() {
				return (
					 <div className='main-wrapper'>
						<Row gutter='no-gutter'>
							<Col className='fixed-menu' size={1}>
								<SideMenu />
							</Col>
							<Col className='section' size={11}>
								<Section />
							</Col>
						</Row>
					</div> 
				);
		}
}


export default connect(mapStateToProps)(Structure)
