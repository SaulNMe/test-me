import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './ShimmerCalendarItemStyle';

import ShimmerPlaceholder from 'qualificame-native/app/components/ShimmerPlaceholder';
import { Colors } from 'qualificame-native/app/styles';

export default class ShimmerCalendarItem extends Component {
	render() {
		let bg = {backgroundColor: Colors.light}
		let shimmerColors = ['#F0F0F0','#DEDEDE','#EDEDED']
		return (
			<View style={[styles.card, styles.row, styles.alignItemsCenter, styles.smallTopMargin]}>
				<ShimmerPlaceholder
					duration={1000}
					autoRun={true}
					style={[styles.square, bg]}
					colorShimmer={shimmerColors}
				/>
				<View style={styles.smallLeftMargin}>
					<View style={[styles.row, styles.alignItemsCenter, styles.smallVerticalMargin]}>
						<ShimmerPlaceholder
							colorShimmer={shimmerColors}
							duration={1000}
							autoRun={true}
							style={[{height:16, width: 50}, styles.smallestBottomMargin]}
						/>
						<View style={[styles.smallHorizontalMargin]}>
							<ShimmerPlaceholder
								duration={1000}
								autoRun={true}
								style={[styles.dot, styles.smallHorizontalMargin]}
							/>
						</View>
						<ShimmerPlaceholder
							colorShimmer={shimmerColors}
							duration={1000}
							autoRun={true}
							style={[{height:16, width: 64}, styles.smallestBottomMargin]}
						/>
					</View>
					<ShimmerPlaceholder
						colorShimmer={shimmerColors}
						duration={1000}
						autoRun={true}
						style={[{height:16, width: 150}, styles.smallestBottomMargin]}
					/>
				</View>
			</View>
		);
	}
}

	ShimmerCalendarItem.propTypes = {
		// data: PropTypes.array
	}

	ShimmerCalendarItem.defaultProps = {
		// data: []
	}
