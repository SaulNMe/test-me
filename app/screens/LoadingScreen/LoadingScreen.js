import React, { Component } from 'react';
import {
	View,
	Text,
	StatusBar,
	Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './LoadingScreenStyle';

import HugeText from 'qualificame-native/app/components/HugeText';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';

import ApiService from 'qualificame-native/app/services/ApiService';

export default class LoadingScreen extends Component {	
	static navigationOptions = {
		header: null
	}
	state = {
		bgColor: ''
	}

	summaryNavigation =  (data, kiosk, startDatetime, endDatetime) => {
		this.props.navigation.dispatch({
			type: 'ReplaceCurrentScreen',
			routeName: 'SummaryReportScreen',
			params: [data, {kiosk, startDatetime, endDatetime}],
			key: 'SummaryReportScreen'
		})
	}

	createAccount = () => {
		Alert.alert('¡Cuenta Creada!', `Tu nueva cuenta con correo ${this.props.navigation.state.params.accountData.email} ha sido creada exitosamente. Ahora inicia sesión y comienza a utilizar Qualificame.`);
		this.props.navigation.navigate('AuthLoading');
	}

	async componentDidMount() {
		let bgColor = this.props.navigation.state.params.bgColor;
		this.setState({bgColor: bgColor ? bgColor : ''})
		if (this.props.navigation.state.params.screen === 'SummaryReportScreen'){
			let { kiosk } = this.props.navigation.state.params.state;
			let { startDatetime } = this.props.navigation.state.params.state;
			let { endDatetime } = this.props.navigation.state.params.state;
			await ApiService.createReport(kiosk.id, startDatetime, endDatetime).then(res => {
				this.summaryNavigation(res.report, kiosk, startDatetime, endDatetime);
			}, err => { 
				Alert.alert('¡Oops! Ocurrió un error', 'Vuelve a intentarlo más tarde');
				// throw err;
				this.props.navigation.goBack();
			});
		} else if (this.props.navigation.state.params.screen === 'KiosksScreen'){
			let { email } = this.props.navigation.state.params.accountData;
			let { password } = this.props.navigation.state.params.accountData;
			let { first_name } = this.props.navigation.state.params.accountData;
			let { last_name } = this.props.navigation.state.params.accountData;
			let { company_name } = this.props.navigation.state.params.accountData;
			await ApiService.createUser({email, password, first_name, last_name, company_name}).then(res => {
				this.createAccount();
			}, err => {
				Alert.alert('Correo inválido', 'Este correo electrónico no está disponible');
				// throw err;
				this.props.navigation.goBack();
			})
				
		} else {
			setTimeout(() => {
				this.props.navigation.navigate(this.props.navigation.state.params.screen)
			}, 2000)
		}
	}
	render() {
		let gradientColors;
		let textColor;
		switch(this.state.bgColor) {
			case 'green':
				gradientColors = ['#0F9F92', '#12B184'];
				textColor = "white";
			break;
			case 'blue':
				gradientColors = ['#154BBA', '#107EC2'];
				textColor = "white";
			break;
			case 'orange':
				gradientColors = ['#E62808', '#FC680A'];
				textColor = "white";
			break;
			case 'pink':
				gradientColors = ['#E31862', '#EB194D'];
				textColor = "white";
			break;
			default:
				gradientColors = ['#fff', '#fff'];
				textColor = "dark";
			break;
		}
		return (
			<View style={styles.container}>
				<StatusBar barStyle='light-content'/>
				<LinearGradient colors={gradientColors} style={[styles.container, styles.baseHorizontalPadding, styles.statusBarSpace, styles.justifyContentCenter]} start={[0, 0]} end={[1, 0]}>
					<HugeText
						text={this.props.navigation.state.params.title}
						color={textColor}
						align='center'
					/>
					<SubtitleText
						text={this.props.navigation.state.params.subtitle}
						color={textColor}
						align='center'
					/>
				</LinearGradient>
			</View>
		);
	}
}
