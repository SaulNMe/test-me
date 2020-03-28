import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput } from 'react-native';

import styles from './BorderedInputStyle';

import TinyText from 'qualificame-native/app/components/TinyText';
import { Feather } from '@expo/vector-icons';
import { Colors } from 'qualificame-native/app/styles';


export default class BorderedInput extends PureComponent {
	render() {
		return (
			<View style={[styles.border, {borderColor: Colors[this.props.color]}, styles.smallVerticalMargin]}>
				<View style={[styles.row, styles.smallHorizontalMargin]}>
					<View style={[styles.flex1, styles.inputContent, styles.centerObjects]}>
						<TextInput 
							{...this.props}
							onFocus={this.props.onFocus}
							value={this.props.value}
							style={{color:Colors[this.props.textColor]}}
							placeholder={this.props.placeholder}
							placeholderTextColor={Colors[this.props.placeholderColor]}
							underlineColorAndroid={Colors.transparent}
							selectionColor={Colors[this.props.selectionColor]}
							textContentType={this.props.textContentType}
						/>
					</View>
					<View style={{height: 28}}/>
				</View>
			</View>
		);
	}
}

	BorderedInput.propTypes = {
		color: PropTypes.string,
		placeholder: PropTypes.string,
		placeholderColor: PropTypes.string,
		textColor: PropTypes.string,
		selectionColor: PropTypes.string,
		textContentType: PropTypes.string,
		value: PropTypes.string,
	}

	BorderedInput.defaultProps = {
		color: 'green',
		placeholder: "",
		placeholderColor: "",
		textColor: "dark",
		selectionColor:"dark",
		textContentType: "none",
		value: ''
	}
