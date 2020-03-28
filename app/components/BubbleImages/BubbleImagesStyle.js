import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.margins,
	...ApplicationStyles.flexBox,
	bubbleOne: {
		width: 137,
		height: 137,
		borderRadius: 69,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1
	},
	bubbleTwo: {
		width: 180,
		height: 180,
		borderRadius: 90,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1
	},
	bubbleThree: {
		width: 107,
		height: 107,
		borderRadius: 54,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1
	},
	paddingRight: {
		paddingRight:  Metrics.baseMargin
	},
	paddingLeft: {
		paddingLeft:  Metrics.baseMargin
	}
});
