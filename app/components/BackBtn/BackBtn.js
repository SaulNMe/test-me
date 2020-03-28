import React, { PureComponent } from 'react';
import { 
	View, 
	Platform,
	TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';
import LabelText from 'qualificame-native/app/components/LabelText';
import { Colors } from 'qualificame-native/app/styles';
import NavigationService from 'qualificame-native/app/services/NavigationService.js';
import styles from './BackBtnStyle';

export default class BackBtn extends PureComponent {
	render() {
		return (
			<View style={[styles.row]}>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() =>{
						this.props.onPress();
						NavigationService.goBack()
					}} 
					style={[styles.row, styles.alignItemsCenter]}
				>
					<Feather
						name={Platform.OS === 'ios' ? 'chevron-left':'arrow-left'}
						size={Platform.OS === 'ios' ? 35:24}
						color={Colors[this.props.color]}
					/>
					{this.props.hasLabel &&
						<View style={styles.column}>
							<LabelText
								text='Regresar'
								color={Colors[this.props.color]}
							/>
						</View>
					}
				</TouchableOpacity>
			</View>
		);
	}
}

BackBtn.propTypes = {
	color: PropTypes.string,
	hasLabel: PropTypes.bool,
	onPress: PropTypes.func,
}

BackBtn.defaultProps = {
	color: 'black',
	hasLabel: false,
	onPress: () => {},
}
