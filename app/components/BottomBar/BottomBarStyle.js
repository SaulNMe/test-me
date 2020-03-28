import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Colors, Metrics } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.flexBox,
	...ApplicationStyles.margins,
	container: {
		height: 55,
		width: '100%',
		backgroundColor: Colors.white
	},
	bottomBarIcons: {
		marginTop: 7,
		position: 'relative',
		overflow: 'hidden',
		borderRadius: 200,
		//width: 100,
		height: 42,
	}
});
