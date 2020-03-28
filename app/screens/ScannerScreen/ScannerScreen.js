import React, { Component } from 'react';
import { Constants } from 'expo';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import {
	View,
	Text,
	Alert,
	TouchableWithoutFeedback,
} from 'react-native';

import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import styles from './ScannerScreenStyle';
import BodyText from 'qualificame-native/app/components/BodyText';
import CloseBtn from 'qualificame-native/app/components/CloseBtn';
import SetAuthInfoContainer from 'qualificame-native/app/containers/SetAuthInfoContainer';

import { connect } from 'react-redux';

import ApiService from 'qualificame-native/app/services/ApiService';

class ScannerScreen extends Component {	
	static navigationOptions = {
		header: null
	}
	state = {
		deniedPermission: false,
		requestingPermission: true,
		scanned: false,
		qrCode: '',
		kiosk: this.props.navigation.state.params.item,
	}

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({
			deniedPermission: status != 'granted',
			requestingPermission: false
		 });
	}

	handleBarCodeScanned = async ({ type, data }) => {
		if(type == 256 || type === 'org.iso.QRCode') {
			try {
				this.setState({ scanned: true });
				await ApiService.activateKiosk({token: data, id: this.state.kiosk.id});
				Alert.alert('¡Se ha activado el kiosko exitosamente!', `El kiosko ${this.state.kiosk.name} ha sido activado`);
				this.props.navigation.navigate('KioskDetailScreen');
			} catch (e) {
				Alert.alert('¡Oops! Ocurrió un eror', 'Verifica que el código QR sea el correcto');
				this.props.navigation.navigate('KioskDetailScreen');
			}
		}
	};
	
	render() {
		const { requestingPermission, scanned, deniedPermission } = this.state;
		return (
			<TouchableWithoutFeedback onPress={() => this.setState({scanned: false})}>
				<View style={[styles.flex1, styles.mainContainer, styles.alignItemFlexStart]}>
					<View style={[styles.title, styles.centerObjects]}>
						<View style={[styles.titleContainer, styles.justifyContentCenter]}>
							<BodyText
								align='center'
								text='Escanea el QR del kiosko para iniciar sesión.'
								color='white'
								weight='medium'
							/>
						</View>
					</View>
					<View style={[styles.justifyContentCenter, styles.squareContainer]}>
						<View style={[styles.column, styles.justifyContentCenter ]}>
							<View style={[styles.row]}>
								<View style={styles.leftTop}/>
								<View style={styles.rightTop}/>
							</View>
							<View style={[styles.row]}>
								<View style={styles.leftBottom}/>
								<View style={styles.rightBottom}/>
							</View>
						</View>
					</View>
	{/*
					{ (requestingPermission && !deniedPermission) && 
						<View style={[styles.above, styles.baseHorizontalMargin]}>
							<BodyText
								text='Requesting for camera permission'
								color='white'
							/>
						</View>
					}

					{ deniedPermission &&
						<View style={[styles.above, styles.baseHorizontalMargin]}>
							<BodyText
								text='No access to camera'
								color='white'
							/>
						</View>
					}*/}
								
					<BarCodeScanner
						onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
						style={[styles.barCodeScanner]}
					/>
					<View style={[styles.absolute, styles.navbar]}>
						<HeaderNavbar
							right={
								<CloseBtn 
									onPress={()=> this.props.navigation.navigate('KioskDetailScreen')}
								/>
							}
							statusBar="light-content"
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

mapStateToProps = () => ({})

export default connect(mapStateToProps)(ScannerScreen);