import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import Icon from './Icon.jsx';

import { selectMenu } from '../flux/actions/index.js';
import style from '../sass/menu.scss';

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

    render() {
        return (
        	<div className='side-menu'>
            {
              this.props.menuList.map((item) => {
                return <MenuItem onClick={this.props.selectMenu} item={item} key={item.id} active={this.props.activeMenu == item.id} />
              })
            }
       		</div>
        );
    }
}

class MenuItem extends Component {
  static popTypes = {
    item: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
  }

  onClick = () => {
    if(this.props.active) {
      return;
    }
    this.props.onClick(this.props.item.id);
  }

  render() {
    return (
      <div onClick={this.onClick} className={'menu-item' + (this.props.active ? ' active': '')}>
        <div className='menu-icon'>
          <Icon icon={this.props.item.icon} />
        </div>
        <div className='menu-name-tag'>{this.props.item.name}</div>
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu)
