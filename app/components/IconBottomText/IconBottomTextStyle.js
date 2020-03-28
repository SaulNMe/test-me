import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.margins,
	...ApplicationStyles.flexBox,
	bubbleForm: {
		width: 100,
		height: 100,
		borderRadius: 90,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1
	},
});
