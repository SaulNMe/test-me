import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View, Linking} from 'react-native';
import PropTypes from 'prop-types';

import styles from './IconButtonStyle';

import { Feather } from '@expo/vector-icons';
import { Colors } from 'qualificame-native/app/styles';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';

export default class IconButton extends PureComponent {
	render() {
		return (
			<View>
				<TouchableOpacity 
					style={[styles.row, styles.centerObjects]}
					disabled={this.props.status}
					onPress={ ()=>{ Linking.openURL('https://google.com')}}
				>	
					<View style={styles.smallRightMargin}>	
						<Feather name={this.props.iconName} size={20} color={Colors[this.props.color]}/>
					</View>
					<SubtitleText
						text= {this.props.text}
						color= {this.props.color}
						weight= 'medium'
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

	IconButton.propTypes = {
		iconName: PropTypes.string,
		text: PropTypes.string,
		color: PropTypes.string,
		status: PropTypes.bool
	}

	IconButton.defaultProps = {
		iconName: 'award',
		text: '',
		color: 'white',
		status: false

	}
