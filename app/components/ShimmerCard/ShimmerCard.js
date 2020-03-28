import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './ShimmerCardStyle';

import ShimmerPlaceholder from 'qualificame-native/app/components/ShimmerPlaceholder';
import { Colors } from 'qualificame-native/app/styles';

export default class ShimmerCard extends Component {
	render() {
		let bg = {backgroundColor: Colors.light}
		let shimmerColors = ['#F0F0F0','#DEDEDE','#EDEDED']
		return (
			<View style={[styles.row, styles.card, styles.alignItemsCenter, styles.justifyContentSpaceBetween, styles.baseHorizontalMargin]}>
				<View style={styles.flex1}>	
					<View style={{paddingBottom: 5}}>	
						<ShimmerPlaceholder
							colorShimmer={shimmerColors}
							duration={1000}
							autoRun={true}
							style={[{height:18, width: '60%'}]}
						/>
					</View>
					<View style={[styles. row, styles.alignItemsCenter]}>
						<View style={{paddingRight: 10}}>	
							<ShimmerPlaceholder
								duration={1000}
								autoRun={true}
								style={[styles.icon, bg]}
								colorShimmer={shimmerColors}
							/>
						</View>
						<ShimmerPlaceholder
							colorShimmer={shimmerColors}
							duration={1000}
							autoRun={true}
							style={[{height:16, width: '40%'}]}
						/>
					</View>
				</View>
				<View>		
					<ShimmerPlaceholder
						duration={1000}
						autoRun={true}
						style={[styles.circle, bg]}
						colorShimmer={shimmerColors}
					/>
				</View>
			</View>
		);
	}
}

	ShimmerCard.propTypes = {
		// data: PropTypes.array
	}

	ShimmerCard.defaultProps = {
		// data: []
	}
