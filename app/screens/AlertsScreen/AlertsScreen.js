import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './AlertsScreenStyle';
import HugeText from 'qualificame-native/app/components/HugeText';
import BodyText from 'qualificame-native/app/components/BodyText';
import CloseBtn from 'qualificame-native/app/components/CloseBtn';
import AlertItem from 'qualificame-native/app/components/AlertItem';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import ShimmerAlert from 'qualificame-native/app/components/ShimmerAlert';

import AlertsContainer from 'qualificame-native/app/containers/AlertsContainer';

export default class AlertsScreen extends Component {	
	
	render() {
		return (
			<View style={styles.container}>
				<HeaderNavbar 
					left={
						<HugeText 
							text="Alertas"
							weight="bold"
							color="dark"
						/>
					}
					right={
						<CloseBtn 
							onPress={()=> this.props.navigation.goBack()}
						/>
					}
					statusBar="dark-content"
				/>
				<View style={[styles.flex1]}>	
					<AlertsContainer/>
				</View>
			</View>
		);
	}
}

const data = [{
		id: 1,
		time: "Hace unos minutos",
		title: "Ooops!" ,
		description1: "Tu sucursal San Javier bajó a ",
		description2: "79%",
		description3: " su nivel de aprobación",
		topDiv: true,
		seening: true
	}, {
		id: 2,
		time: "Hace 3 horas",
		title: "Renovación de suscripción",
		description1: "Tu suscripción se renovará en ",
		description2: "5",
		description3: " días",
		topDiv: true,
		seening: false
	}, {
		id: 3,
		time: "Hace 5 horas",
		title: "¡Cuidado con esto!",
		description1: "Tu sucursal Revolución tuvo ",
		description2: "25",
		description3: " eventos desfavorables",
		topDiv: true,
		seening: true,
	}, {
		id: 4,
		time: "Hace 3 días",
		title: "¡Excelente!",
		description1: "Tu sucursal Revolución tuvo ",
		description2: "1,617",
		description3: " eventos favorables",
		topDiv: true,
		bottomDiv: true,
		seening: false
}]