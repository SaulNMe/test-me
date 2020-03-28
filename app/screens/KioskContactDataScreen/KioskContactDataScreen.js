import React, { useState, useRef } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { updateKiosk, fetchKiosks } from 'qualificame-native/app/actions/KiosksActions';
import styles from './KioskContactDataScreenStyle';
import { Colors, ApplicationStyles } from 'qualificame-native/app/styles';

import BackBtn from 'qualificame-native/app/components/BackBtn';
import BodyText from 'qualificame-native/app/components/BodyText';
import HugeText from 'qualificame-native/app/components/HugeText';
import CloseBtn from 'qualificame-native/app/components/CloseBtn';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';

import ApiService from 'qualificame-native/app/services/ApiService';

export default function KioskContactDataScreen (props){
	let dispatch = useDispatch();

	const [state, setState] = useState({
		kiosk: props.navigation.state.params.kiosk,
		email: props.navigation.state.params.kiosk.email,
		phone: props.navigation.state.params.kiosk.phone,
		address: props.navigation.state.params.kiosk.address,
	});
	const phoneRef = useRef();
	const addressRef = useRef();

	function handleSaveData () {
		dispatch(updateKiosk({kiosk : {id: state.kiosk.id, email:state.email, phone:state.phone, address: state.address}}));
		//dispatch(fetchKiosks());
		props.navigation.navigate('KiosksScreen');
	}

	function handleDisabled(){
		if(state.email === props.navigation.state.params.kiosk.email && state.phone === props.navigation.state.params.kiosk.phone && state.address === props.navigation.state.params.kiosk.address) return
			else handleSaveData();
	}

	function handleInputChange(phone) {
		if(/^\d*$/.test(phone)){
			setState(state => ({...state, phone}))
		} else return;
	}


	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
							onPress={()=> props.navigation.navigate('KioskDetailScreen')}
						/>
					}
					statusBar="dark-content"
				/>
				<View style={[styles.flex1, styles.baseHorizontalMargin]}>
					<HugeText 
						text="Datos de contacto para Sucursal San Javier"
						weight="bold"
						color="dark"
					/>
					<View style={styles.baseVerticalMargin}>
						<BodyText 
							text= "Escribe aquí los datos que deseas que vea el cliente"
							weight="light"
							color='lightBlack'
						/>
					</View>
					<LabeledInput 
						label="Correo electrónico"
						color="green"
					>
						<TextInput
							value={state.email}
							placeholder="Escribe tu correo electrónico"
							placeholderTextColor={Colors.gray}
							style={{color:Colors.dark}}
							selectionColor={Colors.green}
							textContentType="emailAddress"
							onChangeText={(email) => setState(state => ({...state, email}))}
							onSubmitEditing={() => phoneRef.current.focus()}
						/>
					</LabeledInput>
					<LabeledInput 
						label="Número de teléfono"
						color="green"
					>
						<TextInput
							value={state.phone}
							ref={phoneRef}
							placeholder="Escribe tu número de teléfono"	
							placeholderTextColor={Colors.gray}
							style={{color:Colors.dark}}
							selectionColor={Colors.green}
							keyboardType="phone-pad"
							textContentType="telephoneNumber"
							onChangeText={(phone) => handleInputChange(phone)}
							onSubmitEditing={() => addressRef.current.focus()}
						/>
					</LabeledInput>
					<LabeledInput 
						label="Dirección"
						color="green"
					>
						<TextInput 
							value={state.address}
							ref={addressRef}
							placeholder="Escribe la dirección de la sucursal"
							placeholderTextColor={Colors.gray}
							style={{color:Colors.dark}}
							selectionColor={Colors.green}
							textContentType="emailAddress"
							onChangeText={(address) => setState(state => ({...state, address}))}
							onSubmitEditing={() => handleDisabled()}
						/>
					</LabeledInput>
				</View>
				<SafeAreaView>
					<View style={[styles.baseHorizontalMargin, styles.baseVerticalMargin]}>
						<PrimaryBtn
							disabled={state.email === props.navigation.state.params.kiosk.email && state.phone === props.navigation.state.params.kiosk.phone && state.address === props.navigation.state.params.kiosk.address}
							onPress={() => handleSaveData()} 
							text="Guardar"
							bgColor="green"
						/>
					</View>
				</SafeAreaView>
			</View>
		</TouchableWithoutFeedback>
	);
}
KioskContactDataScreen.navigationOptions = {
	header: null
}
