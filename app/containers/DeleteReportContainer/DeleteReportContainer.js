import React, { Component } from 'react';
import {
	View,
	Text,
} from 'react-native';

import { connect } from "react-redux";
import { fetchReports, clearReports } from "qualificame-native/app/actions/ReportsActions";

class DeleteReportContainer extends Component {	

	render() {
		return (
			<React.Fragment>
				{
					this.props.children(this.props.fetchReports, this.props.clearReports)	
				}
			</React.Fragment>
		);
	}
}

mapStateToProps = state => ({
})

export default connect(
	mapStateToProps,
	{
		fetchReports,
		clearReports
	}
)(DeleteReportContainer);
