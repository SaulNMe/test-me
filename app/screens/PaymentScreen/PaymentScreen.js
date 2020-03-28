import React, { Component } from 'react';
import {
	View,
	Text,
	Button,
	SafeAreaView,
	Image,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native';

import styles from './PaymentScreenStyle';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';
import HugeText from 'qualificame-native/app/components/HugeText';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import BackBtn from 'qualificame-native/app/components/BackBtn';
import { Colors, ApplicationStyles } from 'qualificame-native/app/styles';

export default class PaymentScreen extends Component {	
	static navigationOptions = {
		header: null
	}

	handlePayment = () => {
		Keyboard.dismiss();
		this.props.navigation.navigate('LoadingScreen', {
			transition: 'collapseExpand', 
			bgColor: 'green', 
			screen: 'KiosksScreen',
			title: 'Procesando...',
			subtitle: 'Estamos procesando tu pago. Puede tardar un par de minutos.'
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
					<View style={[styles.flex1, styles.baseHorizontalMargin, styles.justifyContentSpaceBetween]}>
						<View>
							<HugeText 
								text="Agrega tu forma de pago"
								color="green"
								weight="bold"
							/>
							<SubtitleText
								text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
								color="green"
								weight="light"
							/>
							<View style={styles.smallBottomMargin}/>
							<LabeledInput 
								color="green"
								label="Número de tarjeta de crédito"
								iconName="credit-card"
							>
								<TextInput 
									placeholder="Tu número de tarjeta de crédito"
									placeholderColor={Colors.gray}
									style={{color:Colors.dark}}
									selectionColor={Colors.green}
									maxLength={16}
									textContentType="creditCardNumber"
									keyboardType="numeric"
									onSubmitEditing={() => this.secondInput.focus()}
								/>
							</LabeledInput>
							<View style={styles.row}>
								<View style={styles.flex1}>
									<LabeledInput 
										color="green"
										label="Expiración"
									>
										<TextInput
											ref={(input) => this.secondInput = input}
											placeholder="MM/AA"
											placeholderColor={Colors.gray}
											style={{color:Colors.dark}}
											selectionColor={Colors.green}
											maxLength={4}
											keyboardType="numeric"
											onSubmitEditing={() => this.thirdInput.focus()}
										/>
									</LabeledInput>
								</View>
								<View style={[styles.flex1, styles.baseLeftMargin]}>
									<LabeledInput 
										color="green"
										label="CVV"
									>
										<TextInput 
											ref={(input) => this.thirdInput = input}
											placeholder="***"
											placeholderColor={Colors.gray}
											style={{color:Colors.dark}}
											selectionColor={Colors.green}
											textContentType="password"
											secureTextEntry={true}
											maxLength={3}
											keyboardType="numeric"
											onSubmitEditing={() => this.fourthInput.focus()}
										/>
									</LabeledInput>
								</View>		
							</View>
							<LabeledInput 
								color="green"
								label="Nombre en tu tarjeta de crédito"
								iconName="user"
							>
								<TextInput 
									ref={(input) => this.fourthInput = input}
									placeholder="Tu nombre en la tarjeta de credito"
									placeholderColor={Colors.gray}
									style={{color:Colors.dark}}
									selectionColor={Colors.green}
									onSubmitEditing={() => this.handlePayment()}
								/>
							</LabeledInput>
						</View>
						<SafeAreaView style={styles.baseVerticalMargin}>
							<PrimaryBtn
								text="Finalizar"
								onPress={() => this.handlePayment()}
							/>
						</SafeAreaView>
					</View>
					<Image 
						style={[styles.absolute, styles.setToBot, styles.behind, styles.footerImage]}
						source={require('qualificame-native/assets/waves.png')}
						resizeMode='stretch'
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}
