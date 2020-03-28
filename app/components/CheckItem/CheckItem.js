import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from 'qualificame-native/app/styles';
import BodyText from 'qualificame-native/app/components/BodyText';
import { Feather } from '@expo/vector-icons';

import styles from './CheckItemStyle';

export default class CheckItem extends PureComponent {
	render() {
		return (
			<View style={[styles.row, styles.alignItemsCenter, (this.props.verticalMargin && styles.tinyVerticalMargin)]} >
				<View style={styles.smallRightMargin}>
					<Feather name="check-square" size={24} color={Colors[this.props.iconColor]}/>
				</View>
				<BodyText
					color={this.props.textColor}
					text={this.props.text}
				/>
			</View>
		);
	}
}

	CheckItem.propTypes = {
		iconColor: PropTypes.string,
		textColor: PropTypes.string,
		text: PropTypes.node,
		verticalMargin: PropTypes.bool,
	}

	CheckItem.defaultProps = {
		iconColor: "dark",
		textColor: "dark",
		text: "",
		verticalMargin: false,
	}
