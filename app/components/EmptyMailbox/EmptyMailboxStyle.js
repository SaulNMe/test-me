import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.margins,
	...ApplicationStyles.flexBox,
	imageContainer: {
		width: Metrics.screenWidth*0.9,
	},
	imageSize: {
		width: Metrics.screenWidth*0.8,
		height: Metrics.screenWidth*0.75
	}
	
});
