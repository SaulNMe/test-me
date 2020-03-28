import React, { PureComponent } from 'react';
import { 
	View,
	TouchableOpacity 
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './LoginBtnStyle';
import BodyText from 'qualificame-native/app/components/BodyText';

export default class LoginBtn extends PureComponent {
	render() {
		return (
			<TouchableOpacity
				onPress={this.props.onPress}
				activeOpacity={0.6}
			>
				<BodyText
					text="Iniciar sesión"
					color="white"
					weight="bold"
				/>
			</TouchableOpacity>
		);
	}
}

	LoginBtn.propTypes = {
		onPress: PropTypes.func
	}

	LoginBtn.defaultProps = {
		onPress: ()=>{}
	}
