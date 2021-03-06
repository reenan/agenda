import React, { Component, PropTypes } from 'react';

import style from '../sass/icon.scss';

class Icon extends Component {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        className: PropTypes.string,
    };

    static defaultProps = {
      className: '',
      style: {}
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
        	<div style={this.props.style} className={'icon icon-' + this.props.icon + ' ' + this.props.className}>
       		</div>
        );
    }
}

export default Icon
