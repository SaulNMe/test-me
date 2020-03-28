import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.margins,
	...ApplicationStyles.flexBox,
	flex07: {
		flex: .7
	},
	flex03: {
		flex: .3	
	},
	divider: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc'
	},
	pickerStyle: {
		height: 50,
		width: 100,
		backgroundColor: 'gray',
		flex: 1,
	},
	bgColor: {
		backgroundColor: Colors.white
	},
});
