import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	FlatList,
} from 'react-native';
import { useSelector } from "react-redux";


import { getReports, getIsLoadingReports, getKiosks } from "qualificame-native/app/reducers";

import styles from './ReportsScreenStyle';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';
import AlertBtn from 'qualificame-native/app/components/AlertBtn';
import TitleText from 'qualificame-native/app/components/TitleText';
import KioskCard from 'qualificame-native/app/components/KioskCard';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import ListEmptyState from 'qualificame-native/app/components/ListEmptyState';
import ReportsContainer from 'qualificame-native/app/containers/ReportsContainer';
import AlertsNotificationContainer from 'qualificame-native/app/containers/AlertsNotificationContainer';

export default function ReportsScreen (props) {
	let allReports = useSelector(getReports);
	let allKiosks = useSelector(getKiosks);
	let isLoadingReports = useSelector(getIsLoadingReports);
	return (
		<View style={styles.container}>
			<Image
				style={[styles.absolute, styles.behind, styles.headerImage]} 
				source={require('qualificame-native/assets/blue-waves-top.png')}
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
						text="Reportes"
						color="white"
						weight="bold"
					/>
				</View>
				<View style={styles.customSpacer}/>	
				<View style={[styles.flex1, (allReports.length == 0 && styles.justifyContentCenter)]}>
					<View style={((allReports.length != 0 && styles.flex1) || (isLoadingReports && styles.flex1))}>
						<ReportsContainer 
							footer={<View style={(allReports.length != 0 ? styles.bottomViewHeight : styles.baseBottomMargin)}/>}
						/>
					</View>
					<View style={(allReports.length != 0 && styles.bottomView)}>
						<View style={[styles.baseBottomMargin, styles.baseHorizontalMargin]}>
							<PrimaryBtn
								// disabled={false}
								disabled={allKiosks.length == [0]}
								onPress={ () => props.navigation.navigate('CreateReportScreen')}
								text="Generar Reporte"
								bgColor="blue"
							/>
						</View>
					</View>
				</View>
			</View>
		</View>		
	);
}
