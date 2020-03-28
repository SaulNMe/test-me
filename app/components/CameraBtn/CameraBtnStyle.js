import { StyleSheet, Platform } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.margins,
	cameraBtn: {
		width: 70,
		height: 70,
		borderRadius: 50,
		flexDirection: 'row',
		justifyContent: 'center',
		padding: Metrics.baseMargin,
		backgroundColor: Colors.green,
	},
	icon: {
		alignSelf: 'center',
		width: (Platform.OS === 'ios' ? 35:25)
	}
});
