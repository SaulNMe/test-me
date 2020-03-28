import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './ShimmerDetailStyle';

import ShimmerPlaceholder from 'qualificame-native/app/components/ShimmerPlaceholder';
import { Colors } from 'qualificame-native/app/styles';

export default class ShimmerDetail extends Component {
	render() {
		let bg = {backgroundColor: Colors.light}
		let shimmerColors = ['#F0F0F0','#DEDEDE','#EDEDED']
		return (
			<View>
				<ShimmerPlaceholder
					duration={1000}
					autoRun={true}
					style={[styles.circle, bg]}
					colorShimmer={shimmerColors}
				/>
			</View>
		);
	}
}

	ShimmerDetail.propTypes = {
		// data: PropTypes.array
	}

	ShimmerDetail.defaultProps = {
		// data: []
	}
