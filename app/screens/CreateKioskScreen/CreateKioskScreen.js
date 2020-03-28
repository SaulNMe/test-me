import React, { useState, useRef } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
	Alert
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import styles from './CreateKioskScreenStyle';
import { Colors } from 'qualificame-native/app/styles';

import BodyText from 'qualificame-native/app/components/BodyText';
import HugeText from 'qualificame-native/app/components/HugeText';
import CloseBtn from 'qualificame-native/app/components/CloseBtn';
import ShowAlert from 'qualificame-native/app/components/ShowAlert';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';

import { getUserData } from 'qualificame-native/app/reducers';
import { createKiosk } from "qualificame-native/app/actions/KiosksActions";

import ApiService from 'qualificame-native/app/services/ApiService';

export default function CreateKioskScreen(props) {	
	const dispatch = useDispatch();

	let [alert, setAlert] = useState({
		showAlert: false,
		alertHead: '',
		alertBody: ''
	});

	let [name, setName] = useState('');
	let [phone, setPhone] = useState('');
	let [address, setAddress] = useState('');
	let [isLoading, setIsLoading] = useState(false);
	let { userData } = useSelector(state => getUserData(state))

	const phoneRef = useRef();
	const addressRef = useRef();
	
	handleCreateKiosk = async () => {
		try {
			setIsLoading(true);
			let result = await ApiService.createKiosk({ name, phone, email: userData.email, address })
			dispatch(createKiosk(result.kiosk))
			await ApiService.createQuestion({
				questionType: 1,
				description: '¿Cómo crees que podamos mejorar nuestro servicio?',
				kioskId: result.kiosk.id
			})
			await ApiService.createQuestion({
				questionType: 2,
				description: '¿Qué fue lo que sucedió? Ayúdanos a mejorar',
				kioskId: result.kiosk.id
			})
			Keyboard.dismiss();
			props.navigation.navigate('KiosksScreen');
			setIsLoading(false);
		} catch (e) {
			setAlert(state => ({
				...state, 
				showAlert: true,
				alertHead: 'Ocurrió un error',
				alertBody: 'Hubo un problema al crear el kiosko, inténtalo más tarde'
			}))
			setIsLoading(false);
		}
	}
	handleInputChange = (phone) => {
		if(/^\d*$/.test(phone)){
			setPhone(phone);
		}
	}

	handleDisabled = () => {
		if(!name || !phone || !address) return;
		handleCreateKiosk();
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<HeaderNavbar 
					center={
						<ResizableLogo
							size="small"
						/>
					}
					right={
						<CloseBtn 
							onPress={()=> props.navigation.goBack()}
						/>
					}
					statusBar="dark-content"
				/>
				<View style={[styles.baseHorizontalMargin, styles.flex1]}>
					<HugeText 
						text="Crea un nuevo Kiosko"
						weight="bold"
						color="dark"
					/>
					<BodyText 
						text="Llena los siguientes campos con los datos correspontientes"
						weight="light"
						color="lightBlack"
					/>
					<View style={styles.baseVerticalMargin}>
						<LabeledInput 
							label="Nombre de la sucursal"
						>
							<TextInput 
								placeholder="Escribe el nombre de la sucursal"
								placeholderColor={Colors.gray}
								value={name}
								style={{color:Colors.dark}}
								selectionColor={Colors.green}
								onChangeText={name => setName(name)}
								onSubmitEditing={() => phoneRef.current.focus()}
							/>
						</LabeledInput>
						<LabeledInput 
							label="Número"
						>
							<TextInput 
								ref={phoneRef}
								placeholder="Escribe el número de teléfono"
								placeholderColor={Colors.gray}
								value={phone}
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
						>
							<TextInput 
								ref={addressRef}
								placeholder="Dirección de la sucursal"
								placeholderColor={Colors.gray}
								value={address}
								style={{color:Colors.dark}}
								selectionColor={Colors.green}
								onChangeText={address => setAddress(address)}
								onSubmitEditing={() => handleDisabled()}
							/>
						</LabeledInput>
					</View>
				</View>
				<View style={[styles.baseVerticalMargin, styles.baseHorizontalMargin]}>
					<PrimaryBtn 
						text={isLoading ? 'Creando Kiosko...': "Crear Kiosko"}
						bgColor="green"
						disabled={!name || !phone || !address || isLoading}
						onPress={()=> handleCreateKiosk()}
					/>
				</View>
				{ alert.showAlert && 
			        <ShowAlert
						show={alert.showAlert}
						showProgress={false}
						title={alert.alertHead}
						message={alert.alertBody}
						showCancelButton={false}
						showConfirmButton
						confirmText='Ok'
						confirmButtonColor={Colors.red}
						onConfirmPressed={() => {
							setAlert(state => ({...state, showAlert: false, alertHead: '', alertBody: ''}))
						}}
			        />
				}
			</View>
		</TouchableWithoutFeedback>
	);
}

CreateKioskScreen.navigationOptions = {
	header: null,
}