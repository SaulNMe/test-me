import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from './ShowAlertStyle';


export default class ShowAlert extends Component {
	render () {
		return (
			<View style={[styles.alert, styles.imageFill]}>
		        <AwesomeAlert
					show={this.props.show}
					showProgress={this.props.showProgress}
					title={this.props.title}
					message={this.props.message}
					closeOnTouchOutside={true}
					closeOnHardwareBackPress={true}
					showCancelButton={this.props.showCancelButton}
					showConfirmButton={this.props.showConfirmButton}
					cancelText={this.props.cancelText}
					confirmText={this.props.confirmText}
					confirmButtonColor={this.props.confirmButtonColor}
					onCancelPressed={() => this.props.onCancelPressed()}
					onConfirmPressed={() => this.props.onConfirmPressed()}
		        />
	        </View>
		);
	}
}

	ShowAlert.propTypes = {
		// data: PropTypes.array
	}

	ShowAlert.defaultProps = {
		// data: []
	}
