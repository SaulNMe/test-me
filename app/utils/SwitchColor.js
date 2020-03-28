import { Colors } from 'qualificame-native/app/styles';
export default function SwitchColor (tagName, returnCode=true) {
	if(returnCode){
		switch(tagName){
			case "excellent": return Colors.green;
			case "average":   return Colors.blue;
			case "bad":       return Colors.orange;
			case "awful": 	  return Colors.pink;
			default: 		  return Colors.gray;
		}
	} else {
		switch(tagName){
			case "excellent": return 'green';
			case "average":   return 'blue';
			case "bad":       return 'orange';
			case "awful": 	  return 'pink';
			default: 		  return 'gray';
		}
	}
}