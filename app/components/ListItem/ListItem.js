import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './ListItemStyle';
import BodyText from 'qualificame-native/app/components/BodyText';
import { Colors } from 'qualificame-native/app/styles';


export default class ListItem extends Component {
	render() {
		return (
			<View style={[styles.row, styles.alignItemsCenter, (this.props.addVerticalMargin && styles.smallVerticalMargin)]}>
				<View style={[styles.dot, styles.smallRightMargin, {backgroundColor:Colors[this.props.color]}]}/>
				<BodyText 
					text={this.props.text}
					weight="light"
				/>
			</View>
		);
	}
}

	ListItem.propTypes = {
		text: PropTypes.string,
		color: PropTypes.string,
		addVerticalMargin: PropTypes.bool
	}

	ListItem.defaultProps = {
		text: "",
		color: "pink",
		addVerticalMargin: false
	}
