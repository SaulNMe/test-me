import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './ListEmptyStateStyle';
import TitleText from 'qualificame-native/app/components/TitleText';
import HugeText from 'qualificame-native/app/components/HugeText';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';

export default class ListEmptyState extends PureComponent {
	render() {
		return (
			<View style={[styles.fullWidth, styles.baseVerticalMargin, styles.baseHorizontalPadding]}>
				<View style={[styles.justifyContentCenter]}>
					{
						(this.props.username.length>0) && 
						<HugeText
							text={"¡Bienvenido " + this.props.username + "!"}
							color={this.props.color}
							align='center'
							weight='medium'
						/>
					}
					<TitleText
						text={this.props.text}
						color={this.props.color}
						align='center'
						weight='light'
					/>
				</View>
			</View>
		);
	}
}

	ListEmptyState.propTypes = {
		onPress: PropTypes.func,
		color: PropTypes.string,
		username: PropTypes.string,
		text: PropTypes.string,
		btnText: PropTypes.string,
	}

	ListEmptyState.defaultProps = {
		onPress: ()=>{},
		color: '',
		username: '',
		text: 'No hay elementos en la lista. Comienza agregando uno',
		btnText: '',
	}
