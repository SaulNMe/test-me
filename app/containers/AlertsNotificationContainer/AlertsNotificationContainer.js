import React, { Component } from 'react';
import {
	View,
	Text,
} from 'react-native';

import { connect } from "react-redux";
import { unReadAlerts } from "qualificame-native/app/reducers";
import { fetchAlerts } from 'qualificame-native/app/actions/AlertsActions';


class AlertsNotificationContainer extends Component {	
	componentDidMount(){
		this.props.fetchAlerts()
	}
	render() {
		return (
			<React.Fragment>
 				{
					this.props.children(this.props.alerts)
 				}
			</React.Fragment>
		);
	}
}

mapStateToProps = state => ({
	alerts: unReadAlerts(state),
})

export default connect(mapStateToProps, {fetchAlerts})(AlertsNotificationContainer);
