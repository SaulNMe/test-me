import React, { Component } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	Alert,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native';

import styles from './ChangePasswordScreenStyle';
import { Colors, ApplicationStyles } from 'qualificame-native/app/styles';

import BackBtn from 'qualificame-native/app/components/BackBtn';
import BodyText from 'qualificame-native/app/components/BodyText';
import AlertBtn from 'qualificame-native/app/components/AlertBtn';
import ShowAlert from 'qualificame-native/app/components/ShowAlert';
import TitleText from 'qualificame-native/app/components/TitleText';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import SecondaryBtn from 'qualificame-native/app/components/SecondaryBtn';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import BtnLogOutContainer from 'qualificame-native/app/containers/BtnLogOutContainer';

import ApiService from 'qualificame-native/app/services/ApiService';


export default class ChangePasswordScreen extends Component {	
	static navigationOptions = {
		header: null
	}

	state = {
		showAlert: false,
		alertHead: '',
		alertBody: '',
		oldPassword: '',
		newPassword: '',
		confirmPass: '',
		isLoading: false
	}

	handleSavePassword = async (logout) => {
		try {		
			this.setState({ isLoading: true })	
			await ApiService.changePassword(this.state.oldPassword, this.state.newPassword, this.state.confirmPass)
			logout();
			Alert.alert('¡Se ha cambiado tu contraseña exitosamente!', 'Vuelve a iniciar sesión con tu nueva contraseña');
			this.props.navigation.navigate('AuthLoading');
			this.setState({ isLoading: false })	
		} catch (e) {
			this.setState({
				showAlert: true,
				alertHead: 'No se logró cambiar la contraseña',
				alertBody: 'Inténtalo más tarde',
				isLoading: false
			});
		}
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.container}>
					<HeaderNavbar 
						left={ <BackBtn color='white'/> }
						center={
							<TitleText 
								text="Contraseña"
								color="white"
							/>
						}
						right={
							<AlertBtn 
								onPress={()=> this.props.navigation.navigate('AlertsScreen') }
							/>
						}
						bgColor="pink"
						statusBar="light-content"
					/>

					<View style={[styles.baseVerticalMargin, styles.baseHorizontalMargin, styles.flex1]}>	
						<View style={styles.smallBottomMargin}>
							<BodyText 
								text="Por favor llena los datos para cambiar tu contraseña"
								color="dark"
								weight="light"
							/>
						</View>

						<LabeledInput 
							label="Contraseña actual"
							color="pink"
						>
							<TextInput
								value={this.state.oldPassword}
								placeholder="Contraseña actual"
								placeholderTextColor={Colors.gray}
								style={{color:Colors.dark}}
								selectionColor={Colors.pink}
								textContentType="password"
								secureTextEntry={true}
								onChangeText={oldPassword => this.setState({oldPassword})}
								onSubmitEditing={() => this.secondInput.focus()}
							/>
						</LabeledInput>
						<LabeledInput 
							label="Contraseña nueva"
							color="pink"
						>
							<TextInput
								ref={(input) => this.secondInput = input}
								value={this.state.newPassword}
								placeholder="Contraseña nueva"
								placeholderTextColor={Colors.gray}
								style={{color:Colors.dark}}
								selectionColor={Colors.pink}
								textContentType="password"
								secureTextEntry={true}
								onChangeText={newPassword => this.setState({newPassword})}
								onSubmitEditing={() => this.thirdInput.focus()}
							/>
						</LabeledInput>
						<BtnLogOutContainer>
							{(logout) => (
								<LabeledInput 
									label="Confirmar contraseña nueva"
									color="pink"
								>
									<TextInput 
										ref={(input) => this.thirdInput = input}
										value={this.state.confirmPass}
										placeholder="Confirmar contraseña nueva"
										placeholderTextColor={Colors.gray}
										style={{color:Colors.dark}}
										selectionColor={Colors.pink}
										textContentType="password"
										secureTextEntry={true}
										onChangeText={confirmPass => this.setState({confirmPass})}
										onSubmitEditing={() => this.handleSavePassword(logout)}
									/>
								</LabeledInput>
							)}
						</BtnLogOutContainer>
					</View>
					<SafeAreaView>
						<View style={[styles.baseHorizontalMargin, styles.baseVerticalMargin, styles.row]}>
							<View style={[styles.smallRightMargin, styles.flex1]}>
								<SecondaryBtn 
									text="Cancelar"
									color="pink"
									onPress={()=> this.props.navigation.navigate('MyAccountScreen')}
								/>
							</View>
							<View style={[styles.smallLeftMargin, styles.flex1]}>
								<BtnLogOutContainer>
									{(logout) => (
										<PrimaryBtn
											disabled={!this.state.oldPassword || !this.state.newPassword || !this.state.confirmPass || this.state.isLoading} 
											text={this.state.isLoading ? 'Guardando...': "Guardar"}
											bgColor="pink"
											onPress={()=> this.handleSavePassword(logout)}
										/>
									)}
								</BtnLogOutContainer>
							</View>
						</View>
					</SafeAreaView>
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
