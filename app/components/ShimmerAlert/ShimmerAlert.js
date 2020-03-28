import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './ShimmerAlertStyle';

import ShimmerPlaceholder from 'qualificame-native/app/components/ShimmerPlaceholder';
import { Colors } from 'qualificame-native/app/styles';

export default class ShimmerAlert extends Component {
	render() {
		let bg = {backgroundColor: Colors.light}
		let shimmerColors = ['#F0F0F0','#DEDEDE','#EDEDED']
		return (
			<View style={[styles.baseHorizontalMargin, styles.baseVerticalMargin, styles.row]}>
				<View style= {styles.flex2}>
					<View style={styles.smallBottomMargin}>	
						<ShimmerPlaceholder
							colorShimmer={shimmerColors}
							duration={1000}
							autoRun={true}
							style={[{height:16, width: 100}]}
						/>
					</View>
					<View style={[styles.wrap]}>	
						<View style={styles.smallestBottomMargin}>		
							<ShimmerPlaceholder
								colorShimmer={shimmerColors}
								duration={1000}
								autoRun={true}
								style={[{height:14, width: 200}]}
							/>
						</View>
						<ShimmerPlaceholder
							colorShimmer={shimmerColors}
							duration={1000}
							autoRun={true}
							style={[{height:14, width: 200}]}
						/>
					</View>	
				</View>
				<View>
					<ShimmerPlaceholder
						colorShimmer={shimmerColors}
						duration={1000}
						autoRun={true}
						style={[{height:12, width: 80}, styles.smallestBottomMargin]}
					/>
				</View>
			</View>
		);
	}
}

	ShimmerAlert.propTypes = {
		// data: PropTypes.array
	}

	ShimmerAlert.defaultProps = {
		// data: []
	}
