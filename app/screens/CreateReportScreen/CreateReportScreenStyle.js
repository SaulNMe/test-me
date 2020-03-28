import { StyleSheet } from 'react-native';
import { Fonts, Colors, ApplicationStyles } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.flexBox,
	...ApplicationStyles.margins,
	flex07: {
		flex: 0.7
	},
	flex03: {
		flex: 0.3
	},
	spacerInput: {
		marginVertical: 2
	},
	elevation: {
		zIndex: 999,
	},
	inputContent: {
		zIndex: -10,
		position: "absolute",
		height: 28,
	},
	hint: {
		height: 28
	}
});
