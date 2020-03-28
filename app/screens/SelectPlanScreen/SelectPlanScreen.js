import React, { Component } from 'react';
import {
	View,
	Text,
	Button,
	SafeAreaView,
	Image,
	ScrollView
} from 'react-native';

import styles from './SelectPlanScreenStyle';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';
import HugeText from 'qualificame-native/app/components/HugeText';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import PaymentCard from 'qualificame-native/app/components/PaymentCard';
import BackBtn from 'qualificame-native/app/components/BackBtn';
import { Colors, ApplicationStyles } from 'qualificame-native/app/styles';

export default class SelectPlanScreen extends Component {	
	static navigationOptions = {
		header: null
	}
	render() {
		const free = [{text:"Todas las funciones del Kiosko", key: "f1"}, {text: "Reportes personalizados", key: "f2"}, {text: "Hasta 3 usuarios", key: "f3"}, {text: "1 mes de prueba", color:"green", key: "f4"}];
		const pro = [{text:"Todas las funciones del Kiosko", key: "p1"}, {text: "Reportes personalizados", key: "p2"}, {text: "Hasta 3 usuarios", key: "p3"}];
		const year = [{text:"Todas las funciones del Kiosko", key: "a1"}, {text: "Reportes personalizados", key: "a2"}, {text: "Hasta 3 usuarios", key: "a3"}];

		return (
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
				<View style={[styles.flex1, styles.justifyContentSpaceBetween]}>
					<ScrollView 
						style={[styles.baseHorizontalPadding]}
					>
						<HugeText 
							text="Selecciona tu plan"
							color="green"
							weight="bold"
						/>
						<SubtitleText
							text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
							color="green"
							weight="light"
						/>
						<PaymentCard 
							planName="Gratis"
							featuresArray={free}
							onPress={()=> this.props.navigation.navigate('PaymentScreen', {transition: 'collapseExpand'})}
						/>
						<PaymentCard 
							planName="Pro"
							featuresArray={pro}
							onPress={()=> this.props.navigation.navigate('PaymentScreen', {transition: 'collapseExpand'})}
						/>
						<PaymentCard 
							planName="Anuales"
							featuresArray={year}
							onPress={()=> this.props.navigation.navigate('PaymentScreen', {transition: 'collapseExpand'})}
						/>
					</ScrollView>
				</View>
				<Image 
					style={[styles.absolute, styles.setToBot, styles.behind, styles.footerImage]}
					source={require('qualificame-native/assets/waves.png')}
					resizeMode='stretch'
				/>
			</View>
		);

	}
}
