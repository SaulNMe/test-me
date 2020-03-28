import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.flexBox,
	...ApplicationStyles.margins,
	alertNum: {
		color: Colors.white, 
		fontSize: Fonts.size.tiniest,
		fontWeight: Fonts.weight.light
	},
	iconContainer: {
		width: 25,
		height: 25
	},
	iconBadge: {
		height: 17,
		width: 17, 
		borderRadius: 999,
		paddingHorizontal: 2,
		position: 'absolute',
		left: 10,
		top: -5,
		alignItems: 'center', 
		justifyContent: 'center',
		backgroundColor: Colors.red
	},
});
