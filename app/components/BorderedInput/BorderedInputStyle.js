import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.flexBox,
	...ApplicationStyles.margins,
	...ApplicationStyles.screen,
	border: {
		borderWidth: 1,
		borderRadius: 5,
		paddingVertical: Metrics.smallMargin
	},
	hint: {
		height: 28
	}, 
	inputContent: {
		position: 'absolute',
		zIndex: -1,
		height: 28
	}
});
