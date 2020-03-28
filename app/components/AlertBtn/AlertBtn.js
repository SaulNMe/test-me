import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './AlertBtnStyle';
import { Feather } from '@expo/vector-icons';
import { Colors } from 'qualificame-native/app/styles';



export default class AlertBtn extends PureComponent {
	render() {
		let badgeNumber = (this.props.alertsAmount >= 99) ? '99+' : this.props.alertsAmount;
		let iconBadge = !!(this.props.alertsAmount) ?  
			<View style={styles.iconBadge}>
		    	<Text style={styles.alertNum}>{badgeNumber}</Text>
			</View> : null;
		return (
			<TouchableOpacity
				style={styles.iconContainer}
				onPress={this.props.onPress}
				activeOpacity={0.6}
			>
				<Feather  name='bell' size={24} color={Colors[this.props.iconColor]}/>
				{iconBadge}
			</TouchableOpacity>
		);
	}
}

	AlertBtn.propTypes = {
		alertsAmount: PropTypes.number,
		iconColor: PropTypes.string,
		onPress: PropTypes.func
	}

	AlertBtn.defaultProps = {
		alertsAmount: 0,
		iconColor: 'white',
		onPress: ()=>{}
	}
