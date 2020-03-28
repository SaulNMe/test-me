import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
	View,
	Image,
} from 'react-native';

import styles from './AuthLoadingScreenStyle';

import { getIsLoggedIn } from 'qualificame-native/app/reducers';
import { connect } from 'react-redux';

class AuthLoadingScreen extends Component {

	constructor(props) {
		super(props);
		this._boostrapAsync();
	}

	_boostrapAsync = async () => {
		this.props.navigation.navigate(this.props.loggedIn? 'App':'Auth');
	}

	render() {

		return (
			<View style={styles.container}>
				<Image 
					style={styles.imageFill}
					source={require('qualificame-native/assets/splash.png')}/>
			</View>
		);
	}
}


mapStateToProps = state => ({
	loggedIn: getIsLoggedIn(state)
});

export default connect(mapStateToProps)(AuthLoadingScreen);