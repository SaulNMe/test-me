import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors, ApplicationStyles } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.margins,
	...ApplicationStyles.flexBox,
	dark: { 
		color: Colors.dark,
	},
	spacer: {
		backgroundColor: Colors.grayBg,
		height: Metrics.doubleBaseMargin
	}
});
