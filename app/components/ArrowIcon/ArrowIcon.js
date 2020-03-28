import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import IconBox from 'qualificame-native/app/components/IconBox';
import styles from './ArrowIconStyle';
import BodyText from 'qualificame-native/app/components/BodyText';
import { Feather } from '@expo/vector-icons';
import { Colors } from 'qualificame-native/app/styles';
import Divider from 'qualificame-native/app/components/Divider';

export default class ArrowIcon extends PureComponent {
	render() {
		return (
			<TouchableOpacity
				onPress={this.props.onPress}
				activeOpacity={0.6}
				style={styles.bgColor}
			>
				{ this.props.addTopDivider && <Divider /> }	
				<View style={[styles.row, styles.baseHorizontalMargin, styles.alignItemsCenter, styles.smallVerticalPadding]}>
					<IconBox 
						bgColor={this.props.bgColor}	
						iconName={this.props.iconName}
					/>
					<View style={[styles.smallHorizontalMargin, styles.flex1]}>
						<BodyText 
							text={this.props.text}
							color={this.props.color}
							weight='light'
						/>
					</View>
					{ !this.props.removeIcon && <Feather name="chevron-right" size={24} color={Colors.dark}/>}
				</View>
				{ this.props.addBottomDivider && <Divider /> }	
			</TouchableOpacity>
		);
	}
}

	ArrowIcon.propTypes = {
		onPress: PropTypes.func,
		bgColor: PropTypes.string,
		iconName: PropTypes.string,
		text: PropTypes.string,
		addTopDivider: PropTypes.bool,
		addBottomDivider: PropTypes.bool,
		removeIcon: PropTypes.bool,
		color: PropTypes.string,
	}

	ArrowIcon.defaultProps = {
		onPress: ()=>{},
		bgColor: 'green',
		iconName: 'x',
		text: '',
		addBottomDivider: false,
		addTopDivider: false,
		removeIcon: false,
		color: 'dark'
	}
