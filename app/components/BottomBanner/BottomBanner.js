import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './BottomBannerStyle';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import LabelText from 'qualificame-native/app/components/LabelText';
import { Colors } from 'qualificame-native/app/styles';

export default class BottomBanner extends PureComponent {
	render() {
		return (
			<View style={[styles.baseVerticalPadding, styles.baseHorizontalPadding, styles.row, {backgroundColor: Colors[this.props.bgColor]}]}>
				<View style={styles.flex1}>
					<LabelText 
						text={this.props.text}
						color={this.props.textColor}
					/>
				</View>
				<View style={[styles.baseLeftMargin, styles.flex1]}>
					<PrimaryBtn 
						text={this.props.textBtn}
						onPress={this.props.onPress}
					/>
				</View>
			</View>
		);
	}
}

	BottomBanner.propTypes = {
		textBtn: PropTypes.string,
		text: PropTypes.string,
		textColor: PropTypes.string,
		bgColor: PropTypes.string,
		onPress: PropTypes.func
	}

	BottomBanner.defaultProps = {
		textBtn: "",
		text: "",
		bgColor:"pink",
		textColor:"white",
		onPress: ()=>{}
	}
