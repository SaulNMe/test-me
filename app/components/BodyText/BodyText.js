import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Fonts, Colors } from 'qualificame-native/app/styles';
import styles from './BodyTextStyle';

export default class BodyText extends PureComponent {
	render() {
		const textColor = {color: Colors[this.props.color]};
		const weight = {fontWeight: Fonts.weight[this.props.weight] };
		const align = {textAlign: this.props.align };

		return (
			<View>
				<Text style={[styles.text, textColor, weight, align]}>{this.props.text}</Text>
			</View>
		);
	}
}

	BodyText.propTypes = {
		text: PropTypes.string,
		color: PropTypes.string,
		weight: PropTypes.string,
		align: PropTypes.string,
	}

	BodyText.defaultProps = {
		text: "",
		color: "dark",
		weight: "regular",
		align: "left"
	}
