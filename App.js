import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from 'qualificame-native/app/Store.js';
import 'qualificame-native/config/ReactotronConfig'
import moment from 'moment';
import './locales/moment-es';
import AppNavigator from './app/Router';
import ApiInitializerContainer from 'qualificame-native/app/containers/ApiInitializerContainer';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import NavigationService from 'qualificame-native/app/services/NavigationService';
import { Feather } from '@expo/vector-icons';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor } from 'qualificame-native/app/Store.js';

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component {

	state = {
		isReady: false,
	}

	async _cacheResourcesAsync() {
		const images = [
			require('qualificame-native/assets/splashCustom.png'),
			require('qualificame-native/assets/bgImage.png'),
			require('qualificame-native/assets/blue-waves-top.png'),
			require('qualificame-native/assets/green-waves-top.png'),
			require('qualificame-native/assets/orange-waves-top.png'),
			require('qualificame-native/assets/pink-waves-top.png'),
			require('qualificame-native/assets/waves.png'),
			require('qualificame-native/assets/large_logo.png'),
			require('qualificame-native/assets/medium_logo.png'),
			require('qualificame-native/assets/small_logo.png'),
		];

		const cacheImages = images.map((image) => {
			return Asset.fromModule(image).downloadAsync();
		});

		const fontAssets = cacheFonts([Feather.font]);

		return Promise.all([ ...cacheImages, ...fontAssets ]);

	}

	render() {
		if (!this.state.isReady) {
			return (
				<AppLoading
					startAsync={this._cacheResourcesAsync}
					onFinish={() => this.setState({ isReady: true })}
					onError={console.warn}
				/>
			);
		}
		return (
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<ApiInitializerContainer>
						<View style={styles.container}>
							<AppNavigator 
								ref={navigatorRef => {
									NavigationService.setTopLevelNavigator(navigatorRef);
								}}
							/>
						</View>
					</ApiInitializerContainer>
				</PersistGate>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
