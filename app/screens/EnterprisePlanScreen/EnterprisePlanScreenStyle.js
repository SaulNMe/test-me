import { StyleSheet } from 'react-native';
import { Fonts, Colors, ApplicationStyles } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.flexBox,
	...ApplicationStyles.margins,
	...ApplicationStyles.screen,
	paddingBottom: {
    	paddingBottom: 50
  	},
  	footerStyle: {
    	position: 'absolute', 
    	left: 0, 
    	right: 0, 
    	bottom: 0
  	}
});
