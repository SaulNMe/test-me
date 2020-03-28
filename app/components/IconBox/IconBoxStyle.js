import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.flexBox,
	defaultSize:{
		width: 32,
		height: 32,
		borderRadius: 5
	}
});
