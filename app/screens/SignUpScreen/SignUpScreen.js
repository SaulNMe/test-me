import React, { Component } from 'react';
import {
	View,
	SafeAreaView,
	Image,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';

import styles from './SignUpScreenStyle';
import { Colors } from 'qualificame-native/app/styles';

import BackBtn from 'qualificame-native/app/components/BackBtn';
import HugeText from 'qualificame-native/app/components/HugeText';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';

export default class SignUpScreen extends Component {	
	static navigationOptions = {
		header: null
	}

	state = {
		companyName: ''
	}
	
	handleBusinessName = () => {
		Keyboard.dismiss()
		this.props.navigation.navigate('CreateAccountScreen', {transition: 'collapseExpand', companyName: this.state.companyName});
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
								text="¡Bienvenido!"
								color="green"
								weight="bold"
							/>
							<SubtitleText
								text="Cuéntanos sobre tu negocio, ¿Cuál es su nombre?"
								color="green"
								weight="light"
							/>
							<View style={styles.baseBottomMargin}/>
							<LabeledInput 
								color="green"
								label="Nombre de tu negocio"
								iconName="home"
							>
								<TextInput 
									value={this.state.companyName}
									placeholder="Escribe el nombre de tu negocio"
									placeholderTextColor={Colors.gray}
									style={{color:Colors.dark}}
									selectionColor={Colors.green}
									onChangeText={companyName => this.setState({companyName})}
									onSubmitEditing={this.state.companyName ? () => this.handleBusinessName() : () => Keyboard.dismiss()}
								/>
							</LabeledInput>
						</View>
						<View style={styles.flex1}/>
						<SafeAreaView style={styles.baseVerticalMargin}>
							<PrimaryBtn
								disabled={!this.state.companyName}
								text="Continuar"
								onPress={() => this.handleBusinessName()}

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



