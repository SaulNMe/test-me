import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';

import styles from './KioskCardStyle';
import { Colors } from 'qualificame-native/app/styles';

import BodyText from 'qualificame-native/app/components/BodyText';
import PieGraph from 'qualificame-native/app/components/PieGraph';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';

import DelayedRendererContainer from 'qualificame-native/app/containers/DelayedRendererContainer';

export default class KioskCard extends PureComponent {
	
	handleNoData = (exc, avg, bad, awful) => {
		if(exc === 0 && avg === 0 && bad === 0 && awful === 0 )
			return 100;
	}

	render() {
		let { excellent, average, bad, awful, percent } = this.props;
		return (
			<TouchableOpacity 
				style={[styles.card, styles.justifyContentCenter, (this.props.addHorizontalMargin && styles.baseHorizontalMargin)]}
				onPress={this.props.onPress}
				activeOpacity={0.6}
			>
				<View style={[styles.row, styles.alignItemsCenter]}>
					<View style={[styles.flex1, styles.smallRightMargin]}>
						<SubtitleText 
							text={this.props.title}
							weight="medium"
							color={this.props.color}
						/>
						<View style={styles.row}>
							<View style={styles.tinyRightMargin}>
								<Feather name={this.props.iconName} size={24} color={Colors[this.props.color]}/>
							</View>
							<BodyText 
								text={this.props.text}
								weight="light"
								color='dark'
							/>
						</View>
					</View>
					<DelayedRendererContainer
						loader={(<View style={{height: 70}}></View>)}
					>
						<PieGraph
							width={70}
							height={70}
							data={[
								{x: "green",  y: excellent},
								{x: "blue",   y: average},
								{x: "orange", y: bad},
								{x: "pink",   y: awful},
								{x: "gray",   y: this.handleNoData(excellent, average, bad, awful)}
							]}
							label={percent+"%"}
							labelColor={Colors[this.props.color]}
							stroke={7}
						/>
					</DelayedRendererContainer>
				</View>
			</TouchableOpacity>
		);
	}
}

KioskCard.propTypes = {
	title: PropTypes.string,
	text: PropTypes.string,
	color: PropTypes.string,
	onPress: PropTypes.func,
	iconName: PropTypes.string,
	addHorizontalMargin: PropTypes.bool,
	excellent: PropTypes.number,
	average: PropTypes.number,
	bad: PropTypes.number,
	awful: PropTypes.number,
}

KioskCard.defaultProps = {
	title: "",
	text: "",
	color: "green",
	onPress: ()=>{},
	iconName: "activity",
	addHorizontalMargin: false,
	excellent: 47,
	average: 16,
	bad: 23,
	awful: 14,
}
