import React, { useEffect } from 'react';
import {
	View,
	Image,
	FlatList,
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import styles from './KiosksScreenStyle';

import { getKiosks, getIsLoadingKiosks } from "qualificame-native/app/reducers";
import { registerNotificationHandler } from 'qualificame-native/app/services/NotificationService';
import { fetchKiosks } from 'qualificame-native/app/actions/KiosksActions';
import { fetchAlerts } from 'qualificame-native/app/actions/AlertsActions';

import AlertBtn from 'qualificame-native/app/components/AlertBtn';
import TitleText from 'qualificame-native/app/components/TitleText';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';
import KiosksListContainer from 'qualificame-native/app/containers/KiosksListContainer';
import AlertsNotificationContainer from 'qualificame-native/app/containers/AlertsNotificationContainer';

export default function KiosksScreen(props) {	
	let dispatch =  useDispatch();
	useEffect(() => {
		registerNotificationHandler((notification) => {
			if (notification.data){
				if (notification.origin === 'received') {
					dispatch(fetchKiosks());
					dispatch(fetchAlerts());
				}
				if (notification.origin === 'selected') {
	  				props.navigation.navigate('AlertsScreen');
				}
			}
	  	})
	}, []);
	

	let allkiosks = useSelector(getKiosks);
	let isLoadingKiosks = useSelector(getIsLoadingKiosks);
	return (
		<View style={styles.container}>
			<Image
				style={[styles.absolute, styles.behind, styles.headerImage, {backgroundColor:"transparent"}]} 
				source={require('qualificame-native/assets/green-waves-top.png')}
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
						text="Mis Kioskos"
						color="white"
						weight="bold"
					/>
				</View>
				<View style={styles.customSpacer}/>
				<View style={[styles.flex1, (allkiosks.length == 0 && styles.justifyContentCenter)]}>
					<View style={((allkiosks.length != 0 && styles.flex1) || (isLoadingKiosks && styles.flex1))}>
						<KiosksListContainer 
							footer={<View style={(allkiosks.length != 0 ? styles.bottomViewHeight : styles.baseBottomMargin)}/>}
						/>
					</View>
					<View style={(allkiosks.length != 0 && styles.bottomView)}>
						<View style={[styles.baseBottomMargin, styles.baseHorizontalMargin]}>
							<PrimaryBtn 
								onPress={ () => props.navigation.navigate('CreateKioskScreen')}
								text='Agregar Kiosko'
								bgColor="green"
							/>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
KiosksScreen.navigationOptions = {
		header: null
	}
