import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.margins,
	...ApplicationStyles.flexBox,
	card: {
		...ApplicationStyles.screen.card,
		paddingVertical: Metrics.smallMargin,
		paddingHorizontal: Metrics.baseMargin
	}
});
