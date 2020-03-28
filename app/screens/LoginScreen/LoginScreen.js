import React, { Component } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	Keyboard,
	Alert,
	TouchableWithoutFeedback
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './LoginScreenStyle';
import { Colors, ApplicationStyles } from 'qualificame-native/app/styles';

import BackBtn from 'qualificame-native/app/components/BackBtn';
import HugeText from 'qualificame-native/app/components/HugeText';
import ShowAlert from 'qualificame-native/app/components/ShowAlert';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import TextDivider from 'qualificame-native/app/components/TextDivider';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import SecondaryBtn from 'qualificame-native/app/components/SecondaryBtn';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';

import SetAuthInfoContainer from 'qualificame-native/app/containers/SetAuthInfoContainer';

export default class LoginScreen extends Component {		
	static navigationOptions = {
		header: null
	}

	state={
		showAlert: false,
		alertHead: '',
		alertBody: '',
		email: '',
		password: ''
	}

	handleLogin = (login) => {
		Keyboard.dismiss();
		let email = /\S+@\S+\.\S+/;
		if (!email.test(this.state.email)){
			return this.setState({
				showAlert: true,
				alertHead: 'Correo inválido',
				alertBody: "Asegúrate que tu correo esté bien escrito y contenga un '@' y un ' . '"
			})
		}

		login({
			username: this.state.email,
			password: this.state.password
		})
		//this.props.navigation.navigate('KiosksScreen', {transition: 'collapseExpand'});
	}

	disabledButton = (isLoading) => {
		if(this.state.email && this.state.password) {
			if (isLoading){
				return true;
			} else return false;
		}
		return true;
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<LinearGradient colors={['#0F9F92', '#12B184']} style={[styles.container]} start={[0, 0]} end={[1, 0]}>
					<HeaderNavbar 
						left={<BackBtn color='white'/>}
						center={
							<ResizableLogo
								size="small"
							/>
						}
						statusBar="light-content"
					/>
					<View style={[styles.flex1, styles.baseHorizontalMargin, styles.justifyContentSpaceBetween]}>
						<View>
							<HugeText
								text="Inicia Sesión"
								color="white"
								weight="medium"
							/>
							<View style={styles.smallVerticalMargin}>
								<SubtitleText
									text="Mantente al tanto con las opiniones de tus clientes."
									color="white"
									weight="light"
								/>
							</View>
							<View style={styles.smallVerticalMargin}/>
							<LabeledInput 
								color="white"
								label="Correo"
								iconName="user"
							>
								<TextInput
									value={this.state.email}
									placeholder="Tu correo"
									placeholderTextColor={Colors.white}
									autoCapitalize='none'
									keyboardType='email-address'
									textContentType='emailAddress'
									style={{color:Colors.white}}
									onChangeText={(email) => this.setState({email})}
									selectionColor={Colors.white}
									onSubmitEditing={() => this.secondInput.focus()}
								/>
							</LabeledInput>

							<LabeledInput 
								color="white"
								label="Contraseña"
								iconName="lock"
							>
								<SetAuthInfoContainer>
									{(login) => {
										return(
											<TextInput
												ref={(input) => this.secondInput = input}
												value={this.state.password}
												placeholder="Tu contraseña"
												placeholderTextColor={Colors.white}
												style={{color:Colors.white}}
												onChangeText={(password) => this.setState({password})}
												selectionColor={Colors.white}
												textContentType="password"
												secureTextEntry={true}
												onSubmitEditing={this.state.email && this.state.password ? () => this.handleLogin(login) : () => Keyboard.dismiss()}
											/>
										);
									}}
								</SetAuthInfoContainer>
							</LabeledInput>
						</View>
						<SafeAreaView style={styles.baseVerticalMargin}>
							<SetAuthInfoContainer>
								{(login, isLoading) => {
									return(
										<PrimaryBtn 
											disabled={this.disabledButton(isLoading)}
											text={isLoading ? "Iniciando sesión..." : "Iniciar sesión" }
											onPress={() => this.handleLogin(login)}
										/>
									);
								}}
							</SetAuthInfoContainer>
							{/*<TextDivider
								text="¿Olvidaste tu contraseña?"
								addVerticalMargin
								addHorizontalMargin
							/>
							<SecondaryBtn 
								onPress={() => this.props.navigation.navigate('SendEmailScreen')}
								text="Recuperar contraseña"
								color="white"
								bgColor='transparent'
							/>			*/}	
						</SafeAreaView>
					</View>
					{ this.state.showAlert && 
				        <ShowAlert
							show={this.state.showAlert}
							showProgress={false}
							title={this.state.alertHead}
							message={this.state.alertBody}
							showCancelButton={false}
							showConfirmButton
							confirmText='Ok'
							confirmButtonColor={Colors.red}
							onConfirmPressed={() => this.setState({showAlert: false, alertHead: '', alertBody: ''})}
				        />
					}
				</LinearGradient>
			</TouchableWithoutFeedback>
		);
	}
}
