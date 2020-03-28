import React, { PureComponent } from 'react';
import { Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from 'qualificame-native/app/styles';

import styles from './LabeledInputStyle';
import TinyText from 'qualificame-native/app/components/TinyText';
import { Feather } from '@expo/vector-icons';

export default class LabeledInput extends PureComponent {
	render() {
		let icon = this.props.iconName ? (
			<View style={styles.smallLeftMargin}>
				<Feather name={this.props.iconName} size={24} color={Colors[this.props.color]}/>
			</View>
		) : null;
		return (
			<View style={[
				styles.border,
				styles.smallVerticalMargin,
				{borderColor: Colors[this.props.color]},
				(this.props.addHorizontalMargin && styles.baseHorizontalMargin)]}
			>
				<View style={[styles.row, styles.alignItemsCenter]}>
					{icon}
					<View style={[styles.flex1, styles.smallHorizontalMargin]}>
						{this.props.children}
					</View>
				</View>
				<View style={[styles.row, styles.absContainer]}>
					<View style={[styles.line, {borderColor: Colors[this.props.color]}]} />
					<View style={[styles.smallHorizontalMargin, styles.alignSelfTop]}>
						<TinyText 
							text={this.props.label}
							color={this.props.color}
						/>
					</View>
					<View style={[styles.lineRight, {borderColor: Colors[this.props.color]}]} />
				</View>
			</View>
		);
	}
}

	LabeledInput.propTypes = {
		label: PropTypes.string,
		color: PropTypes.string,
		iconName: PropTypes.string,
		addHorizontalMargin: PropTypes.bool,
		placeholder: PropTypes.string,
		placeholderColor: PropTypes.string,
		textColor: PropTypes.string,
		selectionColor: PropTypes.string,
		textContentType: PropTypes.string,
		secureTextEntry: PropTypes.bool,
		value: PropTypes.string
	}

	LabeledInput.defaultProps = {
		label: '',
		color: 'green',
		iconName: '',
		addHorizontalMargin: false,
		placeholder: "",
		placeholderColor: "",
		textColor: "dark",
		selectionColor:"dark",
		textContentType: "none",
		secureTextEntry: false,
		value: ''
	}
