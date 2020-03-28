import React, { PureComponent } from 'react';
import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './BubbleImagesStyle';

import BodyText from 'qualificame-native/app/components/BodyText';

export default class BubbleImages extends PureComponent {
	render() {
		return (
			<View style={[styles.row, {marginHorizontal: 80, height: 330}]}>
				<View style={styles.justifyContentSpaceBetween}>
					<View>	
						<Image 
							source={require('qualificame-native/assets/image1.png')}
							style={styles.bubbleOne}
							resizeMode='cover'
						/>
					</View>
					<View style={styles.paddingRight}>	
						<BodyText
							text= {this.props.secondText}
							weight= 'light'
							color= {this.props.textColor}
						/>
					</View>
					<View style={{marginLeft: 35}}>	
						<Image 
							source={require('qualificame-native/assets/image3.png')}
							style={styles.bubbleThree}
							resizeMode='cover'
						/>
					</View>
				</View>
				<View style={styles.justifyContentSpaceEvenly}>
					<View style={styles.paddingLeft}>	
						<BodyText
							text= {this.props.firstText}
							weight= 'light'
							color= {this.props.textColor}
						/>
					</View>
					<View>	
						<Image 
							source={require('qualificame-native/assets/image2.png')}
							style={styles.bubbleTwo}
							resizeMode='cover'
						/>
					</View>
					<View style={styles.paddingLeft}>	
						<BodyText
							text= {this.props.thirdText}
							weight= 'light'
							color= {this.props.textColor}
						/>
					</View>
				</View>
			</View>
		);
	}
}
	BubbleImages.propTypes = {
		firstText: PropTypes.string,
		secondText: PropTypes.string,
		thirdText: PropTypes.string,
		textColor: PropTypes.string
	}

	BubbleImages.defaultProps = {
		firstText: '1 Lorem ipsum dolor.',
		secondText: '2 Lorem ipsum dolor sit.',
		thirdText: '3 Lorem ipsum dolor sit.',
		textColor: 'red'
	}
