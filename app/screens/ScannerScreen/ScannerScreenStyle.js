import { StyleSheet, Platform, StatusBar } from 'react-native';
import { ApplicationStyles, Fonts, Metrics, Colors } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.flexBox,
	...ApplicationStyles.margins,
	mainContainer: {
		backgroundColor: 'black',
	},
	// cameraContainer: {
	// 	// paddingTop: (Platform.OS != 'ios') ? StatusBar.currentHeight*1.4 : 0,
	// 	flex: 1,
	// },
	navbar: {
		zIndex: 2,
		top: 0,
		right: 0,
		left: 0
	},
	squareContainer: {
		marginTop: (Platform.OS != 'ios') ? StatusBar.currentHeight : 0,
		flex: 1,
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: 1,
		flexDirection: 'row',
	},
	leftTop: {
		borderTopWidth: 5,
		borderLeftWidth: 5,
		borderColor: Colors.white,
		margin: 30,
		width: 50,
		height: 50,
	},
	rightTop: {
		borderTopWidth: 5,
		borderRightWidth: 5,
		borderColor: Colors.white,
		margin: 30,
		width: 50,
		height: 50,

	},
	rowScanner: {
		flexDirection: 'row',
	},
	leftBottom: {
		borderBottomWidth: 5,
		borderLeftWidth: 5,
		borderColor: Colors.white,
		margin: 30,
		width: 50,
		height: 50,
	},
	rightBottom: {
		borderBottomWidth: 5,
		borderRightWidth: 5,
		borderColor: Colors.white,
		margin: 30,
		width: 50,
		height: 50,

	},
	barCodeScanner:{
		flex: 1,
		position: 'absolute',
		top: StatusBar.currentHeight,
		left: 0,
		right: 0,
		bottom: 0,
		transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
	},
	title: {
		marginTop: Metrics.navBarHeight,
		position: 'absolute',
		zIndex: 2,
		width: Metrics.screenWidth,	
		paddingTop: Metrics.baseMargin,
	},
	titleContainer:{
		borderRadius: 10,
		padding: Metrics.smallMargin,
		width: Metrics.screenWidth*0.8,
		backgroundColor: 'rgba(0,0,0,0.3)'
	}
});
