import Fonts from './Fonts'
import Colors from './Colors'
import Metrics from './Metrics'
import { StatusBar, Platform } from 'react-native';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
	screen: {
		imageFill: {
			position:'absolute', 
			top: 0, 
			bottom: 0, 
			right: 0, 
			left: 0, 
			width:null, 
			height:null		
		},
		fill: {
			width: '100%',
			height: '100%'
		},
		container: {
			flex: 1
		},
		card: {
			marginVertical: Metrics.smallMargin,
			padding: Metrics.smallMargin,
			backgroundColor: Colors.white,
			shadowColor: '#000',
			shadowRadius: 4,
			shadowOpacity: 0.1,
			shadowOffset: { width: 0, height: 3 },
			elevation: 3,
			borderRadius: 5,
		},
		absolute: {
			position: 'absolute'
		},
		setToBot: {
			bottom: 0,
			right: 0,
			left: 0
		},
		behind: {
			zIndex: -1
		},
		headerImage: {
			width: Metrics.screenWidth,
			height: (Metrics.screenWidth * .46 ) 
		},
		footerImage: {
			width: Metrics.screenWidth,
			height: (Metrics.screenWidth * .52 ) 
		},
		customSpacer: {
			marginTop: (Metrics.screenWidth * .46 ) - (Metrics.navBarHeight + 27),
		},
		bottomView: {
			position:'absolute',
			bottom: 0,
			width: '100%',
			zIndex: 9999
		},
		bottomViewHeight: {
			height: 64
			//height 64 + 16margin
		},
		alert:{
			zIndex:9999, 
		},
	},
	margins: {
		doubleBaseMargin: {
			marginTop: Metrics.doubleBaseMargin
		},
		doubleBaseVerticalMargin: {
			marginVertical: Metrics.doubleBaseMargin
		},
		tinyVerticalMargin: {
			marginVertical: Metrics.tinyMargin
		},
		smallVerticalMargin: {
			marginVertical: Metrics.smallMargin
		},
		baseVerticalMargin: {
			marginVertical: Metrics.baseMargin
		},
		smallHorizontalMargin: {
			marginHorizontal: Metrics.smallMargin
		},
		baseHorizontalMargin: {
			marginHorizontal: Metrics.baseMargin
		},
		smallTopMargin: {
			marginTop: Metrics.smallMargin
		},	
		baseTopMargin: {
			marginTop: Metrics.baseMargin
		},
		tinyRightMargin: {
			marginRight: Metrics.tinyMargin
		},
		smallRightMargin: {
			marginRight: Metrics.smallMargin
		},
		smallLeftMargin: {
			marginLeft: Metrics.smallMargin
		},		
		baseLeftMargin: {
			marginLeft: Metrics.baseMargin
		},
		smallBottomMargin: {
			marginBottom: Metrics.smallMargin
		},
		baseBottomMargin: {
			marginBottom: Metrics.baseMargin
		},
		baseBottomPadding: {
			paddingBottom: Metrics.baseMargin
		},
		doubleBaseBottomPadding: {
			paddingBottom: Metrics.doubleBaseMargin,
		},
		statusBarSpace: {
			paddingTop: (Platform.OS != 'ios') ? StatusBar.currentHeight : 0
		},
		navBarHeight: {
			height: Metrics.navBarHeight,
		},
		baseTopPadding: {
			paddingTop: Metrics.baseMargin
		},
		tinyVerticalPadding: {
			paddingVertical: Metrics.tinyMargin
		},		
		smallVerticalPadding: {
			paddingVertical: Metrics.smallMargin
		},
		baseVerticalPadding: {
			paddingVertical: Metrics.baseMargin
		},
		smallHorizontalPadding: {
			paddingHorizontal: Metrics.smallMargin
		},
		baseHorizontalPadding: {
			paddingHorizontal: Metrics.baseMargin
		}

	}, 
	flexBox: {
		column: {
			flexDirection: 'column'
		},
		row: {
			flexDirection: 'row'
		},
		antirow: {
			flexDirection: 'row-reverse'
		},
		flex1: {
			flex: 1
		},
		flex2: {
			flex:2
		},
		flex: {
			flex:3
		},
		justifyContentFlexStart: {
			justifyContent: 'flex-start'
		},
		justifyContentFlexEnd: {
			justifyContent: 'flex-end'
		},
		justifyContentCenter: {
			justifyContent: 'center'
		},
		justifyContentSpaceBetween: {
			justifyContent: 'space-between'
		},
		justifyContentSpaceAround:{
			justifyContent: 'space-around'
		},
		justifyContentSpaceEvenly:{
			justifyContent: 'space-evenly'
		},
		alignItemFlexStart: {
			alignItems: 'flex-start'
		},
		alignItemsFlexEnd: {
			alignItems: 'flex-end'
		},
		alignItemsCenter: {
			alignItems: 'center'
		},
		alignItemsStretch: {
			alignItems: 'stretch'
		},
		centerObjects: {
			justifyContent: 'center',
			alignItems: 'center'
		},
		alignSelfCenter: {
			alignSelf: 'center'
		},
		alignSelfFlexStart: {
			alignSelf: 'flex-start'
		},
		wrap: {
			flexWrap: 'wrap'
		},
		alignContentFlexStart: {
			alignContent: 'flex-start'
		},
		alignContentFlexEnd: {
			alignContent: 'flex-end'
		},
		alignContentCenter: {
			alignContent: 'center'
		},
		alignContentSpaceBetween: {
			alignContent: 'space-between'
		},
		alignContentSpaceAround: {
			alignContent: 'space-around'
		},
		fullWidth: {
			width: '100%'
		},
		fullHeigth: {
			height: '100%'
		},
		deviceHeight: {
			height: Metrics.screenHeight
		}
	},
	stackNavigatorOptions: {
		removeHeader: {
			header: null
		},
		transparentHeader: {
			headerTransparent: true,
			headerStyle: {
				backgroundColor: Colors.transparent,
				elevation: 0, // remove shadow on Android
				shadowOpacity: 0, // remove shadow on iOS
				borderBottomWidth: 0,
			},
			gesturesEnabled: false,
			headerTintColor: Colors.white
		},
		bottomTab: {
			activeTintColor: Colors.blue,
			inactiveTintColor: Colors.light,
			style: {
				backgroundColor: Colors.white
			}
		}
	},
	navigationOptions: {
		headerTransparent: true,
		headerStyle: {
			backgroundColor: Colors.transparent,
			elevation: 0, // remove shadow on Android
			shadowOpacity: 0, // remove shadow on iOS
			borderBottomWidth: 0,
		},
		gesturesEnabled: false,
	}
} 

export default ApplicationStyles
