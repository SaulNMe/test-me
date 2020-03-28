import React, { PureComponent } from 'react';
import { 
	Text,
	View,
	TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './InlineInputStyle';
import { Colors, Fonts } from 'qualificame-native/app/styles';

import HugeText from 'qualificame-native/app/components/HugeText';
import BodyText from 'qualificame-native/app/components/BodyText';

export default class InlineInput extends PureComponent {

	handleInputChange = (amount) => {
		this.props.onChange(amount, this.props.tag);
	}

	render() {
		return (
			<View style={styles.bgColor}>
				{ this.props.addTopDivider && <View style={[styles.divider, styles.bgColor]}/> }	
				<View style={[styles.row, styles.smallVerticalPadding, styles.alignItemsCenter, styles.baseHorizontalMargin ]}>
					<View style={[styles.flex07, styles.smallRightMargin]}>
						<BodyText 
							text={this.props.text}
							weight="regular"
							color="dark"
						/>
					</View>
					<View style={[styles.flex03, styles.justifyContentFlexEnd, styles.row]}>
						<TextInput
							keyboardAppearance='dark'
							keyboardType="phone-pad"
							onChangeText={this.handleInputChange}
							value={this.props.amount}
							maxLength={3}
							textContentType='telephoneNumber'
							style={
								{
									color:Colors[this.props.color],
									fontSize: Fonts.size.huge,
									fontWeight: Fonts.weight.regular
								}
							}
						/>
						{ this.props.percent && <HugeText
							text= '%'
							color= { this.props.color}
							weight= 'regular'
						/> }
					</View>
				</View>
				{ this.props.addBottomDivider && <View style={styles.divider}/> }	
			</View>
		);
	}
}

	InlineInput.propTypes = {
		text: PropTypes.string,
		amount: PropTypes.string,
		color: PropTypes.string,
		addTopDivider: PropTypes.bool,
		addBottomDivider: PropTypes.bool,
		percent: PropTypes.bool,
	}

	InlineInput.defaultProps = {
		text: "",
		amount: "",
		color: "green",
		addTopDivider: false,
		addBottomDivider: false,
		percent: false
	}
