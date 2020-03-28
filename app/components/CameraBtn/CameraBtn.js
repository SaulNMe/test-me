import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';

import styles from './CameraBtnStyle';
import { Feather } from '@expo/vector-icons';

export default class CameraBtn extends PureComponent {
	render() {
		return (
			<TouchableOpacity
				{...this.props}
				activeOpacity={0.8}
				style={styles.cameraBtn}
			>
					<Feather 
						name='camera'
						color='white'
						size={Platform.OS === 'ios' ? 35:25}
						style={styles.icon}
					/>
			</TouchableOpacity>
		);
	}
}

CameraBtn.propTypes = {
	onPress: PropTypes.func,
}

CameraBtn.defaultProps = {
	onPress: () => {},
}