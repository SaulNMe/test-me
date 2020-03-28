import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { Fonts, Colors } from 'qualificame-native/app/styles';
import styles from './TinyTextStyle';

export default class TinyText extends PureComponent {
	render() {
		const textColor = {color: Colors[this.props.color]};
		const weight = {fontWeight: Fonts.weight[this.props.weight]};
		const align = {textAlign: this.props.align};

		return (
			<React.Fragment>
				<Text style={[styles.text, textColor, weight, align]}>{this.props.text}</Text>
			</React.Fragment>
		);
	}
}

	TinyText.propTypes = {
		text: PropTypes.string,
		color: PropTypes.string,
		weight: PropTypes.string,
		align: PropTypes.string,
	}

	TinyText.defaultProps = {
		text: "",
		color: "dark",
		weight: "regular",
		align: "left"
	}
