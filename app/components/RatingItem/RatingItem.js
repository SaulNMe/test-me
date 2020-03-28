import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './RatingItemStyle';
import ReactionBox from 'qualificame-native/app/components/ReactionBox';
import BodyText from 'qualificame-native/app/components/BodyText';

export default class RatingItem extends PureComponent {
	render() {
		let reactions = {
			1: 'excelent',
			2: 'good',
			3: 'bad',
			4: 'horrible',
		}
		return (
			<View style={[styles.row, styles.alignItemsCenter]}>
				<ReactionBox
					reaction={reactions[this.props.value]}
				/>
				<View style={styles.baseHorizontalMargin}>
					<View style={[styles.row, styles.alignItemsCenter]}>
						<BodyText
							text={this.props.time}
							weight="light"
						/>
						<View style={[styles.dot, styles.smallHorizontalMargin]}/>
						<BodyText
							text={this.props.title}
							weight="bold"
						/>
					</View>
					<View style={[styles.flex1, styles.smallRightMargin]}>
						<BodyText
							text={this.props.comment}
							weight="light"
						/>
					</View>
				</View>
			</View>
		);
	}
}

	RatingItem.propTypes = {
		value: PropTypes.number.isRequired,
		time: PropTypes.string,
		title: PropTypes.string,
		comment: PropTypes.string
	}

	RatingItem.defaultProps = {
		time: "",
		title: "",
		comment: "- -"
	}
