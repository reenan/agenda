import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import Icon from './Icon.jsx';

import { selectMenu } from '../flux/actions/index.js';
//import style from '../sass/menu.scss';

import {Tabs, Tab} from 'material-ui/Tabs';

const mapStateToProps = (state, ownProps) => {
	return {
		menuList: state.menu.menuList,
		activeMenu: state.menu.activeMenu
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		selectMenu: (menu) => {
			dispatch(selectMenu(menu))
		}
	}
}

class SideMenu extends Component {
		static propTypes = {
			className: PropTypes.string,
		};

		constructor(props) {
				super(props);
		}

		onClick = (id) => {
			this.props.selectMenu(id);
		}

		render() {
				return (
					<div className='side-menu'>
						<Tabs value={this.props.activeMenu}>
							{
								this.props.menuList.map((item) => {
									return (
										<Tab 
											icon={<Icon style={{marginBottom: '5px'}} icon={item.icon} key={1} />}
											onClick={this.onClick.bind(this, item.id)} 
											key={item.id}
											value={item.id}
											label={item.name}
										/>
									)
								})
							}
						</Tabs>
					</div>
				);
		}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SideMenu)
