import React, { Component, PropTypes } from 'react';
//import { Row, Col } from './Grid.jsx';
import { connect } from 'react-redux';

import { Grid, Row, Col } from 'react-bootstrap';

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
						<Grid fluid={true}>	
							<Row className='full-height'>
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


export default connect(mapStateToProps)(Structure)
