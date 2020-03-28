import React, { Component } from 'react';
import {
	View,
	Text,
} from 'react-native';

import { connect } from "react-redux";
import { test } from "qualificame-native/app/actions/AuthActions";

class AuthTestContainer extends Component {	

	render() {
		return (
			<React.Fragment>
				{
					this.props.children(this.props.test)
				}
			</React.Fragment>
		);
	}
}

mapStateToProps = state => ({})

export default connect(mapStateToProps, {
	test
})(AuthTestContainer);
