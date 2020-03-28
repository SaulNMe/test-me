import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.flexBox,
	box: {
		width: 48,
		height: 48,
		borderRadius: 10
	},
	imageSize: {
		width: 45,
		height: 45
	}
});
