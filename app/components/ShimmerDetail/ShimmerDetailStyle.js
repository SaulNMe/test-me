import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.flexBox,
	...ApplicationStyles.margins,	
	circle: {
		width:Math.round( (Metrics.screenWidth / 2)*1.15 ),
		height:Math.round( (Metrics.screenWidth / 2)*1.15 ),
		borderRadius:200
	},
});
