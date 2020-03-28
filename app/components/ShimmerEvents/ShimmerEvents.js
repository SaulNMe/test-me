import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './ShimmerEventsStyle';
import { Colors } from 'qualificame-native/app/styles';

import ShimmerCalendarItem from 'qualificame-native/app/components/ShimmerCalendarItem';
import ShimmerPlaceholder from 'qualificame-native/app/components/ShimmerPlaceholder';

export default class ShimmerEvents extends Component {
	render() {
		let bg = {backgroundColor: Colors.light}
		let shimmerColors = ['#F0F0F0','#DEDEDE','#EDEDED']
		return (
			<View style={[styles.baseHorizontalMargin, styles.baseTopMargin]}>
				<ShimmerPlaceholder
					colorShimmer={shimmerColors}
					duration={1000}
					autoRun={true}
					style={[{height:18, width: '50%'}]}
				/>
				<View>	
					{[1,2,3,4].map((x)=> 
						<React.Fragment key={x}>
							{
								<ShimmerCalendarItem />
							}
						</React.Fragment>)
					}
				</View>
			</View>
		);
	}
}

	ShimmerEvents.propTypes = {
		// data: PropTypes.array
	}

	ShimmerEvents.defaultProps = {
		// data: []
	}
