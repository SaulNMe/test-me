import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './ListErrorStateStyle';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';

export default class ListErrorState extends PureComponent {
	render() {
		return (
			<View style={[styles.fullWidth, styles.baseHorizontalPadding, styles.baseVerticalMargin]}>
				<View style={[styles.row, styles.justifyContentCenter]}>
					<SubtitleText
						align='center'
						text={this.props.text}
						color='dark'
					/>
				</View>
{/*				<View style={[styles.baseVerticalMargin]}>
					<PrimaryBtn 
						onPress={this.props.onPress}
						text={this.props.btnText}
						bgColor={this.props.color}
						hasHorizontalMargin
					/>
				</View>*/}
			</View>
		);
	}
}

	ListErrorState.propTypes = {
		onPress: PropTypes.func,
		color: PropTypes.string,
		text: PropTypes.string,
		btnText: PropTypes.string,
	}

	ListErrorState.defaultProps = {
		onPress: ()=>{},
		color: '',
		text: "Parece que ocurrió un error. Vuelve a intentar más tarde",
		btnText: '',
	}
