import React, { Component } from 'react';
import { Platform, Animated, Easing } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import WelcomeScreen from 'qualificame-native/app/screens/WelcomeScreen';
import LoginScreen from 'qualificame-native/app/screens/LoginScreen';
import SignUpScreen from 'qualificame-native/app/screens/SignUpScreen';
import CreateAccountScreen from 'qualificame-native/app/screens/CreateAccountScreen';
import SelectPlanScreen from 'qualificame-native/app/screens/SelectPlanScreen';
import PaymentScreen from 'qualificame-native/app/screens/PaymentScreen';
import KiosksScreen from 'qualificame-native/app/screens/KiosksScreen';
import CreateKioskScreen from 'qualificame-native/app/screens/CreateKioskScreen';
import KioskDetailScreen from 'qualificame-native/app/screens/KioskDetailScreen';
import KioskConfigurationScreen from 'qualificame-native/app/screens/KioskConfigurationScreen';
import KioskContactDataScreen from 'qualificame-native/app/screens/KioskContactDataScreen';
import KioskOptionsScreen from 'qualificame-native/app/screens/KioskOptionsScreen';
import ReportsScreen from 'qualificame-native/app/screens/ReportsScreen';
import CreateReportScreen from 'qualificame-native/app/screens/CreateReportScreen';
import SummaryReportScreen from 'qualificame-native/app/screens/SummaryReportScreen';
import ReportDetailScreen from 'qualificame-native/app/screens/ReportDetailScreen';
import MailBoxScreen from 'qualificame-native/app/screens/MailBoxScreen';
import MyAccountScreen from 'qualificame-native/app/screens/MyAccountScreen';
import ProPlanScreen from 'qualificame-native/app/screens/ProPlanScreen';
import EnterprisePlanScreen from 'qualificame-native/app/screens/EnterprisePlanScreen';
import ChangePasswordScreen from 'qualificame-native/app/screens/ChangePasswordScreen';
import FaqScreen from 'qualificame-native/app/screens/FaqScreen';
import AlertsScreen from 'qualificame-native/app/screens/AlertsScreen';
import BottomBar from 'qualificame-native/app/components/BottomBar';
import LoadingScreen from 'qualificame-native/app/screens/LoadingScreen';
import SendEmailScreen from 'qualificame-native/app/screens/SendEmailScreen';
import VerificationCodeScreen from 'qualificame-native/app/screens/VerificationCodeScreen';
import ConfirmPasswordScreen from 'qualificame-native/app/screens/ConfirmPasswordScreen';
import AuthLoadingScreen from 'qualificame-native/app/screens/AuthLoadingScreen';
import ScannerScreen from 'qualificame-native/app/screens/ScannerScreen';

import GetStateForAction from 'qualificame-native/app/utils/GetStateForAction';
import TransitionConfiguration from 'qualificame-native/app/utils/TransitionConfiguration';

const RecoverPasswordStack = createStackNavigator({
	SendEmailScreen,
	VerificationCodeScreen,
	ConfirmPasswordScreen,
	LoadingScreen: { 
		screen: LoadingScreen,
		navigationOptions: null
	},
}, {
	transitionConfig: TransitionConfiguration,
	navigationOptions: {
		header: null
	}
})

const AuthModalStackNavigator = createStackNavigator({
	WelcomeScreen,
	LoginScreen,
	RecoverPasswordStack,
	SignUpScreen,
	CreateAccountScreen,
	SelectPlanScreen,
	PaymentScreen,
	LoadingScreen: { 
		screen: LoadingScreen,
		navigationOptions: null
	},
}, {
	transitionConfig: TransitionConfiguration
});

const KioskConfigurationStack = createStackNavigator({
	KioskConfigurationScreen,
	KioskOptionsScreen,
	KioskContactDataScreen
});

const CreateReportStack = createStackNavigator({
	CreateReportScreen,
	SummaryReportScreen,
	LoadingScreen,
}, {
	transitionConfig: TransitionConfiguration,
	navigationOptions: {
		header: null
	}
});

GetStateForAction(CreateReportStack);

const BottomBarNavigator = createBottomTabNavigator({
	KiosksScreen,
	ReportsScreen,
	MailBoxScreen,
	MyAccountScreen
}, {
	initialRouteName: 'KiosksScreen',
	tabBarComponent: BottomBar
});

const CameraModalNavigator = createStackNavigator({
	ScannerScreen
}, {
	mode: 'modal',
	navigationOptions: {
		header: null,
	}
})

const MainStackNavigator = createStackNavigator({
	BottomBarNavigator: {
		screen: BottomBarNavigator,
		navigationOptions: {
			header: null,
		}
	},
	KioskDetailScreen,
	CameraModalNavigator,
	ReportDetailScreen,
	ProPlanScreen,
	EnterprisePlanScreen,
	ChangePasswordScreen,
	FaqScreen
}, {
	initialRouteName: 'BottomBarNavigator',
});

const ModalStack = createStackNavigator({
	MainStackNavigator,
	AlertsScreen,
	CreateKioskScreen,
	KioskConfigurationStack,
	CreateReportStack
}, {
	mode:'modal',
	headerMode: 'none'
});

const MainNavigation = createSwitchNavigator({
	AuthLoading: AuthLoadingScreen,
	Auth: AuthModalStackNavigator,
	App: ModalStack,
}, {
	initialRouteName: 'AuthLoading'
});

export default createAppContainer(MainNavigation);




 




