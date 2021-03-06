import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.flexBox,
	...ApplicationStyles.margins,

	bgBlue: {
		backgroundColor: Colors.lighterGreen
	},
	bgWhite: {
		backgroundColor: Colors.white
	}
});
