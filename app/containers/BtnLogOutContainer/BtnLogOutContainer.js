import React, { Component } from 'react';
import {
	View,
	Text,
} from 'react-native';

import { connect } from "react-redux";
import { logout } from "qualificame-native/app/actions/AuthActions";
class BtnLogOutContainer extends Component {	

	render() {
		return (
			<React.Fragment>
				{
					this.props.children(this.props.logout)
				}
			</React.Fragment>
		);
	}
}

mapStateToProps = state => ({})

export default connect(mapStateToProps, { 
	logout 
})(BtnLogOutContainer);
