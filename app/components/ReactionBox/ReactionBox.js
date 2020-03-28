import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './ReactionBoxStyle';
import { Colors } from 'qualificame-native/app/styles';


export default class ReactionBox extends PureComponent {

	render() {
		let imageSrc;
		let gradientColors;
		switch(this.props.reaction) {
			case 'excelent' :
				imageSrc = require('qualificame-native/assets/excelent.png');
				bgColor="lightGreen"
			break;
			case 'good':
				imageSrc = require('qualificame-native/assets/good.png');
				bgColor="lightBlue"
			break;
			case 'bad' :
				imageSrc = require('qualificame-native/assets/bad.png');
				bgColor="lightOrange"
			break;
			case 'horrible' :
				imageSrc = require('qualificame-native/assets/horrible.png');
				bgColor="lightPink"
			break;
			default:
				imageSrc = require('qualificame-native/assets/excelent.png');
				bgColor="lightGreen"
			break;
		}
		return (
			<View style={[styles.box, styles.centerObjects, {backgroundColor:Colors[bgColor] }]}>
				<Image 
					source={imageSrc}
					style={styles.imageSize}
				/>
			</View>
		);
	}
}

	ReactionBox.propTypes = {
		reaction: PropTypes.string
	}

	ReactionBox.defaultProps = {
		reaction: ""
	}
