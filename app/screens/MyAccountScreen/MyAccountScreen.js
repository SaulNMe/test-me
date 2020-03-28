import React, { Component } from 'react';
import {
	View,
	Image,
	ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';
import { getUserData } from "qualificame-native/app/reducers";

import styles from './MyAccountScreenStyle';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';
import AlertBtn from 'qualificame-native/app/components/AlertBtn';
import TitleText from 'qualificame-native/app/components/TitleText';
import ArrowIcon from 'qualificame-native/app/components/ArrowIcon';
import UserData from 'qualificame-native/app/components/UserData';
import BtnLogOutContainer from 'qualificame-native/app/containers/BtnLogOutContainer';
import AlertsNotificationContainer from 'qualificame-native/app/containers/AlertsNotificationContainer';

export default function MyAccountScreen (props) {	
	let { userData } = useSelector(getUserData);
	return (
		<View style={[styles.container, styles.bgColor]}>
			<Image
				style={[styles.absolute, styles.behind, styles.headerImage]} 
				source={require('qualificame-native/assets/pink-waves-top.png')}
			/>
			<HeaderNavbar 
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
								onPress={()=>  props.navigation.navigate('AlertsScreen')}
							/>
						)}
					</AlertsNotificationContainer>
				}
				statusBar="light-content"
			/>

			<View style={[styles.flex1]}>
				<View style={styles.baseHorizontalMargin}>
					<TitleText 
						text="Mi cuenta"
						color="white"
						weight="bold"
					/>
				</View>
				<View style={styles.customSpacer}/>
				<ScrollView contentContainerStyle={[styles.baseVerticalPadding, styles.flex1]}>
					<View>
						<UserData 
							name={userData ? `${userData.first_name} ${userData.last_name}` : `--`}
							email={userData ? `${userData.email}` : `--`}
						/>
						{/*<ArrowIcon 
							bgColor="pink"
							iconName="credit-card"
							addTopDivider
							text="Plan Pro"
							onPress={()=> props.navigation.navigate('ProPlanScreen')}
						/>
						<ArrowIcon 
							bgColor="pink"
							iconName="credit-card"
							addTopDivider
							addBottomDivider
							text="Plan Enterprise"
							onPress={()=> props.navigation.navigate('EnterprisePlanScreen')}
						/>	*/}	
						<View style={styles.baseVerticalMargin}>
							<ArrowIcon 
								bgColor="orange"
								iconName="lock"
								addTopDivider
								text="Cambiar contraseña"
								onPress={()=> props.navigation.navigate('ChangePasswordScreen')}
							/>
							<ArrowIcon 
								bgColor="orange"
								iconName="help-circle"
								addTopDivider
								addBottomDivider
								text="Preguntas frecuentes"
								onPress={()=> props.navigation.navigate('FaqScreen')}
							/>	
						</View>
					</View>
					<View style={[styles.flex1, styles.justifyContentCenter]}>
						<BtnLogOutContainer>
							{(logout) => (
								<ArrowIcon 
									bgColor="gray"
									iconName="log-out"
									addTopDivider
									addBottomDivider
									text="Cerrar sesión"
									onPress={()=> {
										logout();
										props.navigation.navigate('AuthLoading');
									}}
								/>
							)}
						</BtnLogOutContainer>
					</View>
				</ScrollView>
			</View>	
		</View>
	);
}
