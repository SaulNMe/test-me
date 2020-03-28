import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './DeleteBtnStyle';
import { Feather } from '@expo/vector-icons';
import { Colors } from 'qualificame-native/app/styles';

export default class DeleteBtn extends PureComponent {
	render() {
		return (
			<TouchableOpacity
				onPress={this.props.onPress}
				activeOpacity={0.6}
			>
				<Feather  name='trash-2' size={24} color={Colors[this.props.color]}/>
			</TouchableOpacity>
		);
	}
}

	DeleteBtn.propTypes = {
		color: PropTypes.string,
		onPress: PropTypes.func,
	}

	DeleteBtn.defaultProps = {
		color: 'pink',
		onPress: ()=>{},
	}
