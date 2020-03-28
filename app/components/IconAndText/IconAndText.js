import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './IconAndTextStyle';
import { Feather } from '@expo/vector-icons';
import { Colors } from 'qualificame-native/app/styles';
import BodyText from 'qualificame-native/app/components/BodyText';

export default class IconAndText extends PureComponent {
	render() {
		return (
			<View style={[styles.row, styles.alignItemsCenter, (this.props.addVerticalMargin && styles.smallVerticalMargin)]}>
				<Feather name={this.props.iconName} size={24} color={Colors[this.props.iconColor]}/>
				<View style={styles.smallLeftMargin}>
					<BodyText 
						text={this.props.text}
						weight="light"
					/>
				</View>
			</View>
		);
	}
}

	IconAndText.propTypes = {
		text: PropTypes.string,
		iconName: PropTypes.string,
		iconColor: PropTypes.string,
		addVerticalMargin: PropTypes.bool
	}

	IconAndText.defaultProps = {
		text: "",
		iconName: 'x',
		iconColor: 'pink',
		addVerticalMargin: false
	}
