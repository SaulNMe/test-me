import React, { Component } from 'react';
import {
	View,
	SafeAreaView,
	Image,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';

import styles from './VerificationCodeScreenStyle';
import { Colors } from 'qualificame-native/app/styles';

import BackBtn from 'qualificame-native/app/components/BackBtn';
import HugeText from 'qualificame-native/app/components/HugeText';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';

export default class VerificationCodeScreen extends Component {	
	static navigationOptions = {
		header: null
	}
	
	state = {
		code: ''
	}

	handleVerificationCode = () => {
		Keyboard.dismiss()
		this.props.navigation.navigate('ConfirmPasswordScreen', {transition: 'collapseExpand'});
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
								text="Verificación"
								color="green"
								weight="bold"
							/>
							<SubtitleText
								text="Ingresa el código de verificación que mandamos al correo electrónico correspondiente"
								color="green"
								weight="light"
							/>
							<View style={styles.smallVerticalMargin}/>
							<LabeledInput 
								color="green"
								label="Código de verificación"
								iconName="mail"
							>
								<TextInput
									value={this.state.code}
									placeholder="Ingresa aquí el código de 6 dígitos"
									placeholderTextColor={Colors.gray}
									style={{color:Colors.dark}}
									selectionColor={Colors.green}
									keyboardType='numeric'
									onChangeText={code => this.setState({code})}
									onSubmitEditing={() => this.handleVerificationCode() }
								/>
							</LabeledInput>
						</View>
						<View style={styles.flex1}/>
						<SafeAreaView style={styles.baseVerticalMargin}>
							<PrimaryBtn
								disabled={!this.state.code}
								text="Continuar"
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
