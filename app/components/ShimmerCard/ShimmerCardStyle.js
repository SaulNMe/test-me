import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.flexBox,
	...ApplicationStyles.margins,
	circle: {
		width:70, 
		height:70,
		borderRadius:50
	},
	icon: {
		width:24, 
		height:24,
	},
	card: {
		...ApplicationStyles.screen.card,
		paddingVertical: Metrics.smallMargin,
		paddingHorizontal: Metrics.baseMargin
	}
});
