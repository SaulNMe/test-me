import React, { Component } from 'react';
import {
	View,
	SafeAreaView,
	Image,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';

import styles from './SendEmailScreenStyle';
import { Colors } from 'qualificame-native/app/styles';

import BackBtn from 'qualificame-native/app/components/BackBtn';
import HugeText from 'qualificame-native/app/components/HugeText';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';

export default class SendEmailScreen extends Component {	
	static navigationOptions = {
		header: null
	}

	state = {
		email: ''
	}

	handleSendEmail = () => {
		Keyboard.dismiss()
		this.props.navigation.navigate('VerificationCodeScreen', {transition: 'collapseExpand'});
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
								text="Recuperar contraseña"
								color="green"
								weight="bold"
							/>
							<View style={styles.smallBottomMargin}>
								<SubtitleText
									text="Ingresa el correo electrónico asiociado con tu cuenta."
									color="green"
									weight="light"
								/>
							</View>
							<SubtitleText
								text="Te mandaremos un link con un código para poder recuperar tu contraseña."
								color="green"
								weight="light"
							/>
							<View style={styles.smallVerticalMargin}/>
							<LabeledInput 
								color="green"
								label="Correo electrónico"
								iconName="mail"
							>
								<TextInput 
									value={this.state.email}
									placeholder="Tu correo electrónico"
									placeholderTextColor={Colors.gray}
									style={{color:Colors.dark}}
									selectionColor={Colors.green}
									keyboardType='email-address'
									textContentType='emailAddress'
									onChangeText={email => this.setState({email})}
									onSubmitEditing={() => this.handleSendEmail() }
								/>
							</LabeledInput>
						</View>
						<View style={styles.flex1}/>
						<SafeAreaView style={styles.baseVerticalMargin}>
							<PrimaryBtn
								disabled={!this.state.email}
								text="Continuar"
								onPress={() => this.handleSendEmail()}
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
