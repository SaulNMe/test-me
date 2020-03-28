import React, { Component } from 'react';
import {
	View,
	SafeAreaView,
	Image,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';

import styles from './ConfirmPasswordScreenStyle';
import { Colors } from 'qualificame-native/app/styles';

import BackBtn from 'qualificame-native/app/components/BackBtn';
import HugeText from 'qualificame-native/app/components/HugeText';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';

export default class ConfirmPasswordScreen extends Component {	
	static navigationOptions = {
		header: null
	}
	
	state = {
		newPassword: '',
		confirmPassword: ''
	}

	handleVerificationCode = () => {
		Keyboard.dismiss()
		this.props.navigation.navigate('ConfirmPasswordScreen', {transition: 'collapseExpand'});
		this.props.navigation.navigate('LoadingScreen', {
			transition: 'collapseExpand', 
			bgColor: 'green', 
			screen: 'LoginScreen',
			title: '¡Proceso exitoso!',
			subtitle: '¡Se ha realizado el cambio de contraseña de manera exitosa!\n\nUtiliza está contraseña para iniciar sesión a partir de ahora'
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
					<View style={[styles.flex1, styles.baseHorizontalMargin]}>
						<View>
							<HugeText 
								text="Nueva contraseña"
								color="green"
								weight="bold"
							/>
							<SubtitleText
								text="Por favor eligé tu nueva contraseña"
								color="green"
								weight="light"
							/>
							<View style={styles.smallVerticalMargin}/>
							<LabeledInput 
								color="green"
								label="Contraseña nueva"
								iconName="mail"
							>
								<TextInput 
									value={this.state.newPassword}
									placeholder="Nueva contraseña"
									placeholderTextColor={Colors.gray}
									style={{color:Colors.dark}}
									selectionColor={Colors.green}
									textContentType="password"
									secureTextEntry={true}
									onChangeText={newPassword => this.setState({newPassword})}
									onSubmitEditing={() => this.handleVerificationCode() }
								/>
							</LabeledInput>
							<View style={styles.smallBottomMargin}/>
							<LabeledInput 
								color="green"
								label="Confirmar contraseña nueva"
								iconName="mail"
							>
								<TextInput 
									value={this.state.confirmPassword}
									placeholder="Confirmar contraseña"
									placeholderTextColor={Colors.gray}
									style={{color:Colors.dark}}
									selectionColor={Colors.green}
									textContentType="password"
									secureTextEntry={true}
									onChangeText={confirmPassword => this.setState({confirmPassword})}
									onSubmitEditing={() => this.handleVerificationCode() }
								/>
							</LabeledInput>
						</View>
						<View style={styles.flex1}/>
						<SafeAreaView style={styles.baseVerticalMargin}>
							<PrimaryBtn
								disabled={this.state.newPassword != this.state.confirmPassword || !this.state.newPassword || !this.state.newPassword}
								text="Aplicar cambios"
								onPress={() => this.handleVerificationCode()}
							/>
						</SafeAreaView>
					</View>
					<Image 
						style={[styles.absolute, styles.setToBot, styles.behind, styles.footerImage ]}
						source={require('qualificame-native/assets/waves.png')}
						resizeMode='stretch'
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}
