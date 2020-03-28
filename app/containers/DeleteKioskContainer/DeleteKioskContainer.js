import React, { Component } from 'react';
import {
	View,
	Text,
} from 'react-native';

import { connect } from "react-redux";
import { fetchKiosks, clearKiosks, updateKiosk } from "qualificame-native/app/actions/KiosksActions";

class DeleteKioskContainer extends Component {	

	render() {
		return (
			<React.Fragment>
				{this.props.children(this.props.fetchKiosks, this.props.clearKiosks, this.props.updateKiosk)}
			</React.Fragment>
		);
	}
}

mapStateToProps = state => ({
})

export default connect(
	mapStateToProps,
	{
		fetchKiosks,
		clearKiosks,
		updateKiosk,
	}
)(DeleteKioskContainer);
