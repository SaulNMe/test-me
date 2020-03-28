import React, { Component } from 'react';
import {
	View,
	Image,
	FlatList,
	ActivityIndicator
} from 'react-native';

import moment from 'moment';

import { useSelector, useDispatch } from "react-redux";

import { getSelectedMonth } from 'qualificame-native/app/reducers'
import { selectMonthAndReload } from 'qualificame-native/app/actions/EventsActions';

import styles from './MailBoxScreenStyle';
import AlertBtn from 'qualificame-native/app/components/AlertBtn';
import TitleText from 'qualificame-native/app/components/TitleText';
import RatingItem from 'qualificame-native/app/components/RatingItem';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';
import BtnWActionSheet from 'qualificame-native/app/components/BtnWActionSheet';
import EventsContainer from 'qualificame-native/app/containers/EventsContainer';
import AlertsNotificationContainer from 'qualificame-native/app/containers/AlertsNotificationContainer';


export default function MailBoxScreen (props) {

	let month = useSelector(getSelectedMonth);
	let dispatch = useDispatch();
	
	let month3 = moment().format();
	let month2 = moment().subtract(1,'month').format();
	let month1 = moment().subtract(2,'month').format();
	let months = [month3, month2, month1];

	function selectMonth(index) {
		dispatch(selectMonthAndReload(months[index]))
	}
	return (
		<View style={styles.container}>
			<Image
				style={[styles.absolute, styles.behind, styles.headerImage]}
				source={require('qualificame-native/assets/orange-waves-top.png')}
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
			<View style={styles.flex1}>
				<View style={[styles.row, styles.baseHorizontalMargin]}>
					<View style={styles.flex1}>
						<TitleText
							text="Buzón"
							color="white"
							weight="bold"
						/>
					</View>
					<View style={[styles.flex1, styles.alignItemsFlexEnd]}>
						<BtnWActionSheet
							text={moment(month).format('MMMM')}
							items={months.map(date => moment(date).format('MMMM'))}
							onSelect={(index)=> selectMonth(index)}
							iconName={'calendar'}
						/>
					</View>
				</View>
				<View style={styles.customSpacer}/>
				<View style={[styles.flex1]}>
					<EventsContainer
						itemSeparator={() => (<View style={styles.baseTopMargin}/>)}
					/>
				</View>
			</View>
		</View>
	);
}
