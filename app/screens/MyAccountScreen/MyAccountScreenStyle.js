import { StyleSheet } from 'react-native';
import { Fonts, Colors, ApplicationStyles } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.flexBox,
	...ApplicationStyles.margins,
	bgColor: {
		backgroundColor: '#fafafa'
	}
});
