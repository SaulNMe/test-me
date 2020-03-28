import React, { Component } from 'react';
import {
	View,
	Image,
	SafeAreaView,
	ScrollView,
} from 'react-native';

import styles from './KioskDetailScreenStyle';
import { Colors, Metrics } from 'qualificame-native/app/styles';

import Pill from 'qualificame-native/app/components/Pill';
import BackBtn from 'qualificame-native/app/components/BackBtn';
import AlertBtn from 'qualificame-native/app/components/AlertBtn';
import PieGraph from 'qualificame-native/app/components/PieGraph';
import TitleText from 'qualificame-native/app/components/TitleText';
import ConfigBtn from 'qualificame-native/app/components/ConfigBtn';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import BodyText from 'qualificame-native/app/components/BodyText';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';

import AlertsNotificationContainer from 'qualificame-native/app/containers/AlertsNotificationContainer';

import SwitchColor from 'qualificame-native/app/utils/SwitchColor';

export default class KioskDetailScreen extends Component {	
	static navigationOptions = {
		header: null,
	}
	state = {
		kiosk: this.props.navigation.state.params.item
	}

	handleNoData = (exc, avg, bad, awful) => {
		if(exc === 0 && avg === 0 && bad === 0 && awful === 0 )
			return 100;
	}

	render() {
		let { total_excellent, total_average, total_bad, total_awful, result_tag, result } = this.state.kiosk;
		return (
			<View style={styles.container}>
				<HeaderNavbar 
					left={<BackBtn color='white'/>}
					center={
						<ResizableLogo
							size="small"
						/>
					}
					right={
						<AlertsNotificationContainer>
							{ (unreadAlerts) => (
								<AlertBtn
								 	alertsAmount={unreadAlerts}
									onPress={()=>  this.props.navigation.navigate('AlertsScreen')}
								/>
							)}
						</AlertsNotificationContainer>
					}
					statusBar="light-content"
				/>
				<Image
					style={[styles.absolute, styles.behind, styles.headerImage]} 
					source={require('qualificame-native/assets/green-waves-top.png')}
				/>
				<View style={[styles.flex1]}>
					<View style={[styles.row, styles.alignItemsCenter, styles.baseHorizontalMargin]}>
						<View style={[styles.flex1, styles.baseRightMargin]}>
							<TitleText 
								color="white"
								weight="bold"
								text={this.state.kiosk.name}
							/>
						</View>
						<ConfigBtn 
							onPress={()=> this.props.navigation.navigate('KioskConfigurationScreen', { item: this.state.kiosk })}
						/>

					</View>
					<View style={styles.customSpacer}/>				
					<ScrollView contentContainerStyle={styles.baseHorizontalMargin}>
						<View>
							<BodyText
								text='Estos son los eventos de esta semana, si necesitas más información puedes crear un reporte.'
								color='dark'
							/>
						</View>
						<View style={[styles.alignItemsCenter]}>
							<PieGraph 
								width={Math.round( (Metrics.screenWidth / 2)*1.15 )}
								height={Math.round( (Metrics.screenHeight / 2.9) )}
								data={[
									{x: "green",  y: total_excellent},
									{x: "blue",   y: total_average},
									{x: "orange", y: total_bad},
									{x: "pink",   y: total_awful},
									{x: "gray",   y: this.handleNoData(total_excellent, total_average, total_bad, total_awful)}
								]}
								label={result+"%"}
								labelColor={SwitchColor(result_tag)}
								stroke={Metrics.screenHeight > 179 ? 20 : 15}
							/>
							<View style={[styles.alignItemsCenter]}>
								<View style={[styles.row, styles.baseTopMargin]}>
									<Pill 
										reaction= "excelent"
										amount={String(total_excellent)}
									/>
									<View style={styles.smallLeftMargin}/>
									<Pill
										reaction= "good"
										amount={String(total_average)}
									/>
								</View>
								<View style={[styles.row, styles.smallTopMargin]}>
									<Pill
										reaction= "bad"
										amount={String(total_bad)}
									/>
									<View style={styles.smallLeftMargin}/>
									<Pill
										reaction= "horrible"
										amount={String(total_awful)}
									/>
								</View>
							</View>
						</View>
					</ScrollView>
				{/*<View style={[styles.flex1, styles.justifyContentFlexEnd, styles.baseHorizontalMargin]}>*/}
					<SafeAreaView >
						<View style={[styles.baseVerticalMargin, styles.baseHorizontalMargin]}>
							<PrimaryBtn 
								text="Activar el Kiosko"
								bgColor="green"
								onPress={()=> this.props.navigation.navigate('ScannerScreen', { item: this.state.kiosk })}
							/>
						</View>
					</SafeAreaView>
				{/*</View>*/}
				</View>
			</View>
		);
	}
}
