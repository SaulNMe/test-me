import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.flexBox,
	...ApplicationStyles.margins,
	square: {
		width:48, 
		height:48,
		borderRadius: 9
	},
	dot: {
		width:4,
		height:4,
		borderRadius:4,
	},
	card: {
		paddingVertical: Metrics.smallMargin,
		paddingHorizontal: Metrics.smallMargin
	}
});
