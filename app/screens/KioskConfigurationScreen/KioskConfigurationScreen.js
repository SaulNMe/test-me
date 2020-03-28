import React, { Component } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	Alert
} from 'react-native';

import { Colors } from 'qualificame-native/app/styles';
import styles from './KioskConfigurationScreenStyle';

import BodyText from 'qualificame-native/app/components/BodyText';
import HugeText from 'qualificame-native/app/components/HugeText';
import CloseBtn from 'qualificame-native/app/components/CloseBtn';
import ArrowIcon from 'qualificame-native/app/components/ArrowIcon';
import ShowAlert from 'qualificame-native/app/components/ShowAlert';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import InlineInput from 'qualificame-native/app/components/InlineInput';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';

import ApiService from 'qualificame-native/app/services/ApiService';
import DeleteKioskContainer from 'qualificame-native/app/containers/DeleteKioskContainer';

export default class KioskConfigurationScreen extends Component {	
	static navigationOptions = {
		header: null
	}

	state = {
		cancelText: '',
		confirmText: '',
		alertHead: '',
		alertBody: '',
		onCancelPressed: () => {},
		onConfirmPressed: () => {},
		color: '',
		kiosk: this.props.navigation.state.params.item,
		max_negative_percent: this.props.navigation.state.params.item.max_negative_percent,
		max_negative_events: this.props.navigation.state.params.item.max_negative_events,
		min_positive_percent: this.props.navigation.state.params.item.min_positive_percent,
		min_positive_events: this.props.navigation.state.params.item.min_positive_events,
	} 
	
	deleteKiosk = async (fetchKiosks, clearKiosks) => {
		this.setState({showAlert: false});
		await ApiService.deleteKiosk(this.state.kiosk.id).then(res => {
			clearKiosks();
			fetchKiosks();
			this.props.navigation.navigate('KiosksScreen');
		}, err => {
			this.setState({
				cancelText:'Salir',
				confirmText: 'Reintentar',
				alertHead: 'Error al eliminar',
				alertBody: 'No se logró eliminar el kiosko',
				onCancelPressed: () => {
					this.setState({showAlert: false})
				},
				onConfirmPressed: () => {this.deleteKiosk(fetchKiosks, clearKiosks)}
			})
		}); 

	}

	handleInputChange = (amount, tag) => {
		if(/^\d*$/.test(amount)){
			if(parseInt(amount) > 100) this.setState({[tag]: 100});

			if(amount === "") this.setState({[tag]: 0});
			else {
				if(tag === 'max_negative_events' || tag === 'min_positive_events') {
					this.setState({[tag]: parseInt(amount)})
				}
				else if(parseInt(amount) <101) this.setState({[tag]: parseInt(amount)});
			}
		} else return;
	}

	saveData = (updateKiosk) => {
		const { kiosk, max_negative_percent, max_negative_events, min_positive_percent, min_positive_events } = this.state;

		if(kiosk.max_negative_percent != max_negative_percent || kiosk.max_negative_events != max_negative_events || kiosk.min_positive_percent != min_positive_percent || kiosk.min_positive_events != min_positive_events){
			this.setState({
				showAlert: true,
				alertHead:'Tienes cambios sin guardar',
				alertBody:'¿Deseas guardar los cambios?',
				cancelText:'Salir',
				confirmText:'Guardar',
				color: Colors.green,
				onCancelPressed: () => {
					this.setState({showAlert: false})
					this.props.navigation.navigate('KiosksScreen')
				},
				onConfirmPressed: () => { 
					updateKiosk({kiosk: {id: kiosk.id, max_negative_percent, max_negative_events, min_positive_percent, min_positive_events}})
					this.props.navigation.navigate('KiosksScreen')
				}
			})
		} else this.props.navigation.navigate('KiosksScreen')
	}

	render() {
		const { kiosk, max_negative_percent, max_negative_events, min_positive_percent, min_positive_events } = this.state;
		return (
			<View style={[styles.container, styles.bgColor]}>
				<HeaderNavbar 
					center={
						<ResizableLogo
							size='small'
						/>
					}
					right={
						<DeleteKioskContainer>
						{ (fetchKiosks, clearKiosks, updateKiosk) =>

							<CloseBtn 
								onPress={()=> this.saveData(updateKiosk)}
							/>
						}	
						</DeleteKioskContainer>
					}
					bgColor='white'
					statusBar='dark-content'
				/>
				<ScrollView style={[styles.flex1]}>
					<View style={[styles.baseHorizontalPadding, styles.overColor, styles.doubleBaseBottomPadding]}>
						<HugeText 
							text={`Configuración de alertas de ${kiosk.name}`}
							weight='bold'
							color='solid'
						/>
						<SubtitleText
							color='solidBlack'
							weigth='light'
							text='Recibirás una notificación a tu celular cada vez que se cumpla alguna de las siguientes condiciones'
						/>
					</View>
					<View>
						<InlineInput
							onChange={(value, tag) => this.handleInputChange(value, tag)}
							text='Alertarme cuando mi nivel de aprobación de esta semana sea menor a'
							amount={String(max_negative_percent)}
							tag='max_negative_percent'
							color='pink'
							percent
							addTopDivider
						/>					
						<InlineInput
							onChange={(value, tag) => this.handleInputChange(value, tag)}
							text='Alertarme cuando mis eventos negativos en un día superen'
							amount={String(max_negative_events)}
							tag='max_negative_events'
							color='pink'
							addTopDivider
						/>	
						<InlineInput
							onChange={(value, tag) => this.handleInputChange(value, tag)}
							text='Alertarme cuando mi nivel de aprobación de esta semana sea mayor a'
							amount={String(min_positive_percent)}
							tag='min_positive_percent'
							addTopDivider
							percent
						/>					
						<InlineInput
							onChange={(value, tag) => this.handleInputChange(value, tag)}
							text='Alertarme cuando mis eventos favorables en un día superen '
							amount={String(min_positive_events)}
							tag='min_positive_events'
							addTopDivider
							addBottomDivider
						/>
						<View style={[styles.spacer]}/>
						<ArrowIcon 
							bgColor='orange'
							iconName='help-circle'
							addTopDivider
							text='Preguntas y Opciones'
							onPress={()=> this.props.navigation.navigate('KioskOptionsScreen', {item: this.state.kiosk})}
						/>
						<ArrowIcon 
							bgColor='blue'
							iconName='users'
							addTopDivider
							addBottomDivider
							text='Datos de Contacto'
							onPress={()=> this.props.navigation.navigate('KioskContactDataScreen', {kiosk: this.state.kiosk})}
						/>		

						<View style={[styles.spacer]} />
						<DeleteKioskContainer>
							{(fetchKiosks, clearKiosks) => (
								<ArrowIcon 
									bgColor='pink'
									iconName='trash-2'
									addTopDivider
									addBottomDivider
									removeIcon
									color='pink'
									text='Eliminar Kiosko'
									onPress={()=>{
										this.setState({
											showAlert: true,
											alertHead:'Eliminando kiosko',
											alertBody:'¿Estás seguro de que deseas eliminar el kiosko?',
											cancelText:'Cancelar',
											confirmText:'Eliminar',
											color: Colors.red,
											onCancelPressed: () => { this.setState({showAlert: false})},
											onConfirmPressed: () => { this.deleteKiosk(fetchKiosks, clearKiosks) }
										})
									}}
								/>
							)}
						</DeleteKioskContainer>
						</View>
				</ScrollView>
				{ this.state.showAlert && 
			        <ShowAlert
						show={this.state.showAlert}
						showProgress={false}
						title={this.state.alertHead}
						message={this.state.alertBody}
						showCancelButton
						showConfirmButton
						cancelText={this.state.cancelText}
						confirmText={this.state.confirmText}
						confirmButtonColor={this.state.color}
						onCancelPressed={() => this.state.onCancelPressed()}
						onConfirmPressed={() => this.state.onConfirmPressed()}
			        />
				}
			</View>
		);
	}
}
