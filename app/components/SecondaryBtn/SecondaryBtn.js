import React, { PureComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import BodyText from 'qualificame-native/app/components/BodyText';
import { Colors } from 'qualificame-native/app/styles';

import styles from './SecondaryBtnStyle';

export default class SecondaryBtn extends PureComponent {
	render() {
		return (
			<TouchableOpacity
				onPress={this.props.onPress}
				disabled={this.props.disabled}
				activeOpacity={0.8}
			>
				<View
					style={[styles.fullWidth, styles.defaultStyles, styles.centerObjects, {borderColor: Colors[this.props.color]}]}
				>	
					<BodyText 
						text={this.props.text}
						color={this.props.color}
						weight="medium"
					/>
				</View>
			</TouchableOpacity>
		);
	}
}

	SecondaryBtn.propTypes = {
		onPress: PropTypes.func,
		text: PropTypes.string,
		color: PropTypes.string,
		disabled: PropTypes.bool
	}

	SecondaryBtn.defaultProps = {
		onPress: ()=>{},
		text: "Click me!",
		color: "green",
		disabled: false
	}
