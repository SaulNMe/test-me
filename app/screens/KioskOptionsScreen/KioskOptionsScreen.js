import React, { Component } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	TextInput,
	ActivityIndicator,
	KeyboardAvoidingView,
	Switch
} from 'react-native';

import styles from './KioskOptionsScreenStyle';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';
import CloseBtn from 'qualificame-native/app/components/CloseBtn';
import HugeText from 'qualificame-native/app/components/HugeText';
import BodyText from 'qualificame-native/app/components/BodyText';
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import TinyText from 'qualificame-native/app/components/TinyText';
import BackBtn from 'qualificame-native/app/components/BackBtn';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import { Colors, ApplicationStyles } from 'qualificame-native/app/styles';
import Divider from 'qualificame-native/app/components/Divider';

import QuestionsContainer from 'qualificame-native/app/containers/QuestionsContainer';

export default class KioskOptionsScreen extends Component {	
	static navigationOptions = {
		header: null,
	}

	state = {
		questionsActivated: false,
		showQuestions: false
	}
	
	componentDidMount () {
		let kiosk = this.props.navigation.state.params.item;
		this.setState({
			questionsActivated: kiosk.enabled_questions,
			showQuestions: kiosk.enabled_questions
		})
	}

	handleChange = (value) => {
		this.setState({welcomeMessage: value})
	}
	
	handleSwitchChange = () => {
		this.requisitionScroll.scrollTo(({x: 0, animated: true}));
		this.setState({ questionsActivated: !this.state.questionsActivated });
		setTimeout(() => {
			this.setState({ showQuestions: !this.state.showQuestions });
		}, this.state.questionsActivated ? 400: 0);
	}

	render() {
		return (
			<View style={styles.container}>
				<HeaderNavbar 
					left={
						<BackBtn />
					}
					center={
						<ResizableLogo
							size="small"
						/>
					}
					right={
						<CloseBtn 
							onPress={()=> this.props.navigation.navigate('KioskDetailScreen')}
						/>
					}
					statusBar="dark-content"
				/>
				<KeyboardAvoidingView 
					style={styles.container} 
					behavior="padding" 
					enabled
				>
					<QuestionsContainer
						kioskId={this.props.navigation.state.params.item.id}
					>
						{({ kiosk, questions, choices, isLoading, hasError, onInputChange, onSubmit, isSaving }) => {
							if(isLoading) {
								return (
									<View style={[styles.baseHorizontalPadding, styles.flex, styles.alignItemsCenter]}>
										<HugeText 
											text={`Preguntas y Opciones de ${kiosk.name}`}
											weight="bold"
											color="dark"
										/>
										<View style={styles.flex1}>
											<ActivityIndicator size='large' color={Colors.green} style={styles.baseTopMargin}/>
										</View>
									</View>								
								)
							}
							return (
								<View style={styles.flex1}>
									<ScrollView  
										ref={(node) => this.requisitionScroll = node}
									>
										<View style={[styles.baseHorizontalPadding, styles.baseBottomMargin]}>
											<HugeText 
												text={`Preguntas y Opciones de ${kiosk.name}`}
												weight="bold"
												color="dark"
											/>
											<View style={styles.smallTopMargin}>
												<SubtitleText 
													text="Escribe la pregunta que deseas que vea el cliente"
													color='light'
													weight='light'
												/>
											</View>
											<View style={[styles.flex1, styles.row, styles.justifyContentSpaceBetween, styles.alignItemsCenter, styles.baseVerticalMargin]}>
												<View style={[styles.flex1, styles.column]}>
													<BodyText 
														text='Preguntas activadas'
														weight='bold'
													/>
													<TinyText
														text='Desactiva las preguntas para hacer más rápido el flujo'
													/>
												</View>
												<View>
													<Switch 
														value={this.state.questionsActivated}
														onValueChange={this.handleSwitchChange}
													/>
												</View>
											</View>
											<LabeledInput 
												label="Pregunta del Kiosko"
												color="blue"
											>
												<TextInput
													multiline
													onSubmitEditing={() => this.b.focus()} 
													returnKeyType='next'
													placeholderColor={Colors.gray}
													style={styles.dark}
													selectionColor={Colors.blue}
													value={kiosk.welcome_message}
													// onChangeText={(value) => this.handleChange(value)}
													onChangeText={(text) => onInputChange(text, 'SET_WELCOME_MESSAGE')}
													placeholder='¿Te atendimos bien? ¡Tu opinión es muy valiosa para nosotros!'
												/>
											</LabeledInput>
										</View>
										{ this.state.showQuestions && 
										<View>
											<Divider />
											<View style={[styles.spacer]} />
											<Divider />
											<View style={[styles.baseHorizontalPadding, styles.baseVerticalMargin]}>	
												<View style={styles.row}>
													<SubtitleText 
														text= { "Cuando alguien nos califique "}
													/>
													<SubtitleText
														text="bien"
														color="green"
														weight="bold"
													/>
												</View>
												<LabeledInput 
													label="Contra-pregunta del Kiosko"
													color="green"
												>
													<TextInput
														ref={ b => this.b = b}
														multiline
														onSubmitEditing={() => this.c.focus()} 
														returnKeyType='next'
														placeholderColor={Colors.gray}
														placeholder='Escribe aquí la pregunta'
														value={questions[0].description}
														onChangeText={(text) => onInputChange(text, 'SET_QUESTION_DESCRIPTION', 'goodQuestion')}
														style={styles.dark}
														selectionColor={Colors.green}
													/>
												</LabeledInput>
												<View style={styles.smallVerticalMargin}>
													<SubtitleText 
														text= "Opciones"
													/>
												</View>
												<LabeledInput 
													label="Opción 1"
													color="green"
												>
													<TextInput
														ref={ c => this.c = c}
														onSubmitEditing={() => this.d.focus()} 
														returnKeyType='next'
														placeholderColor={Colors.gray}
														style={styles.dark}
														selectionColor={Colors.green}
														placeholder='Escribe aquí la primera opción'
														value={choices.good[0].description}
														onChangeText={(text) => onInputChange(text, 'SET_CHOICE_DESCRIPTION', 'goodChoices', 0)}
													/>
												</LabeledInput>
												<LabeledInput 
													label="Opción 2"
													color="green"
												>
													<TextInput
														ref={ d => this.d = d}
														onSubmitEditing={() => this.e.focus()} 
														returnKeyType='next'
														placeholderColor={Colors.gray}
														style={styles.dark}
														selectionColor={Colors.green}
														placeholder='Escribe aquí la segunda opción'
														value={choices.good[1].description}
														onChangeText={(text) => onInputChange(text, 'SET_CHOICE_DESCRIPTION', 'goodChoices', 1)}
													/>
												</LabeledInput>
												<LabeledInput 
													label="Opción 3"
													color="green"
												>
													<TextInput
														ref={ e => this.e = e}
														onSubmitEditing={() => this.f.focus()} 
														returnKeyType='next'
														placeholderColor={Colors.gray}
														style={styles.dark}
														selectionColor={Colors.green}
														placeholder='Escribe aquí la tercera opción'
														value={choices.good[2].description}
														onChangeText={(text) => onInputChange(text, 'SET_CHOICE_DESCRIPTION', 'goodChoices', 2)}
													/>
												</LabeledInput>
												<LabeledInput 
													label="Opción 4"
													color="green"
												>
													<TextInput
														ref={ f => this.f = f}
														onSubmitEditing={() => this.g.focus()} 
														returnKeyType='next'
														placeholderColor={Colors.gray}
														style={styles.dark}
														selectionColor={Colors.green}
														placeholder='Escribe aquí la cuarta opción'
														value={choices.good[3].description}
														onChangeText={(text) => onInputChange(text, 'SET_CHOICE_DESCRIPTION', 'goodChoices', 3)}
													/>
												</LabeledInput>
											</View>
											<Divider />
											<View style={[styles.spacer]} />	
											<Divider />
											<View style={[styles.baseHorizontalPadding, styles.baseTopMargin]}>
												<View style={styles.row}>
													<SubtitleText 
														text= "Cuando alguien nos califique "
													/>
													<SubtitleText 
														text= "mal"
														color="pink"
														weight="bold"
													/>
												</View>

												<LabeledInput 
													label="Contra-pregunta del Kiosko"
													color="pink"
												>
													<TextInput
														ref={ g => this.g = g}
														multiline
														onSubmitEditing={() => this.h.focus()} 
														returnKeyType='next'
														placeholderColor={Colors.gray}
														style={styles.dark}
														selectionColor={Colors.pink}
														value={questions[1].description}
														placeholder='Escribe aquí la pregunta'
														onChangeText={(text) => onInputChange(text, 'SET_QUESTION_DESCRIPTION', 'badQuestion')}
													/>
												</LabeledInput>
												<View style={styles.smallVerticalMargin}>
													<SubtitleText 
														text= "Opciones"
													/>
												</View>
												<LabeledInput 
													label="Opción 1"
													color="pink"
												>
													<TextInput
														ref={ h => this.h = h}
														onSubmitEditing={() => this.i.focus()} 
														returnKeyType='next'
														placeholderColor={Colors.gray}
														style={styles.dark}
														selectionColor={Colors.pink}
														placeholder='Escribe aquí la primera opción'
														value={choices.bad[0].description}
														onChangeText={(text) => onInputChange(text, 'SET_CHOICE_DESCRIPTION', 'badChoices', 0)}
													/>
												</LabeledInput>

												<LabeledInput 
													label="Opción 2"
													color="pink"
												>
													<TextInput
														ref={ i => this.i = i}
														onSubmitEditing={() => this.j.focus()} 
														returnKeyType='next'
														placeholderColor={Colors.gray}
														style={styles.dark}
														selectionColor={Colors.pink}
														placeholder='Escribe aquí la segunda opción'
														value={choices.bad[1].description}
														onChangeText={(text) => onInputChange(text, 'SET_CHOICE_DESCRIPTION','badChoices', 1)}
													/>
												</LabeledInput>

												<LabeledInput 
													label="Opción 3"
													color="pink"
												>
													<TextInput
														ref={ j => this.j = j}
														onSubmitEditing={() => this.k.focus()} 
														returnKeyType='next'
														placeholderColor={Colors.gray}
														style={styles.dark}
														selectionColor={Colors.pink}
														placeholder='Escribe aquí la tercera opción'
														value={choices.bad[2].description}
														onChangeText={(text) => onInputChange(text, 'SET_CHOICE_DESCRIPTION','badChoices', 2)}
													/>
												</LabeledInput>
												<LabeledInput 
													label="Opción 4"
													color="pink"
												>
													<TextInput
														ref={ input => this.k = input}
														returnKeyType='go'
														placeholderColor={Colors.gray}
														style={styles.dark}
														selectionColor={Colors.pink}
														placeholder='Escribe aquí la cuarta opción'
														value={choices.bad[3].description}
														onChangeText={(text) => onInputChange(text, 'SET_CHOICE_DESCRIPTION','badChoices', 3)}
													/>
												</LabeledInput>
											</View>
										</View> }
									</ScrollView>		
									<SafeAreaView>
										<View style={[styles.baseHorizontalMargin, styles.baseVerticalMargin]}>
											<PrimaryBtn 
												disabled={!!isSaving}
												onPress={() => onSubmit(this.state.questionsActivated)}
												text={isSaving ? 'Guardando...': "Guardar"}
												bgColor="green"
											/>
										</View>
									</SafeAreaView>
								</View>
							)
						}}
					</QuestionsContainer>
				</KeyboardAvoidingView>
			</View>
		);
	}
}
