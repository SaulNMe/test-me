import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './IconBoxStyle';
import { Feather } from '@expo/vector-icons';
import { Colors } from 'qualificame-native/app/styles';

export default class IconBox extends PureComponent {
	render() {
		let gradientColors;
		switch(this.props.bgColor) {
			case 'green':
				gradientColors = ['#0F9F92', '#12B184'];
			break;
			case 'blue':
				gradientColors = ['#154BBA', '#107EC2'];
			break;
			case 'orange':
				gradientColors = ['#E62808', '#FC680A'];
			break;
			case 'pink':
				gradientColors = ['#E31862', '#EB194D'];
			break;
			case 'gray':
				gradientColors = ['#ccc', '#ccc'];
			break;
			default:
				gradientColors = ['#fff', '#fff'];
			break;
		}
		return (
			<LinearGradient colors={gradientColors} style={[styles.defaultSize, styles.centerObjects]} start={[0, 0]} end={[1, 0]}>
				<Feather name={this.props.iconName} size={24} color={Colors.white}/>
			</LinearGradient>
		);
	}
}

	IconBox.propTypes = {
		bgColor: PropTypes.string,
		iconName: PropTypes.string

	}

	IconBox.defaultProps = {
		bgColor: 'green',
		iconName: 'x'
	}
