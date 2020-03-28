import React, { Component } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	ScrollView
} from 'react-native';

import styles from './ProPlanScreenStyle';
import { Colors, ApplicationStyles } from 'qualificame-native/app/styles';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import HugeText from 'qualificame-native/app/components/HugeText';
import TitleText from 'qualificame-native/app/components/TitleText';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import AlertBtn from 'qualificame-native/app/components/AlertBtn';
import ListItem from 'qualificame-native/app/components/ListItem';
import BottomBanner from 'qualificame-native/app/components/BottomBanner';
import BubbleImages from 'qualificame-native/app/components/BubbleImages';
import BackBtn from 'qualificame-native/app/components/BackBtn';

export default class ProPlanScreen extends Component {	
	static navigationOptions = {
		header: null
	}
	render() {
		return (
			<View style={styles.container}>
				<HeaderNavbar 
					left={ <BackBtn color='white'/> }
					center={
						<TitleText 
							text="Plan Pro"
							color="white"
						/>
					}
					right={
						<AlertBtn 
							onPress={()=> this.props.navigation.navigate('AlertsScreen')}
						/>
					}
					bgColor="pink"
					statusBar="light-content"
				/>
				<ScrollView>
					<View style={[styles.baseHorizontalMargin, styles.baseVerticalMargin, styles.flex1]}>
						<HugeText 
							text="La mejor opción para tu negocio"
							weight="bold"
							color="pink"
						/>
						<View style={styles.smallVerticalMargin}>
							<SubtitleText 
								text="¿Qué es el plan Pro?"
								weight="bold"
							/>
							<ListItem 
								color="pink"
								addVerticalMargin
								text="Es un complemento basado en suscripción que agrega nuevas funciones a la experiencia básica de Qualificame."
							/>
						</View>
						<SubtitleText 
							text="Conoce a la comunidad de tu negocio"
							weight="medium"
							align="center"
						/>
						<View style={[styles.centerObjects, styles.baseHorizontalMargin, styles.smallVerticalMargin]}>	
							<BubbleImages 
								firstText= 'Mantenlos contentos'
								secondText= 'Haz crecer tus negocios'
								thirdText= 'Monitorea a tu personal'
							/>
						</View>
					</View>
				</ScrollView>
				<SafeAreaView>
					<BottomBanner 
						text="Puedes convertirte en PRO hoy mismo"
						textBtn="Iniciar Plan Pro"
					/>
				</SafeAreaView>
			</View>
		);
	}
}
