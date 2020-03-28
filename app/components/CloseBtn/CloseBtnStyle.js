import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	closeBtn: {
		borderRadius: 15,
		width: 24,
       	height: 24,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor: Colors.lightGray,
	},
	feather: {
		fontSize: Fonts.size.subtitle,
		color: Colors.lightBlack,
		opacity: 1
	},
});
