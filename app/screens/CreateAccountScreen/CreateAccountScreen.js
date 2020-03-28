import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Text,
	Button,
	SafeAreaView,
	Image,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	KeyboardAvoidingView,
} from 'react-native';

import styles from './CreateAccountScreenStyle';
import { Colors, ApplicationStyles} from 'qualificame-native/app/styles';

import BackBtn from 'qualificame-native/app/components/BackBtn';
import HugeText from 'qualificame-native/app/components/HugeText';
import ShowAlert from 'qualificame-native/app/components/ShowAlert';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';

export default class CreateAccountScreen extends Component {	
	static navigationOptions = {
		header: null
	}

	state = {
		showAlert: false,
		alertHead: '',
		alertBody: '',
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	}
	
	handleCreateAccount = () => {
		Keyboard.dismiss();
		let email = /\S+@\S+\.\S+/;

		if (!email.test(this.state.email)){
			return this.setState({
				showAlert: true,
				alertHead: 'Correo inválido',
				alertBody: 'Asegúrate que tu correo electrónico esté correcto'
			})
		}
		if (this.state.password.length < 6) {
			return this.setState({
				showAlert: true,
				alertHead: 'Contraseña inválida',
				alertBody: 'Asegúrate que tu contraseña tenga mínimo 6 caracteres'
			})
		}

		this.props.navigation.navigate('LoadingScreen', {
			transition: 'collapseExpand', 
			bgColor: 'green', 
			screen: 'KiosksScreen',
			title: 'Cargando...',
			subtitle: 'Estamos creando tu cuenta. Puede tardar un par de minutos.',
			accountData: {
				first_name: this.state.firstName,
				last_name: this.state.lastName,
				email: this.state.email,
				password: this.state.password,
				company_name: this.props.navigation.state.params.companyName, 
			}
		})
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.container}> 
					<HeaderNavbar
						left={
							<BackBtn color='green'/>
						}
						center={
							<ResizableLogo
								size="small"
							/>
						}
						statusBar="dark-content"
					/>
					<KeyboardAvoidingView 
						style={[styles.container, styles.baseHorizontalMargin]}
						behavior="padding" 
					>
						<ScrollView>
							<HugeText 
								text="Crea tu cuenta"
								color="green"
								weight="bold"
							/>
							<SubtitleText
								text={'Eres dueño de ' + this.props.navigation.state.params.companyName + ', pero ahora cuentanos más sobre tí'}
								color="green"
								weight="light"
							/>
							<View style={styles.smallBottomMargin}/>
							<LabeledInput 
								color="green"
								label="Nombre"
								iconName="user"
							>
								<TextInput
									value={this.state.firstName}
									placeholder="Tu nombre"
									placeholderColor={Colors.gray}
									style={{color:Colors.dark}}
									selectionColor={Colors.green}
									onChangeText={ firstName => this.setState({firstName})}
									onSubmitEditing={() => this.secondInput.focus()}
								/>
							</LabeledInput>
							<LabeledInput 
								color="green"
								label="Apellidos"
								iconName="user"
							>
								<TextInput
									ref={(input) => this.secondInput = input}
									value={this.state.lastName} 
									placeholder="Tu apellido completo"
									placeholderColor={Colors.gray}
									style={{color:Colors.dark}}
									selectionColor={Colors.green}
									onChangeText={ lastName => this.setState({lastName})}
									onSubmitEditing={() => this.thirdInput.focus()}
								/>
							</LabeledInput>
							<LabeledInput 
								color="green"
								label="Correo eletrónico"
								iconName="mail"
							>
								<TextInput 
									value={this.state.email}
									ref={(input) => this.thirdInput = input}
									placeholder="Tu correo eletrónico"
									placeholderColor={Colors.gray}
									style={{color:Colors.dark}}
									selectionColor={Colors.green}
									keyboardType='email-address'
									textContentType='emailAddress'
									autoCapitalize='none'
									onChangeText={ email => this.setState({email})}
									onSubmitEditing={() => this.fourthInput.focus()}
								/>	
							</LabeledInput>
							<LabeledInput 
								color="green"
								label="Contraseña"
								iconName="lock"
							>
								<TextInput 
									value={this.state.password}
									ref={(input) => this.fourthInput = input}
									placeholder="Tu contraseña"
									placeholderColor={Colors.gray}
									style={{color:Colors.dark}}
									selectionColor={Colors.green}
									onChangeText={ password => this.setState({password})}
									textContentType="password"
									autoCapitalize='none'
									secureTextEntry={true}
									onSubmitEditing={this.state.firstName || this.state.lastName || this.state.email || this.state.password ? () => this.handleCreateAccount() : () => Keyboard.dismiss()}
								/>
							</LabeledInput>
						</ScrollView>
					</KeyboardAvoidingView>
					<SafeAreaView style={[styles.baseVerticalMargin, styles.baseHorizontalMargin]}>
						<PrimaryBtn
							disabled={!this.state.firstName || !this.state.lastName || !this.state.email || !this.state.password}
							text="Finalizar"
							onPress={()=> this.handleCreateAccount() }
						/>
					</SafeAreaView>
					<Image 
						style={[styles.absolute, styles.setToBot, styles.behind, styles.footerImage]}
						source={require('qualificame-native/assets/waves.png')}
						resizeMode='stretch'
					/>
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
				</View>
			</TouchableWithoutFeedback>
		);
	}
}
