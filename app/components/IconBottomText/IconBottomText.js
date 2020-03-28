import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './IconBottomTextStyle';

import { Feather } from '@expo/vector-icons';
import TitleText from 'qualificame-native/app/components/TitleText';
import { Colors } from 'qualificame-native/app/styles';

export default class IconBottomText extends PureComponent {
	render() {
		return (
			<View style={[styles.centerObjects, {width: 255}]}>
				<View style={[styles.bubbleForm, {backgroundColor: Colors[this.props.color], borderColor: Colors[this.props.color]}]}>
					<Feather name={this.props.iconName} size={70} color={this.props.iconColor}/>
				</View>
				<View> 
					<TitleText
						text= {this.props.title}
						color= {this.props.color}
						align="center"
					/>
				</View>
			</View>
		);
	}
}

	IconBottomText.propTypes = {
		iconColor: PropTypes.string,
		iconName: PropTypes.string,
		color: PropTypes.string,
		title: PropTypes.string,
	}

	IconBottomText.defaultProps = {
		iconColor: 'white',
		iconName: 'award',
		color: 'red',
		title: ''
	}
