import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './ConfigBtnStyle';
import { Feather } from '@expo/vector-icons';
import { Colors } from 'qualificame-native/app/styles';


export default class ConfigBtn extends PureComponent {
	render() {
		return (
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={this.props.onPress}
			>
				<Feather  name='settings' size={24} color={Colors.white}/>
			</TouchableOpacity>
		);
	}
}

	ConfigBtn.propTypes = {
		onPress: PropTypes.func
	}

	ConfigBtn.defaultProps = {
		onPress: ()=>{}
	}
