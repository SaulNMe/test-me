import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.margins,
	border: {
		borderWidth: 1,
		borderColor: Colors.green
	},
	textStyle: {
		fontSize: Fonts.size.subtitle,
		fontWeight: Fonts.weight.light,
		color: Colors.dark
	},
	blueText: {
		color: Colors.green,
		fontWeight: Fonts.weight.medium
	}

});
