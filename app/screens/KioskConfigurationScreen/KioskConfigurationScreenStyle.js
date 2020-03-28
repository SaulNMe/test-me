import { StyleSheet } from 'react-native';
import { Fonts, Colors, ApplicationStyles, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.margins,
	...ApplicationStyles.flexBox,
	bgColor: {
		backgroundColor: '#fafafa'
	},
	overColor: {
		backgroundColor: '#fff'
	},
	spacer: {
		backgroundColor: Colors.grayBg,
		height: Metrics.doubleBaseMargin
	}
});
