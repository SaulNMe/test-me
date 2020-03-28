import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import BodyText from 'qualificame-native/app/components/BodyText';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'qualificame-native/app/styles';


import styles from './PrimaryBtnStyle';

export default class PrimaryBtn extends PureComponent {
	render() {
		let textColor;
		let gradientColors;
		let disabledGradient;
		switch(this.props.bgColor) {
			case 'green':
				gradientColors = ['#0F9F92', '#12B184'];
				disabledGradient = ['#58c2ae', '#a0ddd0'];
				textColor = "white";
			break;
			case 'blue':
				gradientColors = ['#154BBA', '#107EC2'];
				disabledGradient = ['#5792d1', '#a0c3e5'];
				textColor = "white";
			break;
			case 'orange':
				gradientColors = ['#E62808', '#FC680A'];
				disabledGradient = ['#f58053', '#fab69d'];
				textColor = "white";
			break;
			case 'pink':
				gradientColors = ['#E31862', '#EB194D'];
				disabledGradient = ['#ec5c88', '#f3a0b8'];
				textColor = "white";
			break;
			default:
				gradientColors = ['#fff', '#fff'];
				disabledGradient = ['#CCCACA', '#E6E3E3'];
				textColor = "dark";
			break;
		}
		return (
			<TouchableOpacity
				onPress={this.props.onPress}
				disabled={this.props.disabled}
				activeOpacity={0.9}
			>
				<View style={[styles.borderRadius, (this.props.hasHorizontalMargin && styles.baseHorizontalMargin), styles.centerObjects, (!this.props.disabled && styles.shadow)]}>
					<LinearGradient colors={this.props.disabled ? disabledGradient : gradientColors} style={[styles.fullWidth, styles.defaultStyles, styles.alignItemsCenter]} start={[0, 0]} end={[1, 0]}>
						<BodyText 
							text={this.props.text}
							color={textColor}
							weight={this.props.weight}
						/>
					</LinearGradient>
				</View>
			</TouchableOpacity>
		);
	}
}

	PrimaryBtn.propTypes = {
		onPress: PropTypes.func,
		text: PropTypes.string,
		bgColor: PropTypes.string,
		disabled: PropTypes.bool,
		hasHorizontalMargin: PropTypes.bool,
		weight: PropTypes.string,
	}

	PrimaryBtn.defaultProps = {
		onPress: ()=>{},
		text: "Click me!",
		bgColor: "",
		disabled: false,
		hasHorizontalMargin: false,
		weight: 'medium'
	}


